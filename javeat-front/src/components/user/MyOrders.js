import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { currentUser } from '../../App';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAtom(currentUser);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/myorders/${user.id}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Errore nel recupero degli ordini:', error);
            }
        };

        if (user.id) {
            fetchOrders();
        }
    }, [user]);

    function DisplayDate(dateString) {
        const [date, time] = dateString.split('T');
        const [hours, minutes] = time.split(':');
    
        // Restituisce la data, l'ora e i minuti
        return `${date} ${hours}:${minutes}`;
    }

    // function DisplayDate(date) {
    //     // Assumendo che 'date' sia un oggetto Date valido.
    //     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //   }

    const cancelOrder = async (orderId) => {
        try {
            const response = await axios.delete(`/deliveries/${orderId}`);
            if (response.status === 200) {
                setOrders(orders.filter(order => order.orderId !== orderId));
            } else {
                console.error('Errore nella cancellazione dell\'ordine:', response.statusText);
            }
        } catch (error) {
            console.error('Errore nella cancellazione dell\'ordine:', error);
        }
    };

    return (
        <div className="restaurant-form-container pt-5" style={{ backgroundImage: "url(/3.jpg)", backgroundSize: 'cover', color: 'white', padding: '10px', minHeight: '90vh'}}>

        <div className="container mt-5">
            <h2 className='text-black'><strong style={{color:"#2EC4B6"}}>My Orders</strong></h2>
            <br/>
            <div className="row d-flex flex-wrap">
                {orders.length > 0 ? (
                    orders.map(order => (
                        < div key = { order.orderId } className = "col-md-4 d-flex align-items-stretch" >
                        < div className = "card mb-3 w-100 d-flex flex-column" >
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title"><strong>Ordine #{order.orderId}</strong></h5>
                            <p className="card-text"><strong>Ristorante:</strong> <strong style={{color:"#2EC4B6"}}>{order.restaurantName}</strong></p>
                            <p className="card-text"><strong>Note:</strong> {order.notes}</p>
                            <p className="card-text"><strong>Metodo di pagamento:</strong> {order.paymentMethod}</p>
                            <p className="card-text"><strong>Data di consegna prevista:</strong> {DisplayDate(order.expectedArrival)}</p>
                            <p className="card-text"><strong>Prezzo piatti:</strong> {order.dishesPrice.toFixed(2)}</p>
                            <p className="card-text"><strong>Guadagno del rider:</strong> {order.riderRevenue.toFixed(2)}</p>
                            <p className="card-text"><strong>Prezzo totale:</strong> {order.totalPrice.toFixed(2)}</p>
                            <p className="card-text"><strong>Piatti:</strong></p>
                            <ul className="list-group mb-3">
                                {order.dishes.map(dish => (
                                    <li key={dish.id} className="list-group-item">
                                        {dish.name} - {dish.price}€ x {dish.quantity}
                                    </li>
                                ))}
                            </ul>
                            {/* <div className="mt-auto">
                                <button onClick={() => cancelOrder(order.orderId)} className="btn btn-danger me-2">Annulla Ordine</button>
                            </div> */}
                        </div>
                    </div>
        </div>
        
    ))
        ) : (
    <p>Nessun ordine trovato.</p>
)}
    </div >
</div >
</div >
    );
};

export default MyOrders;








