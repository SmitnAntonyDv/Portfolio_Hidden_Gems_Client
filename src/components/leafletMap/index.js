import React from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, Icon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Mymap(props) {
  console.log("WHAT ARE MY PROPS", props);
  return (
    //hardcoded ubud lat and long
    <Map center={[-8.506854, 115.262482]} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </Map>
  );
}
