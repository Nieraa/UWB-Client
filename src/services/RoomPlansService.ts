import axios from "../axios";
import { NavigateFunction } from "react-router-dom";
import { RoomPlan } from "../types";

export async function getRoomPlans(
  projectId: string,
  setRoomPlans: (roomPlans: RoomPlan[]) => void,
  createId?: string,
  navigate?: NavigateFunction
): Promise<void> {
  await axios
    .get(`/projects/${projectId}/roomPlans`)
    .then((response) => {
      setRoomPlans(response.data);
      if (createId && navigate) {
        navigate(`/projects/${projectId}/room-plans/${createId}/planner`);
      }
    })
    .catch(() => {
      alert("Get Room plans failed");
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
  setRoomPlans: (roomPlans: RoomPlan[]) => void,
  navigate: NavigateFunction
): Promise<void> {
  await axios
    .post(`/projects/${projectId}/roomPlans`, roomPlanData)
    .then((response) => {
      getRoomPlans(projectId, setRoomPlans, response.data, navigate);
    })
    .catch(() => {
      alert("Create Room plan failed");
    });
}

export async function updateRoomPlan(
  projectId: string,
  roomPlanId: string,
  roomPlanData: {
    name?: string,
    image?: File,
    xRatio?: number,
    yRatio?: number,
    xOrigin?: number,
    yOrigin?: number
  },
  setRoomPlans: (roomPlans: RoomPlan[]) => void,
  setOpenUpdate: (openUpdate: boolean) => void
): Promise<void> {
  await axios
    .patch(`/projects/${projectId}/roomPlans/${roomPlanId}`, roomPlanData)
    .then(() => {
      getRoomPlans(projectId, setRoomPlans);
      setOpenUpdate(false);
    })
    .catch(() => {
      alert("Update Room plan failed");
    });
}

export async function deleteRoomPlan(
  projectId: string,
  roomPlanId: string,
  setRoomPlans: (roomPlans: RoomPlan[]) => void,
  setOpenDelete: (openDelete: boolean) => void
): Promise<void> {
  await axios
    .delete(`/projects/${projectId}/roomPlans/${roomPlanId}`)
    .then(() => {
      getRoomPlans(projectId, setRoomPlans);
      setOpenDelete(false);
    })
    .catch(() => {
      alert("Delete Room plan failed");
    });
}

export async function getRoomPlanbyId(
  projectId: string,
  roomPlanId: string,
  setCurrentRoomPlan: (currentRoomPlan: RoomPlan) => void
): Promise<void> {
  await axios
    .get(`/projects/${projectId}/roomPlans/${roomPlanId}`)
    .then((response) => {
      setCurrentRoomPlan(response.data);
    })
    .catch(() => {
      alert("Get Room plan failed");
    });
}