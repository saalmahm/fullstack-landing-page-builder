import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Eye, Type, Upload } from 'lucide-react';

const socialIcons = {
  Facebook: Facebook,
  Twitter: Twitter,
  Instagram: Instagram,
  LinkedIn: Linkedin,
  Email: Mail,
  Phone: Phone,
  Location: MapPin
};

export default function FooterComponent({ data, onEdit, isPreview, theme }) {
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({
    ...data,
    copyright: data.copyright || `© ${new Date().getFullYear()} ${data.logo}. Tous droits réservés.`
  });

  const handleSave = () => {
    if (onEdit) onEdit(tempData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempData({
      ...data,
      copyright: data.copyright || `© ${new Date().getFullYear()} ${data.logo}. Tous droits réservés.`
    });
    setEditMode(false);
  };

  const handleLinkChange = (category, index, value) => {
    const newLinks = { ...tempData.links };
    newLinks[category][index] = value;
    setTempData({ ...tempData, links: newLinks });
  };

  if (editMode && !isPreview) {
    return (
      <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-blue-900">Modifier le Pied de Page</h3>
        
        <div className="space-y-6">
          {/* Brand Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Marque</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo/Text</label>
                <input
                  type="text"
                  value={tempData.logo}
                  onChange={(e) => setTempData({ ...tempData, logo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={tempData.description}
                  onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Liens</h4>
            {Object.entries(tempData.links).map(([category, links]) => (
              <div key={category} className="mb-6">
                <h5 className="font-medium mb-3 text-gray-800">{category}</h5>
                <div className="space-y-2">
                  {links.map((link, index) => (
                    <input
                      key={index}
                      type="text"
                      value={link}
                      onChange={(e) => handleLinkChange(category, index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Réseaux Sociaux</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Réseaux à afficher (séparés par des virgules)
              </label>
              <input
                type="text"
                value={tempData.social.join(', ')}
                onChange={(e) => setTempData({ ...tempData, social: e.target.value.split(', ') })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Facebook, Twitter, Instagram, LinkedIn, Email, Phone, Location"
              />
            </div>
          </div>

          {/* Copyright Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3">Copyright</h4>
            <input
              type="text"
              value={tempData.copyright}
              onChange={(e) => setTempData({ ...tempData, copyright: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
    <footer 
      className="bg-gray-800 text-white group relative"
      onClick={() => !isPreview && setEditMode(true)}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span 
              className="text-2xl font-bold"
              style={{ color: theme?.primaryColor || '#3B82F6' }}
            >
              {data.logo}
            </span>
            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              {data.description}
            </p>
            <div className="flex space-x-6">
              {data.social.map((social, index) => {
                const IconComponent = socialIcons[social] || Facebook;
                return (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                  >
                    <IconComponent size={24} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            {Object.entries(data.links).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                  {category}
                </h3>
                <ul className="space-y-4">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            {data.copyright || `© ${new Date().getFullYear()} ${data.logo}. Tous droits réservés.`}
          </p>
        </div>
      </div>

      {!isPreview && (
        <div className="absolute inset-0 cursor-pointer rounded-lg">
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Cliquer pour modifier
          </div>
        </div>
      )}
    </footer>
  );
}