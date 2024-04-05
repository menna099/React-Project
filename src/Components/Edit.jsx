import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({imageUrl: '', title: '', body: '' });
  const navigate = useNavigate();

  const fetchCardById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/cards/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  useEffect(() => {
    fetchCardById(id); 
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/cards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  return (
    <div className='text-center my-5'>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <label>ImageUrl</label><br></br>
      <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} /> <br></br>
      <label>Title</label><br></br>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} /><br></br>
        <label>Body</label><br></br>
        <textarea name="body" placeholder="Body" value={formData.body} onChange={handleChange} /><br></br>
        <button className='btn btn-primary' type="submit">Update Card</button>
      </form>
    </div>
  );
};

export default Edit;
