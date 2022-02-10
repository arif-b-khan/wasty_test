import { useMutation } from "react-query";
import * as axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export default function PostData(path) {
  const mutation = useMutation((data) => {
    console.log("saving author");
    return axios.post(`${baseUrl}${path}`, data);
  });
  //   return {mutation, data, error, loading};
  return mutation;
}
