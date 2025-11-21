// "use client"
// import React, { Component } from "react";
// import _ from "lodash";
// import PropTypes from "prop-types";
// // import "./MoleculeStructure.css";
// import initRDKit from "../../utils/initRDKit";

// class MoleculeStructure extends Component {
//   static propTypes = {
//     /**
//      * Generic properties
//      */
//     id: PropTypes.string.isRequired,
//     className: PropTypes.string,
//     svgMode: PropTypes.bool,
//     width: PropTypes.number,
//     height: PropTypes.number,
//     score: PropTypes.number, // ADDED: Score prop
//     /**
//      * RDKit-specific properties
//      */
//     structure: PropTypes.string.isRequired,
//     subStructure: PropTypes.string,
//     extraDetails: PropTypes.object,
//     drawingDelay: PropTypes.number
//   };

//   static defaultProps = {
//     subStructure: "",
//     className: "",
//     width: 250,
//     height: 200,
//     svgMode: false,
//     extraDetails: {},
//     drawingDelay: undefined
//   };

//   constructor(props) {
//     super(props);

//     this.MOL_DETAILS = {
//       width: this.props.width,
//       height: this.props.height,
//       bondLineWidth: 1,
//       addStereoAnnotation: true,
//       ...this.props.extraDetails
//     };

//     this.state = {
//       svg: undefined,
//       rdKitLoaded: false,
//       rdKitError: false
//     };
//   }

//   drawOnce = (() => {
//     let wasCalled = false;

//     return () => {
//       if (!wasCalled) {
//         wasCalled = true;
//         this.draw();
//       }
//     };
//   })();

//   draw() {
//     if (this.props.drawingDelay) {
//       setTimeout(() => {
//         this.drawSVGorCanvas();
//       }, this.props.drawingDelay);
//     } else {
//       this.drawSVGorCanvas();
//     }
//   }

//   drawSVGorCanvas() {
//     const mol = window.RDKit.get_mol(this.props.structure || "invalid");
//     const qmol = window.RDKit.get_qmol(this.props.subStructure || "invalid");
//     const isValidMol = this.isValidMol(mol);

//     if (this.props.svgMode && isValidMol) {
//       const svg = mol.get_svg_with_highlights(this.getMolDetails(mol, qmol));
//       this.setState({ svg });
//     } else if (isValidMol) {
//       const canvas = document.getElementById(this.props.id);
//       mol.draw_to_canvas_with_highlights(canvas, this.getMolDetails(mol, qmol));
//     }

//     mol?.delete();
//     qmol?.delete();
//   }

//   isValidMol(mol) {
//     return !!mol;
//   }

//   getMolDetails(mol, qmol) {
//     if (this.isValidMol(mol) && this.isValidMol(qmol)) {
//       const subStructHighlightDetails = JSON.parse(
//         mol.get_substruct_matches(qmol)
//       );
//       const subStructHighlightDetailsMerged = !_.isEmpty(
//         subStructHighlightDetails
//       )
//         ? subStructHighlightDetails.reduce(
//             (acc, { atoms, bonds }) => ({
//               atoms: [...acc.atoms, ...atoms],
//               bonds: [...acc.bonds, ...bonds]
//             }),
//             { bonds: [], atoms: [] }
//           )
//         : subStructHighlightDetails;
//       return JSON.stringify({
//         ...this.MOL_DETAILS,
//         ...(this.props.extraDetails || {}),
//         ...subStructHighlightDetailsMerged
//       });
//     } else {
//       return JSON.stringify({
//         ...this.MOL_DETAILS,
//         ...(this.props.extraDetails || {})
//       });
//     }
//   }

//   componentDidMount() {
//     initRDKit()
//       .then(() => {
//         this.setState({ rdKitLoaded: true });
//         try {
//           this.draw();
//         } catch (err) {
//           console.log(err);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         this.setState({ rdKitError: true });
//       });
//   }

//   componentDidUpdate(prevProps) {
//     if (
//       !this.state.rdKitError &&
//       this.state.rdKitLoaded &&
//       !this.props.svgMode
//     ) {
//       this.drawOnce();
//     }

//     if (this.state.rdKitLoaded) {
//       const shouldUpdateDrawing =
//         prevProps.structure !== this.props.structure ||
//         prevProps.svgMode !== this.props.svgMode ||
//         prevProps.subStructure !== this.props.subStructure ||
//         prevProps.width !== this.props.width ||
//         prevProps.height !== this.props.height ||
//         !_.isEqual(prevProps.extraDetails, this.props.extraDetails);

