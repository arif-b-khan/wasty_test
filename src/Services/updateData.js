import { useMutation } from "react-query";
import * as axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export default function UpdateData(path) {
  const mutation = useMutation((data) => {
    console.log("updating author");
    console.log(JSON.stringify(data));
    return axios.patch(`${baseUrl}${path}/${data.id}`, data);
  });
  //   return {mutation, data, error, loading};
  return mutation;
}
