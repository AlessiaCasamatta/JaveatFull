import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CheckOut from '../Pagamento/CheckOut';
import Restaurant from './Restaurant';

export default function RestaurantDetail() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [fliker, setFliker] = useState('Restaurant');

    useEffect(() => {
        axios.get(`/restaurants/${id}`)
            .then(response => {
                setRestaurant(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurant details:', error);
            });
    }, [id]);

    function invertFliker(page) {
        setFliker(page);
    }


    if (!restaurant) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {fliker == 'Restaurant' && <div style={{ backgroundImage: "url(/1back.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '20px', height: "90vh", overflowY: 'auto' }}>
                <Restaurant restaurant={restaurant} invertFliker={invertFliker} /></div>}

            {fliker == 'Checkout' && <div style={{ backgroundImage: "url(/3.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '20px', height: "90vh", overflowY: 'auto' }}>
                <CheckOut restaurant={restaurant} />
            </div>}

        </>
    );


}




