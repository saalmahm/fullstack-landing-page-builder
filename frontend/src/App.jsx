import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Builder from './components/Builder';
import ThemeGallery from './components/ThemeGallery';
import SavedPages from './components/SavedPages';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [savedPages, setSavedPages] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

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

  const handleLoadPage = useCallback((pageId) => {
    const page = savedPages.find(p => p.id === pageId);
    if (page) {
      setCurrentProject(page);
      setCurrentPage('builder');
    }
  }, [savedPages]);

  const handleDeletePage = useCallback((pageId) => {
    setSavedPages(prev => prev.filter(p => p.id !== pageId));
  }, []);

  const handleNewProject = useCallback(() => {
    setCurrentProject(null);
    setCurrentPage('builder');
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