import React, { useState } from 'react';

export default function ComponentConfigPanel({ data, onSave, onClose }) {
  const [selectedType, setSelectedType] = useState('');
  const [config, setConfig] = useState({
    text: '',
    heading: '',
    image: '',
    video: '',
    button: {
      text: '',
      link: ''
    },
    styles: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      padding: '16px',
      margin: '16px',
      borderRadius: '4px'
    }
  });

  const handleAddComponent = () => {
    if (!selectedType) return;

    const component = {
      id: `custom-${Date.now()}`,
      type: selectedType,
      content: config,
      styles: config.styles
    };

    onSave(component);
    setSelectedType('');
    setConfig({
      text: '',
      heading: '',
      image: '',
      video: '',
      button: {
        text: '',
        link: ''
      },
      styles: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: '16px',
        margin: '16px',
        borderRadius: '4px'
      }
    });
  };

  return (
    <div className="component-config-panel fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Configuration du composant</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Type de composant</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Sélectionnez un type</option>
            <option value="custom">Composant personnalisé</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
          <textarea
            value={config.text}
            onChange={(e) => setConfig({ ...config, text: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Entrez du texte..."
          ></textarea>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            onClick={handleAddComponent}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
