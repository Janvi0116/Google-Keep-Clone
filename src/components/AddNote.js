import React, { useState } from 'react';
import { TextField, Button, Box, ClickAwayListener, Paper,IconButton } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import ColorLensIcon from '@mui/icons-material/ColorLens';

function AddNote({ addNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteColor, setNoteColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const handleSave = () => {
    if (title.trim() || content.trim()) {
      addNote({ title, content,color: noteColor });
      setTitle('');
      setContent('');
      setNoteColor('#ffffff');
    }
    setIsExpanded(false);
  };

  const handleColorChange = (newColor) => {
    setNoteColor(newColor);
  };

  return (
    <ClickAwayListener onClickAway={handleSave}>
      <Paper 
        elevation={3}
        sx={{
          maxWidth: '600px',
          margin: '20px auto',
          padding: '10px',
          transition: 'all 0.3s ease-in-out',
          transform: isExpanded ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          {isExpanded && (
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              variant="standard"
              margin="normal"
            />
          )}
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Take a note..."
            multiline
            rows={isExpanded ? 3 : 1}
            variant="standard"
            margin="normal"
            onFocus={() => setIsExpanded(true)}
          />
          {isExpanded && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <IconButton onClick={() => setShowColorPicker(!showColorPicker)}>
                <ColorLensIcon />
              </IconButton>
              {showColorPicker && (
                <MuiColorInput format="hex" value={noteColor} onChange={handleColorChange} />
              )}
              <Button 
                onClick={handleSave}
                variant="contained" 
                color="primary"
              >
                Add Note
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </ClickAwayListener>
  );
}

export default AddNote;