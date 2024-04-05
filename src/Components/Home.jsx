import { useState, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const fetchCards = async () => {
    try {
      const response = await fetch('http://localhost:3000/cards');
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchCards(); 
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/cards/${id}`, {
        method: 'DELETE',
      });
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <button class="btn btn-success mx-3 my-1"><Link to="/add">Add Card</Link></button>
      {cards.map(card => (
        <div key={card.id} class="card mb-3 w-50 m-auto mt-3">
         <div class="row g-0">
           <div class="col-md-4">
             <img src={card.imageUrl} class="img-fluid rounded-start" alt={card.title} />
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title">{card.title}</h5>
               <p class="card-text">{card.body}</p>
             </div>
             <button class="btn btn-primary mx-3 my-1" onClick={() => handleEdit(card.id)}>Edit</button>
             <button class="btn btn-danger" onClick={() => handleDelete(card.id)}>Delete</button>
           </div>
         </div>
       </div>
      ))}
    </div>
  );
};

export default Home;