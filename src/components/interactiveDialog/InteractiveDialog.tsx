import {
  Title,
  Detail
} from "./InteractiveDialog.style";
import { CancelButton } from "../../Styles/Styles.style";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { InteractiveDialogProps } from "../../types";

function InteractiveDialog(props: InteractiveDialogProps) {
  const {
    open,
    setOpen,
    signOut
  } = props;

  function handleClose(): void {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
    >
      <DialogContent>
        <Title>
          Are you sure?
        </Title>
        <Detail>
          Do you really want to sign out?
        </Detail>
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
          onClick={signOut}
        >
          Sign out
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InteractiveDialog;