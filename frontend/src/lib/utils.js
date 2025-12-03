// Utility functions

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString();
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 'badge-success';
    case 'medium':
      return 'badge-warning';
    case 'hard':
      return 'badge-error';
    default:
      return 'badge-ghost';
  }
};