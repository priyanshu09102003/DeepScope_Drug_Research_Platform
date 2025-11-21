// let rdKitLoadingPromise;

// async function initRDKit() {
//   if (rdKitLoadingPromise) {
//     return rdKitLoadingPromise;
//   }

//   if (typeof window !== 'undefined' && window.RDKit) {
//     return Promise.resolve(window.RDKit);
//   }

//   rdKitLoadingPromise = new Promise((resolve, reject) => {
//     if (typeof window === 'undefined') {
//       reject(new Error('Window is not defined'));
//       return;
//     }

//     // Check if already loaded
//     if (window.RDKit) {
//       resolve(window.RDKit);
//       return;
//     }

//     // Load the script dynamically
//     const script = document.createElement('script');
//     script.src = 'https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js';
//     script.async = true;
    
//     script.onload = () => {
//       window.initRDKitModule().then((RDKit) => {
//         window.RDKit = RDKit;
//         console.log("RDKit version: " + RDKit.version());
//         resolve(RDKit);
//       }).catch(reject);
//     };

//     script.onerror = () => {
//       rdKitLoadingPromise = null;
//       reject(new Error('Failed to load RDKit script'));
//     };

//     document.head.appendChild(script);
//   });

//   return rdKitLoadingPromise;
// }

// export default initRDKit;


let rdKitLoadingPromise;
let rdKitInstance;

async function initRDKit() {
  // Return existing instance if available
  if (rdKitInstance) {
    return Promise.resolve(rdKitInstance);
  }

  // Return existing loading promise if already loading
  if (rdKitLoadingPromise) {
    return rdKitLoadingPromise;
  }

  // Check if window is available
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window is not defined'));
  }

  // Check if RDKit is already on window
  if (window.RDKit) {
    rdKitInstance = window.RDKit;
    return Promise.resolve(window.RDKit);
  }

  rdKitLoadingPromise = new Promise((resolve, reject) => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="RDKit_minimal.js"]');
    
    if (existingScript && window.initRDKitModule) {
      window.initRDKitModule()
        .then((RDKit) => {
          window.RDKit = RDKit;
          rdKitInstance = RDKit;
          console.log("RDKit version: " + RDKit.version());
          resolve(RDKit);
        })
        .catch((err) => {
          console.error('Failed to initialize RDKit:', err);
          rdKitLoadingPromise = null;
          reject(err);
        });
      return;
    }

    // Load the RDKit script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      // Wait a bit for the module to be available
      const checkRDKit = setInterval(() => {
        if (window.initRDKitModule) {
          clearInterval(checkRDKit);
          
          window.initRDKitModule()
            .then((RDKit) => {
              window.RDKit = RDKit;
              rdKitInstance = RDKit;
              console.log("RDKit version: " + RDKit.version());
              resolve(RDKit);
            })
            .catch((err) => {
              console.error('Failed to initialize RDKit module:', err);
              rdKitLoadingPromise = null;
              reject(err);
            });
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkRDKit);
        if (!rdKitInstance) {
          rdKitLoadingPromise = null;
          reject(new Error('RDKit initialization timeout'));
        }
      }, 10000);
    };

    script.onerror = (err) => {
      console.error('Failed to load RDKit script:', err);
      rdKitLoadingPromise = null;
      reject(new Error('Failed to load RDKit script'));
    };

    document.head.appendChild(script);
  });

  return rdKitLoadingPromise;
}

export default initRDKit;