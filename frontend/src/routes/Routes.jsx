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
import Catalog from '../pages/customer/Catalog/Catalog';
import DetailProduct from '../pages/customer/detailProduct/DetailProduct';
import Cart from '../pages/customer/Cart/Cart';
import History from '../pages/customer/History/History';
import Dashboard from '../pages/admin/Main/Dashboard/Dashboard';
import Transaction from '../pages/admin/Main/Transaction/Transaction';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path='/' element={<Login/>}/>
                 <Route path='/register' element={<Register/>}/>
                 <Route path='/login' element={<Login/>}/>
                 <Route path='/main/customer' element={<MainCustomer/>}/>
                 <Route path='/main/customer/catalog' element={<Catalog/>}/>
                 <Route path='/main/customer/product/:id' element={<DetailProduct/>}/>
                 <Route path='/main/customer/cart' element={<Cart/>}/>
                 <Route path='/main/customer/history' element={<History/>}/>
                 <Route path='/main/admin' element={<MainAdmin/>}/>
                 <Route path='/main/admin/category' element={<Category/>}/>
                 <Route path='/main/admin/product' element={<Product/>}/>
                 <Route path='/admin/manage/category' element={<ManageCategory/>}/>
                 <Route path='/admin/manage/product' element={<ManageProduct/>}/>
                 <Route path='/main/admin/transaction' element={<Transaction/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;