// /core/utils/paginator.js

const paginate = (page = 1, limit = 10, total) => {
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);
  
    return {
      offset,
      limit,
      totalPages,
      currentPage: page,
      totalItems: total
    };
  };
  
  module.exports = paginate;
  