"use client";

import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/jsvectormap.css";
import React, { useEffect, useRef } from "react";
import "../../../js/world";

const MapOne: React.FC = () => {
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Function to get scale based on screen width
    const getScale = () => {
      const width = window.innerWidth;
      if (width < 640) return 0.6; // mobile
      if (width < 768) return 0.7; // small tablet
      if (width < 1024) return 0.8; // tablet
      return 1; // desktop
    };

    const initMap = () => {
      const container = document.getElementById("mapOne");
      if (container) {
        container.innerHTML = "";
      }

      mapInstanceRef.current = new jsVectorMap({
        selector: "#mapOne",
        map: "world",
        zoomButtons: true,
        zoomOnScroll: true,
        zoomMax: 12,
        zoomMin: 1,
        zoomAnimate: true,
        
        regionStyle: {
          initial: {
            fill: "#C8D0D8",
          },
          hover: {
            fillOpacity: 1,
            fill: "#3056D3",
          },
        },
        regionLabelStyle: {
          initial: {
            fontFamily: "Satoshi",
            fontWeight: "semibold",
            fill: "#fff",
          },
          hover: {
            cursor: "pointer",
          },
        },

        labels: {
          regions: {
            render(code: string) {
              return code.split("-")[1];
            },
          },
        },
      });

      // Apply responsive scaling
      setTimeout(() => {
        const svg = document.querySelector("#mapOne svg") as SVGElement;
        const container = document.querySelector("#mapOne .jvm-container") as HTMLElement;
        const scale = getScale();
        
        if (svg && container) {
          svg.style.width = "100%";
          svg.style.height = "100%";
          svg.style.transform = `scale(${scale})`;
          svg.style.transformOrigin = "center center";
          
          container.style.width = "100%";
          container.style.height = "100%";
          container.style.display = "flex";
          container.style.alignItems = "center";
          container.style.justifyContent = "center";
        }
      }, 100);
    };

    initMap();

    // Reinitialize map on window resize
    const handleResize = () => {
      initMap();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      const map = document.getElementById("mapOne");
      if (map) {
        map.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="col-span-12 rounded-lg border border-stroke bg-white px-4 py-4 shadow-default dark:border-[#181818] dark:bg-[#181818] sm:px-7.5 sm:py-6 xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Across the Globe
      </h4>
      <div className="h-[280px] w-full overflow-hidden sm:h-[350px] md:h-[400px] lg:h-[450px]">
        <div 
          id="mapOne" 
          className="mapOne map-btn h-full w-full"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        ></div>
      </div>
      <style jsx>{`
        #mapOne :global(.jvm-container) {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        #mapOne :global(svg) {
          width: 100% !important;
          height: 100% !important;
        }
        
        #mapOne :global(.jvm-zoom-btn) {
          position: absolute;
          background-color: #3056D3;
          color: white;
          width: 25px;
          height: 25px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          line-height: 25px;
          text-align: center;
          z-index: 10;
        }
        
        #mapOne :global(.jvm-zoom-btn.jvm-zoomin) {
          top: 10px;
          right: 10px;
        }
        
        #mapOne :global(.jvm-zoom-btn.jvm-zoomout) {
          top: 40px;
          right: 10px;
        }
      `}</style>
    </div>
  );
};

export default MapOne;