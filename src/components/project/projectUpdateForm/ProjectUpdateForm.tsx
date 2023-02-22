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
import { Project } from "../../../types";
import { updateProject } from "../../../services/ProjectsService";

interface ProjectUpdateFormProps {
  currentProject: Project;
  openUpdate: boolean;
  setOpenUpdate: (openUpdate: boolean) => void;
  handleUpdateProject: (success: boolean) => void;
}

function ProjectUpdateForm(props: ProjectUpdateFormProps) {
  const {
    currentProject,
    openUpdate,
    setOpenUpdate,
    handleUpdateProject
  } = props;

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Please enter project name")
      .notOneOf([currentProject.name], "Please use another name")
  });

  const formik = useFormik({
    initialValues: {
      name: currentProject.name
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const projectData = {
        name: values.name
      };
      updateProject(currentProject.id, projectData, handleUpdateProject);
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
      <DialogTitle>Edit Project</DialogTitle>
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
            Save Change
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ProjectUpdateForm;