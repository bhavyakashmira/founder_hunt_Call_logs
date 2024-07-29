export const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
};


export const getDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); 
};