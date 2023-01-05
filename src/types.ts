export interface Project {
  id: string,
  projectName: string,
  imgUrl: string,
  l: number,
  w: number,
}

export interface PassAndUpdateProjects {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export interface Node {
  id: string,
  name: string,
  ipAddress: string,
  x: number,
  y: number,
  z: number,
  networkSsid: string,
  networkColor: string,
}