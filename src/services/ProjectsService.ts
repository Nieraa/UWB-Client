import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { Hardware, Project } from "../types";

export function getProjects(
  setProjects: (projects: Project[]) => void,
  createId?: string,
): void {
  axios
    .get("/projects")
    .then((response) => {
      setProjects(response.data);
      if (createId) {
        const navigate = useNavigate();
        navigate(`/${createId}/planner`);
      }
    })
    .catch(() => {
    });
}

export function createProject(
  projectData: {
    projectName: string,
    imgUrl: string,
    l: number,
    w: number,
  },
  setProjects: (projects: Project[]) => void,
): void {
  axios
    .post("/projects", projectData)
    .then((response) => {
      getProjects(setProjects, response.data.id);
    })
    .catch(() => {
      alert("Create failed");
    })
}

export function getHardwares(
  projectId: string,
  hardwareType: string,
  setHardwares: (hardware: Hardware[]) => void,
  hasNewColor: boolean,
  setColors?: (colors: string[]) => void,
  setGroup?: (group: number) => void,
  setNetworkSsids?: (networkSsids: string[]) => void
): void {
  axios
    .get(`/projects/${projectId}/${hardwareType}s`)
    .then((response) => {
      setHardwares(response.data);
      if (hasNewColor && setColors && setGroup && setNetworkSsids) {
        getColors(projectId, setColors, setGroup);
        getNetworkSsids(projectId, setNetworkSsids);
      }
    })
    .catch(() => {
    });
}

export function createHardware(
  projectId: string,
  hardwareType: string,
  setHardwares: (hardware: Hardware[]) => void,
  hardwareData: {
    projectId: string,
    name: string,
    ipAddress: string,
    x: number,
    y: number,
    networkSsid: string,
    networkColor: string,
  },
  hasNewColor: boolean,
  setColors: (colors: string[]) => void,
  setGroup: (group: number) => void,
  setNetworkSsids: (networkSsids: string[]) => void,
  handleCloseDialog: () => void
): void {
  axios
    .post(`/projects/${projectId}/${hardwareType}s`, hardwareData)
    .then(() => {
      getHardwares(
        projectId,
        hardwareType,
        setHardwares,
        hasNewColor,
        setColors,
        setGroup,
        setNetworkSsids
      );
      handleCloseDialog()
    })
    .catch(() => {
      alert("Create failed");
    });
}

export function getColors(
  projectId: string,
  setColors: (colors: string[]) => void,
  setGroup: (group: number) => void
): void {
  axios
    .get(`/projects/${projectId}/colors`)
    .then((response) => {
      setColors(response.data);
      setGroup(response.data.length + 1);
    })
    .catch(() => {
    })
}

export function getNetworkSsids(
  projectId: string,
  setNetworkSsids: (networkSsids: string[]) => void,
): void {
  axios
    .get(`/projects/${projectId}/networkSsids`)
    .then((response) => {
      setNetworkSsids(response.data);
    })
    .catch(() => {
    })
}