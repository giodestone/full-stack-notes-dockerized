import "./App.css"
import React, { useEffect } from 'react';
import { useState } from "react";
import.meta.hot

type Note = {
  id: number;
  title: string;
  content: string;
}

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

  // should be titled newNoteTitle, and newNoteContent as it only refers to the new note creation.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();

    // const newNote: Note = {
    //   id: notes.length + 1,
    //   title: title,
    //   content: content
    // }

    try {
      const response = await fetch("http://localhost:6868/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
      });
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (e)
    {
      console.log(e);
    }


  }

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
        body: JSON.stringify({ title, content })
      });

      

      const updatedNote: Note = await response.json() as Note;
      
      if (updatedNote === null) {
        console.log("unable to cast note from JSON provided from server.")
        return;
      }

      const updatedNotesList = notes.map((note => note.id == selectedNote.id ? updatedNote : note));

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (err: any) { 
      console.log(err);
    }

    // const updatedNote: Note = {
    //   id: selectedNote.id,
    //   title: title,
    //   content: content
    // }

    // // todo this is better as a map
    // const updatedNotesList = notes.map((note => note.id == selectedNote.id ? updatedNote : note));


  }

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

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
        setTitle("");
        setContent("");
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
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        >
        </input>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
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