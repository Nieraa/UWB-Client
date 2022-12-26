import {
  CancelButton,
  ImageErrorHelperText,
} from "./ProjectCreateForm.style";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Input,
  TextField
} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../axios";
import { Project } from "../../types";
import { createRef, useState } from "react";
import Compress from "react-image-file-resizer";

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
  const [image, _setImage] = useState("");
  const [imageName, setImageName] = useState("No file chosen");
  const [imageValidation, setImageValidation] = useState(false);
  const inputFileRef = createRef();
  const navigate = useNavigate();

  const setImage = (newImage: any) => {
    _setImage(newImage);
  };

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
      console.log(projectData);
      if (image) {
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
                .catch((errGet) => {
                })
            }
          })
          .catch((errPost) => {
            alert("Create failed")
          })
      }
      else {
        setImageValidation(true);
      }
    }
  })

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setImage("");
    setImageName("No file chosen");
  };

  const handleOnChange = (event: any) => {
    const newImage = event.target?.files?.[0];
    setImageName(newImage.name);
    setImageValidation(false);

    try {
      Compress.imageFileResizer(
        newImage, // the file from input
        240, // maxwidth
        240, // maxheight
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

  const handleClick = () => {
    setImage(image);
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