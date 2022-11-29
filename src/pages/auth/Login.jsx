import "./Login.css";
import React, { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { singin, signInWithGoogle, db } from "../../FireBase/firebase";
import { toast } from "react-toastify";
import Loading from "../../Component/Loading/Loading";
import { GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
const Login = memo(() => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const allUser = useSelector((ele) => ele.auth.allUser);

  const singRes = (e) => {
    e.preventDefault();
    setLoading(true);
    singin(email, password)
      .then((userCredential) => {
        toast.success("Login Successful", {
          theme: "colored",
        });
        navigate("/shop-react");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(
          errorCode.split("/").splice(1).join("2").replaceAll("-", " "),
          {
            theme: "colored",
          }
        );
        setLoading(false);
      });
  };
  const provider = new GoogleAuthProvider();
  const singGoogle = () => {
    setLoading(true);

    signInWithGoogle(provider)
      .then((result) => {
        const user = result.user;
        let ss = allUser.find((ele) => ele.email === user.email);
        if (ss === undefined) {
          addDoc(collection(db, "users"), {
            email: user.email,
            name: user.displayName,
            timestamp: serverTimestamp(),
          });
        }
        toast.success("Login Successful", {
          theme: "colored",
        });

        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.split("/").splice(1).join("2").replaceAll("-", " "), {
          theme: "colored",
        });
        setLoading(false);
      });
  };
  return (
    <section className="position-relative">
      {loading && <Loading />}
      <div className="container d-flex justify-content-center align-items-center gap-5">
        <div className="imgLogin  text-end">
          <img src="./img/Mobile login-bro.svg" className="w-100 " alt="" />
        </div>
        <div className="loginForm ">
          <h2>Login</h2>
          <form onSubmit={singRes}>
            <input
              type="email"
              autoComplete="flase"
              className="form-control"
              placeholder="Your Email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
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
            <div className="btnLogin d-flex">
              <button className="btn w-100 btn-info" type="submit">
                Login
              </button>
            </div>
            <Link
              to="/reset"
              className="fs-3 d-inline-block text-decoration-none forget"
            >
              Forget Password
            </Link>
            <div className="or">-- or --</div>
          </form>
          <div className="">
            <button
              className="btn btn-danger w-100"
              type=""
              onClick={singGoogle}
            >
              <BsGoogle /> Login With Google
            </button>
            <Link to="/register" className="register">
              Don't Have account ? <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Login;
