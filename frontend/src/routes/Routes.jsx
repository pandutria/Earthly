import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register';
import MainCustomer from '../pages/customer/main/Main';
import MainAdmin from '../pages/admin/main/Main';
import ManageCategory from '../pages/admin/manage/ManageCategory';
import Category from '../pages/admin/Main/Category/Category';
import Product from '../pages/admin/Main/Product/Product';
import ManageProduct from '../pages/admin/Main/ManageProduct/ManageProduct';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path='/' element={<Login/>}/>
                 <Route path='/register' element={<Register/>}/>
                 <Route path='/login' element={<Login/>}/>
                 <Route path='/main/customer' element={<MainCustomer/>}/>
                 <Route path='/main/admin' element={<MainAdmin/>}/>
                 <Route path='/main/admin/category' element={<Category/>}/>
                 <Route path='/main/admin/product' element={<Product/>}/>
                 <Route path='/admin/manage/category' element={<ManageCategory/>}/>
                 <Route path='/admin/manage/product' element={<ManageProduct/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;