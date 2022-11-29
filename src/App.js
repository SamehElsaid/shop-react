import Footer from "./Component/Footer/Footer";
import Header from "./Component/Header/Header";
import { Routes, Route } from "react-router-dom"
import Admin from "./pages/Admin/Admin"
import Cart from "./pages/Cart/Cart"
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/Reset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./FireBase/firebase"
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ADD_CHAIRS, ADD_SOFT, ADD_MODILE, ADD_WATCH, LOG } from "./Redux/dataSlice/prodictsSlice";
import { ADD_ITEM } from "./Redux/cart/cartSlice";
import Shop from "./pages/Shop/Shop";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ADD_ALL_USERS } from "./Redux/authSlice/authSlice";
function App() {
  const isLoggedin = useSelector((ele) => ele.auth.isLoggedin);
  const custEmail = useSelector((ele) => ele.auth.email);
  const dispatch = useDispatch()
  const collections = collection(db, "chair")
  const char = () => {
    let sub = onSnapshot(query(collections, orderBy("timestamp", "desc")), (snapshot) => {
      let fetch = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      fetch.forEach(ele => ele.date = "")
      fetch.forEach(ele => ele.timestamp = "")
      dispatch(ADD_CHAIRS(fetch))
    })
    return sub
  }
  const soft = () => {
    let sub = onSnapshot(query(collection(db, "sofa"), orderBy("timestamp", "asc")), (snapshot) => {
      let fetch = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      fetch.forEach(ele => ele.timestamp = "")
      dispatch(ADD_SOFT(fetch))
    })
    return sub
  }
  const modile = () => {
    let sub = onSnapshot(query(collection(db, "mobileAndWireless"), orderBy("timestamp", "desc")), (snapshot) => {
      let fetch = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      fetch.forEach(ele => ele.timestamp = "")
      dispatch(ADD_MODILE(fetch))
    })
    return sub
  }
  const watch = () => {
    let sub = onSnapshot(query(collection(db, "watch"), orderBy("timestamp", "asc")), (snapshot) => {
      let fetch = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      fetch.forEach(ele => ele.timestamp = "")
      dispatch(ADD_WATCH(fetch))
      dispatch(LOG())
    })
    return sub
  }
  const user = () => {
    let sub = onSnapshot(query(collection(db, "users"), orderBy("timestamp", "asc")), (snapshot) => {
      let fetch = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      fetch.forEach(ele => ele.timestamp = "")
      dispatch(ADD_ALL_USERS(fetch))
    })
    return sub
  }
  const cart = () => {
    let sub = onSnapshot(query(collection(db, "cart"), orderBy("timestamp", "asc")), (snapshot) => {
      let fetch = snapshot.docs.map(doc => {
        return { ...doc.data(), idMain: doc.id }
      })
      fetch.forEach(ele => ele.timestamp = "")
      fetch = fetch.filter(ele => ele.nameLogin === custEmail)
      dispatch(ADD_ITEM(fetch))
    })
    return sub
  }
  useEffect(() => {

    char()
    soft()
    modile()
    watch()
    cart()
    user()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedin])
  return (
    <div className="App">
      <div className="">
        <Header />
        <ToastContainer className="toastContainer" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/admin" element={<Admin />} />
          {isLoggedin === false &&
            (
              <>
                <Route path="/Login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<Reset />} />
              </>
            )
          }
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;
