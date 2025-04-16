// /core/utils/slugGenerator.js

const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .substring(0, 100); // Limita o comprimento do slug
  };
  
  module.exports = generateSlug;
  