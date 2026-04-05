import { useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
  TILE_URL,
  TILE_ATTRIBUTION,
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
} from "./constants";

import { getIssues } from "@/api/issuesApi";
import { buildIssueIcon } from "./utils/buildIssueIcon";

import LayerControls from "./components/LayerControls";
import IssueDetailPanel from "./components/IssueDetailPanel";

const MapPage = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const [layers, setLayers] = useState({
    issues: true,
  });

  // 🔥 Fetch issues
  useEffect(() => {
    getIssues()
      .then((data) => setIssues(data || []))
      .catch(() => setIssues([]));
  }, []);

  // 🔥 Icons
  const icons = useMemo(() => {
    return Object.fromEntries(
      issues.map((i) => [i.id, buildIssueIcon(i)])
    );
  }, [issues]);

  return (
    <div className="w-full h-screen relative">
      {/* Map */}
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="w-full h-full"
      >
        <TileLayer
          url={TILE_URL}
          attribution={TILE_ATTRIBUTION}
        />

        {/* Markers */}
        {layers.issues &&
          issues.map((issue) => (
            <Marker
              key={issue.id}
              position={[issue.lat, issue.lng]}
              icon={icons[issue.id]}
              eventHandlers={{
                click: () => setSelectedIssue(issue),
              }}
            />
          ))}
      </MapContainer>

      {/* Layer Controls */}
      <LayerControls
        layers={layers}
        setLayers={setLayers}
      />

      {/* Issue Detail Panel */}
      {selectedIssue && (
        <IssueDetailPanel
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </div>
  );
};

export default MapPage;