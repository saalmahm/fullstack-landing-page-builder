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
          console.error('Invalid custom component data:', component);
          return (
            <div className="p-4 text-red-500">
              Erreur: Les éléments ne sont pas un tableau valide
            </div>
          );
        }

        // Valider et nettoyer les éléments
        const validElements = component.content.elements
          .filter(element => 
            element && typeof element === 'object' && 
            element.type && 
            element.content
          )
          .map(element => {
            if (element.type === 'image') {
              // Valider et nettoyer l'URL de l'image
              const cleanedUrl = validateImageUrl(element.content.url);
              return {
                ...element,
                content: {
                  ...element.content,
                  url: cleanedUrl || '/placeholder-image.png',
                  error: !cleanedUrl
                }
              };
            }
            return element;
          });

        const validStyles = component.styles || {};
        const styleProps = {
          backgroundColor: validStyles.backgroundColor,
          color: validStyles.color,
          padding: validStyles.padding || '16px',
          margin: validStyles.margin || '0',
          borderRadius: validStyles.borderRadius || '0',
          fontFamily: validStyles.fontFamily || 'Inter',
          fontSize: validStyles.fontSize || '16px',
          textAlign: validStyles.textAlign || 'left'
        };

        return (
          <div 
            className="custom-component relative"
            style={styleProps}
            onDoubleClick={handleDoubleClick}
          >
            {editMode && !isPreview && (
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
            )}
            <div className="elements-container space-y-4">
              {validElements.map((element, index) => (
                <div 
                  key={element.id || index}
                  className={`element-${element.type} flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm w-full`}
                  style={element.styles || {}}
                >
                  <div className="flex items-center w-full">
                    <div className="flex-shrink-0">
                      {element.type === 'text' && <icons.text className="w-4 h-4 text-gray-400" />}
                      {element.type === 'heading' && <icons.heading className="w-4 h-4 text-gray-400" />}
                      {element.type === 'image' && <icons.image className="w-4 h-4 text-gray-400" />}
                      {element.type === 'button' && <icons.button className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div className="flex-grow">
                      {element.type === 'text' && (
                        <p className="text-element text-gray-700">{element.content.text}</p>
                      )}
                      {element.type === 'heading' && (
                        <h2 className="heading-element text-lg font-semibold text-gray-900">{element.content.text}</h2>
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
                          href={element.content.link}
                          className="button-element inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                          style={element.styles}
                        >
                          {element.content.text}
                        </a>
                      )}
                    </div>
                  </div>
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