import React from 'react';
import { Plus, Zap, Palette, Code, ArrowRight, Star, Users, Layers } from 'lucide-react';

export default function HomePage({ onNewProject, onLoadProject, savedPages = [] }) {
  // Vérifier si savedPages est un objet avec des pages
  const pages = Array.isArray(savedPages) ? savedPages : (savedPages?.pages || []);
  const features = [
    {
      icon: Zap,
      title: 'Création Rapide',
      description: 'Créez des landing pages en quelques minutes avec notre interface intuitive'
    },
    {
      icon: Palette,
      title: 'Thèmes Magnifiques',
      description: 'Choisissez parmi une collection de thèmes professionnels et personnalisables'
    },
    {
      icon: Code,
      title: 'Code Exportable',
      description: 'Exportez votre code React propre et prêt pour la production'
    },
    {
      icon: Layers,
      title: 'Composants Modulaires',
      description: 'Glissez-déposez des composants pour construire votre page parfaite'
    }
  ];

  const recentPages = pages.slice(-3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Créez des{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Landing Pages
              </span>
              <br />
              Exceptionnelles
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Notre builder intuitif vous permet de créer des pages de destination professionnelles 
              sans aucune connaissance en code. Glissez, déposez, personnalisez et publiez !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onNewProject}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center"
              >
                <Plus className="mr-2 group-hover:rotate-90 transition-transform duration-300" size={24} />
                Nouveau Projet
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
              
              <div className="flex items-center text-gray-600">
                <Star className="text-yellow-500 mr-1" size={20} />
                <span className="font-medium">4.9/5 - Plus de 10k utilisateurs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Landing Builder ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des outils puissants pour créer des pages qui convertissent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group text-center p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      {recentPages.length > 0 && (
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Vos Projets Récents
              </h2>
              <p className="text-lg text-gray-600">
                Continuez là où vous vous êtes arrêté
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPages.map((page) => (
                <div key={page.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Layers size={48} className="text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{page.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Modifié le {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
                    </p>
                    <button
                      onClick={() => onLoadProject(page.id)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      Ouvrir le projet
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à créer votre première landing page ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de créateurs qui font confiance à Landing Builder
          </p>
          <button
            onClick={onNewProject}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center"
          >
            <Plus className="mr-2" size={24} />
            Commencer Maintenant
          </button>
        </div>
      </div>
    </div>
  );
}