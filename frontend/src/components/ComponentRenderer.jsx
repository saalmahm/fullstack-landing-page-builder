import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import HeroComponent from './components/HeroComponent';
import FeaturesComponent from './components/FeaturesComponent';
import TestimonialsComponent from './components/TestimonialsComponent';
import CTAComponent from './components/CTAComponent';
import FooterComponent from './components/FooterComponent';
import { Text, Heading, Image, Video, Plus } from 'lucide-react';

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

        return (
          <div className="space-y-4">
            {validElements.map((element, index) => {
              // Vérifier la validité des données
              if (!element.type || !element.content) {
                return null;
              }

              const Icon = {
                text: Text,
                heading: Heading,
                image: Image,
                video: Video,
                button: Plus
              }[element.type];

              const styleProps = {
                backgroundColor: element.styles.backgroundColor,
                color: element.styles.color,
                padding: element.styles.padding,
                margin: element.styles.margin,
                borderRadius: element.styles.borderRadius,
                textAlign: element.styles.textAlign,
                fontSize: element.styles.fontSize,
                fontWeight: element.styles.fontWeight,
                lineHeight: element.styles.lineHeight,
                letterSpacing: element.styles.letterSpacing,
                textDecoration: element.styles.textDecoration
              };

              return (
                <div key={element.id || index} className="p-4 border rounded-lg" style={styleProps}>
                  <div className="flex items-center gap-2 mb-2">
                    {Icon && <Icon size={16} />}
                    <span className="text-sm font-medium">{element.type}</span>
                  </div>
                  {element.content.text && (
                    <p className="text-gray-700" style={styleProps}>{element.content.text}</p>
                  )}
                  {element.content.heading && (
                    <h3 className="text-lg font-semibold" style={styleProps}>{element.content.heading}</h3>
                  )}
                  {element.content.image && (
                    <div className="relative w-full">
                      <img 
                        src={element.content.image} 
                        alt={element.content.alt || 'Image'}
                        className="max-w-full rounded-lg"
                        style={{
                          ...styleProps,
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  {element.content.video && (
                    <div className="relative w-full">
                      <video 
                        src={element.content.video} 
                        controls
                        className="max-w-full rounded-lg"
                        style={{
                          ...styleProps,
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  {element.content.button && (
                    <a 
                      href={element.content.button.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      style={{
                        ...styleProps,
                        backgroundColor: element.styles.backgroundColor,
                        color: element.styles.color
                      }}
                    >
                      {element.content.button.text}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        );
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Composant inconnu: {component.type}
          </div>
        );
    }
  };

  return (
    <div className="component-wrapper">
      {renderComponent()}
    </div>
  );
}