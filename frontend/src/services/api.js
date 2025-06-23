const API_BASE_URL = 'http://localhost:3001';

export const api = {
  // Pages
  getPages: async (page = 1, limit = 10, sort = 'updatedAt') => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        params: { page, limit, sort }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  },

  searchPages: async (query, page = 1, limit = 10) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages/search`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        params: { query, page, limit }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching pages:', error);
      throw error;
    }
  },

  createPage: async (pageData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  },

  getPage: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  },

  updatePage: async (id, pageData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating page:', error);
      throw error;
    }
  },

  deletePage: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  }
};