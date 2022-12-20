import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { Element, Text } from './Tag.style';

interface Tag {
  id: string,
  name: string,
  ssid: string,
  color: string,
  x: number,
  y: number,
}

interface TagProps {
  tag: Tag,
  disabled: boolean,
  scale: number,
}

export const Tag = (props: TagProps) => {
  const { tag, disabled, scale } = props;
  const [x, setX] = useState<number>(tag.x)
  const [y, setY] = useState<number>(tag.y)

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
      defaultPosition={{ x: tag.x, y: -tag.y }}
      positionOffset={{ x: "50%", y: "calc(50vh - 120px)" }}
      onDrag={(e, data) => {
        setX(Number(data.x.toFixed(3)));
        setY(Number(data.y.toFixed(3)));
      }}
      disabled={disabled}
      scale={scale}
    >
      <div>
        <Text textWidth={getTextWidth(tag.name, "regular 16pt Prompt")}>
          {tag.name}<br />
          {`(${x}, ${y})`}
        </Text>
        <Element tagColor={tag.color}>
          <FontAwesomeIcon icon={faPlus} />
        </Element>
      </div>
    </Draggable>
  );
};