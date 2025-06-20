import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Trash2, Move } from 'lucide-react';

export default function DraggableComponent({ id, index, children, onMoveComponent, onDeleteComponent }) {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMoveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div 
      ref={ref} 
      style={{ opacity }} 
      data-handler-id={handlerId}
      className="relative group"
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
          title="Déplacer"
        >
          <Move size={16} className="text-gray-600 cursor-move" />
        </button>
        <button
          onClick={() => onDeleteComponent(id)}
          className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all duration-200 hover:scale-110"
          title="Supprimer"
        >
          <Trash2 size={16} className="text-red-500" />
        </button>
      </div>

      {children}
    </div>
  );
}