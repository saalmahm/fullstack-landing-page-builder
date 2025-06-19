import React from 'react';
import { X } from 'lucide-react';

export default function ThemePanel({ theme, onThemeChange, onClose }) {
  const handleColorChange = (key, value) => {
    onThemeChange({ ...theme, [key]: value });
  };

  const presetThemes = [
    {
      name: 'Océan Bleu',
      colors: {
        primaryColor: '#3B82F6',
        secondaryColor: '#1E40AF',
        accentColor: '#06B6D4',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937'
      }
    },
    {
      name: 'Coucher de Soleil',
      colors: {
        primaryColor: '#F59E0B',
        secondaryColor: '#DC2626',
        accentColor: '#EF4444',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937'
      }
    },
    {
      name: 'Forêt Verte',
      colors: {
        primaryColor: '#10B981',
        secondaryColor: '#059669',
        accentColor: '#34D399',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937'
      }
    },
    {
      name: 'Violet Royal',
      colors: {
        primaryColor: '#8B5CF6',
        secondaryColor: '#7C3AED',
        accentColor: '#A78BFA',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937'
      }
    }
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Personnaliser le Thème</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Thèmes Prédéfinis */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Thèmes Prédéfinis</h3>
          <div className="grid grid-cols-2 gap-3">
            {presetThemes.map((preset) => (
              <button
                key={preset.name}
                onClick={() => onThemeChange(preset.colors)}
                className="p-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200 group"
              >
                <div className="flex gap-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: preset.colors.primaryColor }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: preset.colors.secondaryColor }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: preset.colors.accentColor }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Couleurs Personnalisées */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold text-gray-700">Couleurs Personnalisées</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur Primaire
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur Secondaire
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={theme.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur d'Accent
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={theme.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur de Fond
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={theme.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur du Texte
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.textColor}
                onChange={(e) => handleColorChange('textColor', e.target.value)}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={theme.textColor}
                onChange={(e) => handleColorChange('textColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Aperçu */}
        <div className="mt-8 p-4 rounded-xl border-2 border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Aperçu</h4>
          <div className="space-y-3">
            <div 
              className="p-3 rounded-lg text-white text-sm font-medium text-center"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Couleur Primaire
            </div>
            <div 
              className="p-3 rounded-lg text-white text-sm font-medium text-center"
              style={{ backgroundColor: theme.secondaryColor }}
            >
              Couleur Secondaire
            </div>
            <div 
              className="p-3 rounded-lg text-white text-sm font-medium text-center"
              style={{ backgroundColor: theme.accentColor }}
            >
              Couleur d'Accent
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}