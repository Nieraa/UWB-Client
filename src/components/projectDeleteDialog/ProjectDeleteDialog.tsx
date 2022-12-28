import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { deleteProject } from "../../services/ProjectsService";
import { Project } from "../../types";
import { ContentWrapper, Title, Detail, CancelButton, IconWrapper, ProjectName } from "./ProjectDeleteDialog.style";

interface ProjectDeleteDialogProps {
  projectId: string;
  projectName: string;
  setProjects: (projects: Project[]) => void;
  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;
}

function ProjectDeleteDialog(props: ProjectDeleteDialogProps) {
  const { projectId, projectName, setProjects, openDelete, setOpenDelete } = props;

  const handleClose = (): void => {
    setOpenDelete(false);
  };

  return (
    <Dialog
      open={openDelete}
      onClose={handleClose}
      fullWidth
    >
      <DialogContent>
        <ContentWrapper>
          <IconWrapper>
            <FontAwesomeIcon
              style={{ color: "var(--error)", fontSize: "70px", paddingTop: "20px" }}
              icon={faTrashCan}
            />
          </IconWrapper>
          <Title>Are you sure?</Title>
          <Detail>Do you really want to delete&nbsp;
            <ProjectName>"{projectName}"</ProjectName>?
            This process cannot be undone.</Detail>
        </ContentWrapper>
      </DialogContent>
      <DialogActions>
        <CancelButton
          variant="contained"
          onClick={handleClose}
        >
          Cancel
        </CancelButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => deleteProject(projectId, setProjects, setOpenDelete)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDeleteDialog;