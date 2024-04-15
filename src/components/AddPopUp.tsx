import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import './popup.css'
import { Book, addBook } from '../book/bookSlice';
import { useDispatch } from 'react-redux';

interface AddPopUpProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialData: Omit<Book, 'id'> = {
  name: '',
  price: 0.0,
  category: '',
  description: ''
};

function AddPopUp(props : AddPopUpProps) {

  const dispatch = useDispatch();
  const [data, setData] = useState<Omit<Book, 'id'>>(initialData);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  
  const generateId = () => {
    return Math.floor(Math.random() * 1000); 
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setData((prev) => ({
      ...prev,
      [name] : name === 'price' ? parseFloat(value) : value
    }));
  }

  const handleSubmit = (event: React.FormEvent) =>{
    event.preventDefault();

    const id = generateId();

    dispatch(addBook({id, ...data}));
    props.setTrigger(false);
    setData(initialData);
  }
  
  const handleClose= () =>{
    props.setTrigger(false);
  }
  
  useEffect(() => {
    setPortalElement(document.getElementById('portal'));
  }, []);

  if (!props.trigger || !portalElement) return null;

  return ReactDom.createPortal(
    <>
    <div className='popup'>
      <div className="popup-inner">
        <button className="close-btn" onClick={handleClose}>X</button>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input type='text' name='name' value={data.name} onChange={handleInput}/>
            </label>
          </div>
          <div>
            <label>
              Price:
              <input type='number' name='price' step="0.01" value={data.price} onChange={handleInput}/>
            </label>
          </div>
          <div>
            <label>
              Category:
              <input type='text' name='category' value={data.category} onChange={handleInput}/>
            </label>
          </div>
          <div>
            <label>
              Description:
            </label>
              <textarea name='description' value={data.description} onChange={handleInput}/>
          </div>
          <button className='submit-button' type='submit'>Add New Book</button>
        </form>
      </div>
    </div>
    </>, portalElement
  ) 
}

export default AddPopUp;
