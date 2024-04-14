import React, { useState } from 'react';
import { Book } from '../book/bookSlice';
import {deleteBook} from '../book/bookSlice';
import { useDispatch } from 'react-redux';
import EditPopUp from './EditPopUp';

interface BookProps {
  book : Book;
}

const Card: React.FC<BookProps> = ({book}) => {

  const dispatch = useDispatch();
  const [editPop, setEditPop] = useState(false);

  const handleDelete = () => {
    dispatch(deleteBook(book.id));
  } ;

  const handleEdit = () =>{
    setEditPop(true);
  }

  return (
  <div>
    <div className="card" onClick={handleEdit}>
      <h2>{book.name}</h2>
      <p>Category: {book.category}</p>
      <p>Description: {book.description.length > 50 ? book.description.slice(0, 50) + '...' : book.description}</p>
      <p>Price: ${book.price.toFixed(2)}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
    <EditPopUp trigger={editPop} setTrigger={setEditPop} book={book}></EditPopUp>
  </div>
  );
};

export default Card;