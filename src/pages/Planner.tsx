import AppBar from '../components/appBar/AppBar';
import SideNavbarTypeB from '../components/sideNavbar/SideNavbarTypeB';
import MainTypeC from '../components/main/MainTypeC';
import AnchorCreateForm from '../components/anchor/anchorCreateForm/AnchorCreateForm';
import AnchorUpdateForm from '../components/anchor/anchorUpdateForm/AnchorUpdateForm';
import DeleteDialogTypeC from '../components/deleteDialog/DeleteDialogTypeC';
import { useCallback, useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Project, RoomPlan, Node, PassAndUpdateAnchors } from '../types';

interface PlannerProps extends PassAndUpdateAnchors {
  projectId: string;
  roomPlanId: string;
  projects: Project[];
  currentProject: Project;
  currentRoomPlan: RoomPlan;
  currentAnchor: Node;
  setCurrentAnchor: (currentAnchor: Node) => void;
  setParams: (params: Readonly<Params<string>>) => void;
}

function Planner(props: PlannerProps) {
  const {
    projectId,
    roomPlanId,
    projects,
    anchors,
    currentProject,
    currentRoomPlan,
    currentAnchor,
    setAnchors,
    setCurrentAnchor,
    setParams
  } = props;

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const params: Readonly<Params<string>> = useParams();

  const SetNewParams = useCallback(() => {
    setParams(params);
  }, [params, setParams])

  useEffect(() => {
    SetNewParams();
  }, [params.roomPlanId, SetNewParams])

  return (
    <div>
      <AppBar />
      <SideNavbarTypeB
        projectId={projectId}
        roomPlanId={roomPlanId}
        projects={projects}
        anchors={anchors}
        setCurrentAnchor={setCurrentAnchor}
        setOpenCreate={setOpenCreate}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
      />
      <MainTypeC
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
    </div>
  );
}

export default Planner;
