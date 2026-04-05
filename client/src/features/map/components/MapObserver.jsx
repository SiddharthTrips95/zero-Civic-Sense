import { useMapEve } from 'react-leaflet';



const MapObserver = ({ onMove, onMapClick }) => {
  useMapEve({
    moveend: (e) => {
      const { lat, lng } = e.target.getCenter();
      onMove(lat, lng, e.target.getZoom());
    },
    click,
  });
  return null;
};

export default MapObserver;
