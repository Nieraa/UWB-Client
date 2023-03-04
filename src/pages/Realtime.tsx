import AppBar from '../components/appBar/AppBar';
import SideNavbarTypeC from '../components/sideNavbar/SideNavbarTypeC';
import MainTypeC from '../components/main/MainTypeC';
import { useEffect, useState } from 'react';
import { RealtimeProps, Tag } from '../types';
import * as io from "socket.io-client";

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
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    function webSocketInvoke() {
      const socket = io.connect("http://localhost:3001");
      socket.on("event", (value: any) => {
        console.log("This is recieve value", value);
        const parse_value = JSON.parse(value);
        setTags(parse_value.tags);
      });
    }

    webSocketInvoke();
  }, [])

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
        tags={tags}
        currentProject={currentProject}
        currentRoomPlan={currentRoomPlan}
      />
    </>
  );
}

export default Realtime;
