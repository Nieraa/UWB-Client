import axios from "../axios";
import { Anchor } from "../types";

export async function getAnchors(
  projectId: string,
  roomPlanId: string,
  setAnchors: (anchors: Anchor[]) => void,
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
  handleCreateAnchor: (success: boolean) => void,
  handleClose: () => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .post(`${userId}/projects/${projectId}/roomPlans/${roomPlanId}/anchors`, anchorData, config)
    .then(() => {
      handleClose();
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
  handleUpdateAnchor?: (success: boolean) => void,
  handleClose?: () => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .patch(`${userId}/projects/${projectId}/roomPlans/${roomPlanId}/anchors/${anchorId}`, anchorData, config)
    .then(() => {
      if (handleUpdateAnchor && handleClose) {
        handleClose();
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
  handleDeleteAnchor: (success: boolean) => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .delete(`${userId}/projects/${projectId}/roomPlans/${roomPlanId}/anchors/${anchorId}`, config)
    .then(() => {
      handleDeleteAnchor(true);
    })
    .catch(() => {
      handleDeleteAnchor(false);
    });
}