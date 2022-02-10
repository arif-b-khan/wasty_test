import { useMutation } from "react-query";
import * as axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export default function DeleteData(path) {
  const mutation = useMutation(id => {
    return axios.delete(`${baseUrl}${path}/${id}`);
  });
  return mutation;
}
