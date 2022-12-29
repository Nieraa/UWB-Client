import {
    CancelButton,
    ImageErrorHelperText
  } from "./ProjectUpdateForm.style";
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
  import { createRef, useEffect, useState } from "react";
  import { useFormik } from "formik";
  import * as yup from "yup";
  import Compress from "react-image-file-resizer";
  import { Project } from "../../types";
  import { updateProject } from "../../services/ProjectsService";
  
  const validationSchema = yup.object({
    projectName: yup
      .string()
      .required("Please enter project name"),
    l: yup
      .number().typeError("Length must be number")
      .min(0, "Length must be positive")
      .required("Please enter length"),
    w: yup
      .number().typeError("Width must be number")
      .min(0, "Length must be positive")
      .required("Please enter width"),
  });
  
  interface ProjectUpdateFormProps {
    project: Project;
    setProjects: (projects: Project[]) => void;
    openUpdate: boolean;
    setOpenUpdate: (openUpdate: boolean) => void;
  }
  
  function ProjectUpdateForm(props: ProjectUpdateFormProps) {
    const { project, setProjects, openUpdate, setOpenUpdate } = props;
  
    const [image, _setImage] = useState<any>(project.imgUrl);
    const [imageName, setImageName] = useState<string>("");
    const [imageValidation, setImageValidation] = useState<boolean>(false);
  
    const inputFileRef = createRef();

    useEffect(() => {
      _setImage(project.imgUrl);
    }, [project])
    
    const formik = useFormik({
      initialValues: {
        projectName: project.projectName,
        l: project.l,
        w: project.w,
      },
      enableReinitialize: true,
      validationSchema,
      onSubmit: (values) => {
        const projectData = {
          projectName: values.projectName,
          imgUrl: image,
          l: Number(values.l),
          w: Number(values.w),
        };
        if (image) {
          updateProject(project.id, projectData, setProjects, handleClose);
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
          1000, // maxwidth
          1000, // maxheight
          "JPEG", // compress format WEBP, JPEG, PNG
          70, // quality
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
      setOpenUpdate(false);
      formik.values.projectName = project.projectName;
      formik.values.l = project.l;
      formik.values.w = project.w;
      setImage(project.imgUrl);
    };
  
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
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
  
  export default ProjectUpdateForm;