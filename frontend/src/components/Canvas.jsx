import React from 'react';
import { useDrop } from 'react-dnd';
import ComponentRenderer from './ComponentRenderer';
import DraggableComponent from './DraggableComponent';

export default function Canvas({ components, onUpdateComponent, onDeleteComponent, onMoveComponent, theme }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'component',
    drop: () => ({ name: 'Canvas' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div 
      ref={drop}
      className={`flex-1 overflow-y-auto bg-gray-50 p-8 transition-all duration-300 ${
        isOver ? 'bg-blue-50 border-2 border-dashed border-blue-400' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Zone de Construction</h1>
          <p className="text-gray-600">Glissez et déposez des composants pour construire votre page</p>
        </div>

        {components.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Votre toile est vide</h3>
            <p className="text-gray-500">Commencez par ajouter des composants depuis la sidebar</p>
          </div>
        ) : (
          <div className="space-y-6">
            {components.map((component, index) => (
              <DraggableComponent
                key={component.id}
                id={component.id}
                index={index}
                onMoveComponent={onMoveComponent}
                onDeleteComponent={onDeleteComponent}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                  <ComponentRenderer
                    component={component}
                    onEdit={onUpdateComponent}
                    theme={theme}
                  />
                </div>
              </DraggableComponent>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}