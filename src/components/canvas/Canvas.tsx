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
import { RoomPlan, Node } from '../../types';

interface CanvasProps {
  projectId: string;
  roomPlanId: string;
  currentRoomPlan: RoomPlan;
  anchors: Node[];
}

function Canvas(props: CanvasProps) {
  const {
    projectId,
    roomPlanId,
    currentRoomPlan,
    anchors
  } = props;

  const [pannable, setPannable] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>("default");
  const [scale, setScale] = useState<number>(1);

  const nodeRef = useRef(null);

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
              projectId={projectId}
              roomPlanId={roomPlanId}
              xOrigin={currentRoomPlan.xOrigin}
              yOrigin={currentRoomPlan.yOrigin}
              anchor={anchor}
              disabled={pannable}
              scale={scale}
            />
          )}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default Canvas;