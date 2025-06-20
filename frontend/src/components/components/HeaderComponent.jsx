import React, { useState } from 'react';
import { Menu, X, Upload, Type, Palette, Bold, Italic } from 'lucide-react';

export default function HeaderComponent({ data, onEdit, isPreview, theme }) {
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({
    ...data,
    logoImage: data.logoImage || null,
    logoText: data.logoText || data.logo || '',
    navbarStyle: {
      backgroundColor: data.navbarStyle?.backgroundColor || '#FFFFFF',
    },
    logoStyle: {
      fontSize: '24',
      fontWeight: 'bold',
      color: theme?.primaryColor || '#3B82F6',
      fontStyle: 'normal',
      ...data.logoStyle
    },
    navigationStyle: {
      fontSize: '16',
      fontWeight: 'medium',
      color: '#6B7280',
      hoverColor: '#111827',
      ...data.navigationStyle
    },
    ctaStyle: {
      fontSize: '16',
      fontWeight: 'medium', 
      backgroundColor: theme?.primaryColor || '#3B82F6',
      textColor: '#FFFFFF',
      borderRadius: '8',
      padding: '12',
      ...data.ctaStyle
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSave = () => {
    if (onEdit) onEdit(tempData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempData({
      ...data,
      logoImage: data.logoImage || null,
      logoText: data.logoText || data.logo || '',
      navbarStyle: {
        backgroundColor: data.navbarStyle?.backgroundColor || '#FFFFFF',
      },
      logoStyle: {
        fontSize: '24',
        fontWeight: 'bold',
        color: theme?.primaryColor || '#3B82F6',
        fontStyle: 'normal',
        ...data.logoStyle
      },
      navigationStyle: {
        fontSize: '16',
        fontWeight: 'medium',
        color: '#6B7280',
        hoverColor: '#111827',
        ...data.navigationStyle
      },
      ctaStyle: {
        fontSize: '16',
        fontWeight: 'medium',
        backgroundColor: theme?.primaryColor || '#3B82F6',
        textColor: '#FFFFFF',
        borderRadius: '8',
        padding: '12',
        ...data.ctaStyle
      }
    });
    setEditMode(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempData({ ...tempData, logoImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setTempData({ ...tempData, logoImage: null });
  };

  if (editMode && !isPreview) {
    return (
      <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl max-h-96 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-blue-900">Modifier l'En-tête</h3>
        
        <div className="space-y-6">
          {/* Navbar Background Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Style de la Navbar
            </h4>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur de fond
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={tempData.navbarStyle.backgroundColor}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    navbarStyle: { 
                      ...tempData.navbarStyle, 
                      backgroundColor: e.target.value 
                    }
                  })}
                  className="w-10 h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
                <span className="text-sm text-gray-600">
                  {tempData.navbarStyle.backgroundColor}
                </span>
              </div>
            </div>
          </div>

          {/* Logo Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Configuration du Logo
            </h4>
            
            {/* Logo Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image du Logo</label>
              <div className="flex items-center space-x-4">
                {tempData.logoImage ? (
                  <div className="flex items-center space-x-2">
                    <img 
                      src={tempData.logoImage} 
                      alt="Logo" 
                      className="w-12 h-12 object-contain border rounded"
                    />
                    <button
                      onClick={removeImage}
                      className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded hover:bg-red-200"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
                    <Upload className="w-4 h-4 mr-2" />
                    Choisir une image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Logo Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Texte du Logo</label>
              <input
                type="text"
                value={tempData.logoText}
                onChange={(e) => setTempData({ ...tempData, logoText: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nom de votre marque"
              />
            </div>

            {/* Logo Styling */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taille (px)</label>
                <input
                  type="number"
                  min="12"
                  max="48"
                  value={tempData.logoStyle.fontSize}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    logoStyle: { ...tempData.logoStyle, fontSize: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                <input
                  type="color"
                  value={tempData.logoStyle.color}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    logoStyle: { ...tempData.logoStyle, color: e.target.value }
                  })}
                  className="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={tempData.logoStyle.fontWeight === 'bold'}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    logoStyle: { ...tempData.logoStyle, fontWeight: e.target.checked ? 'bold' : 'normal' }
                  })}
                  className="mr-2"
                />
                <Bold className="w-4 h-4 mr-1" />
                Gras
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={tempData.logoStyle.fontStyle === 'italic'}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    logoStyle: { ...tempData.logoStyle, fontStyle: e.target.checked ? 'italic' : 'normal' }
                  })}
                  className="mr-2"
                />
                <Italic className="w-4 h-4 mr-1" />
                Italique
              </label>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Navigation</h4>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Éléments de menu (séparés par des virgules)</label>
              <input
                type="text"
                value={tempData.navigation.join(', ')}
                onChange={(e) => setTempData({ ...tempData, navigation: e.target.value.split(', ') })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taille</label>
                <select
                  value={tempData.navigationStyle.fontSize}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    navigationStyle: { ...tempData.navigationStyle, fontSize: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                  <option value="18">18px</option>
                  <option value="20">20px</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                <input
                  type="color"
                  value={tempData.navigationStyle.color}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    navigationStyle: { ...tempData.navigationStyle, color: e.target.value }
                  })}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hover</label>
                <input
                  type="color"
                  value={tempData.navigationStyle.hoverColor}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    navigationStyle: { ...tempData.navigationStyle, hoverColor: e.target.value }
                  })}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* CTA Button Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Bouton d'Appel à l'Action</h4>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton</label>
              <input
                type="text"
                value={tempData.ctaText}
                onChange={(e) => setTempData({ ...tempData, ctaText: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de fond</label>
                <input
                  type="color"
                  value={tempData.ctaStyle.backgroundColor}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    ctaStyle: { ...tempData.ctaStyle, backgroundColor: e.target.value }
                  })}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
                <input
                  type="color"
                  value={tempData.ctaStyle.textColor}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    ctaStyle: { ...tempData.ctaStyle, textColor: e.target.value }
                  })}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Style de bordure</label>
                <select
                  value={tempData.ctaStyle.borderRadius}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    ctaStyle: { ...tempData.ctaStyle, borderRadius: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0">Carré (0px)</option>
                  <option value="4">Légèrement arrondi (4px)</option>
                  <option value="8">Arrondi (8px)</option>
                  <option value="12">Très arrondi (12px)</option>
                  <option value="20">Pilule (20px)</option>
                  <option value="50">Rond complet (50px)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taille du bouton</label>
                <select
                  value={tempData.ctaStyle.padding}
                  onChange={(e) => setTempData({ 
                    ...tempData, 
                    ctaStyle: { ...tempData.ctaStyle, padding: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="8">Petit (8px)</option>
                  <option value="10">Compact (10px)</option>
                  <option value="12">Normal (12px)</option>
                  <option value="16">Grand (16px)</option>
                  <option value="20">Très grand (20px)</option>
                </select>
              </div>
            </div>
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
    <header 
      className="shadow-sm relative w-full" 
      style={{ backgroundColor: tempData.navbarStyle.backgroundColor }}
      onClick={() => !isPreview && setEditMode(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center space-x-3 cursor-pointer">
              {tempData.logoImage && (
                <img 
                  src={tempData.logoImage} 
                  alt="Logo" 
                  className="h-8 w-auto object-contain sm:h-9 md:h-10"
                />
              )}
              {tempData.logoText && (
                <span 
                  className="cursor-pointer"
                  style={{ 
                    fontSize: `${tempData.logoStyle.fontSize}px`,
                    fontWeight: tempData.logoStyle.fontWeight,
                    color: tempData.logoStyle.color,
                    fontStyle: tempData.logoStyle.fontStyle
                  }}
                >
                  {tempData.logoText}
                </span>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {tempData.navigation.map((item, index) => (
              <a
                key={index}
                href="#"
                className="transition-colors duration-200 hover:text-gray-900"
                style={{
                  fontSize: `${tempData.navigationStyle.fontSize}px`,
                  fontWeight: tempData.navigationStyle.fontWeight,
                  color: tempData.navigationStyle.color
                }}
                onMouseEnter={(e) => e.target.style.color = tempData.navigationStyle.hoverColor}
                onMouseLeave={(e) => e.target.style.color = tempData.navigationStyle.color}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              className="whitespace-nowrap transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: tempData.ctaStyle.backgroundColor,
                color: tempData.ctaStyle.textColor,
                borderRadius: `${tempData.ctaStyle.borderRadius}px`,
                padding: `${tempData.ctaStyle.padding}px ${parseInt(tempData.ctaStyle.padding) * 1.5}px`,
                fontSize: `${tempData.ctaStyle.fontSize}px`,
                fontWeight: tempData.ctaStyle.fontWeight
              }}
            >
              {tempData.ctaText}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              style={{ backgroundColor: tempData.navbarStyle.backgroundColor }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}
        style={{ backgroundColor: tempData.navbarStyle.backgroundColor }}
      >
        <div className="px-4 pb-4">
          <nav className="grid gap-y-4">
            {tempData.navigation.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block px-3 py-2 rounded-md font-medium hover:bg-gray-50"
                style={{
                  fontSize: `${tempData.navigationStyle.fontSize}px`,
                  color: tempData.navigationStyle.color
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-4 px-3">
            <button
              className="w-full flex items-center justify-center border border-transparent shadow-sm font-medium py-2"
              style={{ 
                backgroundColor: tempData.ctaStyle.backgroundColor,
                color: tempData.ctaStyle.textColor,
                borderRadius: `${tempData.ctaStyle.borderRadius}px`,
                padding: `${tempData.ctaStyle.padding}px`,
                fontSize: `${tempData.ctaStyle.fontSize}px`,
                fontWeight: tempData.ctaStyle.fontWeight
              }}
            >
              {tempData.ctaText}
            </button>
          </div>
        </div>
      </div>

      {/* Edit overlay */}
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