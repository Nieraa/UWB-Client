export interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
}

export interface PassAndUpdateAnchors {
  anchors: Node[];
  setAnchors: (anchors: Node[]) => void;
}

export interface RoomPlan {
  id: string;
  name: string;
  image: string;
  xRatio: number;
  yRatio: number;
  xOrigin: number;
  yOrigin: number;
  anchors?: Node[];
}

export interface PassAndUpdateRoomPlans {
  roomPlans: RoomPlan[];
  setRoomPlans: (roomPlans: RoomPlan[]) => void;
}

export interface Project {
  id: string;
  name: string,
  roomPlans?: RoomPlan[];
}

export interface PassAndUpdateProjects {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}