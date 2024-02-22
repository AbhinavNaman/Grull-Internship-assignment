import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Hero from './components/Hero'
import Catagory from './Pages/Catagory.jsx';
import Auth from './components/Auth.jsx';
import { Error404 } from './components/Error404.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Productdetail from './Pages/ProductDetail.jsx';
import Wishlist from './Pages/Wishlist.jsx';
import Cart from './Pages/Cart.jsx';

const router = createBrowserRouter([
  {path: '/', element: <Hero/>, errorElement: <Error404/>},
  {path: '/catagory', element: <Hero/>, errorElement: <Error404/>},
  {path: '/catagory/:itemName', element: <Catagory/>, errorElement: <Error404/>},
  {path: '/catagory/:itemName/:item', element: <Productdetail/>, errorElement: <Error404/>},
  {path: '/auth', element: <Auth/>, errorElement: <Error404/>},
  {path: '/wishlist', element: <Wishlist/>, errorElement: <Error404/>},
  {path: '/cart', element: <Cart/>, errorElement: <Error404/>},
])

function App() {

  return (
    <>
  <MantineProvider>
  <RouterProvider router={router} />
  </MantineProvider>
    
    </>
  )
}
export default App
