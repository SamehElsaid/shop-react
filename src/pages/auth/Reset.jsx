import React, { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Component/Loading/Loading";
import { sendPassword } from "../../FireBase/firebase";

const Reset = memo(() => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    sendPassword(email)
      .then(() => {
                toast.success("Sending New Password Successful", {
                  theme: "colored",
                });
                navigate("/login");
    setLoading(false);

      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(
          errorCode.split("/").splice(1).join("").replaceAll("-", " "),
          {
            theme: "colored",
          }
          );
          setLoading(false);
      });
  };
  return (
    <section className="position-relative">
      {loading && <Loading />}
      <div className="container d-flex justify-content-center align-items-center gap-5">
        <div className="imgLogin  text-end">
          <img src="./img/Enter OTP-bro.svg" className="w-100 " alt="" />
        </div>
        <div className="loginForm ">
          <h2>Reset Password</h2>
          <form onSubmit={resetPassword}>
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
            <div className="btnLogin d-flex">
              <button className="btn w-100 btn-info" type="submit">
                Reset Password
              </button>
            </div>
            <div className=" d-flex justify-content-between">
              <Link to="/Login" className="register">
                - Login
              </Link>
              <Link to="/register" className="register">
                - Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});

export default Reset;
