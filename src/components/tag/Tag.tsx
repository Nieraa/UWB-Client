import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import { Element, Text } from './Tag.style';

interface TagProps {
  id: string,
  name: string,
  x: number,
  y: number,
}

export const Tag = (props: TagProps) => {
  const tag = props;
  const [x, setX] = useState(tag.x)
  const [y, setY] = useState(tag.y)

  function getTextWidth(text: string, font: string) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      context.font = font || getComputedStyle(document.body).font;
      // console.log(text, context.measureText(text).width / 0.5779);
      if (context.measureText(text).width > context.measureText(`(${x}, ${y})`).width) {
        return context.measureText(text).width / 0.5779
      }
      else {
        return context.measureText(`(${x}, ${y})`).width / 0.5779
      }
    }
    return 0;
  }

  return (
    <Draggable
      defaultPosition={{ x: tag.x, y: tag.y }}
      positionOffset={{x: "50%", y: "calc(50vh - 120px)"}}
      // onStart={(e) => console.log(e)}
      // onDrag={eventHandler}
      onDrag={(e, data) => { setX(data.x); setY(data.y) }}
      // onStop={(event) => console.log(event)}
      scale={1}
    >
      <div>
        <Text textWidth={getTextWidth(tag.name, "regular 16pt Prompt")}>
          {tag.name}<br />
          {`(${x}, ${y})`}
        </Text>
        <Element>
          <FontAwesomeIcon icon={faPlus} />
        </Element>
      </div>
    </Draggable>
  );
};