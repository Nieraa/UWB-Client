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
import { Node } from "../../types";
import { deleteAnchor } from "../../services/AnchorsService";

interface DeleteDialogTypeCProps {
  projectId: string;
  roomPlanId: string;
  currentAnchor: Node;
  openDelete: boolean;
  setAnchors: (anchors: Node[]) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

function DeleteDialogTypeC(props: DeleteDialogTypeCProps) {
  const {
    projectId,
    roomPlanId,
    currentAnchor,
    openDelete,
    setAnchors,
    setOpenDelete
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
            <Name>"{currentAnchor.name}"</Name>
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
            deleteAnchor(
              projectId,
              roomPlanId,
              currentAnchor.id,
              setAnchors,
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

export default DeleteDialogTypeC;