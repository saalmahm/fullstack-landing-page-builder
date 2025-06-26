import React, { useState, useCallback } from 'react';
import CustomElement from './CustomElement';

const CustomComponentPanel = ({ isOpen, onClose, onSave }) => {
  const [elements, setElements] = useState([]);

  const addElement = useCallback((type) => {
    const newElement = {
      id: `element-${Date.now()}-${type}`,
      type,
      content: {
        text: '',
        heading: '',
        image: '',
        video: '',
        button: { text: '', link: '' },
        alt: ''
      },
      styles: {
        fontSize: '16px',
        fontWeight: 'normal',
        textAlign: 'left'
      }
    };
    setElements(prev => [...prev, newElement]);
  }, []);

  const updateElement = useCallback((updatedElement) => {
    setElements(prev => 
      prev.map(el => el.id === updatedElement.id ? updatedElement : el)
    );
  }, []);

  const removeElement = useCallback((id) => {
    setElements(prev => prev.filter(el => el.id !== id));
  }, []);

  const handleSave = useCallback(() => {
    const component = {
      type: 'custom',
      content: elements,
      styles: {
        backgroundColor: '#FFFFFF',
        padding: '16px',
        margin: '16px',
        borderRadius: '4px'
      }
    };
    onSave(component);
  }, [elements, onSave]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Composant Personnalisé</h2>

          <div className="mb-4">
            <button
              onClick={() => addElement('text')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              type="button"
            >
              Ajouter Texte
            </button>
            <button
              onClick={() => addElement('heading')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              type="button"
            >
              Ajouter Titre
            </button>
            <button
              onClick={() => addElement('image')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              type="button"
            >
              Ajouter Image
            </button>
            <button
              onClick={() => addElement('video')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              type="button"
            >
              Ajouter Vidéo
            </button>
            <button
              onClick={() => addElement('button')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              type="button"
            >
              Ajouter Bouton
            </button>
            <button
              onClick={() => addElement('divider')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              type="button"
            >
              Ajouter Séparateur
            </button>
            <button
              onClick={() => addElement('spacer')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              type="button"
            >
              Ajouter Espaceur
            </button>
          </div>

          <div className="space-y-4">
            {elements.map((element) => (
              <CustomElement
                key={element.id}
                element={element}
                onUpdate={updateElement}
                onRemove={() => removeElement(element.id)}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => onClose()}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              type="button"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              type="button"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomComponentPanel;
