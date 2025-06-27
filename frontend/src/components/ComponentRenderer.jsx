import React, { useState, useEffect } from 'react';
import { isValidUrl } from '../utils/urlValidator';
import HeaderComponent from './components/HeaderComponent';
import HeroComponent from './components/HeroComponent';
import FeaturesComponent from './components/FeaturesComponent';
import TestimonialsComponent from './components/TestimonialsComponent';
import CTAComponent from './components/CTAComponent';
import FooterComponent from './components/FooterComponent';
import { Text, Heading, Image, Plus, Palette, AlertTriangle } from 'lucide-react';

const icons = {
  text: Text,
  heading: Heading,
  image: Image,
  button: Plus
};

// Fonction pour valider et nettoyer les URLs d'images
const validateImageUrl = (url) => {
  if (!url) return null;
  
  // Vérifier si c'est une URL valide
  if (!isValidUrl(url)) {
    console.warn('URL invalide:', url);
    return null;
  }

  // Nettoyer l'URL
  const cleanedUrl = url.trim();
  
  // Vérifier si c'est une URL externe
  const isExternal = !cleanedUrl.startsWith('/') && !cleanedUrl.startsWith('http');
  if (isExternal) {
    console.warn('URL externe non sécurisée:', url);
    return null;
  }

  return cleanedUrl;
};

