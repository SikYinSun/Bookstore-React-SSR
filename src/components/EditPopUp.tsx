import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import './popup.css'
import { Book, editBook } from '../book/bookSlice';
import { useDispatch } from 'react-redux';

interface EditPopUpProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  book : Book
}

function EditPopUp(props : EditPopUpProps) {
  
  const [data, setData] = useState<Partial<Book | null>>(props.book);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch();
  
  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
   
    setData((prev) => {
      return {
        ...prev,
        [name]: name === 'price' ? parseFloat(value) : value 
      }
    })
  }

  const handleSubmit = (event: React.FormEvent) =>{
    event.preventDefault();
    dispatch(editBook(data));
    props.setTrigger(false);
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
              <input type='text' name='name' defaultValue={data?.name} onChange={handleInput}/>
            </label>
          </div>
          <div>
            <label >
              Price:$
              <input type='number' name='price' step="0.01" defaultValue={data?.price} onChange={handleInput}/>
            </label>
          </div>
          <div>
            <label>
              Category:
              <input type='text' name='category' defaultValue={data?.category} onChange={handleInput}/>
            </label>
          </div>
          <div>
            <label >
              Description:
            </label>
              <textarea name='description' defaultValue={data?.description} onChange={handleInput}/>
          </div>
            <button className='submit-button' type='submit'>Edit Book</button>
        </form>
      </div>
    </div>
    </>, portalElement
  ) 
}

export default EditPopUp;
