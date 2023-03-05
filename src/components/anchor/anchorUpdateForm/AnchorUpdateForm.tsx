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
import { AnchorUpdateFormProps } from "../../../types";
import { updateAnchor } from "../../../services/AnchorsService";

function AnchorUpdateForm(props: AnchorUpdateFormProps) {
  const {
    projectId,
    roomPlanId,
    currentAnchor,
    openUpdate,
    setOpenUpdate,
    handleUpdateAnchor,
    setOpenBackdrop
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
      name: currentAnchor.name,
      x: currentAnchor.x,
      y: currentAnchor.y,
      z: currentAnchor.z
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setOpenBackdrop(true);
      const anchorData = {
        name: values.name,
        x: Number(values.x),
        y: Number(values.y),
        z: Number(values.z)
      };
      updateAnchor(projectId, roomPlanId, currentAnchor.id, anchorData, handleUpdateAnchor, handleClose);
    }
  });

  function handleClose(): void {
    setOpenUpdate(false);
    formik.resetForm();
  }

  return (
    <Dialog
      open={openUpdate}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>Edit Anchor</DialogTitle>
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
            error={formik.touched.name && Boolean(formik.errors.name)}
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
                error={formik.touched.x && Boolean(formik.errors.x)}
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
                error={formik.touched.y && Boolean(formik.errors.y)}
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
                error={formik.touched.z && Boolean(formik.errors.z)}
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
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AnchorUpdateForm;