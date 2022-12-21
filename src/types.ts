export interface Project {
  id: string,
  projectName: string,
  imgUrl?: string,
}

export interface PassAndUpdateProjects {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}