import { useAtom } from "jotai";
import { currentUser } from "../../App";
import { useState } from "react";
import axios from "axios";

const DishForm = (props) => {
    const [user] = useAtom(currentUser);
    const [dish, setDish] = useState({
        name: "",
        category: "",
        price: 0,
        ingredients: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDish({ ...dish, [name]: value });
    };

    const handleTextareaChange = (event) => {
        const text = event.target.value;
        const lines = text.split('\n');
        const filteredLines = lines.filter(line => line.trim() !== '');
        setDish({ ...dish, ingredients: filteredLines });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`/dishes/${user.id}`, dish);
            props.invertFlicker();
            setDish({
                name: "",
                category: "",
                price: 0,
                ingredients: []
            });

            // Puoi anche aggiungere qui una logica aggiuntiva dopo il submit
            console.log("Modulo inviato con successo!");
        } catch (error) {
            console.error("Errore durante l'invio del modulo:", error);
        }
    };

    return (
        <form className="mt-4" onSubmit={handleSubmit}>
          <h3 className="p-3">New Dish</h3>
          <div className="mt-4" style={{ padding: '20px' }}>
            <div className="mb-3">
              <label className="form-label"><strong>Name</strong></label>
              <input
                type="text"
                className="form-control"
                placeholder="Inserisci nome del piatto"
                name="name"
                value={dish.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><strong>Category</strong></label>
              <input
                type="text"
                className="form-control"
                placeholder="Inserisci categoria del piatto"
                name="category"
                value={dish.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><strong>Price</strong></label>
              <input
                type="number"
                className="form-control"
                placeholder="Inserisci prezzo del piatto"
                name="price"
                value={dish.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><strong>Ingredients</strong></label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={handleTextareaChange}
                value={dish.ingredients.join('\n')}
              ></textarea>
            </div>
            <button type="submit" className="btn" style={{backgroundColor: "#2EC4B6"}}>Invia</button>
          </div>
        </form>
      );
      
      
};

export default DishForm;
