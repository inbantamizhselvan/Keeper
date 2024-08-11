import React, { useState } from "react";
import {useForm} from "react-hook-form";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const {register, handleSubmit} = useForm();
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    image: null,
  });

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   console.log(event.target);

  //   setNote(prevNote => {
  //     return {
  //       ...prevNote,
  //       [name]: value
  //     };
  //   });
  // }

  async function submitNote(data, event) {
    setExpanded(false);
    const title = data.title;
    const content = data.content;
    const image = data.image[0];
    console.log(title, content, image);
    const imageArray = await image.arrayBuffer();
    const imageByteData = [...new Uint8Array(imageArray)];
    // const date = new Date();
    // const fullDate = new Date(date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    // const dateTime = fullDate.toLocaleString();
    // console.log(dateTime);
    // console.log(new Date());
    console.log(imageByteData);
    const updatedNote = {
      title: title,
      content: content,
      image: imageByteData,

    };
    props.onAdd(updatedNote);
    setNote({
      title: "",
      content: "",
      image: null,
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
          {...register("title", { required: true })}
            type="text"
            placeholder="Title"
            // value={note.title}
          />
        )}

        <textarea
          {...register("content", { required: true })}
          onClick={expand}
          placeholder="Take a note..."
          // value={note.content}
          rows={isExpanded ? 3 : 1}
        />
        <input
          type="hidden"
          name="MAX_FILE_SIZE"
          value="2097152" // 2MB in bytes
        />
        <input
          {...register("image", { required: true })}
          type="file"
          accept="image/*"
          // value={note.image}
          hidden={!isExpanded}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={handleSubmit(submitNote)}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
