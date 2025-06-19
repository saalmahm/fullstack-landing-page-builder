import React, { useState } from 'react';
import { Star, Quote, Eye, Type, Upload } from 'lucide-react';

export default function TestimonialsComponent({ data, onEdit, isPreview, theme }) {
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(data);

  const handleSave = () => {
    const dataToSave = {
      ...tempData,
      testimonials: tempData.testimonials.map(testimonial => {
        if (testimonial.avatar && typeof testimonial.avatar !== 'string') {
          return {
            ...testimonial,
            avatar: URL.createObjectURL(testimonial.avatar) // Convertir en URL
          };
        }
        return testimonial;
      })
    };

    if (onEdit) onEdit(dataToSave);
    setEditMode(false);
  };
  const handleCancel = () => {
    setTempData(data);
    setEditMode(false);
  };
  const handleAvatarUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newTestimonials = [...tempData.testimonials];
      newTestimonials[index] = { ...newTestimonials[index], avatar: file };
      setTempData({ ...tempData, testimonials: newTestimonials });
    }
  };

  const removeAvatar = (index) => {
    const newTestimonials = [...tempData.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], avatar: '' };
    setTempData({ ...tempData, testimonials: newTestimonials });
  };
  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...tempData.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setTempData({ ...tempData, testimonials: newTestimonials });
  };

  if (editMode && !isPreview) {
    return (
      <div className="p-6 bg-blue-50 border-2 border-green-200 rounded-xl max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-green-900">Modifier les Témoignages</h3>

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

          {/* Testimonials Section */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Quote className="w-4 h-4 mr-2" />
              Témoignages
            </h4>

            {tempData.testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 mb-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                  <textarea
                    value={testimonial.content}
                    onChange={(e) => handleTestimonialChange(index, 'content', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                  <div className="space-y-3">
                    {testimonial.avatar ? (
                      <div className="flex items-center space-x-4">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={typeof testimonial.avatar === 'string' ? testimonial.avatar : URL.createObjectURL(testimonial.avatar)}
                          alt={testimonial.name}
                        />
                        <button
                          onClick={() => removeAvatar(index)}
                          className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
                        >
                          Supprimer
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
                        <Upload className="w-4 h-4 mr-2" />
                        Choisir une image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleAvatarUpload(e, index)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
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
      className="bg-white py-16 group relative"
      onClick={() => !isPreview && setEditMode(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{data.title}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl shadow-lg px-6 py-8 relative hover:shadow-xl transition-shadow duration-300">
              <Quote
                className="absolute top-4 right-4 opacity-20"
                size={32}
                style={{ color: theme?.primaryColor || '#3B82F6' }}
              />

              <div className="flex items-center mb-6">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.avatar}
                  alt={testimonial.name}
                />
                <div className="ml-4">
                  <div className="text-sm font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-current"
                    style={{ color: theme?.accentColor || '#F97316' }}
                  />
                ))}
              </div>

              <blockquote className="text-base text-gray-600 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      {!isPreview && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 cursor-pointer rounded-lg">
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Cliquer pour modifier
          </div>
        </div>
      )}
    </section>
  );
}