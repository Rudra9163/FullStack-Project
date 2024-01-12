import React from 'react';
import './App.css';
import MyForm from './MyForm';
import TableData from './Table';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
   <>
   <Routes>
   <Route path='/' element={<TableData/>}/>
   <Route path='/form' element={<MyForm/>}/>
 
    </Routes>
   </>
  );
}

export default App;
