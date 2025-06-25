import React, { useState, useCallback, useRef } from 'react';
import { X, Plus, Text, Image, Video, Heading, Link, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, List, ListOrdered, Quote, VideoIcon, Minus, Maximize2, Minimize2, Check } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';

const ELEMENT_TYPES = [
  { type: 'text', label: 'Texte', icon: <Text /> },
  { type: 'heading', label: 'Titre', icon: <Heading /> },
  { type: 'image', label: 'Image', icon: <Image /> },
  { type: 'video', label: 'Vidéo', icon: <Video /> },
  { type: 'button', label: 'Bouton', icon: <Plus /> },
  { type: 'divider', label: 'Séparateur', icon: <Minus /> },
  { type: 'spacer', label: 'Espaceur', icon: <Maximize2 /> },
  { type: 'inner_section', label: 'Section Intérieure', icon: <Minimize2 /> },
  { type: 'text_editor', label: 'Éditeur de Texte', icon: <AlignLeft /> }
];

export default function CustomComponentConfigPanel({ onSave, onClose }) {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const moveElement = useCallback((dragIndex, hoverIndex) => {
    const newElements = [...elements];
    const draggedElement = newElements[dragIndex];
    newElements.splice(dragIndex, 1);
    if (hoverIndex === null) {
      newElements.push(draggedElement);
    } else {
      newElements.splice(hoverIndex, 0, draggedElement);
    }
    setElements(newElements);
  }, [elements]);

  const handleAddElement = (type) => {
    const newElement = {
      type,
      content: {
        text: '',
        heading: '',
        image: '',
        video: '',
        button: { text: '', link: '' }
      },
      styles: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: '16px',
        margin: '16px',
        borderRadius: '4px',
        textAlign: 'left'
      }
    };
    setElements(prev => [...prev, newElement]);
  };

  const renderElementContent = (element) => {
    switch (element.type) {
      case 'text':
        return (
          <textarea
            id={`text-${element.index}`}
            name={`text-${element.index}`}
            value={element.content.text}
            onChange={(e) => {
              setElements(prev => prev.map((el, i) => 
                i === element.index ? { ...el, content: { ...el.content, text: e.target.value } } : el
              ));
            }}
            className="w-full p-2 border rounded"
            placeholder="Entrez du texte..."
          />
        );
      case 'heading':
        return (
          <input
            id={`heading-${element.index}`}
            name={`heading-${element.index}`}
            type="text"
            value={element.content.heading}
            onChange={(e) => {
              setElements(prev => prev.map((el, i) => 
                i === element.index ? { ...el, content: { ...el.content, heading: e.target.value } } : el
              ));
            }}
            className="w-full p-2 border rounded"
            placeholder="Entrez un titre..."
          />
        );
      case 'image':
        return (
          <input
            id={`image-${element.index}`}
            name={`image-${element.index}`}
            type="text"
            value={element.content.image}
            onChange={(e) => {
              setElements(prev => prev.map((el, i) => 
                i === element.index ? { ...el, content: { ...el.content, image: e.target.value } } : el
              ));
            }}
            className="w-full p-2 border rounded"
            placeholder="URL de l'image..."
          />
        );
      case 'video':
        return (
          <input
            id={`video-${element.index}`}
            name={`video-${element.index}`}
            type="text"
            value={element.content.video}
            onChange={(e) => {
              setElements(prev => prev.map((el, i) => 
                i === element.index ? { ...el, content: { ...el.content, video: e.target.value } } : el
              ));
            }}
            className="w-full p-2 border rounded"
            placeholder="URL de la vidéo..."
          />
        );
      case 'button':
        return (
          <div className="space-y-2">
            <input
              id={`button-text-${element.index}`}
              name={`button-text-${element.index}`}
              type="text"
              value={element.content.button.text}
              onChange={(e) => {
                setElements(prev => prev.map((el, i) => 
                  i === element.index ? { ...el, content: { ...el.content, button: { ...el.content.button, text: e.target.value } } } : el
                ));
              }}
              className="w-full p-2 border rounded"
              placeholder="Texte du bouton..."
            />
            <input
              id={`button-link-${element.index}`}
              name={`button-link-${element.index}`}
              type="text"
              value={element.content.button.link}
              onChange={(e) => {
                setElements(prev => prev.map((el, i) => 
                  i === element.index ? { ...el, content: { ...el.content, button: { ...el.content.button, link: e.target.value } } } : el
                ));
              }}
              className="w-full p-2 border rounded"
              placeholder="Lien du bouton..."
            />
          </div>
        );
      default:
        return null;
    }
  };

  const DraggableElement = ({ element, index, moveElement, renderElementContent }) => {
    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
      type: 'element',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    });

    const [, drop] = useDrop({
      accept: 'element',
      hover: (item, monitor) => {
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

        moveElement(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    });

    drag(drop(ref));

    return (
      <div
        ref={ref}
        className={`p-4 mb-2 rounded-lg border ${isDragging ? 'opacity-50' : ''}`}
      >
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-sm font-medium">{element.label}</h5>
          <button
            onClick={() => {
              moveElement(index, null);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <X size={16} />
          </button>
        </div>
        {/* Contenu spécifique à chaque type d'élément */}
        {renderElementContent(element)}
      </div>
    );
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Configuration du Composant</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Palette d'éléments */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3">Ajouter un élément</h4>
          <div className="grid grid-cols-3 gap-2">
            {ELEMENT_TYPES.map((type) => (
              <button
                key={type.type}
                onClick={() => handleAddElement(type.type)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {type.icon}
                <span className="text-sm">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Liste des éléments */}
        <div className="space-y-4">
          {elements.map((element, index) => (
            <DraggableElement
              key={element.type + index}
              element={{ ...element, index }}
              index={index}
              moveElement={moveElement}
              renderElementContent={renderElementContent}
            />
          ))}
        </div>

        {/* Bouton de sauvegarde */}
        <div className="mt-8">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
            >
              <X className="mr-2" size={16} />
              Annuler
            </button>
            <button
              onClick={() => onSave(elements)}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
            >
              <Check className="mr-2" size={16} />
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
