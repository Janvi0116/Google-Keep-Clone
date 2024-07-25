import React, { useState, useMemo } from 'react';
import { Card, CardContent, Typography, IconButton, TextField, Box, Modal,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const colors = ['#fff8e1', '#e1f5fe', '#e8f5e9', '#fce4ec', '#f3e5f5', '#e8eaf6'];

function Note({ note, updateNote, deleteNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const defaultbackgroundColor = useMemo(() => {
    return colors[note.id % colors.length];
  }, [note.id]);

  const handleSave = () => {
    updateNote(note.id, { title: editedTitle, content: editedContent });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleCardClick = (e) => {
    if (!e.target.closest('button')) {
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteNote(note.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card sx={{ backgroundColor:note.color || defaultbackgroundColor, cursor: 'pointer' }} onClick={handleCardClick}>
        <CardContent>
          <Typography variant="h6" noWrap>{note.title}</Typography>
          <Typography variant="body2" noWrap>{note.content}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <IconButton onClick={() => {
                setIsEditing(true);
                setIsModalOpen(true);
              }
            }>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          {isEditing ? (
            <>
              <TextField
                fullWidth
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                margin="normal"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {note.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {note.content}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              </Box>
            </>
          )}
        </Box>
      </Modal>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Note"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this note? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Note;