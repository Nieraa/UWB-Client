import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-indoor-localization-syst-30486.cloudfunctions.net/api",
});

export default instance;