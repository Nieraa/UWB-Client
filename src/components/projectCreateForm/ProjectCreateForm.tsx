import {
  CancelButton,
  ImageErrorHelperText
} from "./ProjectCreateForm.style";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormHelperText,
  Input,
  TextField
} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { createRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Compress from "react-image-file-resizer";
import { Project } from "../../types";
import { createProject } from "../../services/ProjectsService";
import { NavigateFunction, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  projectName: yup
    .string()
    .required("Please enter project name"),
  l: yup
    .number()
    .required("Please enter length"),
  w: yup
    .number()
    .required("Please enter width"),
});

interface ProjectCreateFormProps {
  setProjects: (projects: Project[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function ProjectCreateForm(props: ProjectCreateFormProps) {
  const { setProjects, open, setOpen } = props;
  
  const [image, _setImage] = useState<any>("");
  const [imageName, setImageName] = useState<string>("No file chosen");
  const [imageValidation, setImageValidation] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const inputFileRef = createRef();

  const formik = useFormik({
    initialValues: {
      projectName: "Untitled",
      l: 0,
      w: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      const projectData = {
        projectName: values.projectName,
        imgUrl: image,
        l: Number(values.l),
        w: Number(values.w),
      };
      if (image) {
        createProject(projectData, setProjects, navigate);
      }
      else {
        setImageValidation(true);
      }
    }
  })

  const handleClick = (): void => {
    setImage(image);
  };

  const setImage = (newImage: any): void => {
    _setImage(newImage);
  };

  const handleOnChange = (event: any): void => {
    const newImage = event.target?.files?.[0];
    setImageName(newImage.name);
    setImageValidation(false);

    try {
      Compress.imageFileResizer(
        newImage, // the file from input
        2000, // maxwidth
        2000, // maxheight
        "JPEG", // compress format WEBP, JPEG, PNG
        90, // quality
        0, // rotation
        (uri) => {
          setImage(uri);
          // You upload logic goes here
        },
        "base64", // blob or base64 default base64
        240, // minwidth
        240, // minheight
      );
    }
    catch (err) {
    }
  };

  const handleClose = (): void => {
    setOpen(false);
    formik.resetForm();
    setImage("");
    setImageName("No file chosen");
  };

  return (
    <Dialog
      open={open}
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
            name="projectName"
            variant="outlined"
            value={formik.values.projectName}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.projectName)}
            helperText={formik.errors.projectName}
            fullWidth
            autoFocus
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="length"
                label="Length: x (m)"
                name="l"
                variant="outlined"
                value={formik.values.l}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.l)}
                helperText={formik.errors.l}
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="width"
                label="Width: y (m)"
                name="w"
                variant="outlined"
                value={formik.values.w}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.w)}
                helperText={formik.errors.w}
                autoFocus
                fullWidth
              />
            </Grid>
          </Grid>
          <label htmlFor="room-plan-upload">
            <Input
              style={{ display: 'none' }}
              inputRef={inputFileRef}
              id="room-plan-upload"
              name="imgUrl"
              onChange={handleOnChange}
              type="file"
              inputProps={{ accept: 'image/*' }}
            />
            <Button
              style={{ marginTop: 10 }}
              variant="outlined"
              component="span"
              startIcon={<FileUploadIcon />}
              fullWidth
              onClick={handleClick}
            >
              Upload room plan
            </Button>
            {imageValidation ?
              <ImageErrorHelperText>Please upload room plan</ImageErrorHelperText>
              :
              <></>
            }
            <img
              style={{ margin: "10px auto", display: "block" }}
              height="178px"
              alt="Room plan"
              src={image ?
                image
                :
                process.env.PUBLIC_URL + "/static/images/no_image.png"}
            />
            <FormHelperText>{imageName}</FormHelperText>
          </label>
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