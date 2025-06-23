import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { api } from '../services/api';

export default function SaveModal({ onClose, pageData }) {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!pageData) {
    console.error('Page data is required');
    return null;
  }

  const handleSave = async () => {
    if (!name.trim()) return;
    
    setIsSaving(true);
    try {
      const page = {
        name: name.trim(),
        components: Array.isArray(pageData.components) ? pageData.components : [],
        theme: pageData.theme || {
          primaryColor: '#3B82F6',
          secondaryColor: '#8B5CF6',
          accentColor: '#F97316',
          backgroundColor: '#FFFFFF',
          textColor: '#000000'
        }
      };
      await api.createPage(page);
      onClose();
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Erreur lors de la sauvegarde de la page. Veuillez réessayer.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sauvegarder la Page</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de la page
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ma super landing page"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Sauvegarde...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Save size={20} className="mr-2" />
                <span>Sauvegarder</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}