function ComponentRenderer({ component, onEdit, isPreview = false, theme }) {
  const [editMode, setEditMode] = useState(false);
  const [tempContent, setTempContent] = useState(component.content);

  const handleSave = () => {
    if (onEdit) onEdit(component.id, tempContent);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempContent(component.content);
    setEditMode(false);
  };

  const handleDoubleClick = () => {
    if (!isPreview) {
      setEditMode(true);
    }
  };

  const handleElementChange = (index, field, value) => {
    const newElements = [...tempContent.elements];
    newElements[index] = { ...newElements[index], [field]: value };
    setTempContent({ ...tempContent, elements: newElements });
  };

  const handleStyleChange = (field, value) => {
    setTempContent({
      ...tempContent,
      styles: {
        ...tempContent.styles,
        [field]: value
      }
    });
  };

  const renderComponent = () => {
    const commonProps = {
      data: editMode ? tempContent : component.content,
      onEdit: onEdit ? (content) => onEdit(component.id, content) : undefined,
      isPreview,
      theme,
    };

    switch (component.type) {
      case 'header':
        return <HeaderComponent {...commonProps} />;
      case 'hero':
        return <HeroComponent {...commonProps} />;
      case 'features':
        return <FeaturesComponent {...commonProps} />;
      case 'testimonials':
        return <TestimonialsComponent {...commonProps} />;
      case 'cta':
        return <CTAComponent {...commonProps} />;
      case 'footer':
        return <FooterComponent {...commonProps} />;
      case 'custom':
        if (!component.content || typeof component.content !== 'object' || 
            !component.content.elements || !Array.isArray(component.content.elements)) {
          return null;
        }

        const validElements = component.content.elements.map(element => ({
          ...element,
          content: {
            ...element.content,
            text: element.content.text || '',
            url: validateImageUrl(element.content.url),
            alt: element.content.alt || '',
            error: !element.content.url || !isValidUrl(element.content.url)
          },
          styles: {
            ...element.styles,
            fontSize: parseInt(element.styles?.fontSize) || 16,
            fontWeight: element.styles?.fontWeight || 'normal',
            color: element.styles?.color || '#333',
            backgroundColor: element.styles?.backgroundColor || 'transparent',
            padding: element.styles?.padding || '8px',
            margin: element.styles?.margin || '0',
            borderRadius: element.styles?.borderRadius || '0',
            textAlign: element.styles?.textAlign || 'left'
          }
        }));

        const validStyles = {
          backgroundColor: component.content.styles?.backgroundColor || '#FFFFFF',
          padding: component.content.styles?.padding || '16px',
          margin: component.content.styles?.margin || '0',
          borderRadius: component.content.styles?.borderRadius || '0',
          fontSize: parseInt(component.content.styles?.fontSize) || 16,
          textAlign: component.content.styles?.textAlign || 'left'
        };

        // Convertir fontSize en string avec unité px pour le style
        const styleProps = {
          ...validStyles,
          fontSize: `${validStyles.fontSize}px`
        };

        if (editMode && !isPreview) {
          return (
            <div 
              className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl max-h-96 overflow-y-auto"
              onDoubleClick={(e) => {
                e.stopPropagation();
                setEditMode(false);
              }}
            >
              <h3 className="text-lg font-semibold mb-4 text-blue-900">Modifier le Composant Personnalisé</h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-3">Éléments du Composant</h4>
                  <div className="space-y-4">
                    {validElements.map((element, index) => (
                      <div key={element.id || index} className="border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          {element.type === 'text' && <Text className="w-4 h-4 text-gray-400" />}
                          {element.type === 'heading' && <Heading className="w-4 h-4 text-gray-400" />}
                          {element.type === 'image' && <Image className="w-4 h-4 text-gray-400" />}
                          <span className="font-medium">{element.type.charAt(0).toUpperCase() + element.type.slice(1)}</span>
                        </div>
                        <div className="flex items-center w-full">
                          <div className="flex-shrink-0">
                            {element.type === 'text' && <Text className="w-4 h-4 text-gray-400" />}
                            {element.type === 'heading' && <Heading className="w-4 h-4 text-gray-400" />}
                            {element.type === 'image' && <Image className="w-4 h-4 text-gray-400" />}
                            {element.type === 'button' && <Plus className="w-4 h-4 text-gray-400" />}
                          </div>
                          <div className="flex-grow">
                            {element.type === 'text' && (
                              <input
                                type="text"
                                value={element.content.text}
                                onChange={(e) => handleElementChange(index, 'text', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Saisissez du texte"
                              />
                            )}
                            {element.type === 'heading' && (
                              <input
                                type="text"
                                value={element.content.text}
                                onChange={(e) => handleElementChange(index, 'text', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Saisissez un titre"
                              />
                            )}
                            {element.type === 'image' && (
                              <div className="relative">
                                <div className="absolute inset-0 bg-gray-200 rounded-lg">
                                  <img 
                                    src={element.content.url} 
                                    alt={element.content.alt} 
                                    className="image-element rounded-lg max-w-full max-h-[300px] object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = '/placeholder-image.png';
                                      e.currentTarget.style.opacity = '0.5';
                                      e.currentTarget.title = 'Image non disponible';
                                    }}
                                  />
                                  {element.content.error && (
                                    <AlertTriangle className="absolute top-2 right-2 w-5 h-5 text-red-500" title="URL invalide" />
                                  )}
                                </div>
                                <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                  <span className="text-white text-sm">{element.content.alt || 'Image'}</span>
                                </div>
                              </div>
                            )}
                            {element.type === 'button' && (
                              <input
                                type="text"
                                value={element.content.text}
                                onChange={(e) => handleElementChange(index, 'text', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Texte du bouton"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-3">Style Global</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de fond</label>
                      <input
                        type="color"
                        value={validStyles.backgroundColor}
                        onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alignement du texte</label>
                      <select
                        value={validStyles.textAlign}
                        onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="left">Gauche</option>
                        <option value="center">Centre</option>
                        <option value="right">Droite</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div 
            className="custom-component relative"
            style={styleProps}
            onDoubleClick={(e) => {
              e.stopPropagation();
              setEditMode(true);
            }}
          >
            <div className="elements-container space-y-4">
              {validElements.map((element, index) => (
                <div key={element.id || index} className={`element-${element.type} flex items-center gap-4`}>
                  {element.type === 'text' && (
                    <p className="text-element" style={element.styles}>{element.content.text}</p>
                  )}
                  {element.type === 'heading' && (
                    <h2 className="heading-element" style={element.styles}>{element.content.text}</h2>
                  )}
                  {element.type === 'image' && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gray-200 rounded-lg">
                        <img 
                          src={element.content.url} 
                          alt={element.content.alt} 
                          className="image-element rounded-lg max-w-full max-h-[300px] object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-image.png';
                            e.currentTarget.style.opacity = '0.5';
                            e.currentTarget.title = 'Image non disponible';
                          }}
                        />
                        {element.content.error && (
                          <AlertTriangle className="absolute top-2 right-2 w-5 h-5 text-red-500" title="URL invalide" />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="text-white text-sm">{element.content.alt || 'Image'}</span>
                      </div>
                    </div>
                  )}
                  {element.type === 'button' && (
                    <a 
                      href="#"
                      className="button-element inline-flex items-center px-4 py-2 rounded-lg"
                      style={element.styles}
                    >
                      {element.content.text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="component-wrapper">
      {renderComponent()}
    </div>
  );
};

export default ComponentRenderer;