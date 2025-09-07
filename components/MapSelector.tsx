import React, { useEffect, useRef, useState } from 'react';
import { CATEGORY_MAP } from '../constants';
import { LocateIcon } from './icons/CategoryIcons';

declare const L: any; // Using Leaflet from CDN via index.html

export const MapSelector = ({ onAreaSelect, focusedEstablishment, establishments, showHeatmap, onMarkerClick }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const drawnItems = useRef(null);
  const highlightMarker = useRef(null);
  const markersLayer = useRef(null);
  const heatLayer = useRef(null);
  const [isLocating, setIsLocating] = useState(false);


  useEffect(() => {
    // Check if Leaflet is available and the map is not already initialized
    if (typeof L !== 'undefined' && mapRef.current && !mapInstance.current) {
      // Initialize map
      mapInstance.current = L.map(mapRef.current).setView([35.6895, 139.6917], 12); // Default to Tokyo

      // Add a dark-themed tile layer from CartoDB (no API key required)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstance.current);

      // Initialize the feature group to store editable layers
      drawnItems.current = new L.FeatureGroup();
      mapInstance.current.addLayer(drawnItems.current);
      markersLayer.current = L.layerGroup().addTo(mapInstance.current);

      // Initialize the draw control and pass it the feature group
      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems.current,
          remove: true,
        },
        draw: {
          polygon: {
            allowIntersection: false,
            shapeOptions: {
              color: '#0ea5e9',
              weight: 3,
            }
          },
          polyline: false, rectangle: false, circle: false, marker: false, circlemarker: false,
        }
      });
      mapInstance.current.addControl(drawControl);

      mapInstance.current.on(L.Draw.Event.CREATED, (e) => {
        const layer = e.layer;
        drawnItems.current.clearLayers();
        drawnItems.current.addLayer(layer);
        const latLngs = layer.getLatLngs()[0].map((p) => ({ lat: p.lat, lng: p.lng }));
        onAreaSelect(latLngs);
      });
      
      mapInstance.current.on(L.Draw.Event.DELETED, () => onAreaSelect(null));
      
      mapInstance.current.on(L.Draw.Event.EDITED, (e) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
            const latLngs = layer.getLatLngs()[0].map((p) => ({ lat: p.lat, lng: p.lng }));
            onAreaSelect(latLngs);
        });
      });
    }

  }, [onAreaSelect]);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const latLng = [latitude, longitude];
        if (mapInstance.current) {
          mapInstance.current.flyTo(latLng, 14, { duration: 1.5 });
        }
        setIsLocating(false);
      },
      () => {
        alert("Unable to retrieve your location. Please ensure location services are enabled.");
        setIsLocating(false);
      }
    );
  };

  useEffect(() => {
    if (!mapInstance.current || !markersLayer.current) return;

    markersLayer.current.clearLayers();
    if (heatLayer.current) {
      heatLayer.current.remove();
      heatLayer.current = null;
    }

    if (showHeatmap) {
      if (establishments.length > 0) {
        const heatPoints = establishments.map(e => [e.latitude, e.longitude, 0.5]);
        const gradient = {0.4: '#0ea5e9', 0.65: '#6366f1', 1: '#ec4899'};
        heatLayer.current = L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 18, gradient }).addTo(mapInstance.current);
      }
    } else {
      establishments.forEach(est => {
        const categoryInfo = CATEGORY_MAP.get(est.category) || { color: '#64748b' };
        const marker = L.circleMarker([est.latitude, est.longitude], {
          radius: 6,
          fillColor: categoryInfo.color,
          color: '#fff',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(markersLayer.current);
        
        marker.on('click', () => onMarkerClick(est));
        marker.bindTooltip(est.name);
      });
    }
  }, [establishments, showHeatmap, onMarkerClick]);

  useEffect(() => {
    if (mapInstance.current && focusedEstablishment) {
      const { latitude, longitude } = focusedEstablishment;
      const latLng = [latitude, longitude];

      mapInstance.current.flyTo(latLng, 17, { duration: 1.5 });
      
      if (highlightMarker.current) {
        highlightMarker.current.remove();
      }

      highlightMarker.current = L.circleMarker(latLng, {
        radius: 12,
        fill: false,
        color: '#38bdf8',
        weight: 3,
        className: 'animate-ping'
      }).addTo(mapInstance.current);

      setTimeout(() => {
        if (highlightMarker.current) {
          highlightMarker.current.remove();
        }
      }, 1000);
    }
  }, [focusedEstablishment]);

  return (
    <div className="relative h-[500px] lg:h-full w-full rounded-lg border border-sky-500/20 bg-slate-800 shadow-inner shadow-black/30 overflow-hidden">
        <div ref={mapRef} className="h-full w-full" />
        <button
          onClick={handleLocateMe}
          className="absolute top-28 right-2.5 z-[1000] bg-slate-800/80 p-2 rounded-md border border-slate-600 hover:bg-slate-700 text-slate-200 transition-colors disabled:opacity-50 disabled:cursor-wait"
          aria-label="Find my location"
          disabled={isLocating}
          title="Find my location"
        >
          {isLocating ? <div className="w-6 h-6 animate-spin rounded-full border-2 border-slate-500 border-t-sky-400"></div> : <LocateIcon />}
        </button>
    </div>
  );
};