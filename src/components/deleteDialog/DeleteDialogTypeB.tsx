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
import { deleteHardware } from "../../services/ProjectsService";
import { Hardware } from "../../types";

interface DeleteDialogTypeAProps {
  projectId: string;
  hardwareId: string;
  hardwareType: string;
  hardwareName: string;
  openDelete: boolean;
  setHardwares: (projects: Hardware[]) => void;
  hasColorDelete: boolean;
  setColors?: (colors: string[]) => void;
  setGroup?: (group: number) => void;
  setNetworkSsids?: (networkSsids: string[]) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

function DeleteDialogTypeA(props: DeleteDialogTypeAProps) {
  const {
    projectId,
    hardwareId,
    hardwareType,
    hardwareName,
    openDelete,
    setHardwares,
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
            <Name>"{hardwareName}"</Name>
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
              deleteHardware(
                projectId,
                hardwareId,
                hardwareType,
                setHardwares,
                setOpenDelete,
                hasColorDelete,
                setColors,
                setGroup,
                setNetworkSsids,
              )
            }
            else {
              deleteHardware(
                projectId,
                hardwareId,
                hardwareType,
                setHardwares,
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