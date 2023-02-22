import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { ContentWrapper, Detail, Title } from "./SignUpDialog.style";

interface SignUpDialogProps {
  openSignUpDialog: boolean;
  handleClose: () => void;
}

function SignUpDialog(props: SignUpDialogProps) {
  const { openSignUpDialog, handleClose } = props;

  return (
    <Dialog
      open={openSignUpDialog}
      onClose={handleClose}
      fullWidth
    >
      <DialogContent>
        <ContentWrapper>
          <FontAwesomeIcon
            style={{
              color: "var(--green)",
              fontSize: "100px",
              paddingTop: "20px"
            }}
            icon={faCircleCheck}
          />
          <Title>
            User created!!
          </Title>
          <Detail>
            Congratulations, your account has been successfully created.
          </Detail>
        </ContentWrapper>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          onClick={handleClose}
          fullWidth
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignUpDialog;