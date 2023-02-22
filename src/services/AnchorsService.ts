import axios from "../axios";
import { Node } from "../types";

export async function getAnchors(
  projectId: string,
  roomPlanId: string,
  setAnchors: (anchors: Node[]) => void,
  handleGetAnchors?: (success: boolean) => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .get(`${userId}/projects/${projectId}/roomPlans/${roomPlanId}/anchors`, config)
    .then((response) => {
      setAnchors(response.data);
      if (handleGetAnchors) {
        handleGetAnchors(true);
      }
    })
    .catch(() => {
      if (handleGetAnchors) {
        handleGetAnchors(false);
      }
    });
}

export async function createAnchor(
  projectId: string,
  roomPlanId: string,
  anchorData: {
    name: string,
    x: number,
    y: number,
    z: number
  },
  handleCreateAnchor: (success: boolean) => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .post(`${userId}/projects/${projectId}/roomPlans/${roomPlanId}/anchors`, anchorData, config)
    .then(() => {
      handleCreateAnchor(true);
    })
    .catch(() => {
      handleCreateAnchor(false);
    });
}

export async function updateAnchor(
  projectId: string,
  roomPlanId: string,
  anchorId: string,
  anchorData: {
    name?: string,
    x?: number,
    y?: number,
    z?: number
  },
  handleUpdateAnchor?: (success: boolean) => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .patch(`${userId}/projects/${projectId}/roomPlans/${roomPlanId}/anchors/${anchorId}`, anchorData, config)
    .then(() => {
      if (handleUpdateAnchor) {
        handleUpdateAnchor(true);
      }
      
    })
    .catch(() => {
      if (handleUpdateAnchor) {
        handleUpdateAnchor(false);
      }
      
    });
}

export async function deleteAnchor(
  projectId: string,
  roomPlanId: string,
  anchorId: string,
  setAnchors: (anchors: Node[]) => void,
  setOpenDelete: (openDelete: boolean) => void
): Promise<void> {
  await axios
    .delete(`/projects/${projectId}/roomPlans/${roomPlanId}/anchors/${anchorId}`)
    .then(() => {
      getAnchors(projectId, roomPlanId, setAnchors);
      setOpenDelete(false);
    })
    .catch(() => {
      alert("Delete Anchor failed");
    });
}