//       if (shouldUpdateDrawing) {
//         this.draw();
//       }
//     }
//   }

//   render() {
//     if (this.state.rdKitError) {
//       return "Error loading renderer.";
//     }
//     if (!this.state.rdKitLoaded) {
//       return "Loading renderer...";
//     }

//     const mol = window.RDKit.get_mol(this.props.structure || "invalid");
//     const isValidMol = this.isValidMol(mol);
//     mol?.delete();

//     if (!isValidMol) {
//       return (
//         <span title={`Cannot render structure: ${this.props.structure}`}>
//           Render Error.
//         </span>
//       );
//     } else if (this.props.svgMode) {
//       return (
//         <div className="flex flex-col">
//           <div
//             title={this.props.structure}
//             className={"molecule-structure-svg " + (this.props.className || "")}
//             style={{ width: this.props.width, height: this.props.height }}
//             dangerouslySetInnerHTML={{ __html: this.state.svg }}
//           ></div>
//           {this.props.score !== undefined && (
//             <div className="mt-2 rounded-lg bg-primary px-3 py-2 text-center font-bold text-white">
//               Score: {this.props.score.toFixed(3)}
//             </div>
//           )}
//         </div>
//       );
//     } else {
//       return (
//         <div className="flex flex-col">
//           <div
//             className={
//               "molecule-canvas-container " + (this.props.className || "")
//             }
//           >
//             <canvas
//               title={this.props.structure}
//               id={this.props.id}
//               width={this.props.width}
//               height={this.props.height}
//             ></canvas>
//           </div>
//           {this.props.score !== undefined && (
//             <div className="mt-2 rounded-lg bg-primary px-3 py-2 text-center font-bold text-white">
//               Score: {this.props.score.toFixed(3)}
//             </div>
//           )}
//         </div>
//       );
//     }
//   }
// }

// export default MoleculeStructure;

"use client"
import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import initRDKit from "../../utils/initRDKit";

