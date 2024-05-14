// import {BrowserRouter, Route, Routes} from "react-router-dom"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import Login from "./components/Login"
import Regester from './components/Regester';
import AddTask from './components/AddTask';

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/regester" element={<Regester/>} />
            <Route path="/tasks" element={<Tasks/>} />
            <Route path="/AddTask" element={<AddTask/>} />

            
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App