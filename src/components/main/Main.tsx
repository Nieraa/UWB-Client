import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Params, useParams } from "react-router-dom";
import { Canvas } from "../canvas/Canvas";
import { ProjectList } from "../projectList/ProjectList";
import { AddElementButton, MainArea, ProjectName } from "./Main.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { grey } from '@mui/material/colors';

interface ItemProps {
  id: string;
  title: string;
}

interface MainProps {
  items: ItemProps[];
  pathname: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Main = (props: MainProps) => {
  const { items, pathname, setOpen } = props;
  const params: Readonly<Params<string>> = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <MainArea>
      {pathname === 'projects' ?
        <>
          <ProjectList items={items} />
          <AddElementButton onClick={handleClickOpen}>
            <FontAwesomeIcon icon={faPlus} />
          </AddElementButton>
        </>
        :
        <>
          <ProjectName>
            {items[Number(params.projectId) - 1].title}
          </ProjectName>
          {pathname === 'planner' ?
            <Canvas />
            :
            pathname === 'realtime' ?
              <></>
              :
              pathname === 'history' ?
                <></>
                :
                <></>
          }
        </>
      }
    </MainArea>
  );
};