import { SideNavbar } from '../components/sideNavbar/SideNavbar';
import { AppBar } from '../components/appBar/AppBar';
import { Main } from '../components/main/Main';
import {
  useEffect,
  useState
} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField
} from '@mui/material';
import { grey } from '@mui/material/colors';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from '../axios';
import { PassAndUpdateProjects } from '../types';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  projectName: yup
    .string()
    .required("Please enter project name"),
  imgUrl: yup.string()
});

function Projects(props: PassAndUpdateProjects) {
  const { projects, setProjects } = props;
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      projectName: "Untitled",
      imgUrl: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const projectData = {
        projectName: values.projectName,
        imgUrl: values.imgUrl,
      };
      axios
        .post("/projects", projectData)
        .then((resPost) => {
          if (resPost) {
            axios
              .get("/projects")
              .then((resGet) => {
                setProjects(resGet.data)
                navigate(`/${resPost.data.id}/planner`);
              })
          }
        })
        .catch((error) => {
          alert("Create failed")
        })
    }
  })

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[400]),
    backgroundColor: grey[300],
    '&:hover': {
      backgroundColor: grey[400],
    },
  }));

  const UploadButton = styled(Button)(({ theme }) => ({
    marginTop: "10px",
  }));

  return (
    <div>
      <AppBar />
      <SideNavbar
        projects={projects}
        setOpen={setOpen}
      />
      <Main
        projects={projects}
        pathname={"projects"}
        setOpen={setOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>Create Project</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin="dense"
              id="project-name"
              label="Project name"
              name="projectName"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              helperText={formik.errors.projectName}
              fullWidth
              variant="outlined"
            />
            <UploadButton
              variant="outlined"
              startIcon={<FileUploadIcon />}
              fullWidth
            >
              Upload room plan
            </UploadButton>
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
    </div>
  );
}

export default Projects;
