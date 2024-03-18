import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import AllRestaurants from './components/restaurant/AllRestaurants';
import { atom } from 'jotai';
import Register from './components/login/Register';

import RestaurantDetail from './components/restaurant/RestaurantDetail';
import Homepage from './components/homepage/Homepage';
import PageOrder from './components/Pagamento/PageOrder';
import CheckOut from './components/Pagamento/CheckOut';
import MyOrders from './components/user/MyOrders';
import RestaurantByOwner from './components/restaurant/RestaurantByOwner';
import MyDishes from './components/restaurant/MyDishes';
import MyStatistics from './components/restaurant/MyStatistics';

export const currentU = atom(JSON.parse(localStorage.getItem('user')) ?? {})


export const currentUser = atom(
  (get) => get(currentU),
  (get, set, newStr) => 
  {
    set(currentU, newStr)
    localStorage.setItem('user', JSON.stringify(newStr))
  },
)

export const currentOrder = atom(
    {
        idRestaurant: "",
        idUser: "",
        expected_arrival: "",
        paymentMethod: "card",
        notes: "",
        dishes: {}
      }
)

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route index element={<Homepage/>}  />
                    <Route path="/user/register" element={<Register />} />
                    <Route path="/user/login" element={<Login />} />
                    <Route path="/allrestaurants" element={<AllRestaurants />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                    <Route path='/my-orders'element={<MyOrders/>} />
                    <Route path='/my-restaurant'element={<RestaurantByOwner/>} />
                    <Route path='/dishes/:id'element={<MyDishes/>} />
                    <Route path='/my-statistics'element={<MyStatistics/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
