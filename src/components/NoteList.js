import React from 'react';
import { Grid } from '@mui/material';
import Note from './Note';

// This just loops on notes prop and for each prop render Note component
// passing it all the props needed by it
function NoteList({ notes, updateNote, deleteNote }) {
  return (
    <Grid container spacing={3}>
      {notes.map((note) => (
        <Grid item xs={12} sm={6} md={4} key={note.id}>
          <Note note={note} updateNote={updateNote} deleteNote={deleteNote} />
        </Grid>
      ))}
    </Grid>
  );
}

export default NoteList;