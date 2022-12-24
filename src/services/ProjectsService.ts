import axios from "../axios";
import { Project } from "../types";

export function getProjects(setProjects: (projects: Project[]) => void) {
  axios
    .get(`/projects`)
    .then((response) => {
      console.log(response.data);
      setProjects(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}