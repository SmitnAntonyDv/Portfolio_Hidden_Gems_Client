import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchPost } from "../store/detailpage/actions";
import { selectPost } from "../store/detailpage/selectors";

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
  return (
    <div>
      <h2>{title}</h2>
      <img src={imageUrl} alt='' />
      <p>{description}</p>
    </div>
  );
}
