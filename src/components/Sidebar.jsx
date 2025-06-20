import React from 'react';
import { Plus, Eye, Code, Palette, Save } from 'lucide-react';
const componentTypes = [
  { type: 'header', label: 'En-tête', icon: '🏠' },
  { type: 'hero', label: 'Section Hero', icon: '⭐' },
  { type: 'features', label: 'Fonctionnalités', icon: '✨' },
  { type: 'testimonials', label: 'Témoignages', icon: '💬' },
  { type: 'cta', label: 'Call to Action', icon: '🎯' },
  { type: 'footer', label: 'Pied de page', icon: '📋' },
];

export default function Sidebar({ 
  onAddComponent, 
  onTogglePreview, 
  onToggleCode, 
  onToggleTheme,
  onSave,
  isPreview,
}) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto shadow-lg">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Landing Builder</h2>
          <p className="text-sm text-gray-600">Créez des pages exceptionnelles</p>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={onTogglePreview}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              isPreview 
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' 
                : 'border-gray-200 hover:border-blue-300 text-gray-700 hover:bg-blue-50'
            }`}
          >
            <Eye size={18} />
            <span className="text-sm font-semibold">Aperçu</span>
          </button>
          
          <button
            onClick={onToggleCode}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-green-300 text-gray-700 hover:bg-green-50 transition-all duration-300 hover:scale-105"
          >
            <Code size={18} />
            <span className="text-sm font-semibold">Code</span>
          </button>
          
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:bg-purple-50 transition-all duration-300 hover:scale-105"
          >
            <Palette size={18} />
            <span className="text-sm font-semibold">Thème</span>
          </button>
          
          <button 
            onClick={onSave}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-orange-300 text-gray-700 hover:bg-orange-50 transition-all duration-300 hover:scale-105"
          >
            <Save size={18} />
            <span className="text-sm font-semibold">Sauver</span>
          </button>
        </div>

        {/* Components */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-4">Ajouter des Composants</h3>
          <div className="space-y-3">
            {componentTypes.map((component) => (
              <button
                key={component.type}
                onClick={() => onAddComponent(component.type)}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all duration-300 group hover:scale-105 hover:shadow-md"
              >
                <Plus size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                <span className="text-2xl">{component.icon}</span>
                <span className="text-sm font-semibold">{component.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Landing Page Builder</p>
            <p className="mt-1">Créé avec ❤️ et React</p>
          </div>
        </div>
      </div>
    </div>
  );
}