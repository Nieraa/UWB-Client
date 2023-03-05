export interface Anchor {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
}

export interface Tag {
  name: string;
  x: number;
  y: number;
  z: number;
}

export interface PassAndUpdateAnchors {
  anchors: Anchor[];
  setAnchors: (anchors: Anchor[]) => void;
}

export interface RoomPlan {
  id: string;
  name: string;
  image: string;
  xRatio: number;
  yRatio: number;
  xOrigin: number;
  yOrigin: number;
  anchors?: Anchor[];
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

export interface SignInData {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  hashedPassword: string;
}

export interface Username {
  username: string
}

export interface ProjectsProps extends PassAndUpdateProjects, SetOpenBackdropProps {
  isLoading: boolean;
  currentProject: Project;
  setCurrentProject: (currentProject: Project) => void;
}

export interface RoomPlansProps extends PassAndUpdateRoomPlans, SetOpenBackdropProps {
  isLoading: boolean;
  projectId: string;
  projects: Project[];
  currentProject: Project;
  currentRoomPlan: RoomPlan;
  setCurrentRoomPlan: (currentRoomPlan: RoomPlan) => void;
}

export interface PlannerProps extends PassAndUpdateAnchors, SetOpenBackdropProps {
  isLoading: boolean;
  projectId: string;
  roomPlanId: string;
  projects: Project[];
  currentProject: Project;
  currentRoomPlan: RoomPlan;
  currentAnchor: Anchor;
  setCurrentAnchor: (currentAnchor: Anchor) => void;
}

export interface RealtimeProps {
  isLoading: boolean;
  projectId: string;
  roomPlanId: string;
  projects: Project[];
  anchors: Anchor[];
  currentProject: Project;
  currentRoomPlan: RoomPlan;
}

export interface CollapseNavbarProps {
  handleCollapseNavbar: () => void;
}

export interface SideNavbarTypeAProps {
  collapseNavbar: boolean;
  projectId: string;
  projects: Project[];
  handleCloseNavbar: () => void;
}

export interface SideNavbarTypeBProps {
  collapseNavbar: boolean;
  projectId: string;
  roomPlanId: string;
  projects: Project[];
  anchors: Anchor[];
  setCurrentAnchor: (anchor: Anchor) => void;
  setOpenCreate: (openCreate: boolean) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
  handleCloseNavbar: () => void;
}

export interface SideNavbarTypeCProps {
  collapseNavbar: boolean;
  projectId: string;
  roomPlanId: string;
  projects: Project[];
  anchors: Anchor[];
  tags: Tag[];
  handleCloseNavbar: () => void;
}

export interface LogoProps {
  theme: string;
  size: string;
}

export interface InteractiveDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  signOut: () => void;
}

export interface ResponseDialogProps {
  open: boolean;
  success: boolean;
  title: string;
  detail: string;
  handleClose: () => void;
}

interface DeleteDialog {
  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;
}

export interface DeleteDialogTypeAProps extends DeleteDialog, SetOpenBackdropProps {
  currentProject: Project;
  handleDeleteProject: (success: boolean) => void;
}

export interface DeleteDialogTypeBProps extends DeleteDialog, SetOpenBackdropProps {
  projectId: string;
  currentRoomPlan: RoomPlan;
  handleDeleteRoomPlan: (success: boolean) => void;
}

export interface DeleteDialogTypeCProps extends DeleteDialog, SetOpenBackdropProps {
  projectId: string;
  roomPlanId: string;
  currentAnchor: Anchor;
  handleDeleteAnchor: (success: boolean) => void;
}

interface Main {
  isLoading: boolean;
  setOpenCreate: (openCreate: boolean) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

export interface MainTypeAProps extends Main {
  projects: Project[];
  setCurrentProject: (currentProject: Project) => void;
}

export interface MainTypeBProps extends Main {
  projectId: string;
  roomPlans: RoomPlan[];
  currentProject: Project;
  setCurrentRoomPlan: (currentRoomPlan: RoomPlan) => void;
}

export interface MainTypeCProps {
  isPlanner: boolean;
  isLoading: boolean;
  projectId: string;
  roomPlanId: string;
  anchors: Anchor[];
  tags?: Tag[];
  currentProject: Project;
  currentRoomPlan: RoomPlan;
  setOpenCreate?: (openCreate: boolean) => void;
}

export interface ProjectCreateFormProps extends SetOpenBackdropProps {
  openCreate: boolean;
  setOpenCreate: (openCreate: boolean) => void;
  setNavigateUrl: (navigateUrl: string) => void;
  handleCreateProject: (success: boolean) => void;
}

export interface ProjectListProps {
  isLoading: boolean;
  projects: Project[];
  setCurrentProject: (currentProject: Project) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

export interface ProjectUpdateFormProps extends SetOpenBackdropProps {
  currentProject: Project;
  openUpdate: boolean;
  setOpenUpdate: (openUpdate: boolean) => void;
  handleUpdateProject: (success: boolean) => void;
}

export interface RoomPlanCreateFormProps extends SetOpenBackdropProps {
  projectId: string;
  openCreate: boolean;
  setNavigateUrl: (navigateUrl: string) => void;
  setRoomPlans: (roomPlans: RoomPlan[]) => void;
  setOpenCreate: (openCreate: boolean) => void;
  handleCreateRoomPlan: (succcess: boolean) => void;
}

export interface RoomPlanListProps {
  isLoading: boolean;
  projectId: string;
  roomPlans: RoomPlan[];
  setCurrentRoomPlan: (currentRoomPlan: RoomPlan) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

export interface RoomPlanUpdateFormProps extends SetOpenBackdropProps {
  projectId: string;
  currentRoomPlan: RoomPlan;
  openUpdate: boolean;
  setOpenUpdate: (openUpdate: boolean) => void;
  handleUpdateRoomPlan: (success: boolean) => void;
}

export interface AnchorCreateFormProps extends SetOpenBackdropProps {
  projectId: string;
  roomPlanId: string;
  openCreate: boolean;
  setOpenCreate: (openCreate: boolean) => void;
  handleCreateAnchor: (success: boolean) => void;
}

export interface AnchorNodeProps {
  isPlanner: boolean;
  projectId: string;
  roomPlanId: string;
  xOrigin: number;
  yOrigin: number;
  anchor: Anchor;
  scale: number;
  setPannable: (pannable: boolean) => void;
  setCursor: (cursor: string) => void;
}

export interface TagNodeProps {
  xOrigin: number;
  yOrigin: number;
  tag: Tag;
  scale: number;
}

export interface AnchorUpdateFormProps extends SetOpenBackdropProps {
  projectId: string,
  roomPlanId: string,
  currentAnchor: Anchor;
  openUpdate: boolean;
  setOpenUpdate: (openUpdate: boolean) => void;
  handleUpdateAnchor: (success: boolean) => void
}

export interface CanvasProps {
  isPlanner: boolean;
  projectId: string;
  roomPlanId: string;
  currentRoomPlan: RoomPlan;
  anchors: Anchor[];
  tags?: Tag[];
}

export interface SetOpenBackdropProps {
  setOpenBackdrop: (openBackdrop: boolean) => void;
}

export interface SignUpFormProps extends SetOpenBackdropProps {
  handleSignUp: (success: boolean) => void;
}