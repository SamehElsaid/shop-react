import React, { memo, useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { storage, db } from "../../FireBase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
const CreatProduct = memo(({ elment }) => {
  const [img, setImg] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [imgLink, setImgLink] = useState(false);
  const [category, setCategory] = useState("wireless");
  const pross = useRef();
  const bgpross = useRef();
  const bgwid = useRef();
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
          console.log(Math.round(progress));
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
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setImgLink(downloadURL);
            })
            .then(
              toast.success("Change image", {
                theme: "colored",
              })
            );
        }
      );
    }
  };
  const addProduct = (e) => {
    e.preventDefault();
    if (elment === "mobileAndWireless") {
      addDoc(collection(db, elment), {
        avgRating: 2,
        category,
        description,
        imgUrl: imgLink,
        price,
        productName,
        reviews: [],
        shortDesc,
        new: "new",
        timestamp: serverTimestamp(),
      })
        .then(() => {
          setDescription("");
          setImg(false);
          setProductName("");
          setPrice("");
          setShortDesc("");
          setDoc("");
          setImgLink("");
          setCategory(false);
        })
        .then(
          toast.success("Add Success", {
            theme: "colored",
          })
        )
        .catch((err) => {
          console.log(err);
        });
    } else {
      addDoc(collection(db, elment), {
        avgRating: 2,
        category: elment,
        description,
        imgUrl: imgLink,
        price,
        productName,
        reviews: [],
        shortDesc,
        new: "new",
        timestamp: serverTimestamp(),
      })
        .then(() => {
          setDescription("");
          setImg(false);
          setProductName("");
          setPrice("");
          setShortDesc("");
          setDoc("");
          setImgLink("");
        })
        .then(
          toast.success("Add Success", {
            theme: "colored",
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="Chairs">
      <div className="img control_img position-relative d-flex">
        {imgLink && <img className="w-100 imgWidth" alt="" src={imgLink} />}
        <input
          type="file"
          required
          onChange={handleUpdate}
          accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
        />
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
      <div className="text-center">
        <button
          ref={bgpross}
          className="btn btn-warning text-white mb-4"
          onClick={handleUp}
        >
          Frist Select Img
        </button>
      </div>
      <form action="" onSubmit={addProduct}>
        {elment === "mobileAndWireless" && (
          <div className="chair">
            <h3>Category</h3>
            <select
              className="form-select inputEdit"
              required
              defaultChecked={"ascending"}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="ascending" disabled>
                Open this select menu
              </option>
              <option value="wireless">Wireless</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        )}

        <div className="chair">
          <h3>ProductName</h3>
          <input
            required
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

          <textarea
            rows="5"
            required
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

          <input
            type="number"
            required
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
          <textarea
            required
            rows="5"
            type="text"
            className="inputEdit form-control"
            value={shortDesc}
            onChange={(e) => {
              setShortDesc(e.target.value);
            }}
          />
        </div>
        <button className="btn btn-dark" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
});

export default CreatProduct;
