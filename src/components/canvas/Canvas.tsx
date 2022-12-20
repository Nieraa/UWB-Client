import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor } from '../anchor/Anchor';
import { Tag } from '../tag/Tag';
import {
  AddElementButton,
  ColorBoxButton,
  ColorWrapper
} from './Canvas.style';
import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  MenuList,
  Popover,
  Select,
  styled,
  TextField
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { SketchPicker } from 'react-color';

export const Canvas = () => {
  const [pannable, setPannable] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>("default");
  const [scale, setScale] = useState<number>(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [addType, setAddType] = useState("");
  const [addColor, setAddColor] = useState("#fff");
  const [colors, setColors] = useState(["#667DBB", "#BB6666"]);
  const [group, setGroup] = useState(colors.length + 1);

  const handleClickOpenDialog = (type: string) => {
    setAddType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const anchors = [
    {
      id: "1",
      name: "Anchor 1",
      ssid: "2",
      color: "#667DBB",
      x: 0,
      y: 0
    },
    {
      id: "2",
      name: "Anchor 2",
      ssid: "1",
      color: "#BB6666",
      x: 150,
      y: 350
    },
    {
      id: "3",
      name: "Anchor 3",
      ssid: "2",
      color: "#667DBB",
      x: -150,
      y: 350
    },
    {
      id: "4",
      name: "Anchor 4",
      ssid: "1",
      color: "#BB6666",
      x: -150,
      y: -350
    },
    {
      id: "5",
      name: "Anchor 5",
      ssid: "1",
      color: "#BB6666",
      x: 150,
      y: -350
    },
  ]

  const tags = [
    {
      id: "1",
      name: "Tag 1",
      ssid: "1",
      color: "#BB6666",
      x: -80,
      y: -140
    },
    {
      id: "2",
      name: "Tag 2",
      ssid: "1",
      color: "#BB6666",
      x: 95,
      y: 45
    },
    {
      id: "3",
      name: "Tag 3",
      ssid: "2",
      color: "#667DBB",
      x: -65,
      y: 160
    },
  ]

  const handleChangeColor = (color: { hex: string }) => {
    setAddColor(color.hex);
    const index = colors.findIndex((element) => element.toLowerCase() === color.hex);
    if (index === -1) {
      setGroup(colors.length + 1);
    }
    else {
      setGroup(index + 1);
    }
  };

  onkeydown = function (ke) {
    if (ke.key === " ") {
      setPannable(true)
      if (ke.repeat === true) {
        return
      }
      else {
        setCursor("grab")
      }
      onmousedown = function () {
        setCursor("grabbing")
      }
      onmouseup = function () {
        setCursor("grab")
      }
    }
  }

  onkeyup = function (e) {
    if (e.key === " ") {
      setPannable(false)
      setCursor("default")
    }
  }

  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElColorPicker, setAnchorElColorPicker] = useState(null);

  const handleClickMenu = (event: any) => {
    setAnchorElMenu(event.currentTarget);
  };

  const openMenu = Boolean(anchorElMenu);

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const handleClickColorPicker = (event: any) => {
    setAnchorElColorPicker(event.currentTarget);
  };

  const openColorPicker = Boolean(anchorElColorPicker);

  const handleCloseColorPicker = () => {
    setAnchorElColorPicker(null);
  };

  const handleChangeGroup = (event: any) => {
    setGroup(event.target.value);
    if (event.target.value <= colors.length) {
      setAddColor(colors[event.target.value - 1]);
    }
    else {
      setAddColor("#fff")
    }
  };

  const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[400]),
    backgroundColor: grey[300],
    '&:hover': {
      backgroundColor: grey[400],
    },
  }));

  return (
    <div>
      <AddElementButton onClick={handleClickMenu}>
        <FontAwesomeIcon icon={faPlus} />
      </AddElementButton>
      <Popover
        open={openMenu}
        anchorEl={anchorElMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuList>
          <MenuItem onClick={() => { handleClickOpenDialog("Anchor"); handleCloseMenu() }}>Add anchor</MenuItem>
          <MenuItem onClick={() => { handleClickOpenDialog("Tag"); handleCloseMenu() }}>Add tag</MenuItem>
        </MenuList>
      </Popover>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
      >
        <DialogTitle>Add {addType}</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id={addType.toLowerCase() + "-name"}
            label={addType + " name"}
            fullWidth
            variant="outlined"
            defaultValue="Untitled"
          />
          <ColorWrapper>
            <FormControl style={{ marginRight: 15, minWidth: 100 }}>
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
            <span>Color:</span>
            <ColorBoxButton
              onClick={handleClickColorPicker}
              addColor={group <= colors.length ? colors[group - 1] : addColor}
            />
          </ColorWrapper>
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
            onClick={handleCloseDialog}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <TransformWrapper
        initialScale={scale}
        panning={{ disabled: !pannable }}
        doubleClick={{ disabled: true }}
        onZoom={(e) => setScale(e.state.scale)}
      >
        <TransformComponent>
          <div style={{
            width: "calc(100vw - 300px)",
            height: "calc(100vh - 120px)",
            cursor: cursor,
            // backgroundImage: "url(https://wallpaperaccess.com/full/84248.png)"
          }}>
            {anchors.map((anchor) =>
              <Anchor
                key={anchor.id}
                anchor={anchor}
                disabled={pannable}
                scale={scale}
              />
            )}

            {tags.map((tag) =>
              <Tag
                key={tag.id}
                tag={tag}
                disabled={pannable}
                scale={scale}
              />
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};