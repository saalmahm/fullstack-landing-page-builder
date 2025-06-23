import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Preview from './Preview';
import CodeView from './CodeView';
import ThemePanel from './ThemePanel';
import SaveModal from './SaveModal';

export default function Builder({ initialProject, onSave }) {
  const [components, setComponents] = useState(initialProject?.components || []);
  const [isPreview, setIsPreview] = useState(false);
  const [showCode, setShowCode] = useState(false);  const [showTheme, setShowTheme] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [theme, setTheme] = useState(initialProject?.theme || {
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#F97316',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937'
  });

  useEffect(() => {
    if (initialProject) {
      setComponents(initialProject.components || []);
      setTheme(initialProject.theme || theme);
    }
  }, [initialProject]);

  const addComponent = useCallback((type) => {
    const newComponent = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      styles: {}
    };
    setComponents(prev => [...prev, newComponent]);
  }, []);

  const updateComponent = useCallback((id, content) => {
    setComponents(prev =>
      prev.map(comp => comp.id === id ? { ...comp, content } : comp)
    );
  }, []);

  const deleteComponent = useCallback((id) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
  }, []);

  const moveComponent = useCallback((dragIndex, hoverIndex) => {
    setComponents(prev => {
      const newComponents = [...prev];
      const draggedComponent = newComponents[dragIndex];
      newComponents.splice(dragIndex, 1);
      newComponents.splice(hoverIndex, 0, draggedComponent);
      return newComponents;
    });
  }, []);

  const handleSave = useCallback((name) => {
    const pageData = {
      name,
      components,
      theme
    };
    const savedId = onSave(pageData);
    setShowSaveModal(false);
    return savedId;
  }, [components, theme, onSave]);

  const getDefaultContent = (type) => {
    const defaults = {
      header: {
        logo: 'MonLogo',
        navigation: ['Accueil', 'Services', 'À propos', 'Contact'],
        ctaText: 'Commencer'
      },
      hero: {
        title: 'Créez des pages exceptionnelles',
        subtitle: 'Notre plateforme vous permet de construire des landing pages performantes en quelques minutes',
        ctaText: 'Essayer maintenant',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      features: {
        title: 'Fonctionnalités puissantes',
        subtitle: 'Tout ce dont vous avez besoin pour réussir',
        features: [
          {
            icon: 'Zap',
            title: 'Ultra Rapide',
            description: 'Performance optimisée pour un chargement éclair'
          },
          {
            icon: 'Shield',
            title: 'Sécurisé',
            description: 'Protection avancée de vos données'
          },
          {
            icon: 'Smartphone',
            title: 'Responsive',
            description: 'Parfait sur tous les appareils'
          }
        ]
      },
      testimonials: {
        title: 'Ce que disent nos clients',
        subtitle: 'Des milliers d\'entreprises nous font confiance',
        testimonials: [
          {
            name: 'Marie Dubois',
            role: 'CEO, StartupTech',
            content: 'Incroyable ! Cette solution a transformé notre business.',
            avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          {
            name: 'Pierre Martin',
            role: 'Directeur Marketing',
            content: 'Interface intuitive et résultats exceptionnels.',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          {
            name: 'Sophie Leroy',
            role: 'Freelance Designer',
            content: 'Le meilleur outil que j\'aie jamais utilisé !',
            avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=150'
          }
        ]
      },
      cta: {
        title: 'Prêt à commencer ?',
        subtitle: 'Rejoignez des milliers d\'utilisateurs satisfaits',
        primaryText: 'Commencer gratuitement',
        secondaryText: 'En savoir plus'
      },
      footer: {
        logo: 'MonLogo',
        description: 'Créez des expériences extraordinaires avec notre plateforme.',
        links: {
          'Produit': ['Fonctionnalités', 'Tarifs', 'Documentation'],
          'Entreprise': ['À propos', 'Blog', 'Carrières'],
          'Support': ['Centre d\'aide', 'Contact', 'Statut']
        },
        social: ['Twitter', 'Facebook', 'LinkedIn', 'Instagram']
      }
    };
    return defaults[type] || {};
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        onAddComponent={addComponent}
        onTogglePreview={() => setIsPreview(!isPreview)}
        onToggleCode={() => setShowCode(!showCode)}
        onToggleTheme={() => setShowTheme(!showTheme)}
        onSave={() => setShowSaveModal(true)}
        isPreview={isPreview}
      />

      <div className="flex-1 flex flex-col">
        {showCode ? (
          <CodeView
            components={components}
            theme={theme}
            onBack={() => setShowCode(false)}
          />
        ) : isPreview ? (
          <Preview
            components={components}
            theme={theme}
          />
        ) : (
          <Canvas
            components={components}
            onUpdateComponent={updateComponent}
            onDeleteComponent={deleteComponent}
            onMoveComponent={moveComponent}
            theme={theme}
          />
        )}
      </div>

      {showTheme && (
        <ThemePanel
          theme={theme}
          onThemeChange={setTheme}
          onClose={() => setShowTheme(false)}
        />
      )}

      {showSaveModal && (
        <SaveModal
          onClose={() => setShowSaveModal(false)}
          pageData={{
            components: components,
            theme: theme
          }}
        />
      )}
    </div>
  );
}