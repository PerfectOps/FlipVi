export const formatDate = (dateString: number): string => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString('ru-GB', { 
      day: 'numeric', 
      month: 'numeric' 
    });
    const timeStr = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${dateStr} / ${timeStr}`;
};