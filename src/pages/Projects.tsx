import { SideNavbar } from '../components/sideNavbar/SideNavbar';
import { AppBar } from '../components/appBar/AppBar';
import { Main } from '../components/main/Main';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function Projects() {
  const items: any[] = [
    { id: "1", title: "Project 1" },
    { id: "2", title: "Project 2" },
    { id: "3", title: "Project 3" },
    { id: "4", title: "Project 4" },
    { id: "5", title: "Project 5" },
    { id: "6", title: "Project 6" },
    { id: "7", title: "Project 7" },
    { id: "8", title: "Project 8" },
  ]

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
      <SideNavbar items={items} setOpen={setOpen}/>
      <Main items={items} pathname={"projects"} setOpen={setOpen}/>
      <Dialog open={open} onClose={handleClose} fullWidth>
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
          <UploadButton variant="outlined" startIcon={<FileUploadIcon />} fullWidth>
            Upload room plan
          </UploadButton>
        </DialogContent>
        <DialogActions>
          <CancelButton variant="contained" onClick={handleClose}>Cancel</CancelButton>
          <Button variant="contained" onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Projects;
