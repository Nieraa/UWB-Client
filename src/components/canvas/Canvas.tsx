import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor } from '../anchor/Anchor';
import { Tag } from '../tag/Tag';
import { AddElementButton } from './Canvas.style';
import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, MenuList, Popover, styled, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';

export const Canvas = () => {
  const [pannable, setPannable] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>("default");
  const [scale, setScale] = useState<number>(1);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[400]),
    backgroundColor: grey[300],
    '&:hover': {
      backgroundColor: grey[400],
    },
  }));

  return (
    <div>
      <AddElementButton onClick={handleClick}>
        <FontAwesomeIcon icon={faPlus} />
      </AddElementButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
          <MenuItem onClick={() => {handleClickOpenDialog(); handleClose()}}>Add anchor</MenuItem>
          <MenuItem onClick={() => {handleClickOpenDialog(); handleClose()}}>Add tag</MenuItem>
        </MenuList>
      </Popover>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Add anchor</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <CancelButton variant="contained" onClick={handleCloseDialog}>Cancel</CancelButton>
          <Button variant="contained" onClick={handleCloseDialog}>Create</Button>
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
              <Anchor key={anchor.id} anchor={anchor} disabled={pannable} scale={scale} />
            )}

            {tags.map((tag) =>
              <Tag key={tag.id} tag={tag} disabled={pannable} scale={scale} />
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};