import {
  ContentWrapper,
  Detail,
  Title
} from "./ResponseDialog.style";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import { ResponseDialogProps } from "../../types";

function SignUpDialog(props: ResponseDialogProps) {
  const {
    open,
    success,
    title,
    detail,
    handleClose
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
    >
      <DialogContent>
        <ContentWrapper>
          {success ?
            <FontAwesomeIcon
              style={{
                color: "var(--green)",
                fontSize: "100px",
                paddingTop: "20px"
              }}
              icon={faCircleCheck}
            />
            :
            <FontAwesomeIcon
              style={{
                color: "var(--error)",
                fontSize: "100px",
                paddingTop: "20px"
              }}
              icon={faCircleXmark}
            />
          }
          <Title success={success}>
            {title}
          </Title>
          <Detail>
            {detail}
          </Detail>
        </ContentWrapper>
      </DialogContent>
      <DialogActions>
        <Button
          color={success ? "success" : "error"}
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