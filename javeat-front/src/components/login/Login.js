import { useAtom } from "jotai";
import { currentUser } from "../../App";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Login() {
    const [user, setUser] = useAtom(currentUser);
    const mailIn = useRef(null);
    const passIn = useRef(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    function handleLogin() {
        const reqBody = {
            mail: mailIn.current.value,
            password: passIn.current.value
        };

        axios.post("/user/login", reqBody)
            .then(resp => {
                if (resp.data) {
                    setUser(resp.data);
                    if (resp.data.owner)

                        navigate("/my-restaurant");

                    else
                        navigate("/allrestaurants");
                } else {
                    setErrorMessage("Mail o Password errati.");
                    setShowErrorPopup(true);
                }
            })
            .catch(error => {
                console.error("An error occurred while logging in:", error);
                setErrorMessage("Mail o Password errati.");
                setShowErrorPopup(true);
            });
    }

    function handleCloseErrorPopup() {
        setShowErrorPopup(false);
    }

    return (
        <body style={{ minHeight: '150vh', backgroundImage: "url('/3.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <br /><br /><br /><br /><br /><br />
            <div className="container d-flex justify-content-center align-items-center  ">
                <form>
                    <h2 className="d-flex justify-content-center"><h1><strong>Accedi</strong></h1></h2>
                    <div className="">
                        <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email address</strong></label>
                        <input type="email" className="form-control" ref={mailIn} placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                        <input type="password" className="form-control" id="exampleInputPassword1" ref={passIn} placeholder="Password" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" onClick={handleLogin} className="btn btn-warning px-5 me-2" style={{ backgroundColor: "#2EC4B6" , color:"white"}}>Login</button>
                        <Link to="/user/register" ><button type="button" style={{ backgroundColor: "#FF9F1C", color:"white" }} className="btn ">Registrati</button></Link>
                    </div>
                </form>
            </div>
            {showErrorPopup && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Errore</h5>
                            </div>
                            <div className="modal-body">
                                {errorMessage}
                            </div>
                            <div className="modal-footer">
                                <button type="button" style={{ backgroundColor: "#2EC4B6" }} className="btn" onClick={handleCloseErrorPopup}>Chiudi</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </body>
    );
}
