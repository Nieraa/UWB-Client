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
import { deleteNode } from "../../services/ProjectsService";
import { Node } from "../../types";

interface DeleteDialogTypeAProps {
  projectId: string;
  nodeId: string;
  nodeType: string;
  nodeName: string;
  openDelete: boolean;
  setNodes: (projects: Node[]) => void;
  hasColorDelete: boolean;
  setColors?: (colors: string[]) => void;
  setGroup?: (group: number) => void;
  setNetworkSsids?: (networkSsids: string[]) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

function DeleteDialogTypeA(props: DeleteDialogTypeAProps) {
  const {
    projectId,
    nodeId,
    nodeType,
    nodeName,
    openDelete,
    setNodes,
    hasColorDelete,
    setColors,
    setGroup,
    setNetworkSsids,
    setOpenDelete
  } = props;

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
            <Name>"{nodeName}"</Name>
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
          onClick={() => {
            if (hasColorDelete && setColors && setGroup && setNetworkSsids) {
              deleteNode(
                projectId,
                nodeId,
                nodeType,
                setNodes,
                setOpenDelete,
                hasColorDelete,
                setColors,
                setGroup,
                setNetworkSsids,
              )
            }
            else {
              deleteNode(
                projectId,
                nodeId,
                nodeType,
                setNodes,
                setOpenDelete,
                hasColorDelete
              )
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog >
  );
}

export default DeleteDialogTypeA;