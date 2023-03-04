import { CenterPoint } from './Canvas.style';
import AnchorNode from '../anchor/anchorNode/AnchorNode';
import {
  TransformComponent,
  TransformWrapper
} from "@pronestor/react-zoom-pan-pinch";
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { CanvasProps } from '../../types';
import TagNode from '../tag/tagNode/TagNode';

function Canvas(props: CanvasProps) {
  const {
    isPlanner,
    projectId,
    roomPlanId,
    currentRoomPlan,
    anchors,
    tags
  } = props;

  const [pannable, setPannable] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string>("default");
  const [scale, setScale] = useState<number>(1);

  const nodeRef = useRef(null);

  return (
    <TransformWrapper
      initialScale={scale}
      panning={{ disabled: !pannable }}
      doubleClick={{ disabled: true }}
      onPanningStart={() => setCursor("grabbing")}
      onPanningStop={() => setCursor("default")}
      onZoom={(e) => setScale(e.state.scale)}
      minScale={0}
      limitToBounds={false}
      initialPositionX={(window.innerWidth / 2) - (currentRoomPlan.xRatio * 50)}
    >
      <TransformComponent>
        <div style={{
          width: "100vw",
          height: "calc(100vh - 120px)",
          cursor: cursor,
        }}>
          <img
            width={currentRoomPlan.xRatio * 100}
            height={currentRoomPlan.yRatio * 100}
            style={{
              position: "absolute",
              top: `calc(50vh - 60px - ${currentRoomPlan.yRatio * 50}px)`,
              left: `calc(50vw - 150px - ${currentRoomPlan.xRatio * 50}px)`,
              zIndex: 0,
            }}
            src={currentRoomPlan.image}
            alt="" />

          <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x: 0, y: 0 }}
            positionOffset={{ x: `calc(50vw - 170px + ${currentRoomPlan.xOrigin * 100}px)`, y: `calc(50vh - 80px - ${currentRoomPlan.yOrigin * 100}px)` }}
            disabled={true}
            scale={scale}
          >
            <CenterPoint ref={nodeRef}>
              <FontAwesomeIcon icon={faPlus} />
            </CenterPoint>
          </Draggable>

          {anchors.map((anchor) =>
            <AnchorNode
              key={anchor.id}
              isPlanner={isPlanner}
              projectId={projectId}
              roomPlanId={roomPlanId}
              xOrigin={currentRoomPlan.xOrigin}
              yOrigin={currentRoomPlan.yOrigin}
              anchor={anchor}
              scale={scale}
              setPannable={setPannable}
              setCursor={setCursor}
            />
          )}
          {tags && tags.map((tag) =>
            <TagNode
              key={tag.name}
              xOrigin={currentRoomPlan.xOrigin}
              yOrigin={currentRoomPlan.yOrigin}
              tag={tag}
              scale={scale}
            />
          )}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default Canvas;