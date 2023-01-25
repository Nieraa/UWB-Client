import AppBar from "../components/appBar/AppBar";
import SideNavbarTypeA from "../components/sideNavbar/SideNavbarTypeA";
import MainTypeB from "../components/main/MainTypeB";
import RoomPlanCreateForm from "../components/roomPlan/roomPlanCreateForm/RoomPlanCreateForm";
import RoomPlanUpdateForm from "../components/roomPlan/roomPlanUpdateForm/RoomPlanUpdateForm";
import DeleteDialogTypeB from "../components/deleteDialog/DeleteDialogTypeB";
import { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { RoomPlan, Project, PassAndUpdateRoomPlans } from "../types";

interface RoomPlanProps extends PassAndUpdateRoomPlans {
  projectId: string;
  projects: Project[];
  currentProject: Project;
  currentRoomPlan: RoomPlan;
  setCurrentRoomPlan: (currentRoomPlan: RoomPlan) => void;
  setParams: (params: Readonly<Params<string>>) => void;
}

function RoomPlans(props: RoomPlanProps) {
  const {
    projectId,
    projects,
    roomPlans,
    currentProject,
    currentRoomPlan,
    setRoomPlans,
    setCurrentRoomPlan,
    setParams
  } = props;

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const params: Readonly<Params<string>> = useParams()

  useEffect(() => {
    setParams(params);
  }, [params.projectId]);

  return (
    <div>
      <AppBar />
      <SideNavbarTypeA
        projects={projects}
        projectId={projectId}
      />
      <MainTypeB
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