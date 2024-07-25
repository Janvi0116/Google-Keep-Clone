import React from 'react';
import { Grid } from '@mui/material';
import Note from './Note';

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