import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/indoor-localization-syst-30486/us-central1/api",
});

export default instance;