import axios from "axios";
import { url } from "../globals/BaseUrl";

const AxiosUtility = axios.create({
  baseURL: `${url}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosUtility;
