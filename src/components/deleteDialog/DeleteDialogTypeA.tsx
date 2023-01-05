import {
  ContentWrapper,
  Title,
  Detail,
  CancelButton,
  IconWrapper,
  Name
} from "./DeleteDialog.style";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteProject } from "../../services/ProjectsService";
import { Project } from "../../types";

interface DeleteDialogTypeAProps {
  project: Project;
  openDelete: boolean;
  setProjects: (projects: Project[]) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

function DeleteDialogTypeA(props: DeleteDialogTypeAProps) {
  const {
    project,
    setProjects,
    openDelete,
    setOpenDelete
  } = props;

  function handleClose(): void {
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
              style={{
                color: "var(--error)",
                fontSize: "70px",
                paddingTop: "20px"
              }}
              icon={faTrashCan}
            />
          </IconWrapper>
          <Title>
            Are you sure?
          </Title>
          <Detail>
            Do you really want to delete&nbsp;
            <Name>"{project.projectName}"</Name>
            ? This process cannot be undone.
          </Detail>
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
          onClick={() =>
            deleteProject(
              project.id,
              setProjects,
              setOpenDelete
            )
          }
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialogTypeA;