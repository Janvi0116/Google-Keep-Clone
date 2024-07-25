export const getNotes = () => {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  };
  
  export const saveNotes = (notes) => {
    if(notes.length){
        localStorage.setItem('notes', JSON.stringify(notes));
    }
  };