import React, { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Component/Loading/Loading";
import { singup, db } from "../../FireBase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
const Register = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coPassword, setCoPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sendEmailPass = (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== coPassword) {
      toast.error("Password is not match", {
        theme: "colored",
      });
      setLoading(false);
    } else {
      singup(email, password)
        .then((userCredential) => {
          toast.success("Registration Successful", {
            theme: "colored",
          });
           addDoc(collection(db, "users"), {
             email,
             name:null,
             timestamp: serverTimestamp(),
           });
          setPassword("");
          setCoPassword("");
          setEmail("");
          navigate("/shop-react");
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          setLoading(false);
          toast.error(
            errorCode.split("/").splice(1).join("").replaceAll("-", " "),
            {
              theme: "colored",
            }
          );
        });
    }
  };
  return (
    <>
      <section className="position-relative">
        {loading && <Loading />}
        <div className="container d-flex justify-content-center align-items-center gap-5">
          <div className="loginForm ">
            <h2>Register</h2>
            <form onSubmit={sendEmailPass}>
              <input
                type="email"
                autoComplete="flase"
                className="form-control"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                name=""
                placeholder="Your Password"
                className="form-control"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type="password"
                name=""
                placeholder="Confirm Password"
                className="form-control"
                required
                value={coPassword}
                onChange={(e) => {
                  setCoPassword(e.target.value);
                }}
              />
              <div className="btnLogin d-flex">
                <button className="btn w-100 btn-info" type="submit">
                  Register
                </button>
              </div>
              <div className="">
                <Link to="/login" className="register">
                  Already an account ? <span>Login</span>
                </Link>
              </div>
            </form>
          </div>
          <div className="imgLogin  text-end">
            <img
              src="./img/Mobile login-rafiki.svg"
              className="w-100 "
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
});

export default Register;
