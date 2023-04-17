import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Create from './Create/Create';
import Decks from './Decks/Decks';
import DeckEdit from './Create/DeckEdit';
import Test from './Test/Test';

export default function App() {
    return (
        <BrowserRouter>
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/decks" element={<Decks />} />
                <Route path="/create" element={<Create />} />
                <Route path={'/decks/:id'} exact element={<DeckEdit />} />
                <Route path={'/test/:id'} exact element={<Test />} />
                <Route component={Error} />
            </Routes>
        </div>
        </BrowserRouter>
    )
}
  