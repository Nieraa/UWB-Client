import { CancelButton } from "../../../Styles/Styles.style";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Project } from "../../../types";
import { createProject, getProjects } from "../../../services/ProjectsService";

interface ProjectCreateFormProps {
  openCreate: boolean;
  setProjects: (projects: Project[]) => void;
  setOpenCreate: (openCreate: boolean) => void;
  handleCreateProject: (success: boolean) => void;
}

function ProjectCreateForm(props: ProjectCreateFormProps) {
  const {
    openCreate,
    setProjects,
    setOpenCreate,
    handleCreateProject
  } = props;

  const navigate: NavigateFunction = useNavigate();

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
      const projectData = {
        name: values.name
      };
      const createId: string = await createProject(projectData, handleCreateProject);
      if (createId) {
        getProjects(setProjects);
        navigate(`/projects/${createId}/room-plans`)
      }
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