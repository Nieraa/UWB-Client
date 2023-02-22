import axios from "../axios";
import { NavigateFunction } from "react-router-dom";
import { Project, Node } from "../types";

export async function getProjects(
  setProjects: (projects: Project[]) => void,
  handleGetProjects: (success: boolean) => void
): Promise<void> {
  const userId: string = localStorage.userId;
  await axios
    .get(`${userId}/projects`)
    .then((response) => {
      setProjects(response.data);
      handleGetProjects(true);
    })
    .catch(() => {
      handleGetProjects(false);
    });
}

export async function createProject(
  projectData: {
    name: string
  },
  setProjects: (projects: Project[]) => void,
  navigate: NavigateFunction
): Promise<void> {
  await axios
    .post("/projects", projectData)
    .then((response) => {
      getProjects(setProjects, response.data, navigate);
    })
    .catch(() => {
      alert("Create Project failed");
    });
}

export async function updateProject(
  projectId: string,
  projectData: {
    name: string
  },
  setProjects: (projects: Project[]) => void,
  setOpenUpdate: (openUpdate: boolean) => void
): Promise<void> {
  await axios
    .patch(`/projects/${projectId}`, projectData)
    .then(() => {
      getProjects(setProjects);
      setOpenUpdate(false);
    })
    .catch(() => {
      alert("Update Project failed");
    });
}

export async function deleteProject(
  projectId: string,
  setProjects: (projects: Project[]) => void,
  setOpenDelete: (openDelete: boolean) => void
): Promise<void> {
  await axios
    .delete(`/projects/${projectId}`)
    .then(() => {
      getProjects(setProjects);
      setOpenDelete(false);
    })
    .catch(() => {
      alert("Delete Project failed");
    });
}

export async function getProjectbyId(
  projectId: string,
  setCurrentProject: (currentProject: Project) => void
): Promise<void> {
  await axios
    .get(`/projects/${projectId}`)
    .then((response) => {
      setCurrentProject(response.data);
    })
    .catch(() => {
      alert("Get Project failed");
    });
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