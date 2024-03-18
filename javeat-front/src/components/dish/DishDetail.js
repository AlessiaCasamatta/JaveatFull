import React from 'react';

export default function DishDetail({ dish }) {
    return (
        <div className="card-body" style={{ padding: 0 }}> {/* Rimuovi il padding della card-body */}

            <img src={"/static/" + dish.imgUrl} className="card-img-top w-100" style={{ objectFit: 'cover', height: '200px', width: '100%', margin: 0 }} alt="..." /> {/* Assicurati che l'immagine sia a larghezza piena e senza margini */}
            <div style={{ padding: '0 16px' }}> {/* Aggiungi padding intorno al contenuto della card per separarlo dall'immagine */}
                <h4 className="card-title pt-3" ><strong>{dish.name}</strong></h4> {/* Aggiungi margini personalizzati se necessario */}
                <p className="card-text"><strong>Category:</strong> {dish.category}</p>
                <p className="card-text"><strong>Price:</strong> ${dish.price}</p>
                {/* <p className="card-text"><strong>Ingredients:</strong> {dish.ingredients.join(', ')}</p> */}
            </div>
        </div>

    );
}