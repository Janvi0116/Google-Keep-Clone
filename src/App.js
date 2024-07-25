import React, { useState, useEffect } from 'react';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import { getNotes, saveNotes } from './utils/localStorage';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // This effect is being executed to load data from local storage 
  // This would just run once after the initial rendering of the app component
  useEffect(() => {
    const loadedNotes = getNotes();
    setNotes(loadedNotes);
  }, []);


  // This effect is being executed to save data to local storage i.e to keep local storage in sync 
  // This would run every time notes array change since we have provided that as a dependency array
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);


  // This function is being passed as a prop to AddNote Component
  // In AddNote Component it would be called when submitting and will be
  // provided the new note data as argument
  const addNote = (newNote) => {
    // since new notes array have to be previous notes + the node being added so 
    // we have used function way of changing state
    setNotes(prevNotes => {
      const updatedNotes = [{ id: Date.now(), ...newNote },...prevNotes];
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };

  // This function is being passed as a prop to NoteList Component
  // In NoteList Component it would be called when submitting will be done while editing
  // and will provided the new updated note data as argument
  const updateNote = (id, updatedNote) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map(note => 
        note.id === id ? { ...note, ...updatedNote } : note
      );
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };

  // This function is being passed as a prop to NoteList Component
  // In NoteList Component it would be called when user confirms he wanna delete the note
  // and will provided the id of note to be deleted
  const deleteNote = (id) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter(note => note.id !== id);
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };

  // The filtered notes are being made by filtering notes state variable on basis of
  // search term and is being passed to NoteList component
  // so whenever update/delete happens the functions defined above runs and changes
  // notes state variable . since state changes full app is rendered and so NoteList also
  // get updated notes array and that's how this whole thing works
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header setSearchTerm={setSearchTerm} />
        <AddNote addNote={addNote} />
        <NoteList notes={filteredNotes} updateNote={updateNote} deleteNote={deleteNote} />
      </Container>
    </>
  );
}

export default App;