import { AppBar } from '../components/appBar/AppBar';
import { SideNavbarTypeB } from '../components/sideNavbar/SideNavbarTypeB';
import { MainTypeB } from '../components/main/MainTypeB';
import { useEffect, useState } from 'react';
import { Node, PassAndUpdateProjects, Project } from '../types';
import { NodeCreateForm } from '../components/nodeCreateForm/NodeCreateForm';
import { Params, useParams } from 'react-router-dom';
import { getNodes, getColors, getNetworkSsids } from '../services/ProjectsService';
import DeleteDialogTypeB from '../components/deleteDialog/DeleteDialogTypeB';

function Planner(props: PassAndUpdateProjects) {
  const { projects } = props;
  const [addType, setAddType] = useState("");
  const [anchors, setAnchors] = useState<Node[]>([]);
  const [tags, setTags] = useState<Node[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [group, setGroup] = useState(1);
  const [networkSsids, setNetworkSsids] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [nodeId, setNodeId] = useState("");
  const [nodeType, setNodeType] = useState("");
  const [nodeName, setNodeName] = useState("");
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
    getNodes(project.id, "anchor", setAnchors, false);
    getNodes(project.id, "tag", setTags, false);
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
        setNodeId={setNodeId}
        setNodeType={setNodeType}
        setNodeName={setNodeName}
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
      <NodeCreateForm
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
        nodeId={nodeId}
        nodeType={nodeType}
        nodeName={nodeName}
        openDelete={openDelete}
        setNodes={nodeType === "anchor" ? setAnchors : setTags}
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
