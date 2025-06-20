import React, { useState } from 'react';
import { Play, Upload, Type, Palette, Bold, Italic, AlignLeft, AlignCenter, Eye } from 'lucide-react';

export default function HeroComponent({ data, onEdit, isPreview, theme }) {  const [editMode, setEditMode] = useState(false);
  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';
  const [tempData, setTempData] = useState({
    ...data,
    heroImage: data.heroImage || data.image || '',
    backgroundType: data.backgroundType || 'image', // 'image', 'gradient', 'solid'
    backgroundColor: data.backgroundColor || '#FFFFFF',
    gradientColors: data.gradientColors || ['#3B82F6', '#8B5CF6'],
    gradientDirection: data.gradientDirection || 'to-r',
    titleStyle: {
      fontSize: '48',
      fontWeight: 'extrabold',
      color: '#111827',
      fontStyle: 'normal',
      textAlign: 'left',
      lineHeight: '1.1',
      ...data.titleStyle
    },
    subtitleStyle: {
      fontSize: '20',
      fontWeight: 'normal',
      color: '#6B7280',
      fontStyle: 'normal',
      textAlign: 'left',
      lineHeight: '1.6',
      ...data.subtitleStyle
    },
    primaryButtonStyle: {
      backgroundColor: theme?.primaryColor || '#3B82F6',
      textColor: '#FFFFFF',
      fontSize: '18',
      fontWeight: 'medium',
      borderRadius: '8',
      padding: '16',
      ...data.primaryButtonStyle
    },
    secondaryButtonStyle: {
      backgroundColor: 'transparent',
      textColor: '#374151',
      borderColor: '#D1D5DB',
      fontSize: '18',
      fontWeight: 'medium',
      borderRadius: '8',
      padding: '16',
      ...data.secondaryButtonStyle
    },
    showSecondaryButton: data.showSecondaryButton !== false,
    secondaryButtonText: data.secondaryButtonText || 'Voir démo',
    layout: data.layout || 'split', // 'split', 'centered', 'image-left'
    contentAlignment: data.contentAlignment || 'left'
  });

  const handleSave = () => {
    if (onEdit) onEdit(tempData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempData({
      ...data,
      heroImage: data.heroImage || data.image || '',
      backgroundType: data.backgroundType || 'image',
      backgroundColor: data.backgroundColor || '#FFFFFF',
      gradientColors: data.gradientColors || ['#3B82F6', '#8B5CF6'],
      gradientDirection: data.gradientDirection || 'to-r',
      titleStyle: {
        fontSize: '48',
        fontWeight: 'extrabold',
        color: '#111827',
        fontStyle: 'normal',
        textAlign: 'left',
        lineHeight: '1.1',
        ...data.titleStyle
      },
      subtitleStyle: {
        fontSize: '20',
        fontWeight: 'normal',
        color: '#6B7280',
        fontStyle: 'normal',
        textAlign: 'left',
        lineHeight: '1.6',
        ...data.subtitleStyle
      },
      primaryButtonStyle: {
        backgroundColor: theme?.primaryColor || '#3B82F6',
        textColor: '#FFFFFF',
        fontSize: '18',
        fontWeight: 'medium',
        borderRadius: '8',
        padding: '16',
        ...data.primaryButtonStyle
      },
      secondaryButtonStyle: {
        backgroundColor: 'transparent',
        textColor: '#374151',
        borderColor: '#D1D5DB',
        fontSize: '18',
        fontWeight: 'medium',
        borderRadius: '8',
        padding: '16',
        ...data.secondaryButtonStyle
      },
      showSecondaryButton: data.showSecondaryButton !== false,
      secondaryButtonText: data.secondaryButtonText || 'Voir démo',
      layout: data.layout || 'split',
      contentAlignment: data.contentAlignment || 'left'
    });
    setEditMode(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTempData({ ...tempData, heroImage: file });
    }
  };

  const removeImage = () => {
    setTempData({ ...tempData, heroImage: '' });
  };

  const getBackgroundStyle = () => {
    switch (tempData.backgroundType) {
      case 'solid':
        return { backgroundColor: tempData.backgroundColor };
      case 'gradient':
        return {
          background: `linear-gradient(${tempData.gradientDirection}, ${tempData.gradientColors[0]}, ${tempData.gradientColors[1]})`
        };
      default:
        return { backgroundColor: '#FFFFFF' };
    }
  };

  if (editMode && !isPreview) {
    return (
      <div className="p-6 bg-blue-50 border-2 border-green-200 rounded-xl max-h-96 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-green-900">Modifier la Section Hero</h3>

        <div className="space-y-6">
          {/* Layout Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Disposition et Alignement</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Disposition</label>
                <select
                  value={tempData.layout}
                  onChange={(e) => setTempData({ ...tempData, layout: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="split">Image à droite</option>
                  <option value="image-left">Image à gauche</option>
                  <option value="centered">Centré</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alignement du contenu</label>
                <select
                  value={tempData.contentAlignment}
                  onChange={(e) => setTempData({ ...tempData, contentAlignment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="left">Gauche</option>
                  <option value="center">Centré</option>
                </select>
              </div>
            </div>
          </div>

          {/* Background Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Arrière-plan</h4>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type d'arrière-plan</label>
              <select
                value={tempData.backgroundType}
                onChange={(e) => setTempData({ ...tempData, backgroundType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="image">Image uniquement</option>
                <option value="solid">Couleur unie</option>
                <option value="gradient">Dégradé</option>
              </select>
            </div>

            {tempData.backgroundType === 'solid' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de fond</label>
                <input
                  type="color"
                  value={tempData.backgroundColor}
                  onChange={(e) => setTempData({ ...tempData, backgroundColor: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            {tempData.backgroundType === 'gradient' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur 1</label>
                    <input
                      type="color"
                      value={tempData.gradientColors[0]}
                      onChange={(e) => setTempData({
                        ...tempData,
                        gradientColors: [e.target.value, tempData.gradientColors[1]]
                      })}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur 2</label>
                    <input
                      type="color"
                      value={tempData.gradientColors[1]}
                      onChange={(e) => setTempData({
                        ...tempData,
                        gradientColors: [tempData.gradientColors[0], e.target.value]
                      })}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
                  <select
                    value={tempData.gradientDirection}
                    onChange={(e) => setTempData({ ...tempData, gradientDirection: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="to-r">Horizontal (gauche → droite)</option>
                    <option value="to-l">Horizontal (droite → gauche)</option>
                    <option value="to-b">Vertical (haut → bas)</option>
                    <option value="to-t">Vertical (bas → haut)</option>
                    <option value="to-br">Diagonal (↘)</option>
                    <option value="to-bl">Diagonal (↙)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Image Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Image Hero</h4>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="space-y-3">
                {tempData.heroImage ? (
                  <div className="flex items-center space-x-4">
                    <img
                      src={typeof tempData.heroImage === 'string' ? tempData.heroImage : URL.createObjectURL(tempData.heroImage)}
                      alt="Hero"
                      className="w-20 h-12 object-cover border rounded"
                    />
                    <button
                      onClick={removeImage}
                      className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
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
                <input
                  type="url"
                  value={tempData.heroImage}
                  onChange={(e) => setTempData({ ...tempData, heroImage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ou entrez une URL d'image"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Contenu</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre Principal</label>
                <input
                  type="text"
                  value={tempData.title}
                  onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                <textarea
                  value={tempData.subtitle}
                  onChange={(e) => setTempData({ ...tempData, subtitle: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Title Styling */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Style du Titre
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taille (px)</label>
                <input
                  type="number"
                  min="24"
                  max="80"
                  value={tempData.titleStyle.fontSize}
                  onChange={(e) => setTempData({
                    ...tempData,
                    titleStyle: { ...tempData.titleStyle, fontSize: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                <input
                  type="color"
                  value={tempData.titleStyle.color}
                  onChange={(e) => setTempData({
                    ...tempData,
                    titleStyle: { ...tempData.titleStyle, color: e.target.value }
                  })}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={tempData.titleStyle.fontWeight === 'bold' || tempData.titleStyle.fontWeight === 'extrabold'}
                  onChange={(e) => setTempData({
                    ...tempData,
                    titleStyle: { ...tempData.titleStyle, fontWeight: e.target.checked ? 'extrabold' : 'normal' }
                  })}
                  className="mr-2"
                />
                <Bold className="w-4 h-4 mr-1" />
                Gras
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={tempData.titleStyle.fontStyle === 'italic'}
                  onChange={(e) => setTempData({
                    ...tempData,
                    titleStyle: { ...tempData.titleStyle, fontStyle: e.target.checked ? 'italic' : 'normal' }
                  })}
                  className="mr-2"
                />
                <Italic className="w-4 h-4 mr-1" />
                Italique
              </label>
            </div>
          </div>

          {/* Subtitle Styling */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Style du Sous-titre</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taille (px)</label>
                <input
                  type="number"
                  min="14"
                  max="32"
                  value={tempData.subtitleStyle.fontSize}
                  onChange={(e) => setTempData({
                    ...tempData,
                    subtitleStyle: { ...tempData.subtitleStyle, fontSize: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                <input
                  type="color"
                  value={tempData.subtitleStyle.color}
                  onChange={(e) => setTempData({
                    ...tempData,
                    subtitleStyle: { ...tempData.subtitleStyle, color: e.target.value }
                  })}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Boutons d'Action</h4>

            {/* Primary Button */}
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-3">Bouton Principal</h5>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Texte</label>
                <input
                  type="text"
                  value={tempData.ctaText}
                  onChange={(e) => setTempData({ ...tempData, ctaText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de fond</label>
                  <input
                    type="color"
                    value={tempData.primaryButtonStyle.backgroundColor}
                    onChange={(e) => setTempData({
                      ...tempData,
                      primaryButtonStyle: { ...tempData.primaryButtonStyle, backgroundColor: e.target.value }
                    })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
                  <input
                    type="color"
                    value={tempData.primaryButtonStyle.textColor}
                    onChange={(e) => setTempData({
                      ...tempData,
                      primaryButtonStyle: { ...tempData.primaryButtonStyle, textColor: e.target.value }
                    })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Secondary Button */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-800">Bouton Secondaire</h5>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={tempData.showSecondaryButton}
                    onChange={(e) => setTempData({ ...tempData, showSecondaryButton: e.target.checked })}
                    className="mr-2"
                  />
                  <Eye className="w-4 h-4 mr-1" />
                  Afficher
                </label>
              </div>

              {tempData.showSecondaryButton && (
                <>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texte</label>
                    <input
                      type="text"
                      value={tempData.secondaryButtonText}
                      onChange={(e) => setTempData({ ...tempData, secondaryButtonText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
                      <input
                        type="color"
                        value={tempData.secondaryButtonStyle.textColor}
                        onChange={(e) => setTempData({
                          ...tempData,
                          secondaryButtonStyle: { ...tempData.secondaryButtonStyle, textColor: e.target.value }
                        })}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de bordure</label>
                      <input
                        type="color"
                        value={tempData.secondaryButtonStyle.borderColor}
                        onChange={(e) => setTempData({
                          ...tempData,
                          secondaryButtonStyle: { ...tempData.secondaryButtonStyle, borderColor: e.target.value }
                        })}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </>
              )}
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

  // Render the hero section
  const renderContent = () => (
    <div className={`${tempData.contentAlignment === 'center' ? 'text-center' : 'text-left'} ${tempData.layout === 'centered' ? 'mx-auto max-w-4xl' : ''}`}>
      <h1
        className="tracking-tight leading-tight"
        style={{
          fontSize: `${tempData.titleStyle.fontSize}px`,
          fontWeight: tempData.titleStyle.fontWeight,
          color: tempData.titleStyle.color,
          fontStyle: tempData.titleStyle.fontStyle,
          lineHeight: tempData.titleStyle.lineHeight
        }}
      >
        {tempData.title}
      </h1>
      <p
        className="mt-6 max-w-2xl"
        style={{
          fontSize: `${tempData.subtitleStyle.fontSize}px`,
          fontWeight: tempData.subtitleStyle.fontWeight,
          color: tempData.subtitleStyle.color,
          fontStyle: tempData.subtitleStyle.fontStyle,
          lineHeight: tempData.subtitleStyle.lineHeight
        }}
      >
        {tempData.subtitle}
      </p>
      <div className={`mt-8 flex flex-col sm:flex-row gap-4 ${tempData.contentAlignment === 'center' ? 'justify-center' : ''}`}>
        <button
          className="inline-flex items-center justify-center font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg"
          style={{
            backgroundColor: tempData.primaryButtonStyle.backgroundColor,
            color: tempData.primaryButtonStyle.textColor,
            borderRadius: `${tempData.primaryButtonStyle.borderRadius}px`,
            padding: `${tempData.primaryButtonStyle.padding}px ${parseInt(tempData.primaryButtonStyle.padding) * 1.5}px`,
            fontSize: `${tempData.primaryButtonStyle.fontSize}px`,
            fontWeight: tempData.primaryButtonStyle.fontWeight
          }}
        >
          {tempData.ctaText}
        </button>
        {tempData.showSecondaryButton && (
          <button
            className="inline-flex items-center justify-center font-medium transition-all duration-200 hover:bg-gray-50 border-2"
            style={{
              color: tempData.secondaryButtonStyle.textColor,
              borderColor: tempData.secondaryButtonStyle.borderColor,
              borderRadius: `${tempData.secondaryButtonStyle.borderRadius}px`,
              padding: `${tempData.secondaryButtonStyle.padding}px ${parseInt(tempData.secondaryButtonStyle.padding) * 1.5}px`,
              fontSize: `${tempData.secondaryButtonStyle.fontSize}px`,
              fontWeight: tempData.secondaryButtonStyle.fontWeight,
              backgroundColor: tempData.secondaryButtonStyle.backgroundColor
            }}
          >
            <Play className="mr-2" size={20} />
            {tempData.secondaryButtonText}
          </button>
        )}
      </div>
    </div>
  );

const renderImage = () => (
  tempData.heroImage && (
    <div className={`${tempData.layout === 'centered' ? 'mt-12' : 'lg:w-1/2'}`}>
      <img
        className={`object-cover rounded-lg ${
          tempData.layout === 'centered' 
            ? 'w-full h-64 sm:h-80 md:h-96 mx-auto' 
            : 'w-full h-56 sm:h-72 md:h-96 lg:h-full'
        }`}
        src={typeof tempData.heroImage === 'string' ? tempData.heroImage : URL.createObjectURL(tempData.heroImage)}
        alt="Hero"
      />
    </div>
  )
);

  return (
    <section
      className="relative overflow-hidden py-16 lg:py-24"
      style={getBackgroundStyle()}
      onClick={() => !isPreview && setEditMode(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {tempData.layout === 'centered' ? (
          <div className="text-center">
            {renderContent()}
            {renderImage()}
          </div>
        ) : (
          <div className={`flex flex-col ${tempData.layout === 'image-left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
            <div className="lg:w-1/2">
              {renderContent()}
            </div>
            {renderImage()}
          </div>
        )}
      </div>

      {!isPreview && (
        <div className="absolute inset-0  bg-blue-500 bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 cursor-pointer rounded-lg">
          <div className="absolute top-2 left-2  bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity">
            Cliquer pour modifier
          </div>
        </div>
      )}
    </section>
  );
}