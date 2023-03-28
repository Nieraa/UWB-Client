import axios from "axios";

const instance = axios.create({
  // baseURL: "https://us-central1-indoor-localization-syst-30486.cloudfunctions.net/api",
  baseURL: "http://127.0.0.1:5001/indoor-localization-syst-30486/us-central1/api",
});

export default instance;