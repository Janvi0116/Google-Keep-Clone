import React, { useState, useEffect } from 'react';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import { getNotes, saveNotes } from './utils/localStorage';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadedNotes = getNotes();
    setNotes(loadedNotes);
  }, []);


  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = (newNote) => {
    setNotes(prevNotes => {
      const updatedNotes = [{ id: Date.now(), ...newNote },...prevNotes];
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };

  const updateNote = (id, updatedNote) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map(note => 
        note.id === id ? { ...note, ...updatedNote } : note
      );
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter(note => note.id !== id);
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };

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