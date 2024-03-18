import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyDishes = (props) => {
    const [dishes, setDishes] = useState([]);

    useEffect(
        () => {
            axios.get(`/dishes/${props.restaurant.id}`)
                .then((response) => {
                    setDishes(response.data);
                }).catch((error) => {

                    console.error('Error fetching dishes:', error);

                });
        },
        [props.flicker]
    );

    const handleDelete = async (dishId) => {
        try {
          // Invia la richiesta di eliminazione al server
          await axios.delete(`/dishes/${dishId}`);
    
          // Aggiorna lo stato locale rimuovendo il piatto eliminato
          setDishes((prevDishes) => prevDishes.filter((dish) => dish.id !== dishId));
        } catch (error) {
          console.error('Error deleting dish:', error);
        }
      };

   
    return (
        <div className="container-fluid">
            <br/>
            <h2>My Menu</h2>
            <br/>
            <div className="row">
                {dishes.map((dish) => (
                    <div key={dish.id} className="col-md-3 mb-4">
                        <div className="card flex-column d-flex">
                            <img src={"/static/"+dish.imgUrl} className="card-img-top w-100" style={{ objectFit: 'cover', height: '200px' }} alt="..." />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-truncate custom-font">{dish.name}</h5>
                                <p className="card-text custom-font">{dish.description}</p>
                                <p className="card-text custom-font"><small className="text-muted">{dish.category}</small></p>
                                <p className="card-text custom-font">Price: ${dish.price}</p>
                                <button onClick={() => handleDelete(dish.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyDishes;
