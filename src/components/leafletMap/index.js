import React, { useState } from "react";
import L, { Icon } from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const backpackIcon = new Icon({
  iconUrl: "https://static.thenounproject.com/png/876233-200.png",
  iconSize: [25, 25],
});

export default function Mymap(props) {
  console.log("WHAT ARE MY PROPS", props);
  const { id, latitude, longitude, adress } = props;
  const [togglePopup, setTogglePopup] = useState(false);

  return (
    //hardcoded ubud lat and long
    <div>
      {props.id ? (
        <Map center={[latitude, longitude]} zoom={12}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker
            key={id}
            position={[latitude, longitude]}
            onclick={() => setTogglePopup(!togglePopup)}
            icon={backpackIcon}
          />
          {togglePopup ? (
            <Popup position={[latitude, longitude]}>
              {" "}
              <p>{adress}</p>
            </Popup>
          ) : (
            []
          )}
        </Map>
      ) : (
        <div>Loading map . . .</div>
      )}
    </div>
  );
}
