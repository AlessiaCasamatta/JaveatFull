import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { currentUser } from '../../App';
import RestaurantForm from './RestaurantForm';
import DishForm from './DishForm';
import MyDishes from './MyDishes';

const RestaurantByOwner = () => {
    const [user] = useAtom(currentUser);
    const [restaurant, setRestaurant] = useState(null);
    const [flicker, setFlicker] = useState(false);

    useEffect(() => {
        axios.get(`/restaurantowner/${user.id}`)
            .then(response => {
                setRestaurant(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
    }, [user]);

    function invertFlicker() {
        setFlicker(!flicker);
    }

    return (
        <div className="restaurant-form-container pt-5" style={{ backgroundImage: "url(/3.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '20px' }}>

            <div className="container my-3">
                <div className="row">
                    <div className="col-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-body">
                                <h5 className="card-title"></h5>
                                {restaurant && <RestaurantForm initialRestaurant={restaurant} />}
                            </div>
                        </div>
                    </div>
                    <div className="col-6 d-flex">
                        <div className="card flex-fill">
                            {restaurant && <DishForm invertFlicker={invertFlicker} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="card">
                    {restaurant && <MyDishes restaurant={restaurant} flicker={flicker} />}
                </div>
            </div>

        </div>

    );
};

export default RestaurantByOwner;