import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register';
import MainCustomer from '../pages/customer/main/Main';
import MainAdmin from '../pages/admin/main/Main';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path='/' element={<Login/>}/>
                 <Route path='/register' element={<Register/>}/>
                 <Route path='/login' element={<Login/>}/>
                 <Route path='/main/customer' element={<MainCustomer/>}/>
                 <Route path='/main/admin' element={<MainAdmin/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;