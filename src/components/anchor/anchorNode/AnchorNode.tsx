import { Element, Text } from './AnchorNode.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Draggable from 'react-draggable';
import { useRef, useState } from 'react';
import { Node } from '../../../types';

interface AnchorNodeProps {
  xOrigin: number,
  yOrigin: number,
  anchor: Node,
  disabled: boolean,
  scale: number,
}

function AnchorNode(props: AnchorNodeProps) {
  const {
    xOrigin,
    yOrigin,
    anchor,
    disabled,
    scale
  } = props;

  const [x, setX] = useState<number>(anchor.x * 100);
  const [y, setY] = useState<number>(anchor.y * 100);
  const [z, setZ] = useState<number>(anchor.z * 100);

  const nodeRef = useRef(null);


  function getTextWidth(text: string, font: string): number {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      context.font = font || getComputedStyle(document.body).font;
      if (context.measureText(text).width > context.measureText(`(${x / 100}, ${y / 100}, ${z / 100})`).width) {
        return context.measureText(text).width / 0.5779
      }
      else {
        return context.measureText(`(${x / 100}, ${y / 100}, ${z / 100})`).width / 0.5779
      }
    }
    return 0;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: anchor.x * 100, y: -anchor.y * 100 }}
      positionOffset={{ x: `calc(50vw - 170px + ${xOrigin*100}px)`, y: `calc(50vh - 80px - ${yOrigin*100}px)` }}
      onDrag={(e, data) => {
        setX(Math.round(data.x));
        setY(Math.round(-data.y));
      }}
      disabled={disabled}
      scale={scale}
    >
      <div ref={nodeRef}>
        <Text textWidth={getTextWidth(anchor.name, "regular 16pt Prompt")}>
          {anchor.name}<br />
          {`(${x / 100}, ${y / 100}, ${z / 100})`}
        </Text>
        <Element>
          <FontAwesomeIcon icon={faPlus} />
        </Element>
      </div>
    </Draggable>
  );
};

export default AnchorNode;