import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { currentOrder, currentU } from '../../App';
import DishDetail from '../dish/DishDetail';

export default function Restaurant({ restaurant, invertFliker }) {
    const [order, setOrder] = useAtom(currentOrder);
    const [user] = useAtom(currentU);
    const [cartItems, setCartItems] = useState(new Map());

    useEffect(() => {
        setOrder({ ...order, idRestaurant: restaurant.id, idUser: user.id });
    }, []);

    const addToCart = (dish) => {
        const updatedCartItems = new Map(cartItems);
        const quantity = updatedCartItems.get(dish.id) || 0;
        updatedCartItems.set(dish.id, quantity + 1);
        setCartItems(updatedCartItems);
    };

    const removeFromCart = (dishId) => {
        const updatedCartItems = new Map(cartItems);
        if (updatedCartItems.get(dishId) > 1) {
            updatedCartItems.set(dishId, updatedCartItems.get(dishId) - 1);
        } else {
            updatedCartItems.delete(dishId);
        }
        setCartItems(updatedCartItems);
    };

    const getTotalPrice = () => {
        return [...cartItems].reduce((total, [dishId, quantity]) => {
            const dish = restaurant.menu.find(dish => dish.id === dishId);
            return dish ? total + dish.price * quantity : total;
        }, 0);
    };

    const proceedToCheckout = () => {
        setOrder({ ...order, dishes: cartItems });
        invertFliker('Checkout');
    };

    return (
        <div className="mx-5 mt-5">
            <div className="row">
                <div className="col-md-9">
                    <div className="card mb-4 shadow-sm border-light-subtle"> {/* Added shadow-sm for a subtle shadow */}
                        {/* Image set to cover the entire top area */}
                        <img src={`/static/${restaurant.imgUrl}`} className="card-img-top" alt="Restaurant" style={{ width: "100%", objectFit: "cover", maxHeight: "40vh" }} />
                        <div className="card-body">
                            <h2 className="card-title"><strong>{restaurant.name}</strong></h2>
                            <p className="card-text"><strong>Phone:</strong> {restaurant.phone}</p>
                            <p className="card-text"><strong>Opening Hour:</strong> {restaurant.openingHour}</p>
                            <p className="card-text"><strong>Closing Hour:</strong> {restaurant.closingHour}</p>
                        </div>
                    </div>

                    <div className="card mb-4 shadow-sm border-light-subtle">
                        <div className="card-body ">
                            <h3 className="card-title"><strong>Menu</strong></h3>
                            <div className='row'>
                                {restaurant.menu.map((dish) => (
                                    <div key={dish.id} className="mb-3 col-4">
                                        <div className="card mb-3 border-light-subtle">
                                            <DishDetail dish={dish} />
                                            {user && Object.keys(user).length > 0 && (<button style={{ backgroundColor: '#FF9F1C', color: '#FFFFFF' }} className="btn mr-2 m-2 mx-2" onClick={() => addToCart(dish)}><strong>Add to Cart</strong></button>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {user && Object.keys(user).length > 0 &&
                    (
                        <div className="col-md-3">
                            <div className="card shadow-sm border-light-subtle" style={{ position: "sticky", top: "30px", zIndex: "1000", background: '#FFFFFF' }}>
                                <div className="card-body">
                                    <div className='d-flex pb-2'>
                                        <img src="/OIP.jpg" alt="Cart" style={{ width: "30px", marginRight: "10px" }} />
                                        <h4 className="card-title">Cart</h4>
                                    </div>
                                    {[...cartItems].map(([dishId, quantity]) => {
                                        const dish = restaurant.menu.find(dish => dish.id === dishId);
                                        return dish && (
                                            <div key={dishId} className="mb-2">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <span>{dish.name}</span>
                                                    <span>${dish.price * quantity}</span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>Quantity: {quantity}</span>
                                                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(dishId)}>Remove</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <hr />
                                    <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
                                    {cartItems.size > 0 && (
                                        <button style={{ backgroundColor: '#2EC4B6', color: '#FFFFFF' }} className="btn btn-block" onClick={proceedToCheckout}><strong>Proceed to Checkout</strong></button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                }
                {!Object.keys(user).length > 0 &&
                    (
                        <div className="col-md-3">
                            <div style={{ position: "sticky", top: "30px", zIndex: "1000" }}>
                                <div className='conteiner-fluid mb-1' >
                                    <img src="/static/2.jpg" className="img-thumbnail  rounded-5" />
                                </div>
                                <div className='conteiner-fluid mb-1' >

                                    <img src="/static/1.jpg" className="img-thumbnail  rounded-5  " />

                                </div>
                                <div className='conteiner-fluid mb-1' >

                                    <img src="/static/3.jpg" className="img-thumbnail  rounded-5" />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    );
}
