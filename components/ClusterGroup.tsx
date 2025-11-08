import { ReactNode } from "react";
import { createElementObject, extendContext, createPathComponent } from "@react-leaflet/core";
import type { LeafletContextInterface } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet.markercluster";

type ClusterEvents = {
  [event: string]: (...args: unknown[]) => void;
};

type ClusterGroupProps = L.MarkerClusterGroupOptions & {
  children?: ReactNode;
  [key: string]: unknown;
};

function splitProps(props: ClusterGroupProps): {
  clusterProps: L.MarkerClusterGroupOptions;
  clusterEvents: ClusterEvents;
} {
  const clusterProps: L.MarkerClusterGroupOptions = {};
  const clusterEvents: ClusterEvents = {};

  Object.entries(props).forEach(([name, value]) => {
    if (name === "children") {
      return;
    }
    if (name.startsWith("on") && typeof value === "function") {
      const eventName = `cluster${name.substring(2).toLowerCase()}`;
      clusterEvents[eventName] = value as (...args: unknown[]) => void;
    } else {
      (clusterProps as Record<string, unknown>)[name] = value;
    }
  });

  return { clusterProps, clusterEvents };
}

function createClusterGroup(props: ClusterGroupProps, context: LeafletContextInterface) {
  const { clusterProps, clusterEvents } = splitProps(props);

  const clusterGroup = new L.MarkerClusterGroup(clusterProps);
  Object.entries(clusterEvents).forEach(([eventName, handler]) => {
    clusterGroup.on(eventName, handler);
  });

  return createElementObject(clusterGroup, extendContext(context, { layerContainer: clusterGroup }));
}

function updateClusterGroup() {
  // Marker cluster options are currently static for this scaffold
}

export const ClusterGroup = createPathComponent<L.MarkerClusterGroup, ClusterGroupProps>(
  createClusterGroup,
  updateClusterGroup
);
