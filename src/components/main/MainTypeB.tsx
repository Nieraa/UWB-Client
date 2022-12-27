import { Canvas } from "../canvas/Canvas";
import { ProjectList } from "../projectList/ProjectList";
import {
  MainArea,
  ProjectName,
  AddElementButton
} from "./Main.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Params, useParams } from "react-router-dom";
import { Hardware, Project } from "../../types";
import { MenuItem, MenuList, Popover } from "@mui/material";
import { useState } from "react";

interface MainTypeBProps {
  projects: Project[];
  pathname: string;
  anchors: Hardware[];
  tags: Hardware[];
  setAddType: (addType: string) => void;
  setOpenDialog: (openDialog: boolean) => void;
}

export const MainTypeB = (props: MainTypeBProps) => {
  const { projects, pathname, anchors, tags, setOpenDialog, setAddType } = props;

  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const openMenu = Boolean(anchorElMenu);

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


  const handleClickOpenMenu = (event: any): void => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setAnchorElMenu(null);
  };

  const handleClickOpenDialog = (type: string): void => {
    setAddType(type);
    setOpenDialog(true);
  };

  return (
    <MainArea>
      <ProjectName>
        {projects.length === 0 ? "" : project.projectName}
      </ProjectName>
      {pathname === 'planner' ?
        <>
          <Canvas
            project={project}
            anchors={anchors}
            tags={tags}
          />
          <AddElementButton onClick={handleClickOpenMenu}>
            <FontAwesomeIcon icon={faPlus} />
          </AddElementButton>
          <Popover
            open={openMenu}
            anchorEl={anchorElMenu}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <MenuList>
              <MenuItem onClick={() => { handleClickOpenDialog("Anchor"); handleCloseMenu() }}>Add anchor</MenuItem>
              <MenuItem onClick={() => { handleClickOpenDialog("Tag"); handleCloseMenu() }}>Add tag</MenuItem>
            </MenuList>
          </Popover>
        </>
        :
        pathname === 'realtime' ?
          <></>
          :
          pathname === 'history' ?
            <></>
            :
            <></>
      }
    </MainArea >
  );
};