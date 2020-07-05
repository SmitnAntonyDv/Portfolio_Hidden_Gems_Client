import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../store/user/selector";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [adress, setAdress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitutde, setLongitutde] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { token, id } = user;

  console.log(user);

  return (
    <div>
      <p>Post your gem!</p>
      <p>p tag</p>
    </div>
  );
}
