import axios from "../axios";
import { RoomPlan } from "../types";

export async function getRoomPlans(
  projectId: string,
  setRoomPlans: (roomPlans: RoomPlan[]) => void,
  handleGetRoomPlans?: (success: boolean) => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .get(`${userId}/projects/${projectId}/roomPlans`, config)
    .then((response) => {
      setRoomPlans(response.data);
      if (handleGetRoomPlans) {
        handleGetRoomPlans(true);
      }
    })
    .catch(() => {
      if (handleGetRoomPlans) {
        handleGetRoomPlans(false);
      }
    });
}

export async function createRoomPlan(
  projectId: string,
  roomPlanData: {
    name: string,
    image: string,
    xRatio: number,
    yRatio: number,
    xOrigin: number,
    yOrigin: number
  },
  handleCreateRoomPlan: (success: boolean) => void,
  handleClose: () => void
): Promise<string> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  return await axios
    .post(`${userId}/projects/${projectId}/roomPlans`, roomPlanData, config)
    .then((response) => {
      handleClose();
      handleCreateRoomPlan(true);
      return response.data;
    })
    .catch(() => {
      handleCreateRoomPlan(false);
      return "";
    });
}

export async function updateRoomPlan(
  projectId: string,
  roomPlanId: string,
  roomPlanData: {
    name?: string,
    image?: string,
    xRatio?: number,
    yRatio?: number,
    xOrigin?: number,
    yOrigin?: number
  },
  handleUpdateRoomPlan: (success: boolean) => void,
  handleClose: () => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .patch(`${userId}/projects/${projectId}/roomPlans/${roomPlanId}`, roomPlanData, config)
    .then(() => {
      handleClose();
      handleUpdateRoomPlan(true);
    })
    .catch(() => {
      handleUpdateRoomPlan(false);
    });
}

export async function deleteRoomPlan(
  projectId: string,
  roomPlanId: string,
  handleDeleteRoomPlan: (success: boolean) => void
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .delete(`${userId}/projects/${projectId}/roomPlans/${roomPlanId}`, config)
    .then(() => {
      handleDeleteRoomPlan(true);
    })
    .catch(() => {
      handleDeleteRoomPlan(false);
    });
}

export async function getRoomPlanbyId(
  projectId: string,
  roomPlanId: string,
  setCurrentRoomPlan: (currentRoomPlan: RoomPlan) => void,
  handleGetRoomPlanbyId: (success: boolean) => void,
): Promise<void> {
  const userId: string = localStorage.userId;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` }
  }
  await axios
    .get(`${userId}/projects/${projectId}/roomPlans/${roomPlanId}`, config)
    .then((response) => {
      setCurrentRoomPlan(response.data);
      if (handleGetRoomPlanbyId) {
        handleGetRoomPlanbyId(true);
      }
    })
    .catch(() => {
      if (handleGetRoomPlanbyId) {
        handleGetRoomPlanbyId(false);
      }
    });
}