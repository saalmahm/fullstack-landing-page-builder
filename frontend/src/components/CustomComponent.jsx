import React from 'react';

export default function CustomComponent({ data, onEdit, isPreview = false, theme }) {
  const { content, styles } = data;

  const handleEdit = (field, value) => {
    if (onEdit) {
      onEdit({
        ...content,
        [field]: value
      });
    }
  };

  const renderContent = () => {
    if (isPreview) {
      return (
        <div style={{ ...styles }} className="p-6">
          {content.text && <p className="mb-4">{content.text}</p>}
          {content.heading && <h2 className="text-2xl font-bold mb-4">{content.heading}</h2>}
          {content.image && (
            <img 
              src={content.image} 
              alt="Custom content" 
              className="w-full rounded-lg mb-4"
            />
          )}
          {content.video && (
            <video 
              src={content.video} 
              className="w-full rounded-lg mb-4"
              controls
            />
          )}
          {content.button?.text && content.button?.link && (
            <a 
              href={content.button.link} 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {content.button.text}
            </a>
          )}
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Texte</label>
          <textarea
            value={content.text || ''}
            onChange={(e) => handleEdit('text', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Entrez du texte..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
          <input
            type="text"
            value={content.heading || ''}
            onChange={(e) => handleEdit('heading', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Entrez un titre..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <input
            type="text"
            value={content.image || ''}
            onChange={(e) => handleEdit('image', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="URL de l'image..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Vidéo</label>
          <input
            type="text"
            value={content.video || ''}
            onChange={(e) => handleEdit('video', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="URL de la vidéo..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bouton</label>
          <div className="flex gap-4">
            <input
              type="text"
              value={content.button?.text || ''}
              onChange={(e) => handleEdit('button', { ...content.button, text: e.target.value })}
              className="flex-1 p-2 border rounded"
              placeholder="Texte du bouton"
            />
            <input
              type="text"
              value={content.button?.link || ''}
              onChange={(e) => handleEdit('button', { ...content.button, link: e.target.value })}
              className="flex-1 p-2 border rounded"
              placeholder="Lien du bouton"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="custom-component" style={{ ...styles }}>
      {renderContent()}
    </div>
  );
}
