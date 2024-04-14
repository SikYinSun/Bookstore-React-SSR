import { useState } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import { RootState } from './book/store';
import Card from './components/Card';
import { Book } from './book/bookSlice';
import AddPopUp from './components/AddPopUp';

function App() {
  const [openAddPop, setOpenAddPop] = useState(false)
  const booklist = useSelector((state: RootState) => state.booklist);

  const handleAdd = () => {
    setOpenAddPop(true);
  }

  return (
    <>
    <div>
      <nav>
        <h1>My Book List</h1>
      </nav>
      <div className='add-button-container'>
        <button className='add-button' onClick={handleAdd}>Add</button>
        <AddPopUp trigger={openAddPop} setTrigger={setOpenAddPop}></AddPopUp>
      </div>
      <div className="card-container">
        {booklist.map((book : Book) => (
          <Card key={book.id} book={book} />
        ))}
      </div>
      
    </div>
    </>
  )
}

export default App
