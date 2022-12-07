import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Params, useParams } from "react-router-dom";
import { Canvas } from "../canvas/Canvas";
import { ProjectList } from "../projectList/ProjectList";
import { AddElementButton, MainArea, ProjectName } from "./Main.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { grey } from '@mui/material/colors';

interface ItemProps {
  id: string;
  title: string;
}

interface MainProps {
  items: ItemProps[];
  pathname: string;
}

export const Main = (props: MainProps) => {
  const { items, pathname } = props;
  const params: Readonly<Params<string>> = useParams();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[400]),
    backgroundColor: grey[300],
    '&:hover': {
      backgroundColor: grey[400],
    },
  }));

  const UploadButton = styled(Button)(({ theme }) => ({
    marginTop: "10px",
  }));

  return (
    <MainArea>
      {pathname === 'projects' ?
        <>
          <ProjectList items={items} />
          <AddElementButton onClick={handleClickOpen}>
            <FontAwesomeIcon icon={faPlus} />
          </AddElementButton>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Create Project</DialogTitle>
            <DialogContent dividers>
              <TextField
                autoFocus
                margin="dense"
                id="project-name"
                label="Project name"
                fullWidth
                variant="outlined"
                defaultValue="Untitled"
              />
              <UploadButton variant="outlined" startIcon={<FileUploadIcon />} fullWidth>
                Upload room plan
              </UploadButton>
            </DialogContent>
            <DialogActions>
              <CancelButton variant="contained" onClick={handleClose}>Cancel</CancelButton>
              <Button variant="contained" onClick={handleClose}>Create</Button>
            </DialogActions>
          </Dialog>
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