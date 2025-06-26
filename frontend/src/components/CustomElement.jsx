import React, { useState } from 'react';
import { Plus, X, Text, Image, Video, Heading, Link, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, List, ListOrdered, Quote, VideoIcon, Minimize2, Maximize2 } from 'lucide-react';

const ELEMENT_TYPES = [
  { type: 'text', label: 'Texte', icon: <Text /> },
  { type: 'heading', label: 'Titre', icon: <Heading /> },
  { type: 'image', label: 'Image', icon: <Image /> },
  { type: 'video', label: 'Vidéo', icon: <Video /> },
  { type: 'button', label: 'Bouton', icon: <Link /> },
  { type: 'divider', label: 'Séparateur', icon: <Minimize2 /> },
  { type: 'spacer', label: 'Espaceur', icon: <Maximize2 /> }
];

const CustomElement = ({ element, onRemove, onUpdate }) => {
  const [editing, setEditing] = useState(false);

  const handleUpdate = (type, value) => {
    const newContent = { ...element.content };
    if (type === 'button') {
      newContent[type] = { ...newContent[type], ...value };
    } else {
      newContent[type] = value;
    }
    onUpdate({ ...element, content: newContent });
  };

  const handleStyleUpdate = (style, value) => {
    const newStyles = { ...element.styles };
    newStyles[style] = value;
    onUpdate({ ...element, styles: newStyles });
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {ELEMENT_TYPES.find(t => t.type === element.type)?.icon}
          <span className="font-semibold">{element.type}</span>
        </div>
        <button 
          onClick={onRemove} 
          className="text-red-500 hover:text-red-700"
        >
          <X size={16} />
        </button>
      </div>

      {editing ? (
        <div className="space-y-4">
          {element.type === 'text' && (
            <textarea
              value={element.content?.text || ''}
              onChange={(e) => handleUpdate('text', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Entrez du texte..."
            />
          )}
          {element.type === 'heading' && (
            <input
              value={element.content?.heading || ''}
              onChange={(e) => handleUpdate('heading', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Entrez un titre..."
            />
          )}
          {element.type === 'image' && (
            <div className="space-y-2">
              <input
                value={element.content?.image || ''}
                onChange={(e) => handleUpdate('image', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="URL de l'image..."
              />
              <input
                value={element.content?.alt || ''}
                onChange={(e) => handleUpdate('alt', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Texte alternatif..."
              />
            </div>
          )}
          {element.type === 'video' && (
            <input
              value={element.content?.video || ''}
              onChange={(e) => handleUpdate('video', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="URL de la vidéo..."
            />
          )}
          {element.type === 'button' && (
            <div className="space-y-2">
              <input
                value={element.content?.button?.text || ''}
                onChange={(e) => handleUpdate('button', { text: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Texte du bouton..."
              />
              <input
                value={element.content?.button?.link || ''}
                onChange={(e) => handleUpdate('button', { link: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Lien du bouton..."
              />
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <select
              value={element.styles?.fontSize || '16px'}
              onChange={(e) => handleStyleUpdate('fontSize', e.target.value)}
              className="p-2 border rounded"
            >
              <option value="12px">Petit</option>
              <option value="16px">Normal</option>
              <option value="20px">Grand</option>
            </select>
            <select
              value={element.styles?.fontWeight || 'normal'}
              onChange={(e) => handleStyleUpdate('fontWeight', e.target.value)}
              className="p-2 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="bold">Gras</option>
              <option value="600">Semi-gras</option>
            </select>
            <select
              value={element.styles?.textAlign || 'left'}
              onChange={(e) => handleStyleUpdate('textAlign', e.target.value)}
              className="p-2 border rounded"
            >
              <option value="left">Gauche</option>
              <option value="center">Centre</option>
              <option value="right">Droite</option>
              <option value="justify">Justifié</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="p-4 border rounded">
          {element.type === 'text' && <p style={{ ...element.styles }}>{element.content?.text}</p>}
          {element.type === 'heading' && <h2 style={{ ...element.styles }}>{element.content?.heading}</h2>}
          {element.type === 'image' && element.content?.image && (
            <img 
              src={element.content.image} 
              alt={element.content?.alt || ''}
              className="max-w-full"
            />
          )}
          {element.type === 'video' && element.content?.video && (
            <iframe
              src={element.content.video}
              className="w-full aspect-video"
              allowFullScreen
            />
          )}
          {element.type === 'button' && element.content?.button && (
            <a 
              href={element.content.button.link}
              style={{ ...element.styles }}
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {element.content.button.text}
            </a>
          )}
          {element.type === 'divider' && <hr className="border-gray-300" />}
          {element.type === 'spacer' && <div style={{ height: '2rem' }} />}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setEditing(!editing)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editing ? 'Terminer' : 'Modifier'}
        </button>
      </div>
    </div>
  );
};

export default CustomElement;
