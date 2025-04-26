import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path='/' element={<Login/>}/>
                 <Route path='/register' element={<Register/>}/>
                 <Route path='/login' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;