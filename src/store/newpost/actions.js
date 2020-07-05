import axios from "axios";

export function newPost(
  title,
  description,
  imageUrl,
  adress,
  token,
  id,
  countryId
) {
  return async () => {
    console.log("working");
    try {
      const res = await axios.post();
    } catch (e) {
      console.log(e);
    }
  };
}
