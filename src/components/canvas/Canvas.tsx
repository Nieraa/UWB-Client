import { Anchor } from '../anchor/Anchor';
import { Tag } from '../tag/Tag';
import {
  TransformComponent,
  TransformWrapper
} from "@pronestor/react-zoom-pan-pinch";
import { useState } from 'react';
import { Hardware, Project } from '../../types';

interface CanvasProps {
  project: Project;
  anchors: Hardware[];
  tags: Hardware[];
}

export const Canvas = (props: CanvasProps) => {
  const { project, anchors, tags } = props;

  const [pannable, setPannable] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>("default");
  const [scale, setScale] = useState<number>(1);

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

  return (
    <TransformWrapper
      initialScale={scale}
      panning={{ disabled: !pannable }}
      doubleClick={{ disabled: true }}
      onZoom={(e) => setScale(e.state.scale)}
      limitToBounds={false}
      centerOnInit
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
  );
};