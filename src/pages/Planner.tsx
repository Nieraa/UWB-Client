import AppBar from '../components/appBar/AppBar';
import SideNavbarTypeB from '../components/sideNavbar/SideNavbarTypeB';
import MainTypeC from '../components/main/MainTypeC';
import AnchorCreateForm from '../components/anchor/anchorCreateForm/AnchorCreateForm';
import AnchorUpdateForm from '../components/anchor/anchorUpdateForm/AnchorUpdateForm';
import DeleteDialogTypeC from '../components/deleteDialog/DeleteDialogTypeC';
import ResponseDialog from '../components/responseDialog/ResponseDialog';
import { useState } from 'react';
import { PlannerProps } from '../types';
import { getAnchors } from '../services/AnchorsService';

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
    setCurrentAnchor,
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

  function handleCollapseNavbar() {
    setCollapseNavbar(!collapseNavbar);
  }

  function handleCloseNavbar() {
    setCollapseNavbar(true);
  }

  function handleCreateAnchor(success: boolean): void {
    if (!success) {
      setSucccess(false);
      setTitle("Create anchor failed");
      setDetail("Some error has occurred while create anchor.");
    }
    else {
      getAnchors(projectId, roomPlanId, setAnchors);
      setOpenCreate(false); 
      setSucccess(true);
      setTitle("Anchor created!!");
      setDetail("Congratulations, your anchor has been successfully created.");
    }
    setOpenBackdrop(false);
    setOpenResponse(true);
  }

  function handleUpdateAnchor(success: boolean): void {
    if (!success) {
      setSucccess(false);
      setTitle("Update anchor failed");
      setDetail("Some error has occurred while update anchor.");
    }
    else {
      getAnchors(projectId, roomPlanId, setAnchors);
      setOpenUpdate(false);
      setSucccess(true);
      setTitle("Anchor updated!!");
      setDetail("Congratulations, your anchor has been successfully updated.");
    }
    setOpenBackdrop(false);
    setOpenResponse(true);
  }

  function handleDeleteAnchor(success: boolean): void {
    if (!success) {
      setSucccess(false);
      setTitle("Delete anchor failed");
      setDetail("Some error has occurred while delete anchor.");
    }
    else {
      getAnchors(projectId, roomPlanId, setAnchors);
      setOpenDelete(false);
      setSucccess(true);
      setTitle("Anchor deleted!!");
      setDetail("Congratulations, your anchor has been successfully deleted.");
    }
    setOpenBackdrop(false);
    setOpenResponse(true);
  }

  function handleClose(): void {
    setOpenResponse(false);
    window.location.reload();
  }

  return (
    <>
      <AppBar handleCollapseNavbar={handleCollapseNavbar} />
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
        isPlanner={true}
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
        setOpenCreate={setOpenCreate}
        handleCreateAnchor={handleCreateAnchor}
        setOpenBackdrop={setOpenBackdrop}
      />
      <AnchorUpdateForm
        projectId={projectId}
        roomPlanId={roomPlanId}
        currentAnchor={currentAnchor}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        handleUpdateAnchor={handleUpdateAnchor}
        setOpenBackdrop={setOpenBackdrop}
      />
      <DeleteDialogTypeC
        projectId={projectId}
        roomPlanId={roomPlanId}
        currentAnchor={currentAnchor}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        handleDeleteAnchor={handleDeleteAnchor}
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

export default Planner;
