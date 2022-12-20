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
import axios from '../axios';

function Projects() {
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    axios
      .get(`/projects`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="project-name"
            label="Project name"
            fullWidth
            variant="outlined"
            defaultValue="Untitled"
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
            onClick={handleClose}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Projects;
