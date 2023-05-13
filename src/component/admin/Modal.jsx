import React from "react";
import "./style.scss";
import { useState } from "react";
import { useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Modal({ setIsShowModal, getPhim }) {
  const [nam, setNam] = useState([]);
  const [theLoai, setTheLoai] = useState([]);
  const [quocGia, setQuocGia] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeLink = (e) => {
    setLink(e.target.value);
  }; const changeImage = (e) => {
    setImage(e.target.value);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };
  const handleChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

  const getQuocGia = async () => {
    const all = [];
    const querySnapshot = await getDocs(collection(db, "quocgia"));
    querySnapshot.docs.forEach((item) => {
      const row = item.data().quocgia;
      all.push(row);
    });
    setQuocGia(all);
  };

  const getTheloai = async () => {
    const all = [];
    const querySnapshot = await getDocs(collection(db, "theloai"));
    querySnapshot.docs.forEach((item) => {
      const row = item.data().theloai;
      all.push(row);
    });
    setTheLoai(all);
  };

  const getData = async () => {
    const all = [];
    const querySnapshot = await getDocs(collection(db, "namsx"));
    querySnapshot.docs.forEach((item) => {
      const row = item.data().nam;
      all.push(row);
    });
    setNam(all);
  };

  const handleSubmit = async() => {
      await addDoc(collection(db, "phim"), {
        name: name,
        link: link,
        image: image,
        nam: selectedOption,
        theloai: selectedOption2,
        quocgia: selectedOption3,
        createdAt: new Date()
      });
      getPhim()
      setIsShowModal(false)
  };

  useEffect(() => {
    getQuocGia();
    getTheloai();
    getData();
  }, []);

  return (
    <div className="modal">
      <div className="container-modal">
        <div className="head-title">
          <div className="big-title">Phim</div>
          <div className="button" onClick={() => setIsShowModal(false)}>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#444"
                d="M15.1 3.1l-2.2-2.2-4.9 5-4.9-5-2.2 2.2 5 4.9-5 4.9 2.2 2.2 4.9-5 4.9 5 2.2-2.2-5-4.9z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="row-input">
          <div className="title">Tên phim</div>
          <input onChange={changeName} className="input" placeholder="test" />
        </div>
        <div className="row-input">
          <div className="title">Link Phim</div>
          <input onChange={changeLink} className="input" placeholder="test" />
        </div>
        <div className="row-input">
          <div className="title">Link ảnh</div>
          <input onChange={changeImage} className="input" placeholder="test" />
        </div>
        <div className="row-input">
          <div className="title">Năm sản xuất</div>
          <select onChange={handleChange}>
            <option value="">--Select an option--</option>
            {nam.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="row-input">
          <div className="title">Thể loại</div>
          <select onChange={handleChange2}>
            <option value="">--Select an option--</option>
            {theLoai.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="row-input">
          <div className="title">Quốc gia</div>
          <select onChange={handleChange3}>
            <option value="">--Select an option--</option>
            {quocGia.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="submit">
          <input onClick={handleSubmit} type="submit" value="Add phim" />
        </div>
      </div>
    </div>
  );
}
