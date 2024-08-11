import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { notes_backend } from "../../../declarations/notes_backend";

function App() {
  const [notes, setNotes] = useState([]);

   async function addNote(newNote) {

    console.log(newNote);
    setNotes(prevNotes => {
      notes_backend.createNote(newNote.title, newNote.content, newNote.image);
      return [newNote, ...prevNotes];
    });
    }

  useEffect(() => {
    console.log("useEffect is triggered")
    fetchData();
  }, []);

  async function fetchData() {
    const notesArray = await notes_backend.readNotes();
    console.log(notesArray);
    // console.log(updatedNotes);
    setNotes(notesArray);
  }  

  function deleteNote(id) {
    notes_backend.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            image={ URL.createObjectURL(
                new Blob([new Uint8Array(noteItem.image).buffer], { type: "image/png" })
            )}
            time={noteItem.timestamp}
            sendTime={fetchData}
            onDelete={deleteNote}
            width="200px"
            height="200px"
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
