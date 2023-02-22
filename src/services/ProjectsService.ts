import axios from "../axios";
import { NavigateFunction } from "react-router-dom";
import { Project, Node } from "../types";

export async function getProjects(
  setProjects: (projects: Project[]) => void,
  handleGetProjects?: (success: boolean) => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .get(`${userId}/projects`, config)
    .then((response) => {
      setProjects(response.data);
      if (handleGetProjects) {
        handleGetProjects(true);
      }
    })
    .catch(() => {
      if (handleGetProjects) {
        handleGetProjects(false);
      }
    });
}

export async function createProject(
  projectData: {
    name: string
  },
  handleCreateProject: (success: boolean) => void
): Promise<string> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }

  }
  return await axios
    .post(`${userId}/projects`, projectData, config)
    .then((response) => {
      handleCreateProject(true);
      return response.data;
    })
    .catch(() => {
      handleCreateProject(false);
      return "";
    });
}

export async function updateProject(
  projectId: string,
  projectData: {
    name: string
  },
  handleUpdateProject: (success: boolean) => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .patch(`${userId}/projects/${projectId}`, projectData, config)
    .then(() => {
      handleUpdateProject(true);
    })
    .catch(() => {
      handleUpdateProject(true);
    });
}

export async function deleteProject(
  projectId: string,
  handleDeleteProject: (success: boolean) => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .delete(`${userId}/projects/${projectId}`, config)
    .then(() => {
      handleDeleteProject(true);
    })
    .catch(() => {
      handleDeleteProject(false);
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