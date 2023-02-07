import { NodeElement, NodeText } from '../../Styles/Styles.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Draggable from 'react-draggable';
import { useRef, useState } from 'react';
import { Node } from '../../types';

interface TagProps {
  xOrigin: number,
  yOrigin: number,
  tag: Node,
  disabled: boolean,
  scale: number,
}

export const Tag = (props: TagProps) => {
  const { 
    xOrigin,
    yOrigin,
    tag, 
    disabled, 
    scale 
  } = props;

  const [x, setX] = useState<number>(tag.x * 100);
  const [y, setY] = useState<number>(tag.y * 100);
  const [z, setZ] = useState<number>(tag.z * 100);

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
      defaultPosition={{ x: tag.x * 100, y: -tag.y * 100 }}
      positionOffset={{ x: `calc(50vw - 170px + ${xOrigin * 100}px)`, y: `calc(50vh - 80px - ${yOrigin * 100}px)` }}
      onDrag={(e, data) => {
        setX(Math.round(data.x));
        setY(Math.round(-data.y));
      }}
      disabled={disabled}
      scale={scale}
    >
      <div ref={nodeRef}>
        <NodeText textWidth={getTextWidth(tag.name, "regular 16pt Prompt")}>
          {tag.name}<br />
          {`(${x / 100}, ${y / 100}, ${z / 100})`}
        </NodeText>
        <NodeElement nodeType="tag">
          <FontAwesomeIcon icon={faPlus} />
        </NodeElement>
      </div>
    </Draggable>
  );
};