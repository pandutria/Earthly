import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register';
import ManageProduct from '../pages/ManageProduct/ManageProduct';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path='/' element={<Login/>}/>
                 <Route path='/register' element={<Register/>}/>
                 <Route path='/login' element={<Login/>}/>
                 <Route path='/manage/product' element={<ManageProduct/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;