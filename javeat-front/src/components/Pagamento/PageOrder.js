// import React, { useState, useEffect } from 'react';
// import { useAtom } from 'jotai';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Importa useNavigate da react-router-dom
// import { currentOrder } from '../../App';

// const CheckOut = ({ restaurant }) => {
//     const navigate = useNavigate(); // Ottieni la funzione di navigazione
//     const [order, setOrder] = useAtom(currentOrder);
//     const [editedOrder, setEditedOrder] = useState({ dishes: new Map(), ...order});
//     const [dishesDetails, setDishesDetails] = useState([]);
//     const [expected_arrival, setExpected_arrival] = useState('');

//     function generateTimeS(closingHour) 
//     {
//         const slots = [];
//         const now = new Date();
//         const closingDate = new Date(now);
//         closingDate.setHours(closingHour, 0, 0, 0); 
    
//         let slot = new Date(now);
//         slot.setMinutes(Math.ceil(slot.getMinutes() / 15) * 15, 0, 0);
    
//         while (slot < closingDate) {
//             slots.push(slot.toTimeString().substring(0, 5));
//             slot = new Date(slot.getTime() + 15 * 60 * 1000);
//         }
    
//         return slots;
//     }

//     const handleOrario = (event) =>
//     {
//         setExpected_arrival(event.target.value);
//         setOrder({...order,expected_arrival:event.target.value});
//     }

//     useEffect(() => {
//         const menu = restaurant.menu;
//         const details = Array.from(editedOrder.dishes.entries()).map(([id, quantity]) => {
//             const dishDetail = menu.find(dish => dish.id === parseInt(id));
//             return { ...dishDetail, quantity };
//         });

//         setDishesDetails(details);
//     }, [editedOrder.dishes, restaurant.menu]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditedOrder({ ...editedOrder, [name]: value });
//     };

//     const handleDishChange = (id, newQuantity) => {
//         const updatedDishes = new Map(editedOrder.dishes);
//         updatedDishes.set(parseInt(id, 10), parseInt(newQuantity, 10));
//         setEditedOrder({ ...editedOrder, dishes: updatedDishes });
//     };

//     const mapDishesToObject = (dishesMap) => {
//         const obj = {};
//         dishesMap.forEach((quantity, id) => {
//             obj[id] = quantity;
//         });
//         return obj;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         const orderToSubmit = {
//             ...editedOrder,
//             dishes: mapDishesToObject(editedOrder.dishes),
//         };

    

    
//         try {
//             const response = await axios.post('/deliveries', orderToSubmit);
//             if (response.status === 200) {
//                 navigate('/my-orders');
//             } else {
//                 console.error('Errore nell\'invio dell\'ordine:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Errore nell\'invio dell\'ordine:', error);
//         }
//     };

//     return (
//         <div className='container'>
//             <h2>Checkout</h2>
//             <form onSubmit={handleSubmit}>
//             <label>Seleziona l'orario di consegna</label>
//                         <br/>
//                         <select className="form-select" id="orario" value={expected_arrival} onChange={handleOrario}>
//                             <option value="" disabled>Orari di consegna</option>
//                                     {generateTimeS(restaurant.closingHour).map((time, index) => (
//                             <option key={index} value={time}>{time}</option>
//                             ))}
//                         </select>
//                 <div className="mb-3">
//                     <label>Note dell'ordine</label>
//                     <textarea className="form-control" name="notes" value={editedOrder.notes} onChange={handleChange}></textarea>
//                 </div>
//                 <div className="mb-3">
//                     <label>Metodo di pagamento</label>
//                     <select className="form-control" name="paymentMethod" value={editedOrder.paymentMethod} onChange={handleChange}>
//                         <option value="card">Carta di Credito/Debito</option>
//                         <option value="paypal">PayPal</option>
//                         <option value="cash">Contanti alla consegna</option>
//                     </select>
//                 </div>
//                 {dishesDetails.map((dish, index) => (
//                     <div key={index} className="mb-3">
//                         <label className='text-black'>{dish.name} - {dish.price}€ x {dish.quantity}</label>
//                         <input
//                             type="number"
//                             className="form-control"
//                             value={dish.quantity}
//                             onChange={(e) => handleDishChange(dish.id, e.target.value)}
//                         />
//                     </div>
//                 ))}
//                 <button type="submit" className="btn btn-success">Invia Ordine</button>
//             </form>
//         </div>
//     );
// };

// export default CheckOut;
