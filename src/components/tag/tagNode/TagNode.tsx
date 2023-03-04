import { NodeElement, NodeText } from '../../../Styles/Styles.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Draggable from 'react-draggable';
import { useRef } from 'react';
import { TagNodeProps } from '../../../types';

function TagNode(props: TagNodeProps) {
  const {
    xOrigin,
    yOrigin,
    tag,
    scale,
  } = props;

  const nodeRef = useRef(null);
  const x = tag.x.toFixed(3);
  const y = tag.y.toFixed(3);
  const z = tag.z.toFixed(3);


  function getTextWidth(text: string, font: string): number {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      context.font = font || getComputedStyle(document.body).font;
      if (context.measureText(text).width > context.measureText(`(${x}, ${y}, ${z})`).width) {
        return context.measureText(text).width / 0.5779
      }
      else {
        return context.measureText(`(${x}, ${y}, ${z})`).width / 0.5779
      }
    }
    return 0;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      disabled={true}
      position={{ x: tag.x * 100, y: -tag.y * 100 }}
      positionOffset={{ x: `calc(50vw - 170px + ${xOrigin * 100}px)`, y: `calc(50vh - 80px - ${yOrigin * 100}px)` }}
      scale={scale}
    >
      <div ref={nodeRef}>
        <NodeText textWidth={getTextWidth(tag.name, "regular 16pt Prompt")}>
          {tag.name}<br />
          {`(${x}, ${y}, ${z})`}
        </NodeText>
        <NodeElement nodeType="tag">
          <FontAwesomeIcon icon={faPlus} />
        </NodeElement>
      </div>
    </Draggable>
  );
};

export default TagNode;