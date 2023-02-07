import AppBar from '../components/appBar/AppBar';
import SideNavbarTypeB from '../components/sideNavbar/SideNavbarTypeB';
import MainTypeC from '../components/main/MainTypeC';
import AnchorCreateForm from '../components/anchor/anchorCreateForm/AnchorCreateForm';
import AnchorUpdateForm from '../components/anchor/anchorUpdateForm/AnchorUpdateForm';
import DeleteDialogTypeC from '../components/deleteDialog/DeleteDialogTypeC';
import { useState } from 'react';
import { Project, RoomPlan, Node, PassAndUpdateAnchors } from '../types';

interface PlannerProps extends PassAndUpdateAnchors {
  isLoading: boolean;
  projectId: string;
  roomPlanId: string;
  projects: Project[];
  currentProject: Project;
  currentRoomPlan: RoomPlan;
  currentAnchor: Node;
  setCurrentAnchor: (currentAnchor: Node) => void;
}

function Planner(props: PlannerProps) {
  const {
    isLoading,
    projectId,
    roomPlanId,
    projects,
    anchors,
    currentProject,
    currentRoomPlan,
    currentAnchor,
    setAnchors,
    setCurrentAnchor
  } = props;

  const [collapseNavbar, setCollapseNavbar] = useState<boolean>(true);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  function handleCollapseNavbar() {
    setCollapseNavbar(!collapseNavbar);
  }

  function handleCloseNavbar() {
    setCollapseNavbar(true);
  }

  return (
    <>
      <AppBar handleCollapseNavbar={handleCollapseNavbar}/>
      <SideNavbarTypeB
        collapseNavbar={collapseNavbar}
        projectId={projectId}
        roomPlanId={roomPlanId}
        projects={projects}
        anchors={anchors}
        setCurrentAnchor={setCurrentAnchor}
        setOpenCreate={setOpenCreate}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
        handleCloseNavbar={handleCloseNavbar}
      />
      <MainTypeC
        isLoading={isLoading}
        projectId={projectId}
        roomPlanId={roomPlanId}
        anchors={anchors}
        currentProject={currentProject}
        currentRoomPlan={currentRoomPlan}
        setOpenCreate={setOpenCreate}
      />
      <AnchorCreateForm
        projectId={projectId}
        roomPlanId={roomPlanId}
        openCreate={openCreate}
        setAnchors={setAnchors}
        setOpenCreate={setOpenCreate}
      />
      <AnchorUpdateForm
        projectId={projectId}
        roomPlanId={roomPlanId}
        currentAnchor={currentAnchor}
        openUpdate={openUpdate}
        setAnchors={setAnchors}
        setOpenUpdate={setOpenUpdate}
      />
      <DeleteDialogTypeC
        projectId={projectId}
        roomPlanId={roomPlanId}
        currentAnchor={currentAnchor}
        openDelete={openDelete}
        setAnchors={setAnchors}
        setOpenDelete={setOpenDelete}
      />
    </>
  );
}

export default Planner;
