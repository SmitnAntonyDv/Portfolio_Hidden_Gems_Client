import React, { useState } from "react";
import L, { Icon } from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { selectUser } from "../../store/user/selector";
import { useSelector } from "react-redux";

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
  const User = useSelector(selectUser);
  const [updatedLatitude, setUpdatedLatitude] = useState("");
  const [updatedLongitude, setUpdatedLongitude] = useState("");

  let userLocation;
  if (!!User.latitude && User.longitude) {
    userLocation = {
      lat: Number(User.latitude),
      lon: Number(User.longitude),
    };
  } else {
    userLocation = {
      lat: Number(updatedLatitude),
      lon: Number(updatedLongitude),
    };
  }
  console.log("Have user STORED VALUE?", userLocation);
  function updateLocation(pos) {
    const coords = pos.coords;
    setUpdatedLatitude(coords.latitude);
    setUpdatedLongitude(coords.longitude);
  }

  function watchUserLocation() {
    return navigator.geolocation.watchPosition(updateLocation, error, options);
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const options = { enableHighAccuracy: true };
  watchUserLocation();
  //hardcoded Data
  console.log("MOVING LAT", userLocation.lat);
  console.log("MOVING LON", userLocation.lon);
  return (
    <div>
      <button>testing location change!</button>
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
          {User.id || updatedLatitude ? (
            <Marker
              key={User.id}
              position={[userLocation.lat, userLocation.lon]}
              icon={backpackIcon}
            />
          ) : (
            <></>
          )}
        </Map>
      ) : (
        <div>Loading map . . .</div>
      )}
    </div>
  );
}
