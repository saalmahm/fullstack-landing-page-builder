import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function HeaderComponent({ data, onEdit, isPreview, theme }) {
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(data);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSave = () => {
    if (onEdit) onEdit(tempData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempData(data);
    setEditMode(false);
  };

  if (editMode && !isPreview) {
    return (
      <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 text-blue-900">Modifier l'En-tête</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
            <input
              type="text"
              value={tempData.logo}
              onChange={(e) => setTempData({ ...tempData, logo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Navigation (séparés par des virgules)</label>
            <input
              type="text"
              value={tempData.navigation.join(', ')}
              onChange={(e) => setTempData({ ...tempData, navigation: e.target.value.split(', ') })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texte du Bouton CTA</label>
            <input
              type="text"
              value={tempData.ctaText}
              onChange={(e) => setTempData({ ...tempData, ctaText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Sauvegarder
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="bg-white shadow-sm relative" onClick={() => !isPreview && setEditMode(true)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <span 
              className="text-2xl font-bold cursor-pointer"
              style={{ color: theme?.primaryColor || '#3B82F6' }}
            >
              {data.logo}
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {data.navigation.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: theme?.primaryColor || '#3B82F6' }}
            >
              {data.ctaText}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 md:hidden z-50">
          <div className="px-5 pt-5 pb-6">
            <nav className="grid gap-y-8">
              {data.navigation.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="mt-6">
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white"
                style={{ backgroundColor: theme?.primaryColor || '#3B82F6' }}
              >
                {data.ctaText}
              </button>
            </div>
          </div>
        </div>
      )}

      {!isPreview && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 cursor-pointer rounded-lg">
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity">
            Cliquer pour modifier
          </div>
        </div>
      )}
    </header>
  );
}