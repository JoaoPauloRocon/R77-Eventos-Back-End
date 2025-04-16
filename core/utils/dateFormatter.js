// /core/utils/dateFormatter.js

const formatDate = (date, format = 'YYYY-MM-DD') => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };
  
  module.exports = formatDate;
  