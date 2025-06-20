import React from 'react';
import ComponentRenderer from './ComponentRenderer';

export default function Preview({ components, theme }) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
      <div className="w-full bg-white rounded-lg overflow-hidden shadow-xl">
        {components.length > 0 ? (
          components.map((component) => (
            <ComponentRenderer
              key={component.id}
              component={component}
              isPreview={true}
              theme={theme}
            />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
            <div className="text-6xl mb-4">👀</div>
            <h3 className="text-xl font-medium mb-2">Aperçu vide</h3>
            <p className="text-sm">Ajoutez des composants pour voir le résultat</p>
          </div>
        )}
      </div>
    </div>
  );
}