import React, { useState, useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { X, Plus, Text, Image, Video, Heading, Link, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, List, ListOrdered, Quote, VideoIcon, Minus, Maximize2, Minimize2, Check } from 'lucide-react';

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

const CustomComponentConfigPanel = ({ onSave, onClose }) => {
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
      id: `element-${Date.now()}-${type}`,
      type,
      content: {
        text: '',
        heading: '',
        image: '',
        video: '',
        button: { text: '', link: '' },
        alt: '' // Pour les images
      },
      styles: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: '16px',
        margin: '16px',
        borderRadius: '4px',
        textAlign: 'left',
        fontSize: '16px',
        fontWeight: 'normal',
        lineHeight: '1.5',
        letterSpacing: '0',
        textDecoration: 'none'
      }
    };
    setElements(prev => [...prev, newElement]);
  };

  const refs = {
    text: useRef(null),
    heading: useRef(null),
    image: useRef(null),
    video: useRef(null),
    buttonText: useRef(null),
    buttonLink: useRef(null)
  };

  const handlers = {
    text: useCallback((e, index) => {
      setElements(prev => prev.map((el, i) => 
        i === index ? { ...el, content: { ...el.content, text: e.target.value } } : el
      ));
    }, []),
    heading: useCallback((e, index) => {
      setElements(prev => prev.map((el, i) => 
        i === index ? { ...el, content: { ...el.content, heading: e.target.value } } : el
      ));
    }, []),
    image: useCallback((e, index) => {
      setElements(prev => prev.map((el, i) => 
        i === index ? { ...el, content: { ...el.content, image: e.target.value } } : el
      ));
    }, []),
    video: useCallback((e, index) => {
      setElements(prev => prev.map((el, i) => 
        i === index ? { ...el, content: { ...el.content, video: e.target.value } } : el
      ));
    }, []),
    buttonText: useCallback((e, index) => {
      setElements(prev => prev.map((el, i) => 
        i === index ? { ...el, content: { ...el.content, button: { ...el.content.button, text: e.target.value } } } : el
      ));
    }, []),
    buttonLink: useCallback((e, index) => {
      setElements(prev => prev.map((el, i) => 
        i === index ? { ...el, content: { ...el.content, button: { ...el.content.button, link: e.target.value } } } : el
      ));
    }, [])
  };

  const elementRefs = {
    text: refs.text,
    heading: refs.heading,
    image: refs.image,
    video: refs.video,
    buttonText: refs.buttonText,
    buttonLink: refs.buttonLink
  };

  const elementHandlers = {
    text: handlers.text,
    heading: handlers.heading,
    image: handlers.image,
    video: handlers.video,
    buttonText: handlers.buttonText,
    buttonLink: handlers.buttonLink
  };

  const renderElementContent = (element, index) => {
    switch (element.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <textarea
              ref={elementRefs.text}
              id={`text-${index}`}
              name={`text-${index}`}
              value={element.content.text}
              onChange={(e) => {
                elementHandlers.text(e, index);
                elementRefs.text.current.focus();
              }}
              className="w-full p-2 border rounded"
              placeholder="Entrez du texte..."
            />
            <div className="flex gap-2">
              <select
                value={element.styles.fontSize}
                onChange={(e) => {
                  setElements(prev => prev.map((el, i) => 
                    i === index ? { ...el, styles: { ...el.styles, fontSize: e.target.value } } : el
                  ));
                }}
                className="p-2 border rounded"
              >
                <option value="12px">Petit</option>
                <option value="16px">Normal</option>
                <option value="20px">Grand</option>
              </select>
              <select
                value={element.styles.fontWeight}
                onChange={(e) => {
                  setElements(prev => prev.map((el, i) => 
                    i === index ? { ...el, styles: { ...el.styles, fontWeight: e.target.value } } : el
                  ));
                }}
                className="p-2 border rounded"
              >
                <option value="normal">Normal</option>
                <option value="bold">Gras</option>
                <option value="600">Semi-gras</option>
              </select>
            </div>
          </div>
        );
      case 'heading':
        return (
          <div className="space-y-2">
            <input
              ref={elementRefs.heading}
              id={`heading-${index}`}
              name={`heading-${index}`}
              type="text"
              value={element.content.heading}
              onChange={(e) => {
                elementHandlers.heading(e, index);
                elementRefs.heading.current.focus();
              }}
              className="w-full p-2 border rounded"
              placeholder="Entrez un titre..."
            />
            <div className="flex gap-2">
              <select
                value={element.styles.fontSize}
                onChange={(e) => {
                  setElements(prev => prev.map((el, i) => 
                    i === index ? { ...el, styles: { ...el.styles, fontSize: e.target.value } } : el
                  ));
                }}
                className="p-2 border rounded"
              >
                <option value="24px">Titre 1</option>
                <option value="32px">Titre 2</option>
                <option value="40px">Titre 3</option>
              </select>
              <select
                value={element.styles.fontWeight}
                onChange={(e) => {
                  setElements(prev => prev.map((el, i) => 
                    i === index ? { ...el, styles: { ...el.styles, fontWeight: e.target.value } } : el
                  ));
                }}
                className="p-2 border rounded"
              >
                <option value="bold">Gras</option>
                <option value="600">Semi-gras</option>
              </select>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-2">
            <input
              ref={elementRefs.image}
              id={`image-${index}`}
              name={`image-${index}`}
              type="text"
              value={element.content.image}
              onChange={(e) => {
                elementHandlers.image(e, index);
                elementRefs.image.current.focus();
              }}
              className="w-full p-2 border rounded"
              placeholder="URL de l'image..."
              aria-label="URL de l'image"
            />
            <input
              ref={elementRefs.alt}
              id={`alt-${index}`}
              name={`alt-${index}`}
              type="text"
              value={element.content.alt}
              onChange={(e) => {
                setElements(prev => prev.map((el, i) => 
                  i === index ? { ...el, content: { ...el.content, alt: e.target.value } } : el
                ));
              }}
              className="w-full p-2 border rounded"
              placeholder="Texte alternatif..."
              aria-label="Texte alternatif de l'image"
            />
          </div>
        );
      case 'video':
        return (
          <input
            ref={elementRefs.video}
            id={`video-${index}`}
            name={`video-${index}`}
            type="text"
            value={element.content.video}
            onChange={(e) => {
              elementHandlers.video(e, index);
              elementRefs.video.current.focus();
            }}
            className="w-full p-2 border rounded"
            placeholder="URL de la vidéo..."
            aria-label="URL de la vidéo"
          />
        );
      case 'button':
        return (
          <div className="space-y-2">
            <input
              ref={elementRefs.buttonText}
              id={`button-text-${index}`}
              name={`button-text-${index}`}
              type="text"
              value={element.content.button.text}
              onChange={(e) => {
                elementHandlers.buttonText(e, index);
                elementRefs.buttonText.current.focus();
              }}
              className="w-full p-2 border rounded"
              placeholder="Texte du bouton..."
              aria-label="Texte du bouton"
            />
            <input
              ref={elementRefs.buttonLink}
              id={`button-link-${index}`}
              name={`button-link-${index}`}
              type="text"
              value={element.content.button.link}
              onChange={(e) => {
                elementHandlers.buttonLink(e, index);
                elementRefs.buttonLink.current.focus();
              }}
              className="w-full p-2 border rounded"
              placeholder="Lien du bouton..."
              aria-label="Lien du bouton"
            />
            <div className="flex gap-2">
              <select
                value={element.styles.backgroundColor}
                onChange={(e) => {
                  setElements(prev => prev.map((el, i) => 
                    i === index ? { ...el, styles: { ...el.styles, backgroundColor: e.target.value } } : el
                  ));
                }}
                className="p-2 border rounded"
              >
                <option value="#0070f3">Bleu</option>
                <option value="#2563eb">Bleu foncé</option>
                <option value="#10b981">Vert</option>
                <option value="#f97316">Orange</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleDeleteElement = (index) => {
    setElements(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const component = {
      type: 'custom',
      content: elements,
      styles: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: '16px',
        margin: '16px',
        borderRadius: '4px'
      }
    };
    onSave(component);
  };



  const handleCancel = () => {
    onClose();
  };

  const DragDropElement = ({ element, index, moveElement }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'element',
      item: () => ({
        type: element.type,
        content: element.content,
        styles: element.styles,
      }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'element',
      hover: (item, monitor) => {
        if (!element) return;
        const dragIndex = elements.findIndex((el) => el.type === item.type);
        const hoverIndex = elements.findIndex((el) => el === element);

        if (dragIndex === hoverIndex) return;

        const newElements = [...elements];
        newElements.splice(hoverIndex, 0, newElements.splice(dragIndex, 1)[0]);
        setElements(newElements);
      },
    });

    return (
      <div
        ref={(el) => {
          if (el) {
            drag(drop(el));
          }
        }}
        className={`p-4 border rounded flex items-center justify-between ${
          selectedElement === element ? 'bg-blue-50 border-blue-500' : 'border-gray-200'
        } ${isDragging ? 'opacity-50' : ''}`}
        onClick={() => setSelectedElement(element)}
      >
        <div className="flex items-center gap-4">
          {element.icon}
          <div className="flex-1">
            {renderElementContent(element, index)}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteElement(index);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Configuration du Composant Personnalisé</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleAddElement('text')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Texte
              </button>
              <button
                onClick={() => handleAddElement('heading')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Titre
              </button>
              <button
                onClick={() => handleAddElement('image')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Image
              </button>
              <button
                onClick={() => handleAddElement('video')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Vidéo
              </button>
              <button
                onClick={() => handleAddElement('button')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Bouton
              </button>
              <button
                onClick={() => handleAddElement('separator')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Séparateur
              </button>
              <button
                onClick={() => handleAddElement('spacer')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Espaceur
              </button>
              <button
                onClick={() => handleAddElement('section')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Section Intérieure
              </button>
              <button
                onClick={() => handleAddElement('editor')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Éditeur de Texte
              </button>
            </div>

            <div className="space-y-4">
              {elements.map((element, index) => (
                <DragDropElement
                  key={index}
                  element={element}
                  index={index}
                  moveElement={moveElement}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomComponentConfigPanel;
