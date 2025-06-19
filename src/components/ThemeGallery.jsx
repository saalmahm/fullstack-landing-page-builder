import React, { useState } from 'react';
import { Palette, Eye, Download } from 'lucide-react';

export default function ThemeGallery({ onSelectTheme }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const themes = [
    {
      id: 1,
      name: 'Océan Profond',
      category: 'business',
      colors: {
        primaryColor: '#1E40AF',
        secondaryColor: '#3B82F6',
        accentColor: '#06B6D4',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937'
      },
      preview: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Coucher de Soleil',
      category: 'creative',
      colors: {
        primaryColor: '#F59E0B',
        secondaryColor: '#DC2626',
        accentColor: '#EF4444',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937'
      },
      preview: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Forêt Mystique',
      category: 'nature',
      colors: {
        primaryColor: '#10B981',
        secondaryColor: '#059669',
        accentColor: '#34D399',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937'
      },
      preview: 'https://images.pexels.com/photos/1496372/pexels-photo-1496372.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Violet Royal',
      category: 'luxury',
      colors: {
        primaryColor: '#8B5CF6',
        secondaryColor: '#7C3AED',
        accentColor: '#A78BFA',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937'
      },
      preview: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      name: 'Minimaliste Noir',
      category: 'minimal',
      colors: {
        primaryColor: '#1F2937',
        secondaryColor: '#374151',
        accentColor: '#6B7280',
        backgroundColor: '#FFFFFF',
        textColor: '#111827'
      },
      preview: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      name: 'Rose Moderne',
      category: 'creative',
      colors: {
        primaryColor: '#EC4899',
        secondaryColor: '#BE185D',
        accentColor: '#F472B6',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937'
      },
      preview: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const categories = [
    { id: 'all', label: 'Tous les Thèmes' },
    { id: 'business', label: 'Business' },
    { id: 'creative', label: 'Créatif' },
    { id: 'nature', label: 'Nature' },
    { id: 'luxury', label: 'Luxe' },
    { id: 'minimal', label: 'Minimaliste' }
  ];

  const filteredThemes = selectedCategory === 'all' 
    ? themes 
    : themes.filter(theme => theme.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Palette className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Galerie de Thèmes</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre collection de thèmes professionnels pour vos landing pages
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredThemes.map((theme) => (
            <div key={theme.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Preview Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={theme.preview} 
                  alt={theme.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>

              {/* Theme Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{theme.name}</h3>
                
                {/* Color Palette */}
                <div className="flex gap-2 mb-4">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: theme.colors.primaryColor }}
                    title="Couleur Primaire"
                  ></div>
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: theme.colors.secondaryColor }}
                    title="Couleur Secondaire"
                  ></div>
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: theme.colors.accentColor }}
                    title="Couleur d'Accent"
                  ></div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
                    <Eye className="mr-2" size={16} />
                    Aperçu
                  </button>
                  <button 
                    onClick={() => onSelectTheme(theme.colors)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Download className="mr-2" size={16} />
                    Utiliser
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredThemes.length === 0 && (
          <div className="text-center py-16">
            <Palette className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun thème trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de sélectionner une autre catégorie
            </p>
          </div>
        )}
      </div>
    </div>
  );
}