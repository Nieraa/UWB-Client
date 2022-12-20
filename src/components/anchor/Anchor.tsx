import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { Element, Text } from './Anchor.style';

interface Anchor {
  id: string,
  name: string,
  ssid: string,
  color: string,
  x: number,
  y: number,
}

interface AnchorProps {
  anchor: Anchor,
  disabled: boolean,
  scale: number,
}

export const Anchor = (props: AnchorProps) => {
  const { anchor, disabled, scale } = props;
  const [x, setX] = useState(anchor.x)
  const [y, setY] = useState(anchor.y)


  function getTextWidth(text: string, font: string) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      context.font = font || getComputedStyle(document.body).font;
      if (context.measureText(text).width > context.measureText(`(${x}, ${y})`).width) {
        return context.measureText(text).width / 0.5779
      }
      else {
        return context.measureText(`(${x}, ${y})`).width / 0.5779
      }
      // console.log(text, context.measureText(text).width / 0.5779);
    }
    return 0;
  }

  return (
    <Draggable
      defaultPosition={{ x: anchor.x, y: -anchor.y }}
      positionOffset={{x: "calc(50% - 20px)", y: "calc(50vh - 80px)"}}
      onDrag={(e, data) => { setX(data.x); setY(data.y) }}
      disabled={disabled}
      scale={scale}
    >
      <div>
        <Text textWidth={getTextWidth(anchor.name, "regular 16pt Prompt")}>
          {anchor.name}<br />
          {`(${x}, ${y})`}
        </Text>
        <Element anchorColor={anchor.color}>
          <FontAwesomeIcon icon={faPlus} />
        </Element>
      </div>
    </Draggable>
  );
};