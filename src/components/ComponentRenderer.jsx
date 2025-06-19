import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import HeroComponent from './components/HeroComponent';
import FeaturesComponent from './components/FeaturesComponent';
import TestimonialsComponent from './components/TestimonialsComponent';
import CTAComponent from './components/CTAComponent';
import FooterComponent from './components/FooterComponent';

export default function ComponentRenderer({ component, onEdit, isPreview = false, theme }) {
  const renderComponent = () => {
    const commonProps = {
      data: component.content,
      onEdit: onEdit ? (content) => onEdit(component.id, content) : undefined,
      isPreview,
      theme
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
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Composant inconnu: {component.type}
          </div>
        );
    }
  };

  return renderComponent();
}