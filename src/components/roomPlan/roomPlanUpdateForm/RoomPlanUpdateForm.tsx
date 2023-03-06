import { CancelButton, ImageErrorHelperText } from "../../../Styles/Styles.style";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Input,
  FormHelperText
} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
  useState,
  useEffect,
  createRef
} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Compress from "react-image-file-resizer";
import { RoomPlanUpdateFormProps } from "../../../types";
import { updateRoomPlan } from "../../../services/RoomPlansService";

function RoomPlanUpdateForm(props: RoomPlanUpdateFormProps) {
  const {
    projectId,
    currentRoomPlan,
    openUpdate,
    setOpenUpdate,
    handleUpdateRoomPlan,
    setOpenBackdrop
  } = props;

  const [image, _setImage] = useState<any>("");
  const [imageName, setImageName] = useState<string>("No file chosen");
  const [imageValidation, setImageValidation] = useState<boolean>(false);

  useEffect(() => {
    _setImage(currentRoomPlan.image);
    setImageName("");
  }, [openUpdate, currentRoomPlan.image]);

  const inputFileRef = createRef();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Please enter room plan name"),
    xRatio: yup
      .number().typeError("X Ratio must be number")
      .min(0, "X Ratio must be positive")
      .required("Please enter X Ratio"),
    yRatio: yup
      .number().typeError("Y Ratio must be number")
      .min(0, "Y Ratio must be positive")
      .required("Please enter Y Ratio"),
    xOrigin: yup
      .number().typeError("X Origin must be number")
      .required("Please enter X Origin"),
    yOrigin: yup
      .number().typeError("Y Origin must be number")
      .required("Please enter Y Origin")
  });

  const formik = useFormik({
    initialValues: {
      name: currentRoomPlan.name,
      xRatio: currentRoomPlan.xRatio,
      yRatio: currentRoomPlan.yRatio,
      xOrigin: currentRoomPlan.xOrigin,
      yOrigin: currentRoomPlan.yOrigin
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setOpenBackdrop(true);
      const roomPlanData = {
        name: values.name,
        image: image,
        xRatio: Number(values.xRatio),
        yRatio: Number(values.yRatio),
        xOrigin: Number(values.xOrigin),
        yOrigin: Number(values.yOrigin)
      };
      if (image) {
        updateRoomPlan(projectId, currentRoomPlan.id, roomPlanData, handleUpdateRoomPlan, handleClose);
      }
      else {
        setOpenBackdrop(true);
        setImageValidation(true);
      }
    }
  });

  function handleClick(): void {
    setImage(image);
  }

  function setImage(newImage: any): void {
    _setImage(newImage);
  }

  function handleOnChange(event: any): void {
    const newImage = event.target?.files?.[0];
    setImageName(newImage.name);
    setImageValidation(false);

    try {
      Compress.imageFileResizer(
        newImage, // the file from input
        800, // maxwidth
        800, // maxheight
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
  }

  function handleClose(): void {
    setOpenUpdate(false);
    setImageValidation(false);
    formik.resetForm();
    setImage("");
    setImageName("");
  }

  return (
    <Dialog
      open={openUpdate}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>Edit Room plan</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <TextField
            margin="dense"
            id="room-plan-name"
            label="Room Plan name"
            name="name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.errors.name}
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="x-ratio"
                label="X Ratio (m)"
                name="xRatio"
                variant="outlined"
                value={formik.values.xRatio}
                onChange={formik.handleChange}
                error={formik.touched.xRatio && Boolean(formik.errors.xRatio)}
                helperText={formik.errors.xRatio}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="y-ratio"
                label="Y Ratio (m)"
                name="yRatio"
                variant="outlined"
                value={formik.values.yRatio}
                onChange={formik.handleChange}
                error={formik.touched.yRatio && Boolean(formik.errors.yRatio)}
                helperText={formik.errors.yRatio}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="x-origin"
                label="X Origin (m)"
                name="xOrigin"
                variant="outlined"
                value={formik.values.xOrigin}
                onChange={formik.handleChange}
                error={formik.touched.xOrigin && Boolean(formik.errors.xOrigin)}
                helperText={formik.errors.xOrigin}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="y-origin"
                label="Y Origin (m)"
                name="yOrigin"
                variant="outlined"
                value={formik.values.yOrigin}
                onChange={formik.handleChange}
                error={formik.touched.yOrigin && Boolean(formik.errors.yOrigin)}
                helperText={formik.errors.yOrigin}
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
              onClick={handleClick}
              fullWidth
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

export default RoomPlanUpdateForm;