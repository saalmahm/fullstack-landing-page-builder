import React, { useState, useEffect } from 'react';
import { Trash2, Eye, Edit, Calendar, Search, Filter, Download } from 'lucide-react';
import { api } from '../services/api';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function SavedPages({ onLoadPage, onDeletePage }) {
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      const response = await api.getPages();
      setPages(response.pages);
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedPage) {
      try {
        await api.deletePage(selectedPage._id);
        loadPages();
        setSelectedPage(null);
      } catch (error) {
        console.error('Error deleting page:', error);
        alert('Une erreur est survenue lors de la suppression');
      }
    }
  };

  const handleDeletePage = (page) => {
    setSelectedPage(page);
    setShowDeleteModal(true);
  };

  const filteredPages = pages
    .filter(page =>
      page.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return new Date(b[sortBy]) - new Date(a[sortBy]);
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExportJson = (page) => {
    const json = JSON.stringify(page, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${page.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePreview = (page) => {
    console.log("Page à prévisualiser:", page);
    alert(`Prévisualisation de la page: ${page.name}`);
  };

  const handleLoadPage = (page) => {
    console.log('Loading page:', page._id);
    if (onLoadPage) {
      onLoadPage({
        ...page,
        id: page._id  // Assurer que l'ID est disponible sous le nom 'id'
      });
    } else {
      alert(`Chargement de la page: ${page.name}`);
    }
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedPage(null);
          }}
          onConfirm={handleDelete}
          title={`Supprimer "${selectedPage?.name}"`}
        />
      )}
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pages Sauvegardées</h1>
            <p className="text-gray-600">
              Gérez vos {pages.length} page{pages.length !== 1 ? 's' : ''} sauvegardée{pages.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une page..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="updatedAt">Dernière modification</option>
                <option value="createdAt">Date de création</option>
                <option value="name">Nom (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pages Grid */}
        {filteredPages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => (
              <div key={page._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Preview */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                  <div className="text-6xl opacity-20">🎨</div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{page.name}</h3>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>Modifié le {formatDate(page.updatedAt)}</span>
                  </div>

                  {/* Theme Colors Preview */}
                  <div className="flex gap-2 mb-6">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: page.theme?.primaryColor || '#3B82F6' }}
                    ></div>
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: page.theme?.secondaryColor || '#8B5CF6' }}
                    ></div>
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: page.theme?.accentColor || '#F97316' }}
                    ></div>
                  </div>

                  {/* Actions - VERSION CLAIRE ET VISIBLE */}
                  <div className="space-y-3">
                    {/* Bouton Modifier - Principal */}
                    <button
                      onClick={() => handleLoadPage(page)}
                      className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center font-medium"
                    >
                      <Edit className="mr-2" size={18} />
                      Modifier la page
                    </button>
                    
                    {/* Boutons secondaires - 2 boutons sur une ligne */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Bouton Exporter - BIEN VISIBLE */}
                      <button
                        onClick={() => handleExportJson(page)}
                        className="bg-green-100 text-green-700 px-4 py-3 rounded-lg hover:bg-green-200 transition-colors duration-200 flex flex-col items-center justify-center text-sm font-medium"
                        title="Exporter en JSON"
                      >
                        <Download size={18} className="mb-1" />
                        Exporter
                      </button>
                      
                      {/* Bouton Supprimer - Rouge et dangereux */}
                      <button
                        onClick={() => handleDeletePage(page)}
                        className="bg-red-100 text-red-700 px-4 py-3 rounded-lg hover:bg-red-200 transition-colors duration-200 flex flex-col items-center justify-center text-sm font-medium"
                        title="Supprimer la page"
                      >
                        <Trash2 size={18} className="mb-1" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm ? 'Aucune page trouvée' : 'Aucune page sauvegardée'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? 'Essayez de modifier votre recherche'
                : 'Commencez par créer votre première landing page'
              }
            </p>
            {!searchTerm && (
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Créer une nouvelle page
              </button>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}