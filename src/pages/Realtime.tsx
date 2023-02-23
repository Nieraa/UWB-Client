import AppBar from '../components/appBar/AppBar';
import SideNavbarTypeC from '../components/sideNavbar/SideNavbarTypeC';
import MainTypeC from '../components/main/MainTypeC';
import { useState } from 'react';
import { RealtimeProps } from '../types';

function Realtime(props: RealtimeProps) {
  const {
    isLoading,
    projectId,
    roomPlanId,
    projects,
    anchors,
    currentProject,
    currentRoomPlan,
  } = props;

  const [collapseNavbar, setCollapseNavbar] = useState<boolean>(true);

  function handleCollapseNavbar() {
    setCollapseNavbar(!collapseNavbar);
  }

  function handleCloseNavbar() {
    setCollapseNavbar(true);
  }

  return (
    <>
      <AppBar handleCollapseNavbar={handleCollapseNavbar} />
      <SideNavbarTypeC
        collapseNavbar={collapseNavbar}
        projectId={projectId}
        roomPlanId={roomPlanId}
        projects={projects}
        tags={anchors}
        handleCloseNavbar={handleCloseNavbar}
      />
      <MainTypeC
        isPlanner={false}
        isLoading={isLoading}
        projectId={projectId}
        roomPlanId={roomPlanId}
        anchors={anchors}
        currentProject={currentProject}
        currentRoomPlan={currentRoomPlan}
      />
    </>
  );
}

export default Realtime;
