import AppBar from "../components/appBar/AppBar";
import SideNavbarTypeA from "../components/sideNavbar/SideNavbarTypeA";
import MainTypeB from "../components/main/MainTypeB";
import RoomPlanCreateForm from "../components/roomPlan/roomPlanCreateForm/RoomPlanCreateForm";
import RoomPlanUpdateForm from "../components/roomPlan/roomPlanUpdateForm/RoomPlanUpdateForm";
import DeleteDialogTypeB from "../components/deleteDialog/DeleteDialogTypeB";
import { useState } from "react";
import { RoomPlan, Project, PassAndUpdateRoomPlans } from "../types";

interface RoomPlanProps extends PassAndUpdateRoomPlans {
  isLoading: boolean;
  projectId: string;
  projects: Project[];
  currentProject: Project;
  currentRoomPlan: RoomPlan;
  setCurrentRoomPlan: (currentRoomPlan: RoomPlan) => void;
}

function RoomPlans(props: RoomPlanProps) {
  const {
    isLoading,
    projectId,
    projects,
    roomPlans,
    currentProject,
    currentRoomPlan,
    setRoomPlans,
    setCurrentRoomPlan
  } = props;

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  return (
    <div>
      <AppBar />
      <SideNavbarTypeA
        projects={projects}
        projectId={projectId}
      />
      <MainTypeB
        isLoading={isLoading}
        projectId={projectId}
        roomPlans={roomPlans}
        currentProject={currentProject}
        setCurrentRoomPlan={setCurrentRoomPlan}
        setOpenCreate={setOpenCreate}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
      />
      <RoomPlanCreateForm
        projectId={projectId}
        openCreate={openCreate}
        setRoomPlans={setRoomPlans}
        setOpenCreate={setOpenCreate}
      />
      <RoomPlanUpdateForm
        projectId={projectId}
        currentRoomPlan={currentRoomPlan}
        openUpdate={openUpdate}
        setRoomPlans={setRoomPlans}
        setOpenUpdate={setOpenUpdate}
      />
      <DeleteDialogTypeB
        projectId={projectId}
        currentRoomPlan={currentRoomPlan}
        openDelete={openDelete}
        setRoomPlans={setRoomPlans}
        setOpenDelete={setOpenDelete}
      />
    </div>
  );
}

export default RoomPlans;