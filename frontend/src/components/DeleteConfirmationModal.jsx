import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, title = 'Supprimer la page' }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error('Error during deletion:', error);
      alert('Une erreur est survenue lors de la suppression');
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-red-600">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">Êtes-vous sûr de vouloir supprimer cette page ? Cette action est irréversible.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            {isDeleting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <>
                <Trash2 className="mr-2" size={20} />
                Supprimer
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
