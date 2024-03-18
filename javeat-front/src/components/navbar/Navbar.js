import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useAtom } from 'jotai';
import { currentUser } from "../../App";
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(currentUser);
    const isUserNotEmpty = Object.keys(user).length > 0;

    const isOwner = isUserNotEmpty && user.owner;

    function logOut() {
        setUser({});
        localStorage.setItem('user', JSON.stringify({}));
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg justify-content-between" style={{ backgroundColor: "#000000", height: "100px" }}>
            <div className="container-fluid m-5 px-5">
                <Link to="/" className="navbar-brand">
                    <img src="/logo_3.png" alt="Logo" height="200" />
                </Link>
                <div className="navbar-nav ">



                    {!isOwner ? (
                        <Link className="nav-link ms-2 text-white fst-italic fw-semibold fs-5" to="/allrestaurants">All Restaurants</Link>
                    ) : (
                        <>
                            <Link className="nav-link text-white fst-italic fw-semibold fs-5 " to="/my-restaurant">My Restaurant</Link>
                            <Link className="nav-link fst-italic fw-semibold fs-5 statistic-link" to="/my-statistics">My Statistics</Link>
                        </>
                    )}

                    {isUserNotEmpty && !isOwner &&
                        (
                            <Link className="nav-link fst-italic fw-semibold fs-5 statistic-link" to="/my-orders">My Orders</Link>
                        )
                    }

                    {!isUserNotEmpty ? (
                        <Link className="nav-link  fst-italic fw-semibold fs-5 login-link" to="user/login">Login</Link>
                    ) : (
                        <>
                            <button className="nav-link  fst-italic fw-semibold fs-5 login-link" onClick={logOut}>Log Out</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;


