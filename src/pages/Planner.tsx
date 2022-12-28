import { AppBar } from '../components/appBar/AppBar';
import { SideNavbarTypeB } from '../components/sideNavbar/SideNavbarTypeB';
import { MainTypeB } from '../components/main/MainTypeB';
import { useEffect, useState } from 'react';
import { Hardware, PassAndUpdateProjects, Project } from '../types';
import { HardwareCreateForm } from '../components/hardwareCreateFrom/HardwareCreateFrom';
import { Params, useParams } from 'react-router-dom';
import { getHardwares, getColors, getNetworkSsids } from '../services/ProjectsService';
import DeleteDialogTypeB from '../components/deleteDialog/DeleteDialogTypeB';

function Planner(props: PassAndUpdateProjects) {
  const { projects } = props;
  const [addType, setAddType] = useState("");
  const [anchors, setAnchors] = useState<Hardware[]>([]);
  const [tags, setTags] = useState<Hardware[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [group, setGroup] = useState(1);
  const [networkSsids, setNetworkSsids] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [hardwareId, setHardwareId] = useState("");
  const [hardwareType, setHardwareType] = useState("");
  const [hardwareName, setHardwareName] = useState("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [hasColorDelete, setHasColorDelete] = useState<boolean>(false);

  const params: Readonly<Params<string>> = useParams();
  const project: Project = projects.length === 0 ?
    {
      id: params.projectId ? params.projectId : "",
      projectName: "",
      imgUrl: "",
      l: 0,
      w: 0,
    } :
    projects[projects.findIndex((element) => element.id === params.projectId)];

  useEffect(() => {
    getHardwares(project.id, "anchor", setAnchors, false);
    getHardwares(project.id, "tag", setTags, false);
    getColors(project.id, setColors, setGroup);
    getNetworkSsids(project.id, setNetworkSsids);
  }, [project.id])

  return (
    <div>
      <AppBar />
      <SideNavbarTypeB
        projects={projects}
        setAddType={setAddType}
        anchors={anchors}
        tags={tags}
        setHardwareId={setHardwareId}
        setHardwareType={setHardwareType}
        setHardwareName={setHardwareName}
        setHasColorDelete={setHasColorDelete}
        setOpenDialog={setOpenDialog}
        setOpenDelete={setOpenDelete}
      />
      <MainTypeB
        projects={projects}
        pathname={"planner"}
        anchors={anchors}
        tags={tags}
        setAddType={setAddType}
        setOpenDialog={setOpenDialog}
      />
      <HardwareCreateForm
        projectId={project.id}
        addType={addType}
        colors={colors}
        group={group}
        networkSsids={networkSsids}
        openDialog={openDialog}
        setAnchors={setAnchors}
        setTags={setTags}
        setColors={setColors}
        setGroup={setGroup}
        setNetworkSsids={setNetworkSsids}
        setOpenDialog={setOpenDialog}
      />
      <DeleteDialogTypeB
        projectId={project.id}
        hardwareId={hardwareId}
        hardwareType={hardwareType}
        hardwareName={hardwareName}
        openDelete={openDelete}
        setHardwares={hardwareType === "anchor" ? setAnchors : setTags}
        hasColorDelete={hasColorDelete}
        setColors={setColors}
        setGroup={setGroup}
        setNetworkSsids={setNetworkSsids}
        setOpenDelete={setOpenDelete}
      />
    </div>
  );
}

export default Planner;
