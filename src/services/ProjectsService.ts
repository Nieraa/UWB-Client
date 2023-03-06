import axios from "../axios";
import { Project } from "../types";

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
  handleCreateProject: (success: boolean) => void,
  handleClose: () => void
): Promise<string> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  return await axios
    .post(`${userId}/projects`, projectData, config)
    .then((response) => {
      handleClose();
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
  handleUpdateProject: (success: boolean) => void,
  handleClose: () => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .patch(`${userId}/projects/${projectId}`, projectData, config)
    .then(() => {
      handleClose();
      handleUpdateProject(true);
    })
    .catch(() => {
      handleUpdateProject(false);
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
  setCurrentProject: (currentProject: Project) => void,
  handleGetProjectbyId: (success: boolean) => void,
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .get(`${userId}/projects/${projectId}`, config)
    .then((response) => {
      setCurrentProject(response.data);
      if (handleGetProjectbyId) {
        handleGetProjectbyId(true);
      }
    })
    .catch(() => {
      if (handleGetProjectbyId) {
        handleGetProjectbyId(false);
      }
    });
}