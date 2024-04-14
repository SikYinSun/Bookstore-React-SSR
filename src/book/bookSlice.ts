import { createSlice } from "@reduxjs/toolkit";

export interface Book {
  id: number; 
  name: string; 
  price: number;
  category: string; 
  description: string;
}

export type BookListState = Book[];

const initialState : BookListState = [
    {id: 1, name: "One Dark Window ", price: 23.99, category: "Literature & Fiction", description: "Elspeth Spindle needs more than luck to stay safe in the eerie, mist-locked kingdom she calls home—she needs a monster. She calls him the Nightmare, an ancient, mercurial spirit trapped in her head. He protects her. He keeps her secrets."},
    {id: 2, name: "Nuclear War: A Scenario", price: 39.99, category: "History", description: "Every generation, a journalist has looked deep into the heart of the nuclear military establishment: the technologies, the safeguards, the plans, and the risks. These investigations are vital to how we understand the world we really live in—where one nuclear missile will beget one in return, and where the choreography of the world’s end requires massive decisions made on seconds’ notice with information that is only as good as the intelligence we have."},
    {id: 3, name: "save me an orange", price: 18.94, category: "Poetry", description: "In her debut poetry collection, Hayley gives voice to the roots of struggle and pain growing up, as well as the love and pursuit of self-acceptance that were fundamental in her own choice to live. Her verses weave a narrative that is both deeply personal and universally resonant–through shadows of the past and the fleeting moments of joy captured in the simplicity of sharing an orange."},
    {id: 4, name: "Sovereign", price: 23.08, category: "Action & Adventure", description: "Sovereign is a dual POV, dark, high heat romance with an anti-hero MMC. Please check content warnings before reading."},
    {id: 5, name: "When the Moon Hatched: A Novel", price: 39.50, category: "Action & Adventure", description: "The bestselling phenomenon, When the Moon Hatched, is a fast-paced fantasy romance featuring an immersive, vibrant world with mysterious creatures, a unique magic system, and a love that blazes through the ages."},
    {id: 6, name: "The 48 Laws of Power", price: 23.04, category: "Politics & Social Sciences", description: "In the book that People magazine proclaimed “beguiling” and “fascinating,” Robert Greene and Joost Elffers have distilled three thousand years of the history of power into 48 essential laws by drawing from the philosophies of Machiavelli, Sun Tzu, and Carl Von Clausewitz and also from the lives of figures ranging from Henry Kissinger to P.T. Barnum."},
];

const bookSlice = createSlice({
  name: "booklist",
  initialState: initialState,
  reducers : {
    addBook: (state, action) => {
      const newBook = action.payload;
      state.push(newBook);
    },
    deleteBook: (state, action) => {
      const id = action.payload;
      return state = state.filter((book) => book.id !== id);
    },
    editBook: (state, action) => {
      const updateBook = action.payload;
      const index = state.findIndex((book) => book.id === updateBook.id);
      if(index !== -1){
        state[index] = updateBook;
      }
    }
  }
});

export const {addBook, deleteBook, editBook} = bookSlice.actions;
export default bookSlice.reducer;