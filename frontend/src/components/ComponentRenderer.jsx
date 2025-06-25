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
        return (
          <div className="space-y-4">
            {component.content?.elements?.map((element, index) => {
              const Icon = {
                text: Text,
                heading: Heading,
                image: Image,
                video: Video,
                button: Plus
              }[element.type];
              
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} />
                    <span className="text-sm font-medium">{element.type}</span>
                  </div>
                  {element.content?.text && (
                    <p className="text-gray-700">{element.content.text}</p>
                  )}
                  {element.content?.heading && (
                    <h3 className="text-lg font-semibold">{element.content.heading}</h3>
                  )}
                  {element.content?.image && (
                    <img 
                      src={element.content.image} 
                      alt={element.content.alt || 'Image'}
                      className="max-w-full rounded-lg"
                    />
                  )}
                  {element.content?.video && (
                    <video 
                      src={element.content.video} 
                      controls
                      className="max-w-full rounded-lg"
                    />
                  )}
                  {element.content?.button && (
                    <a 
                      href={element.content.button.link} 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
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