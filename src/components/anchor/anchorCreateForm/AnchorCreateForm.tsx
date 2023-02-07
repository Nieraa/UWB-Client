import { CancelButton } from "../../../Styles/Styles.style";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Node } from "../../../types";
import { createAnchor } from "../../../services/AnchorsService";

interface AnchorCreateFormProps {
  projectId: string;
  roomPlanId: string;
  openCreate: boolean;
  setAnchors: (anchors: Node[]) => void;
  setOpenCreate: (openCreate: boolean) => void;
}

function AnchorCreateForm(props: AnchorCreateFormProps) {
  const {
    projectId,
    roomPlanId,
    openCreate,
    setAnchors,
    setOpenCreate
  } = props;

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Please enter anchor name"),
    x: yup
      .number().typeError("X must be number")
      .required("Please enter X"),
    y: yup
      .number().typeError("Y must be number")
      .required("Please enter Y"),
    z: yup
      .number().typeError("Z must be number")
      .required("Please enter Z")
  });

  const formik = useFormik({
    initialValues: {
      name: "Untitled",
      x: 0,
      y: 0,
      z: 0
    },
    validationSchema,
    onSubmit: (values) => {
      const anchorData = {
        name: values.name,
        x: values.x,
        y: values.y,
        z: values.z
      };
      createAnchor(projectId, roomPlanId, anchorData, setAnchors, setOpenCreate);
    }
  });

  function handleClose(): void {
    setOpenCreate(false);
    formik.resetForm();
  }

  return (
    <Dialog
      open={openCreate}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>Create Anchor</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <TextField
            margin="dense"
            id="anchor-name"
            label="Anchor name"
            name="name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                margin="dense"
                id="x"
                label="X (m)"
                name="x"
                variant="outlined"
                value={formik.values.x}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.x)}
                helperText={formik.errors.x}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="dense"
                id="y"
                label="Y (m)"
                name="y"
                variant="outlined"
                value={formik.values.y}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.y)}
                helperText={formik.errors.y}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="dense"
                id="z"
                label="Z (m)"
                name="z"
                variant="outlined"
                value={formik.values.z}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.z)}
                helperText={formik.errors.z}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <CancelButton
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </CancelButton>
          <Button
            variant="contained"
            type="submit"
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AnchorCreateForm;