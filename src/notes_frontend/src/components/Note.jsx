import React, { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Principal } from "@dfinity/principal";

function Note(props) {
  console.log(props.time);
  const timeConv = new Date((Number(props.time))/1000000);
  const timestamp = new Date(timeConv).toLocaleString();
  console.log(timestamp);
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <img src={props.image} style={{ width: "100%", height: "200px", filter:"blur(0px)" }}/>
      <p>{timestamp}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
