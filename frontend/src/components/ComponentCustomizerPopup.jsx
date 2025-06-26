import React, { useState } from 'react';
import { X, Type, Palette, Settings, Layout, Image, Link, Eye, Code } from 'lucide-react';

const ComponentCustomizerPopup = ({ onSave, onClose }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [formData, setFormData] = useState({
    // Contenu
    title: '',
    subtitle: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    imageUrl: '',
    imageAlt: '',
    
    // Style
    backgroundColor: '#ffffff',
    textColor: '#000000',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    fontSize: 'medium',
    fontFamily: 'Inter',
    borderRadius: '8',
    padding: '16',
    margin: '0',
    
    // Layout
    layout: 'default',
    alignment: 'center',
    width: '100',
    height: 'auto',
    spacing: 'normal',
    columns: '1',
    
    // Paramètres avancés
    customClass: '',
    customCSS: '',
    animation: 'none',
    animationDuration: '0.3',
    responsive: true,
    visibility: 'always'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const component = {
      type: 'custom',
      content: {
        elements: [
          {
            id: `element-${Date.now()}-title`,
            type: 'heading',
            content: {
              text: formData.title
            },
            styles: {
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: formData.alignment
            }
          },
          {
            id: `element-${Date.now()}-subtitle`,
            type: 'text',
            content: {
              text: formData.subtitle
            },
            styles: {
              fontSize: '18px',
              textAlign: formData.alignment
            }
          },
          {
            id: `element-${Date.now()}-description`,
            type: 'text',
            content: {
              text: formData.description
            },
            styles: {
              fontSize: '16px',
              textAlign: formData.alignment
            }
          },
          {
            id: `element-${Date.now()}-button`,
            type: 'button',
            content: {
              text: formData.buttonText,
              link: formData.buttonLink
            },
            styles: {
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: formData.primaryColor,
              color: '#ffffff'
            }
          },
          {
            id: `element-${Date.now()}-image`,
            type: 'image',
            content: {
              url: formData.imageUrl,
              alt: formData.imageAlt
            },
            styles: {
              maxWidth: '100%',
              height: 'auto'
            }
          }
        ]
      },
      styles: {
        backgroundColor: formData.backgroundColor,
        color: formData.textColor,
        padding: `${formData.padding}px`,
        margin: `${formData.margin}px`,
        borderRadius: `${formData.borderRadius}px`,
        fontFamily: formData.fontFamily,
        fontSize: formData.fontSize,
        textAlign: formData.alignment,
        width: `${formData.width}%`
      }
    };

    onSave(component);
    onClose();
  };

  const tabs = [
    { id: 'content', label: 'Contenu', icon: Type },
    { id: 'style', label: 'Style', icon: Palette },
    { id: 'layout', label: 'Mise en page', icon: Layout },
    { id: 'advanced', label: 'Avancé', icon: Settings }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Personnaliser le Composant</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar avec onglets */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Onglet Contenu */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Configuration du Contenu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre Principal</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Entrez le titre..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Entrez le sous-titre..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Entrez la description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texte du Bouton</label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => handleInputChange('buttonText', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: En savoir plus"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lien du Bouton</label>
                    <input
                      type="url"
                      value={formData.buttonLink}
                      onChange={(e) => handleInputChange('buttonLink', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL de l'Image</label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texte Alt Image</label>
                    <input
                      type="text"
                      value={formData.imageAlt}
                      onChange={(e) => handleInputChange('imageAlt', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Description de l'image"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Style */}
            {activeTab === 'style' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Configuration du Style</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de Fond</label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={formData.backgroundColor}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.backgroundColor}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du Texte</label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={formData.textColor}
                        onChange={(e) => handleInputChange('textColor', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.textColor}
                        onChange={(e) => handleInputChange('textColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Taille de Police</label>
                    <select
                      value={formData.fontSize}
                      onChange={(e) => handleInputChange('fontSize', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="xs">Très Petite</option>
                      <option value="sm">Petite</option>
                      <option value="medium">Moyenne</option>
                      <option value="lg">Grande</option>
                      <option value="xl">Très Grande</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bordure Arrondie (px)</label>
                    <input
                      type="number"
                      value={formData.borderRadius}
                      onChange={(e) => handleInputChange('borderRadius', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Padding (px)</label>
                    <input
                      type="number"
                      value={formData.padding}
                      onChange={(e) => handleInputChange('padding', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Margin (px)</label>
                    <input
                      type="number"
                      value={formData.margin}
                      onChange={(e) => handleInputChange('margin', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Layout */}
            {activeTab === 'layout' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Configuration de la Mise en Page</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alignement</label>
                    <select
                      value={formData.alignment}
                      onChange={(e) => handleInputChange('alignment', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="left">Gauche</option>
                      <option value="center">Centre</option>
                      <option value="right">Droite</option>
                      <option value="justify">Justifié</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Largeur (%)</label>
                    <input
                      type="number"
                      value={formData.width}
                      onChange={(e) => handleInputChange('width', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="10"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Colonnes</label>
                    <select
                      value={formData.columns}
                      onChange={(e) => handleInputChange('columns', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1">1 Colonne</option>
                      <option value="2">2 Colonnes</option>
                      <option value="3">3 Colonnes</option>
                      <option value="4">4 Colonnes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Avancé */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Paramètres Avancés</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Animation</label>
                    <select
                      value={formData.animation}
                      onChange={(e) => handleInputChange('animation', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="none">Aucune</option>
                      <option value="fadeIn">Apparition</option>
                      <option value="slideUp">Glissement Vers le Haut</option>
                      <option value="slideLeft">Glissement Gauche</option>
                      <option value="zoom">Zoom</option>
                      <option value="bounce">Rebond</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durée Animation (s)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.animationDuration}
                      onChange={(e) => handleInputChange('animationDuration', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0.1"
                      max="5"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="responsive"
                        checked={formData.responsive}
                        onChange={(e) => handleInputChange('responsive', e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="responsive" className="text-sm font-medium text-gray-700">
                        Responsive (s'adapte automatiquement à toutes les tailles d'écran)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Eye className="w-4 h-4" />
              <span>Aperçu</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Code className="w-4 h-4" />
              <span>Voir le Code</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentCustomizerPopup;
