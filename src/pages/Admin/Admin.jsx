import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CreatProduct from "../../Component/CreatProduct/CreatProduct";
import Dashbord from "../../Component/Dashbord/Dashbord";
import Spider from "../../Component/Spider/Spider";
import { db } from "../../FireBase/firebase";
import "./Admin.css";
const Admin = memo(() => {
  const [data, setData] = useState(false);
  const [name, setName] = useState(false);
  const [elment, setElment] = useState(false);
  const allUser = useSelector((ele) => ele.auth.allUser);
  const users = useSelector((ele) => ele.auth.user);
console.log(users);
  const user = () => {
    if(name){
      if (name !== "mobile" && name !== "wireless") {
        let sub = onSnapshot(collection(db, name), (snapshot) => {
          let fetch = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          fetch.forEach((ele) => (ele.timestamp = ""));
          setData(fetch);
        });
        return sub;
      } else {
        let sub = onSnapshot(
          query(collection(db, "mobileAndWireless")),
          (snapshot) => {
            let fetch = snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            });
            setData(fetch);
          }
        );
        return sub;
      }
    }
  };
  useEffect(() => {
    if (allUser) {
      user();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  const email = useSelector((ele) => ele.auth.email);
  let allUserEdit;
  if (allUser) {
    allUserEdit = allUser.filter((ele) => ele.email !== email);
  }
  const removeAdmin = async (e) => {
    let findS = allUser.find((ele) => ele.id === e);
    await updateDoc(doc(db, "users", e), {
      ...findS,
      control: "",
    });
  };
  const addAdmin = async (e) => {
    let findS = allUser.find((ele) => ele.id === e);
    await updateDoc(doc(db, "users", e), {
      ...findS,
      control: "admin",
    });
  };
  document.querySelectorAll(".ulEdit li").forEach((ele) => {
    ele.addEventListener("click", () => {
      document.querySelectorAll(".ulEdit li").forEach((e) => {
        e.classList.remove("active");
      });
      ele.classList.add("active");
    });
  });
  return (
    <section>
      {users && users.control === "admin" ? (
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-3">
              <ul className="ulEdit">
                <li
                  className="pointer active"
                  id="usersControl"
                  onClick={() => {
                    document.querySelector(".controlDat").style.display =
                      "none";
                    document.querySelector(".controlUl").style.display =
                      "block";
                  }}
                >
                  Users
                </li>
                <li
                  onClick={() => {
                    setName("chair");
                    setElment("chair");
                    document.querySelector(".controlDat").style.display =
                      "block";
                    document.querySelector(".controlUl").style.display = "none";
                  }}
                  className="newData pointer"
                >
                  Chair
                </li>
                <li
                  className="newData pointer"
                  onClick={() => {
                    setName("mobileAndWireless");

                    setElment("mobileAndWireless");
                    document.querySelector(".controlDat").style.display =
                      "block";
                    document.querySelector(".controlUl").style.display = "none";
                  }}
                >
                  Mobile and Wireless
                </li>
                <li
                  className="newData pointer"
                  onClick={() => {
                    setName("sofa");

                    setElment("sofa");
                    document.querySelector(".controlDat").style.display =
                      "block";
                    document.querySelector(".controlUl").style.display = "none";
                  }}
                >
                  Soft
                </li>
                <li
                  className="newData pointer"
                  id="watch"
                  onClick={() => {
                    setName("watch");

                    setElment("watch");
                    document.querySelector(".controlDat").style.display =
                      "block";
                    document.querySelector(".controlUl").style.display = "none";
                  }}
                >
                  Watch
                </li>
              </ul>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-9">
              <div className="Users controlUl">
                {allUserEdit &&
                  allUserEdit.map((ele) => (
                    <div key={ele.id} className="allUserEdit">
                      <div className="fs-3">{ele.email}</div>
                      {ele.control === "admin" ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            removeAdmin(ele.id);
                          }}
                        >
                          Remove Admin
                        </button>
                      ) : (
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            addAdmin(ele.id);
                          }}
                        >
                          Add Admin
                        </button>
                      )}
                    </div>
                  ))}
              </div>
              <div className="controlDat ">
                <div className="row">
                  {data.length > 0 ? (
                    data.map((ele) => (
                      <div className="col-sm-12 col-md-6 col-lg-6" key={ele.id}>
                        <Dashbord data={ele} />
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                        <Spider />
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                        <Spider />
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                        <Spider />
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                        <Spider />
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                        <Spider />
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                        <Spider />
                      </div>
                    </>
                  )}
                  <CreatProduct elment={elment} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" text-center">
          <h1>لازم تبقا ادمن ي رجوله </h1>
        </div>
      )}
    </section>
  );
});

export default Admin;
