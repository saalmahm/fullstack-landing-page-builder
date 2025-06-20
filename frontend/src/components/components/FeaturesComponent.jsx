import React, { useState } from 'react';
import { Zap, Shield, Smartphone, Star, Heart, Target } from 'lucide-react';
import { Eye, Type, Palette, Bold, Italic, AlignLeft, AlignCenter } from 'lucide-react';

const iconMap = {
  Zap: Zap,
  Shield: Shield,
  Smartphone: Smartphone,
  Star: Star,
  Heart: Heart,
  Target: Target
};

export default function FeaturesComponent({ data, onEdit, isPreview, theme }) {
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

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...tempData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setTempData({ ...tempData, features: newFeatures });
  };

if (editMode && !isPreview) {
  return (
    <div className="p-6 bg-blue-50 border-2 border-green-200 rounded-xl max-h-[80vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-green-900">Modifier les Fonctionnalités</h3>
      
      <div className="space-y-6">
        {/* Content Section */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-3">Contenu</h4>
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
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Fonctionnalités
          </h4>
          
          {tempData.features.map((feature, index) => (
            <div key={index} className="p-4 mb-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icône</label>
                  <select
                    value={feature.icon}
                    onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {Object.keys(iconMap).map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
}

  return (
<section 
  className="py-16 bg-gray-50 group relative"
  onClick={() => !isPreview && setEditMode(true)}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 
            className="text-base text-lg font-semibold tracking-wide uppercase mb-4"
            style={{ color: theme?.primaryColor || '#3B82F6' }}
          >
            {data.title}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {data.subtitle}
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {data.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Zap;
              return (
                <div key={index} className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-200"
                       style={{ backgroundColor: theme?.primaryColor || '#3B82F6' }}>
                    <IconComponent size={24} />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-bold text-gray-900">{feature.title}</p>
                  <p className="mt-2 ml-16 text-base text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {!isPreview && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 cursor-pointer rounded-lg">
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity">
            Cliquer pour modifier
          </div>
        </div>
      )}
    </section>
  );
}