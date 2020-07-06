import React from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, Icon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function Mymap(props) {
  console.log("WHAT ARE MY PROPS", props);
  const { id, latitude, longitude, adress } = props;
  return (
    //hardcoded ubud lat and long
    <Map center={[-8.506854, 115.262482]} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {props ? (
        <Marker key={id} position={[-8.506854, 115.262482]} />
      ) : (
        <div>Loading map. . .</div>
      )}
      {/* <Marker key={id} /> */}
    </Map>
  );
}
