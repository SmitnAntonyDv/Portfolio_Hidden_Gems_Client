import React, { useState } from "react";
import L, { Icon } from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { selectUser } from "../../store/user/selector";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

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
  const User = useSelector(selectUser);
  const [togglePopup, setTogglePopup] = useState(false);
  const [toggleTracking, setToggleTracking] = useState(false);
  const [trackingBtnText, setTrackingBtnText] = useState(false);
  const [updatedLatitude, setUpdatedLatitude] = useState("");
  const [updatedLongitude, setUpdatedLongitude] = useState("");

  // user coords switch block
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
  //User tracker function block
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

  //toggle function
  function toggleUserTracking() {
    setToggleTracking(!toggleTracking);
    setTrackingBtnText(!trackingBtnText);
    console.log(toggleTracking);
  }
  let trackOrNot;
  if (!!trackingBtnText) {
    trackOrNot = "Disable Tracking";
  } else {
    trackOrNot = "Enable Tracking";
  }

  return (
    <div>
      <Button onClick={toggleUserTracking}>{trackOrNot}</Button>
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