class MoleculeStructure extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    svgMode: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    score: PropTypes.number,
    structure: PropTypes.string.isRequired,
    subStructure: PropTypes.string,
    extraDetails: PropTypes.object,
    drawingDelay: PropTypes.number
  };

  static defaultProps = {
    subStructure: "",
    className: "",
    width: 250,
    height: 200,
    svgMode: false,
    extraDetails: {},
    drawingDelay: undefined
  };

  constructor(props) {
    super(props);

    this.MOL_DETAILS = {
      width: this.props.width,
      height: this.props.height,
      bondLineWidth: 1,
      addStereoAnnotation: true,
      ...this.props.extraDetails
    };

    this.state = {
      svg: undefined,
      rdKitLoaded: false,
      rdKitError: false,
      errorMessage: null,
      retryCount: 0
    };

    this.drawCalled = false;
  }

  drawOnce = () => {
    if (!this.drawCalled) {
      this.drawCalled = true;
      this.draw();
    }
  };

  draw() {
    if (this.props.drawingDelay) {
      setTimeout(() => {
        this.drawSVGorCanvas();
      }, this.props.drawingDelay);
    } else {
      this.drawSVGorCanvas();
    }
  }

  drawSVGorCanvas() {
    try {
      if (!window.RDKit) {
        console.error('RDKit not available');
        return;
      }

      const mol = window.RDKit.get_mol(this.props.structure || "");
      
      if (!this.isValidMol(mol)) {
        console.error('Invalid molecule structure:', this.props.structure);
        this.setState({ 
          rdKitError: true, 
          errorMessage: 'Invalid molecule structure' 
        });
        mol?.delete();
        return;
      }

      const qmol = this.props.subStructure 
        ? window.RDKit.get_qmol(this.props.subStructure) 
        : null;

      if (this.props.svgMode) {
        const svg = mol.get_svg_with_highlights(this.getMolDetails(mol, qmol));
        this.setState({ svg, rdKitError: false, errorMessage: null });
      } else {
        const canvas = document.getElementById(this.props.id);
        if (canvas) {
          mol.draw_to_canvas_with_highlights(canvas, this.getMolDetails(mol, qmol));
          this.setState({ rdKitError: false, errorMessage: null });
        }
      }

      mol?.delete();
      qmol?.delete();
    } catch (err) {
      console.error('Error drawing molecule:', err);
      this.setState({ 
        rdKitError: true, 
        errorMessage: err.message || 'Failed to render molecule' 
      });
    }
  }

  isValidMol(mol) {
    return mol && mol.is_valid && mol.is_valid();
  }

  getMolDetails(mol, qmol) {
    try {
      if (this.isValidMol(mol) && this.isValidMol(qmol)) {
        const subStructHighlightDetails = JSON.parse(
          mol.get_substruct_matches(qmol)
        );
        const subStructHighlightDetailsMerged = !_.isEmpty(
          subStructHighlightDetails
        )
          ? subStructHighlightDetails.reduce(
              (acc, { atoms, bonds }) => ({
                atoms: [...acc.atoms, ...atoms],
                bonds: [...acc.bonds, ...bonds]
              }),
              { bonds: [], atoms: [] }
            )
          : subStructHighlightDetails;
        return JSON.stringify({
          ...this.MOL_DETAILS,
          ...(this.props.extraDetails || {}),
          ...subStructHighlightDetailsMerged
        });
      } else {
        return JSON.stringify({
          ...this.MOL_DETAILS,
          ...(this.props.extraDetails || {})
        });
      }
    } catch (err) {
      console.error('Error getting mol details:', err);
      return JSON.stringify({
        ...this.MOL_DETAILS,
        ...(this.props.extraDetails || {})
      });
    }
  }

  async componentDidMount() {
    try {
      await initRDKit();
      this.setState({ rdKitLoaded: true });
      
      // Give a small delay to ensure RDKit is fully ready
      setTimeout(() => {
        try {
          this.draw();
        } catch (err) {
          console.error('Error in initial draw:', err);
          this.setState({ 
            rdKitError: true, 
            errorMessage: err.message 
          });
        }
      }, 100);
    } catch (err) {
      console.error('Failed to load RDKit:', err);
      this.setState({ 
        rdKitError: true, 
        errorMessage: 'Failed to load RDKit library',
        retryCount: this.state.retryCount + 1
      });
      
      // Retry loading RDKit up to 3 times
      if (this.state.retryCount < 3) {
        setTimeout(() => {
          this.componentDidMount();
        }, 2000);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.rdKitError && this.state.rdKitLoaded) {
      const shouldUpdateDrawing =
        prevProps.structure !== this.props.structure ||
        prevProps.svgMode !== this.props.svgMode ||
        prevProps.subStructure !== this.props.subStructure ||
        prevProps.width !== this.props.width ||
        prevProps.height !== this.props.height ||
        !_.isEqual(prevProps.extraDetails, this.props.extraDetails);

      if (shouldUpdateDrawing) {
        this.drawCalled = false;
        this.draw();
      }
    }
  }

  render() {
    if (this.state.rdKitError) {
      return (
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20" 
             style={{ width: this.props.width, height: this.props.height }}>
          <div className="text-center">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              Unable to render structure
            </p>
            {this.state.errorMessage && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-300">
                {this.state.errorMessage}
              </p>
            )}
          </div>
        </div>
      );
    }
    
    if (!this.state.rdKitLoaded) {
      return (
        <div className="flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800" 
             style={{ width: this.props.width, height: this.props.height }}>
          <div className="text-center">
            <div className="mb-2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Loading renderer...
            </p>
          </div>
        </div>
      );
    }

    if (this.props.svgMode) {
      return (
        <div className="flex flex-col">
          <div
            title={this.props.structure}
            className={"molecule-structure-svg " + (this.props.className || "")}
            style={{ width: this.props.width, height: this.props.height }}
            dangerouslySetInnerHTML={{ __html: this.state.svg }}
          ></div>
          {this.props.score !== undefined && (
            <div className="mt-2 rounded-lg bg-primary px-3 py-2 text-center font-bold text-white">
              Score: {this.props.score.toFixed(3)}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col">
          <div
            className={
              "molecule-canvas-container " + (this.props.className || "")
            }
          >
            <canvas
              title={this.props.structure}
              id={this.props.id}
              width={this.props.width}
              height={this.props.height}
            ></canvas>
          </div>
          {this.props.score !== undefined && (
            <div className="mt-2 rounded-lg bg-primary px-3 py-2 text-center font-bold text-white">
              Score: {this.props.score.toFixed(3)}
            </div>
          )}
        </div>
      );
    }
  }
}

export default MoleculeStructure;