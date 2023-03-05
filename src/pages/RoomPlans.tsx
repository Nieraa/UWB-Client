import AppBar from "../components/appBar/AppBar";
import SideNavbarTypeA from "../components/sideNavbar/SideNavbarTypeA";
import MainTypeB from "../components/main/MainTypeB";
import RoomPlanCreateForm from "../components/roomPlan/roomPlanCreateForm/RoomPlanCreateForm";
import RoomPlanUpdateForm from "../components/roomPlan/roomPlanUpdateForm/RoomPlanUpdateForm";
import DeleteDialogTypeB from "../components/deleteDialog/DeleteDialogTypeB";
import ResponseDialog from "../components/responseDialog/ResponseDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoomPlansProps } from "../types";
import { getRoomPlans } from "../services/RoomPlansService";

function RoomPlans(props: RoomPlansProps) {
  const {
    isLoading,
    projectId,
    projects,
    roomPlans,
    currentProject,
    currentRoomPlan,
    setRoomPlans,
    setCurrentRoomPlan,
    setOpenBackdrop
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

  function handleCollapseNavbar() {
    setCollapseNavbar(!collapseNavbar);
  }

  function handleCloseNavbar() {
    setCollapseNavbar(true);
  }

  function handleCreateRoomPlan(success: boolean): void {
    if (!success) {
      setSucccess(false);
      setTitle("Create room plan failed");
      setDetail("Some error has occurred while create room plan.");
    }
    else {
      getRoomPlans(projectId, setRoomPlans);
      setOpenCreate(false);
      setSucccess(true);
      setTitle("Room plan created!!");
      setDetail("Congratulations, your room plan has been successfully created.");
    }
    setOpenBackdrop(false);
    setOpenResponse(true);
  }

  function handleUpdateRoomPlan(success: boolean): void {
    setNavigateUrl("");
    if (!success) {
      setSucccess(false);
      setTitle("Update room plan failed");
      setDetail("Some error has occurred while update room plan.");
    }
    else {
      getRoomPlans(projectId, setRoomPlans);
      setOpenUpdate(false);
      setSucccess(true);
      setTitle("Room plan updated!!");
      setDetail("Congratulations, your room plan has been successfully updated.");
    }
    setOpenBackdrop(false);
    setOpenResponse(true);
  }

  function handleDeleteRoomPlan(success: boolean): void {
    setNavigateUrl("");
    if (!success) {
      setSucccess(false);
      setTitle("Delete room plan failed");
      setDetail("Some error has occurred while delete room plan.");
    }
    else {
      getRoomPlans(projectId, setRoomPlans);
      setOpenDelete(false);
      setSucccess(true);
      setTitle("Room plan deleted!!");
      setDetail("Congratulations, your room plan has been successfully deleted.");
    }
    setOpenBackdrop(false);
    setOpenResponse(true);
  }

  function handleClose(): void {
    if (navigateUrl) {
      navigate(`/projects/${projectId}/room-plans/${navigateUrl}/planner`)
    }
    setOpenResponse(false);
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
        setOpenBackdrop={setOpenBackdrop}
      />
      <RoomPlanUpdateForm
        projectId={projectId}
        currentRoomPlan={currentRoomPlan}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        handleUpdateRoomPlan={handleUpdateRoomPlan}
        setOpenBackdrop={setOpenBackdrop}
      />
      <DeleteDialogTypeB
        projectId={projectId}
        currentRoomPlan={currentRoomPlan}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        handleDeleteRoomPlan={handleDeleteRoomPlan}
        setOpenBackdrop={setOpenBackdrop}
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