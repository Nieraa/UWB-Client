import axios from "../axios";
import { Node } from "../types";

export async function getAnchors(
  projectId: string,
  roomPlanId: string,
  setAnchors: (anchors: Node[]) => void
): Promise<void> {
  await axios
    .get(`/projects/${projectId}/roomPlans/${roomPlanId}/anchors`)
    .then((response) => {
      setAnchors(response.data);
    })
    .catch(() => {
      alert("Get Anchors failed");
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
  setAnchors: (anchors: Node[]) => void,
  setOpenCreate: (openCreate: boolean) => void
): Promise<void> {
  await axios
    .post(`/projects/${projectId}/roomPlans/${roomPlanId}/anchors`, anchorData)
    .then(() => {
      getAnchors(projectId, roomPlanId, setAnchors);
      setOpenCreate(false);
    })
    .catch(() => {
      alert("Create Anchor failed");
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
  setAnchors?: (anchors: Node[]) => void,
  setOpenUpdate?: (openUpdate: boolean) => void
): Promise<void> {
  await axios
    .patch(`/projects/${projectId}/roomPlans/${roomPlanId}/anchors/${anchorId}`, anchorData)
    .then(() => {
      if (setAnchors) {
        getAnchors(projectId, roomPlanId, setAnchors);
      }
      if (setOpenUpdate) {
        setOpenUpdate(false);
      }
    })
    .catch(() => {
      alert("Update Anchor failed");
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