import AppBar from "../components/appBar/AppBar";
import SideNavbarTypeA from "../components/sideNavbar/SideNavbarTypeA";
import MainTypeB from "../components/main/MainTypeB";
import RoomPlanCreateForm from "../components/roomPlan/roomPlanCreateForm/RoomPlanCreateForm";
import RoomPlanUpdateForm from "../components/roomPlan/roomPlanUpdateForm/RoomPlanUpdateForm";
import DeleteDialogTypeB from "../components/deleteDialog/DeleteDialogTypeB";
import ResponseDialog from "../components/responseDialog/ResponseDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoomPlan, Project, PassAndUpdateRoomPlans } from "../types";
import { getRoomPlans } from "../services/RoomPlansService";

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

  const [collapseNavbar, setCollapseNavbar] = useState<boolean>(true);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openResponse, setOpenResponse] = useState<boolean>(false);
  const [success, setSucccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [navigateUrl, setNavigateUrl] = useState<string>("");

  const navigate = useNavigate();

  function handleCreateRoomPlan(success: boolean): void {
    if (!success) {
      setSucccess(false);
      setTitle("Create room plan failed");
      setDetail("Some error has ocrured while room plan project.");
    }
    else {
      getRoomPlans(projectId, setRoomPlans);
      setOpenCreate(false);
      setSucccess(true);
      setTitle("Room plan created!!");
      setDetail("Congratulations, your room plan has been successfully created.");
    }
    setOpenResponse(true);
  }

  function handleUpdateRoomPlan(success: boolean): void {
    setNavigateUrl("");
    if (!success) {
      setSucccess(false);
      setTitle("Update room plan failed");
      setDetail("Some error has ocrured while update room plan.");
    }
    else {
      getRoomPlans(projectId, setRoomPlans);
      setOpenUpdate(false);
      setSucccess(true);
      setTitle("Room plan updated!!");
      setDetail("Congratulations, your room plan has been successfully updated.");
    }
    setOpenResponse(true);
  }

  function handleClose(): void {
    if (navigateUrl) {
      navigate(`/projects/${projectId}/room-plans/${navigateUrl}/planner`)
    }
    setOpenResponse(false);
  }

  function handleCollapseNavbar() {
    setCollapseNavbar(!collapseNavbar);
  }

  function handleCloseNavbar() {
    setCollapseNavbar(true);
  }

  return (
    <>
      <AppBar handleCollapseNavbar={handleCollapseNavbar} />
      <SideNavbarTypeA
        collapseNavbar={collapseNavbar}
        projects={projects}
        projectId={projectId}
        handleCloseNavbar={handleCloseNavbar}
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
        setNavigateUrl={setNavigateUrl}
        setRoomPlans={setRoomPlans}
        setOpenCreate={setOpenCreate}
        handleCreateRoomPlan={handleCreateRoomPlan}
      />
      <RoomPlanUpdateForm
        projectId={projectId}
        currentRoomPlan={currentRoomPlan}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        handleUpdateRoomPlan={handleUpdateRoomPlan}
      />
      <DeleteDialogTypeB
        projectId={projectId}
        currentRoomPlan={currentRoomPlan}
        openDelete={openDelete}
        setRoomPlans={setRoomPlans}
        setOpenDelete={setOpenDelete}
      />
      <ResponseDialog
        open={openResponse}
        success={success}
        title={title}
        detail={detail}
        handleClose={handleClose}
      />
    </>
  );
}

export default RoomPlans;