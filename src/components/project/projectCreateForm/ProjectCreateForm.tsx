import { CancelButton } from "../../../Styles/Styles.style";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { ProjectCreateFormProps } from "../../../types";
import { createProject } from "../../../services/ProjectsService";

function ProjectCreateForm(props: ProjectCreateFormProps) {
  const {
    openCreate,
    setOpenCreate,
    setNavigateUrl,
    handleCreateProject,
    setOpenBackdrop
  } = props;

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Please enter project name")
  });

  const formik = useFormik({
    initialValues: {
      name: "Untitled"
    },
    validationSchema,
    onSubmit: async (values) => {
      setOpenBackdrop(true);
      const projectData = {
        name: values.name
      };
      setNavigateUrl(await createProject(projectData, handleCreateProject, handleClose));
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
      <DialogTitle>Create Project</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <TextField
            margin="dense"
            id="project-name"
            label="Project name"
            name="name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.errors.name}
            fullWidth
          />
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

export default ProjectCreateForm;