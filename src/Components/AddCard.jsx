import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCard = ({ onAdd }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body || !imageUrl) {
      alert("Please fill in all fields");
      return;
    }

    const newCard = { title, body, imageUrl };
    try {
      const response = await fetch("http://localhost:3000/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });
      if (response.ok) {
        const newCard = await response.json();
        onAdd(newCard);
        setImageUrl("");
        setTitle("");
        setBody("");
        navigate("/");
      } else {
        console.error("Failed to add card:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div className="text-center my-5">
      <h2>Add New Card</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        /><br></br><br></br>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br></br><br></br>
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        /><br></br>
        <button className="btn btn-success" type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default AddCard;
