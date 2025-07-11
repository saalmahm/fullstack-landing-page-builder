import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Builder from './components/Builder';
import ThemeGallery from './components/ThemeGallery';
import SavedPages from './components/SavedPages';
import { api } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [savedPages, setSavedPages] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const loadSavedPages = async () => {
      try {
        const response = await api.getPages();
        console.log('Pages chargées:', response);
        setSavedPages(response.pages || []); // Utiliser response.pages au lieu de response
      } catch (error) {
        console.error('Error loading saved pages:', error);
      }
    };
    loadSavedPages();
  }, []);

  const handleSavePage = useCallback((pageData) => {
    const newPage = {
      id: Date.now(),
      name: pageData.name || `Page ${savedPages.length + 1}`,
      components: pageData.components,
      theme: pageData.theme,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setSavedPages(prev => [...prev, newPage]);
    return newPage.id;
  }, [savedPages.length]);

  const handleLoadPage = useCallback(async (page) => {
    try {
      console.log('Loading page data:', page);
      const response = await api.getPage(page._id);
      setCurrentProject(response);
      setCurrentPage('builder');
    } catch (error) {
      console.error('Error loading page:', error);
      alert('Erreur lors du chargement de la page');
    }
  }, []);

  const handleDeletePage = useCallback((pageId) => {
    setSavedPages(prev => prev.filter(p => p.id !== pageId));
  }, []);

  const handleNewProject = useCallback(() => {
    setCurrentProject(null);
    setCurrentPage('builder');
  }, []);

  const handleThemeSelect = useCallback((theme) => {
    // Mettre à jour le projet courant avec le nouveau thème
    setCurrentProject(prev => ({
      ...prev,
      theme: {
        primaryColor: theme.primaryColor || '#3B82F6',
        secondaryColor: theme.secondaryColor || '#8B5CF6',
        accentColor: theme.accentColor || '#F97316',
        backgroundColor: theme.backgroundColor || '#FFFFFF',
        textColor: theme.textColor || '#1F2937'
      }
    }));
    
    // Redirection vers le builder
    setCurrentPage('builder');
    
    // Sauvegarder le thème dans le localStorage pour la persistance
    localStorage.setItem('currentTheme', JSON.stringify(theme));
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNewProject={handleNewProject}
            onLoadProject={handleLoadPage}
            savedPages={savedPages}
          />
        );
      case 'builder':
        return (
          <Builder 
            initialProject={currentProject}
            onSave={handleSavePage}
            onNavigate={setCurrentPage}
          />
        );
      case 'themes':
        return <ThemeGallery onSelectTheme={(theme) => console.log('Theme selected:', theme)} />;
      case 'saved':
        return (
          <SavedPages 
            pages={savedPages}
            onLoadPage={handleLoadPage}
            onDeletePage={handleDeletePage}
          />
        );
      default:
        return <HomePage onNewProject={handleNewProject} />;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          savedPagesCount={savedPages.length}
        />
        {renderCurrentPage()}
      </div>
    </DndProvider>
  );
}

export default App;