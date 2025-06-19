import React, { useState } from 'react';
import { Play } from 'lucide-react';

export default function HeroComponent({ data, onEdit, isPreview, theme }) {
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(data);

  const handleSave = () => {
    if (onEdit) onEdit(tempData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempData(data);
    setEditMode(false);
  };

  if (editMode && !isPreview) {
    return (
      <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 text-green-900">Modifier la Section Hero</h3>
        
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texte du Bouton CTA</label>
            <input
              type="text"
              value={tempData.ctaText}
              onChange={(e) => setTempData({ ...tempData, ctaText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL de l'Image</label>
            <input
              type="url"
              value={tempData.image}
              onChange={(e) => setTempData({ ...tempData, image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
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

  return (
    <section 
      className="relative bg-white overflow-hidden py-16 lg:py-24"
      onClick={() => !isPreview && setEditMode(true)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl leading-tight">
                <span className="block xl:inline">{data.title}</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {data.subtitle}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow-lg">
                  <button
                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:scale-105 hover:shadow-xl"
                    style={{ backgroundColor: theme?.primaryColor || '#3B82F6' }}
                  >
                    {data.ctaText}
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button className="w-full flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-200">
                    <Play className="mr-2" size={20} />
                    Voir démo
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-lg lg:rounded-none"
          src={data.image}
          alt="Hero"
        />
      </div>

      {!isPreview && (
        <div className="absolute inset-0 bg-green-500 bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 cursor-pointer rounded-lg">
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity">
            Cliquer pour modifier
          </div>
        </div>
      )}
    </section>
  );
}