import React from 'react';
import './App.css';
import MyForm from './MyForm';
import TableData from './Table';
import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Signup from './user/signup';
function App() {
  return (
   <>
   <Routes>
   <Route path='/' element={<Login/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/Table' element={<TableData/>}/>
   <Route path='/form' element={<MyForm/>}/>
 
    </Routes>
   </>
  );
}

export default App;
