import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CompareProducts from './components/CompareProducts/CompareProducts';
import About from './components/About/About';

const router = createBrowserRouter(
    createRoutesFromElements(
		<Route path='/' element={<App />} errorElement={<PageNotFound />} >
			<Route path='' element={<ProductDetails />} />
            <Route path='compareProducts' element={<CompareProducts />} />
            <Route path='about' element={<About />} />
		</Route>
  	)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <RouterProvider router={router} />
    </>
);

