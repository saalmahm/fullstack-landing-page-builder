import React from 'react';
import ComponentRenderer from './ComponentRenderer';

export default function Preview({ components, theme, device }) {
  const getDeviceClasses = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
      <div className={`${getDeviceClasses()} bg-white shadow-2xl rounded-2xl overflow-hidden`}>
        {components.map((component) => (
          <ComponentRenderer
            key={component.id}
            component={component}
            isPreview={true}
            theme={theme}
          />
        ))}
        {components.length === 0 && (
          <div className="p-16 text-center text-gray-500">
            <div className="text-6xl mb-4">👀</div>
            <h3 className="text-xl font-semibold mb-2">Aperçu vide</h3>
            <p>Ajoutez des composants pour voir le résultat</p>
          </div>
        )}
      </div>
    </div>
  );
}