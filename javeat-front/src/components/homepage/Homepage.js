import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import YourComponent from './YourComponent';

export default function Homepage() {
    return (
        <> <div className="restaurant-form-container pt-2" style={{ backgroundImage: "url(/1back.jpg)", backgroundSize: 'cover', color: 'white', padding: '10px', minHeight: '90vh' }}>
            <h1 className='text-black text-center' ><strong>I piatti dei ristoranti che ami</strong></h1>
            <div className="container">
                <div id="carouselExampleDark" className="carousel carousel-light slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" style={{ backgroundColor: 'white', border: '1px solid #ddd' }}></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2" style={{ backgroundColor: 'white', border: '1px solid #ddd' }}></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3" style={{ backgroundColor: 'white', border: '1px solid #ddd' }}></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="card">
                                <img src="/carosello1.jpg" className="card-img-top" alt="First slide" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card">
                                <img src="/carosello2.jpg" className="card-img-top" alt="Second slide" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card">
                                <img src="/carosello3.jpg" className="card-img-top" alt="Third slide" />
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="pt-4 pb-5">
                {<YourComponent  />}
                </div>
                
            </div>
        </div>
        </>
    );
}


