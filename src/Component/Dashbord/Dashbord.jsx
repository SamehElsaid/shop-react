import React, { memo, useState, useEffect } from "react";
import { storage, db } from "../../FireBase/firebase";
import { BiCloudUpload } from "react-icons/bi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useRef } from "react";
import { toast } from "react-toastify";
const Dashbord = memo(({ data }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [img, setImg] = useState(false);
  const [newData, setNewData] = useState(false);
  const pross = useRef();
  const bgpross = useRef();
  const bgwid = useRef();
  const edit = (e) => {
    setProductName(e.productName);
    setDescription(e.description);
    setPrice(e.price);
    setShortDesc(e.shortDesc);
    document
      .getElementById(`${e.id}perent`)
      .querySelectorAll(".inputEdit")
      .forEach((ele, i) => {
        ele.style.display = "block";
        document
          .getElementById(`${e.id}perent`)
          .querySelectorAll(".chair span")[i].style.display = "none";
      });
    document.getElementById(`${e.id}edit`).style.display = "none";
    document.getElementById(`${e.id}save`).style.display = "inline";
  };
  const save = (e) => {
    document
      .getElementById(`${e.id}perent`)
      .querySelectorAll(".inputEdit")
      .forEach((ele, i) => {
        ele.style.display = "none";
        document
          .getElementById(`${e.id}perent`)
          .querySelectorAll(".chair span")[i].style.display = "block";
      });
    document.getElementById(`${e.id}edit`).style.display = "inline";
    document.getElementById(`${e.id}save`).style.display = "none";
    if (data.category !== "mobile" && data.category !== "wireless") {
      updateDoc(doc(db, data.category, data.id), {
        ...newData,
        productName,
        description,
        price,
        shortDesc,
      }).then(
        toast.info("Edit Success", {
          theme: "colored",
        })
      );
    } else {
      updateDoc(doc(db, "mobileAndWireless", data.id), {
        ...newData,
        productName,
        description,
        price,
        shortDesc,
      }).then(
        toast.info("Edit Success", {
          theme: "colored",
        })
      );
    }
  };
  const handleUpdate = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
      bgpross.current.textContent = "Upload";
    }
  };
  const handleUp = () => {
    if (img) {
      const storageRef = ref(storage, `images/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          pross.current.textContent = Math.round(progress) + "%";
          bgwid.current.style.width = Math.round(progress) + "%";
          if (progress === 100) {
            bgpross.current.style.background = "var(--heading-text-color)";
            bgpross.current.style.borderColor = "var(--heading-text-color)";
            bgpross.current.textContent = "Done";
            setImg(false);
          }
        },
        (err) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (data.category !== "mobile" && data.category !== "wireless") {
              updateDoc(doc(db, data.category, data.id), {
                ...data,
                imgUrl: downloadURL,
              }).then(
                toast.success("Change image", {
                  theme: "colored",
                })
              );
            } else {
              updateDoc(doc(db, "mobileAndWireless", data.id), {
                ...newData,
                imgUrl: downloadURL,
              }).then(
                toast.success("Change image", {
                  theme: "colored",
                })
              );
            }
          });
        }
      );
    }

    // let update =
  };
  const user = () => {
    if (data.category !== "mobile" && data.category !== "wireless") {
      let sub = onSnapshot(
        query(collection(db, data.category), orderBy("timestamp", "asc")),
        (snapshot) => {
          let fetch = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          fetch.forEach((ele) => (ele.timestamp = ""));
          let myProduct = fetch.find((ele) => ele.id === data.id);
          setNewData(myProduct);
        }
      );
      return sub;
    } else {
      let sub = onSnapshot(
        query(collection(db, "mobileAndWireless"), orderBy("timestamp", "asc")),
        (snapshot) => {
          let fetch = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          let myProduct = fetch.find((ele) => ele.id === data.id);
          setNewData(myProduct);
        }
      );
      return sub;
    }
  };
  const deletItem = async (e) => {
    if (data.category !== "mobile" && data.category !== "wireless") {
      await deleteDoc(doc(db, data.category, e));
      toast.error("Remove Product", {
        theme: "colored",
      });
    } else {
      await deleteDoc(doc(db, "mobileAndWireless", e));
      toast.error("Remove Product", {
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    user();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {newData && (
        <div className="Chair border">
          <div className="img control_img position-relative d-flex">
            <img className="w-100 imgWidth" src={newData.imgUrl} alt="" />
            <input type="file" onChange={handleUpdate} />
            <div className="update">
              <BiCloudUpload style={{ fill: "var(--color-orange)" }} />
            </div>
          </div>
          <div className="px-5 my-4">
            <div className="num position-relative">
              <div className="numRight" ref={pross}>
                0
              </div>
              <div className="increase bg-info" ref={bgwid}></div>
            </div>
          </div>
          <div className="btsIn text-center">
            <button
              ref={bgpross}
              className="btn btn-warning text-white mb-4"
              onClick={handleUp}
            >
              Frist Select Img
            </button>
          </div>
          <div id={`${newData.id}perent`} className="parent">
            <div className="chair">
              <h3>ProductName</h3>
              <span> {newData.productName}</span>
              <input
                className="inputEdit form-control"
                type="text"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </div>
            <div className="chair">
              <h3>Description</h3>

              <span>{newData.description}</span>
              <textarea
                rows="5"
                className="inputEdit form-control"
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="chair">
              <h3>Price</h3>

              <span>{newData.price}</span>
              <input
                type="number"
                min="0"
                className="inputEdit form-control"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="chair">
              <h3>ShortDesc</h3>
              <span>{newData.shortDesc}</span>
              <textarea
                rows="5"
                type="text"
                className="inputEdit form-control"
                value={shortDesc}
                onChange={(e) => {
                  setShortDesc(e.target.value);
                }}
              />
            </div>
            <button
              className="btn btn-info mb-4"
              id={`${newData.id}edit`}
              onClick={() => edit(newData)}
            >
              edit
            </button>
            <button
              className="btn btn-danger mb-4"
              id={`${newData.id}save`}
              style={{ display: "none" }}
              onClick={() => save(newData)}
            >
              save
            </button>
            <button
              className="btn btn-secondary ms-4 mb-4"
              onClick={() => {
                deletItem(newData.id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Dashbord;
