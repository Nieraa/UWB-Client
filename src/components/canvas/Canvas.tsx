import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import { Anchor } from '../anchor/Anchor';
import { Tag } from '../tag/Tag';

export const Canvas = () => {
  const anchors = [
    {
      id: "1",
      name: "Anchor 1",
      x: 0,
      y: 0
    },
    {
      id: "2",
      name: "Anchor 2",
      x: 60,
      y: 60
    },
    {
      id: "3",
      name: "Anchor 3",
      x: -60,
      y: -60
    },
    {
      id: "4",
      name: "Anchor 4",
      x: -60,
      y: 60
    },
  ]

  const tags = [
    {
      id: "1",
      name: "Tag 1",
      x: 8,
      y: -20
    },
    {
      id: "2",
      name: "Tag 2",
      x: 12,
      y: 50
    },
    {
      id: "3",
      name: "Tag 3",
      x: 90,
      y: 58
    },
  ]

  return (
    <div>
      {anchors.map((anchor) =>
        <Anchor key={anchor.id} id={anchor.id} name={anchor.name} x={anchor.x} y={anchor.y} />
      )}

      {tags.map((tag) =>
        <Tag key={tag.id} id={tag.id} name={tag.name} x={tag.x} y={tag.y} />
      )}
    </div>
  );
};