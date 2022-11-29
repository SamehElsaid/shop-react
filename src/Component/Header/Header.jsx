import "./Header.css";
import React, { memo, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiMenu4Line } from "react-icons/ri";
import { singout, auth } from "../../FireBase/firebase";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import {  useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { useEffect } from "react";
import { SET_ACTICE_USER , REMOVE_ACTICE_USER} from "../../Redux/authSlice/authSlice";
const Header = memo(() => {
  const [menu, setMenu] = useState(true);
  const [name, setName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sticky, setSticky] = useState(false);
  const menuSpan = useRef();
  const dispatch = useDispatch();
  const allProducts = useSelector((ele) => ele.cartSlice.allProducts);
  const user = useSelector((ele) => ele.auth.user);
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.email.split("@").splice(0, 1).join(""));
        setLoading(false);
        dispatch(
          SET_ACTICE_USER({
            email: user.email,
            useName: user.email.split("@").splice(0, 1).join(""),
            userID: user.uid,
          })
        );
      } else {
        setName(false);
        setLoading(false);
        dispatch(
          REMOVE_ACTICE_USER()
        );
      }
    });
  }, [dispatch]);
  const logoutsend = () => {
    setLoading(true);
    singout()
      .then(() => {
        toast.success("SingOut Successful", {
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error Happend", {
          theme: "colored",
        });
        setLoading(false);
      });
  };
  window.addEventListener("scroll",()=>{
    window.scrollY > 75? setSticky(true): setSticky(false)
    
  })
  return (
    <div className="position-relative">
      {loading && <Loading />}
      <nav className={sticky ? "navbar navbar-expand-lg overflow-hidden active" : "navbar navbar-expand-lg overflow-hidden "}>
        <div className="container">
          <Link className="navbar-brand me-5" to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/eshop-5268f.appspot.com/o/img%2Fshop-seeklogo.com.png?alt=media&token=400dcc49-a12e-4e9a-8ae3-12f1d299363d"
              alt=""
            />
          </Link>
          <div className="controlMenu d-flex gap-3">
            <li className="nav-item d-block d-lg-none">
              <NavLink to="/cart" className="position-relative ">
                <span>Card </span>
                <AiOutlineShoppingCart className="fs-2" />
                <span className="  position-absolute  translate-middle badge rounded-pill ">
                  {allProducts && allProducts !== 0 ? allProducts : 0}
                </span>
              </NavLink>
            </li>
            <button
              onClick={() => {
                setMenu(!menu);
                menu
                  ? menuSpan.current.classList.add("active")
                  : menuSpan.current.classList.remove("active");
              }}
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" ref={menuSpan}>
                <RiMenu4Line />
              </span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse d-inline-block d-lg-flex"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact">Contact Us</NavLink>
              </li>

              {user && user.control === "admin" && (
                <li className="nav-item">
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto ">
              {name !== false && (
                <li className="nav-item">
                  <Link to="/" className="hi">
                    Hi {name}
                  </Link>
                </li>
              )}
              {name === false && (
                <>
                  <li className="nav-item">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}

              {name !== false && (
                <li className="nav-item">
                  <Link to="/" onClick={logoutsend}>
                    Log Out
                  </Link>
                </li>
              )}
              <li className="nav-item  d-none d-lg-block">
                <NavLink to="/cart" className="position-relative ">
                  <span>Card </span>
                  <AiOutlineShoppingCart className="fs-2" />
                  <span className="  position-absolute  translate-middle badge rounded-pill ">
                    {allProducts && allProducts !== 0 ? allProducts : 0}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
});

export default Header;
