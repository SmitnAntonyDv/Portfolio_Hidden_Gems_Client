import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchPost } from "../store/detailpage/actions";
import { selectPost } from "../store/detailpage/selectors";
import WeatherInfo from "../components/weatherInfo/WeatherInfo";
import LeafletMap from "../components/leafletMap";
import Mymap from "../components/leafletMap";

export default function DetailsPage() {
  const postData = useSelector(selectPost);
  const dispatch = useDispatch();
  const { postId } = useParams();
  const {
    adress,
    imageUrl,
    latitude,
    longitude,
    title,
    description,
    userId,
  } = postData;

  useEffect(() => {
    dispatch(FetchPost(postId));
  }, []);
  console.log("WHAT IS POST DATA?", postData);
  return (
    <div>
      <h2>{title}</h2>
      <img src={imageUrl} alt='' />
      <p>{description}</p>
      <p>{adress}</p>
      <Mymap
        latitude={latitude}
        longitude={longitude}
        adress={adress}
        id={postData.id}
      />
      <WeatherInfo latitude={latitude} longitude={longitude} />
    </div>
  );
}
