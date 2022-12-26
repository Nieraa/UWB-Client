import { ColorBoxButton, CancelButton } from "./HardwareCreateFrom.style";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Popover,
} from "@mui/material";
import { SketchPicker } from "react-color";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { createHardware } from "../../services/ProjectsService";
import { Hardware } from "../../types";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Please enter name"),
  ipAddress: yup
    .string()
    .required("Please enter ip address"),
  x: yup
    .number()
    .required(),
  y: yup
    .number()
    .required(),
  networkSsid: yup
    .string()
    .required(),
});

interface HardwareCreateFormProps {
  projectId: string,
  addType: string,
  colors: string[],
  group: number,
  networkSsids: string[],
  openDialog: boolean,
  setAnchors: (anchors: Hardware[]) => void,
  setTags: (tags: Hardware[]) => void,
  setColors: (colors: string[]) => void,
  setGroup: (group: number) => void,
  setNetworkSsids: (networkSsids: string[]) => void,
  setOpenDialog: (openDialog: boolean) => void,

}

export function HardwareCreateForm(props: HardwareCreateFormProps) {
  const {
    projectId,
    addType,
    colors,
    group,
    networkSsids,
    openDialog,
    setAnchors,
    setTags,
    setColors,
    setGroup,
    setNetworkSsids,
    setOpenDialog,
  } = props;

  const [anchorElColorPicker, setAnchorElColorPicker] = useState(null);
  const [addColor, setAddColor] = useState("#ffffff");

  const openColorPicker = Boolean(anchorElColorPicker);

  const formik = useFormik({
    initialValues: {
      name: "Untitled",
      ipAddress: "",
      x: 0,
      y: 0,
      networkSsid: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const hardwareData = {
        name: values.name,
        ipAddress: values.ipAddress,
        x: Number(values.x),
        y: Number(values.y),
        networkSsid: values.networkSsid,
        networkColor: addColor,
      };
      const hasNewColor: boolean = !colors.includes(addColor);
      if (addType.toLowerCase() === "anchor") {
        createHardware(
          projectId,
          addType.toLowerCase(),
          setAnchors,
          hardwareData,
          hasNewColor,
          setColors,
          setGroup,
          setNetworkSsids,
          handleCloseDialog
        );
      }
      else if (addType.toLowerCase() === "tag") {
        createHardware(
          projectId,
          addType.toLowerCase(),
          setTags,
          hardwareData,
          hasNewColor,
          setColors,
          setGroup,
          setNetworkSsids,
          handleCloseDialog
        );
      }
    },
  })

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    formik.resetForm();
    setGroup(colors.length + 1);
    setAddColor("#FFFFFF");
    formik.values.networkSsid = "";
  };

  const handleOpenColorPicker = (event: any): void => {
    setAnchorElColorPicker(event.currentTarget);
  };

  const handleCloseColorPicker = (): void => {
    setAnchorElColorPicker(null);
  };

  const handleChangeColor = (color: { hex: string }): void => {
    setAddColor(color.hex);
    const index = colors.findIndex((element) => element.toLowerCase() === color.hex);
    if (index === -1) {
      setGroup(colors.length + 1);
    }
    else {
      setGroup(index + 1);
      formik.values.networkSsid = networkSsids[index];
    }
  };

  const handleChangeGroup = (event: any): void => {
    setGroup(event.target.value);
    if (event.target.value <= colors.length) {
      setAddColor(colors[event.target.value - 1]);
      formik.values.networkSsid = networkSsids[event.target.value - 1];
    }
    else {
      setAddColor("#ffffff");
      formik.values.networkSsid = "";
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      fullWidth
    >
      <DialogTitle>Add {addType}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <TextField
            margin="dense"
            id={addType.toLowerCase() + "-name"}
            label={addType + " name"}
            name="name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}
            fullWidth
            autoFocus
          />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                margin="dense"
                id="x"
                label="x (m)"
                name="x"
                variant="outlined"
                value={formik.values.x}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.x)}
                helperText={formik.errors.x}
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                margin="dense"
                id="y"
                label="y (m)"
                name="y"
                variant="outlined"
                value={formik.values.y}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.y)}
                helperText={formik.errors.y}
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="ipAddress"
                label="IP Address"
                name="ipAddress"
                variant="outlined"
                value={formik.values.ipAddress}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.ipAddress)}
                helperText={formik.errors.ipAddress}
                autoFocus
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="select-group-label">Group</InputLabel>
                <Select
                  labelId="select-group-label"
                  id="select-group"
                  value={group}
                  label="Group"
                  onChange={handleChangeGroup}
                >
                  {colors.map((color, index) =>
                    <MenuItem value={index + 1}>{index + 1}</MenuItem>
                  )}
                  <MenuItem value={colors.length + 1}>{colors.length + 1}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="network-ssid"
                label="Network ssid"
                name="networkSsid"
                variant="outlined"
                value={formik.values.networkSsid}
                onChange={(e) => {
                  formik.handleChange(e);
                  const index = networkSsids.findIndex((element) => element === e.target.value);
                  if (index === -1) {
                    setGroup(networkSsids.length + 1);
                  }
                  else {
                    setGroup(index + 1);
                    setAddColor(colors[index]);
                  }
                }}
                error={Boolean(formik.errors.networkSsid)}
                helperText={formik.errors.networkSsid}
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <span>Color:</span>
                </Grid>
                <Grid item>
                  <ColorBoxButton
                    onClick={handleOpenColorPicker}
                    type="button"
                    addColor={group <= colors.length ? colors[group - 1] : addColor}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Popover
            open={openColorPicker}
            anchorEl={anchorElColorPicker}
            onClose={handleCloseColorPicker}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <SketchPicker
              color={addColor}
              presetColors={colors}
              onChange={handleChangeColor}
            />
          </Popover>
        </DialogContent>
        <DialogActions>
          <CancelButton
            variant="contained"
            onClick={handleCloseDialog}
          >
            Cancel
          </CancelButton>
          <Button
            variant="contained"
            type="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};