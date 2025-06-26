import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import HeroComponent from './components/HeroComponent';
import FeaturesComponent from './components/FeaturesComponent';
import TestimonialsComponent from './components/TestimonialsComponent';
import CTAComponent from './components/CTAComponent';
import FooterComponent from './components/FooterComponent';
import { Text, Heading, Image, Plus } from 'lucide-react';

const icons = {
  text: Text,
  heading: Heading,
  image: Image,
  button: Plus
};

export default function ComponentRenderer({ component, onEdit, isPreview = false, theme }) {
  const renderComponent = () => {
    const commonProps = {
      data: component.content,
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
        // Vérifier si le contenu est un objet valide avec une propriété elements
        if (!component.content || typeof component.content !== 'object' || 
            !component.content.elements || !Array.isArray(component.content.elements)) {
          console.error('Invalid custom component data:', component);
          return (
            <div className="p-4 text-red-500">
              Erreur: Les éléments ne sont pas un tableau valide
            </div>
          );
        }

        // Vérifier si les éléments sont valides
        const validElements = component.content.elements.filter(element => 
          element && typeof element === 'object' && 
          element.type && 
          element.content
        );

        // Vérifier si le composant a des styles valides
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
            className="custom-component"
            style={styleProps}
          >
            {validElements.map((element, index) => (
              <div 
                key={element.id || index}
                className={`element-${element.type}`}
                style={element.styles || {}}
              >
                {element.type === 'text' && (
                  <div className="flex items-center gap-2 mb-2">
                    <icons.text className="w-4 h-4 text-gray-400" />
                    <p className="text-element">{element.content.text}</p>
                  </div>
                )}
                {element.type === 'heading' && (
                  <div className="flex items-center gap-2 mb-2">
                    <icons.heading className="w-4 h-4 text-gray-400" />
                    <h2 className="heading-element">{element.content.text}</h2>
                  </div>
                )}
                {element.type === 'image' && (
                  <div className="flex items-center gap-2 mb-2">
                    <icons.image className="w-4 h-4 text-gray-400" />
                    <img 
                      src={element.content.url} 
                      alt={element.content.alt} 
                      className="image-element max-w-full"
                    />
                  </div>
                )}
                {element.type === 'button' && (
                  <div className="flex items-center gap-2 mb-2">
                    <icons.button className="w-4 h-4 text-gray-400" />
                    <a 
                      href={element.content.link}
                      className="button-element inline-block px-4 py-2 rounded"
                      style={element.styles}
                    >
                      {element.content.text}
                    </a>
                  </div>
                )}
              </div>
            ))}
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
}