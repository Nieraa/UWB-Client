import {
  ContentWrapper,
  Title,
  Detail,
  IconWrapper,
  Name
} from "./DeleteDialog.style";
import { CancelButton } from "../../Styles/Styles.style";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../types";
import { deleteProject } from "../../services/ProjectsService";

interface DeleteDialogTypeAProps {
  currentProject: Project;
  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;
  handleDeleteProject: (success: boolean) => void;
}

function DeleteDialogTypeA(props: DeleteDialogTypeAProps) {
  const {
    currentProject,
    openDelete,
    setOpenDelete,
    handleDeleteProject
  } = props;

  function handleClose(): void {
    setOpenDelete(false);
  }

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
            <Name>"{currentProject.name}"</Name>
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
              currentProject.id,
              handleDeleteProject
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