import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import { Anchor } from '../anchor/Anchor';
import { Tag } from '../tag/Tag';
import { AddElementButton } from './Canvas.style';

export const Canvas = () => {
  const anchors = [
    {
      id: "1",
      name: "Anchor 1",
      ssid: "2",
      color: "#667DBB",
      x: 0,
      y: 0
    },
    {
      id: "2",
      name: "Anchor 2",
      ssid: "1",
      color: "#BB6666",
      x: 150,
      y: 350
    },
    {
      id: "3",
      name: "Anchor 3",
      ssid: "2",
      color: "#667DBB",
      x: -150,
      y: 350
    },
    {
      id: "4",
      name: "Anchor 4",
      ssid: "1",
      color: "#BB6666",
      x: -150,
      y: -350
    },
    {
      id: "5",
      name: "Anchor 5",
      ssid: "1",
      color: "#BB6666",
      x: 150,
      y: -350
    },
  ]

  const tags = [
    {
      id: "1",
      name: "Tag 1",
      ssid: "1",
      color: "#BB6666",
      x: -80,
      y: -140
    },
    {
      id: "2",
      name: "Tag 2",
      ssid: "1",
      color: "#BB6666",
      x: 95,
      y: 45
    },
    {
      id: "3",
      name: "Tag 3",
      ssid: "2",
      color: "#667DBB",
      x: -65,
      y: 160
    },
  ]

  function AddToggle() {
    console.log("Add")
  }

  return (
    <div>
      {anchors.map((anchor) =>
        <Anchor key={anchor.id} id={anchor.id} name={anchor.name} x={anchor.x} y={anchor.y} ssid={anchor.ssid} color={anchor.color} />
      )}
      
      {tags.map((tag) =>
        <Tag key={tag.id} id={tag.id} name={tag.name} x={tag.x} y={tag.y} ssid={tag.ssid} color={tag.color} />
      )}
      <AddElementButton onClick={AddToggle}>
        <FontAwesomeIcon icon={faPlus} />
      </AddElementButton>
    </div>
  );
};