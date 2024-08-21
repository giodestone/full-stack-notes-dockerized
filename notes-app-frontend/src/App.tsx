import "./App.css"
import React, { useEffect } from 'react';
import { useState } from "react";
import.meta.hot

/**
 * Represents a note stored in the database.
 */
type Note = {
  id: number;
  title: string;
  content: string;
}

/**
 * Editor and display as fetched for the notes.
 */
const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    // {
    //   id: 1,
    //   title: "note 1 title abc",
    //   content: "note 1 content"
    // },
    // {
    //   id: 2,
    //   title: "note 2 title",
    //   content: "note 2 content"
    // },
    // {
    //   id: 3,
    //   title: "note 3 title",
    //   content: "note 3 content"
    // },
    // {
    //   id: 4,
    //   title: "note 4 title",
    //   content: "note 4 content"
    // },
  ]);

  // For the note editor to the left. Can be used for editing existing notes or creating new ones.
  const [noteEditorTitle, setNoteEditorTitle] = useState("");
  const [noteEditorContent, setNoteEditorContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:6868/api/notes");
        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, []);

  /**
   * Logic for selecting the currently selected note.
   * @param note The clicked note.
   */
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setNoteEditorTitle(note.title);
    setNoteEditorContent(note.content);
  }

  /**
   * Handle when the 'add new note' button is clicked. Creates a new note and queries the API.
   * @param event The event default will be prevented.
   */
  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:6868/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: noteEditorTitle, content: noteEditorContent })
      });
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setNoteEditorTitle("");
      setNoteEditorContent("");
    } catch (e)
    {
      console.log(e);
    }
  }

  /**
   * Handles when an existing note is updated. Queries API.
   * @param event The event that triggered this update. Default will be prevented.
   */
  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedNote == null)
      return;

    try {
      const response = await fetch(`http://localhost:6868/api/notes/${selectedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: noteEditorTitle, content: noteEditorContent })
      });

      const updatedNote: Note = await response.json() as Note;
      
      if (updatedNote === null) {
        console.log("unable to cast note from JSON provided from server.")
        return;
      }

      const updatedNotesList = notes.map((note => note.id == selectedNote.id ? updatedNote : note));

      setNotes(updatedNotesList);
      setNoteEditorTitle("");
      setNoteEditorContent("");
      setSelectedNote(null);
    } catch (err: any) { 
      console.log(err);
    }
  }

  /**
   * Handle when 'cancel' is pressed on the note editor.
   */
  const handleCancel = () => {
    setNoteEditorTitle("");
    setNoteEditorContent("");
    setSelectedNote(null);
  }

  /**
   * Handles when a note is deleted. Queries API.
   * @param event The event that triggered this. Will not be propagated to the note.
   * @param noteId The ID of the note as in the database.
   */
  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation(); // stop the delete note onclick propagating down to the onclick for the note.

    try {
      const response = await fetch(`http://localhost:6868/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok)
        throw "Server did not respond okay. Note will not be deleted."

      const updatedNotes = notes.filter((note) => note.id != noteId); // get all notes that dont match the ID

      setNotes(updatedNotes);

      if (selectedNote?.id === noteId) {
        setNoteEditorTitle("");
        setNoteEditorContent("");
        setSelectedNote(null);
      }
      
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event)}
      >
        <input
          value={noteEditorTitle}
          onChange={(event) => setNoteEditorTitle(event.target.value)}
          placeholder="Title"
          required
        >
        </input>
        <textarea
          value={noteEditorContent}
          onChange={(event) => setNoteEditorContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        >
        </textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add A Note</button>
        )}
      </form>

      <div className="notes-grid">
        
        {notes.map((note) => (
          <div
            className="note-item"
            onClick={() => handleNoteClick(note)}
            key={note.id}
          >
            <div className="notes-header">
              <button
              onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
        </div>))}
        
      </div>
    </div>
  );
}

export default App;