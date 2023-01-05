import { NavigateFunction } from "react-router-dom";
import axios from "../axios";
import { Node, Project } from "../types";

export function getProjects(
  setProjects: (projects: Project[]) => void,
  createId?: string,
  navigate?: NavigateFunction
): void {
  axios
    .get("/projects")
    .then((response) => {
      setProjects(response.data);
      if (createId && navigate) {
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
  navigate: NavigateFunction
): void {
  axios
    .post("/projects", projectData)
    .then((response) => {
      getProjects(setProjects, response.data.id, navigate);
    })
    .catch(() => {
      alert("Create failed");
    })
}

export function updateProject(
  projectId: string,
  projectData: {
    projectName: string,
    imgUrl: string,
    l: number,
    w: number,
  },
  setProjects: (projects: Project[]) => void,
  handleClose: () => void
): void {
  axios
    .patch(`/projects/${projectId}`, projectData)
    .then(() => {
      getProjects(setProjects);
      handleClose();
    })
    .catch(() => {
      alert("Update failed");
    })
}

export function deleteProject(
  projectId: string,
  setProjects: (projects: Project[]) => void,
  setOpenDelete: (openDelete: boolean) => void
): void {
  axios
    .delete(`/projects/${projectId}`)
    .then(() => {
      getProjects(setProjects);
      setOpenDelete(false);
    })
    .catch(() => {
      alert("Delete failed");
    })
}

export function getNodes(
  projectId: string,
  nodeType: string,
  setNodes: (node: Node[]) => void,
  hasNewColor: boolean,
  setColors?: (colors: string[]) => void,
  setGroup?: (group: number) => void,
  setNetworkSsids?: (networkSsids: string[]) => void
): void {
  axios
    .get(`/projects/${projectId}/${nodeType}s`)
    .then((response) => {
      setNodes(response.data);
      if (hasNewColor && setColors && setGroup && setNetworkSsids) {
        getColors(projectId, setColors, setGroup);
        getNetworkSsids(projectId, setNetworkSsids);
      }
    })
    .catch(() => {
    });
}

export function createNode(
  projectId: string,
  nodeType: string,
  setNodes: (node: Node[]) => void,
  nodeData: {
    name: string,
    ipAddress: string,
    x: number,
    y: number,
    networkSsid: string,
    networkColor: string
  },
  hasNewColor: boolean,
  setColors: (colors: string[]) => void,
  setGroup: (group: number) => void,
  setNetworkSsids: (networkSsids: string[]) => void,
  handleCloseDialog: () => void
): void {
  axios
    .post(`/projects/${projectId}/${nodeType}s`, nodeData)
    .then(() => {
      getNodes(
        projectId,
        nodeType,
        setNodes,
        hasNewColor,
        setColors,
        setGroup,
        setNetworkSsids
      );
      handleCloseDialog();
    })
    .catch(() => {
      alert("Create failed");
    });
}

export function deleteNode(
  projectId: string,
  nodeId: string,
  nodeType: string,
  setNodes: (node: Node[]) => void,
  setOpenDelete: (openDelete: boolean) => void,
  hasNewColor: boolean,
  setColors?: (colors: string[]) => void,
  setGroup?: (group: number) => void,
  setNetworkSsids?: (networkSsids: string[]) => void
): void {
  axios
    .delete(`/projects/${projectId}/${nodeType}s/${nodeId}`)
    .then(() => {
      getNodes(
        projectId,
        nodeType,
        setNodes,
        hasNewColor,
        setColors,
        setGroup,
        setNetworkSsids
      );
      setOpenDelete(false);
    })
    .catch(() => {
      alert("Delete failed");
    })
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
  setNetworkSsids: (networkSsids: string[]) => void
): void {
  axios
    .get(`/projects/${projectId}/networkSsids`)
    .then((response) => {
      setNetworkSsids(response.data);
    })
    .catch(() => {
    })
}