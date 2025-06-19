import React, { useState } from 'react';
import { ArrowRight, Eye, Type, Upload } from 'lucide-react';

export default function CTAComponent({ data, onEdit, isPreview, theme }) {
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({
    ...data,
    buttonStyle: {
      primary: {
        backgroundColor: theme?.primaryColor || '#3B82F6',
        textColor: '#FFFFFF',
        ...data.buttonStyle?.primary
      },
      secondary: {
        backgroundColor: 'transparent',
        textColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        ...data.buttonStyle?.secondary
      }
    }
  });

  const handleSave = () => {
    if (onEdit) onEdit(tempData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempData({
      ...data,
      buttonStyle: {
        primary: {
          backgroundColor: theme?.primaryColor || '#3B82F6',
          textColor: '#FFFFFF',
          ...data.buttonStyle?.primary
        },
        secondary: {
          backgroundColor: 'transparent',
          textColor: '#FFFFFF',
          borderColor: '#FFFFFF',
          ...data.buttonStyle?.secondary
        }
      }
    });
    setEditMode(false);
  };

  if (editMode && !isPreview) {
    return (
      <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-blue-900">Modifier le Call to Action</h3>
        
        <div className="space-y-6">
          {/* Content Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Contenu</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  value={tempData.title}
                  onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                <textarea
                  value={tempData.subtitle}
                  onChange={(e) => setTempData({ ...tempData, subtitle: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Boutons</h4>
            
            {/* Primary Button */}
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-3">Bouton Principal</h5>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Texte</label>
                <input
                  type="text"
                  value={tempData.primaryText}
                  onChange={(e) => setTempData({ ...tempData, primaryText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de fond</label>
                  <input
                    type="color"
                    value={tempData.buttonStyle.primary.backgroundColor}
                    onChange={(e) => setTempData({ 
                      ...tempData, 
                      buttonStyle: { 
                        ...tempData.buttonStyle,
                        primary: {
                          ...tempData.buttonStyle.primary,
                          backgroundColor: e.target.value
                        }
                      }
                    })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
                  <input
                    type="color"
                    value={tempData.buttonStyle.primary.textColor}
                    onChange={(e) => setTempData({ 
                      ...tempData, 
                      buttonStyle: { 
                        ...tempData.buttonStyle,
                        primary: {
                          ...tempData.buttonStyle.primary,
                          textColor: e.target.value
                        }
                      }
                    })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Secondary Button */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-3">Bouton Secondaire</h5>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Texte</label>
                <input
                  type="text"
                  value={tempData.secondaryText}
                  onChange={(e) => setTempData({ ...tempData, secondaryText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
                  <input
                    type="color"
                    value={tempData.buttonStyle.secondary.textColor}
                    onChange={(e) => setTempData({ 
                      ...tempData, 
                      buttonStyle: { 
                        ...tempData.buttonStyle,
                        secondary: {
                          ...tempData.buttonStyle.secondary,
                          textColor: e.target.value
                        }
                      }
                    })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de bordure</label>
                  <input
                    type="color"
                    value={tempData.buttonStyle.secondary.borderColor}
                    onChange={(e) => setTempData({ 
                      ...tempData, 
                      buttonStyle: { 
                        ...tempData.buttonStyle,
                        secondary: {
                          ...tempData.buttonStyle.secondary,
                          borderColor: e.target.value
                        }
                      }
                    })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
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
      className="py-16 relative overflow-hidden group"
      style={{ 
        background: `linear-gradient(135deg, ${tempData.buttonStyle.primary.backgroundColor} 0%, ${theme?.secondaryColor || '#8B5CF6'} 100%)` 
      }}
      onClick={() => !isPreview && setEditMode(true)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            {tempData.title}
          </h2>
          <p className="mt-4 text-lg text-white text-opacity-90 max-w-2xl mx-auto">
            {tempData.subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="group px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center"
              style={{
                backgroundColor: tempData.buttonStyle.primary.backgroundColor,
                color: tempData.buttonStyle.primary.textColor
              }}
            >
              {tempData.primaryText}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
            </button>
            <button 
              className="group border-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              style={{
                color: tempData.buttonStyle.secondary.textColor,
                borderColor: tempData.buttonStyle.secondary.borderColor,
                backgroundColor: tempData.buttonStyle.secondary.backgroundColor
              }}
            >
              {tempData.secondaryText}
            </button>
          </div>
        </div>
      </div>

      {!isPreview && (
        <div className="absolute inset-0 cursor-pointer rounded-lg">
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Cliquer pour modifier
          </div>
        </div>
      )}
    </section>
  );
}