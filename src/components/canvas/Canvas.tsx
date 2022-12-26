import { AddElementButton } from './Canvas.style';
import { Anchor } from '../anchor/Anchor';
import { Tag } from '../tag/Tag';
import { HardwareCreateForm } from '../hardwareCreateFrom/HardwareCreateFrom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  MenuItem,
  MenuList,
  Popover
} from '@mui/material';
import {
  TransformComponent,
  TransformWrapper
} from "@pronestor/react-zoom-pan-pinch";
import { useEffect, useState } from 'react';
import { getColors, getHardwares, getNetworkSsids } from '../../services/ProjectsService';
import { Hardware, Project } from '../../types';

interface CanvasProps {
  project: Project;
}

export const Canvas = (props: CanvasProps) => {
  const { project } = props;
  
  const [addType, setAddType] = useState("");
  const [anchors, setAnchors] = useState<Hardware[]>([]);
  const [tags, setTags] = useState<Hardware[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [group, setGroup] = useState(1);
  const [networkSsids, setNetworkSsids] = useState<string[]>([]);
  const [pannable, setPannable] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>("default");
  const [scale, setScale] = useState<number>(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const openMenu = Boolean(anchorElMenu);

  useEffect(() => {
    getHardwares(project.id, "anchor", setAnchors, false);
    getHardwares(project.id, "tag", setTags, false);
    getColors(project.id, setColors, setGroup);
    getNetworkSsids(project.id, setNetworkSsids);
  }, [])

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

  const handleOpenMenu = (event: any): void => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setAnchorElMenu(null);
  };

  const handleOpenDialog = (type: string): void => {
    setAddType(type);
    setOpenDialog(true);
  };

  return (
    <div>
      <AddElementButton onClick={handleOpenMenu}>
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
          <MenuItem onClick={() => { handleOpenDialog("Anchor"); handleCloseMenu() }}>Add anchor</MenuItem>
          <MenuItem onClick={() => { handleOpenDialog("Tag"); handleCloseMenu() }}>Add tag</MenuItem>
        </MenuList>
      </Popover>
      <HardwareCreateForm
        projectId={project.id}
        addType={addType}
        colors={colors}
        group={group}
        openDialog={openDialog}
        setAnchors={setAnchors}
        setTags={setTags}
        setColors={setColors}
        setGroup={setGroup}
        setNetworkSsids={setNetworkSsids}
        setOpenDialog={setOpenDialog}
      />
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
          }}>
            <img
              width={project.l * 100}
              height={project.w * 100}
              style={{
                position: "absolute",
                top: `calc(50vh - 60px - ${project.w * 50}px)`,
                left: `calc(50vw - 150px - ${project.l * 50}px)`,
                zIndex: 0,
              }}
              src={project.imgUrl}
              alt="" />

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