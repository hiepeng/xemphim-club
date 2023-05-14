import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Signup.scss";
import Login from "./Login";
import { NavLink } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
function Loginpage({ userProfile }) {
  const initialState = {
    email: "",
    password: "",
    name: "",
  };
  const [formData, setData] = useState(initialState);
  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...formData, [name]: value });
  };
  let history = useHistory();
  const redirectHome = () => {
    history.push(`/`);
  };
  const onSubmit = async(e) => {
    e.preventDefault();
    console.log(formData)
    const q = query(
      collection(db, "users"),
      where("email", "==", formData.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach(item => console.log(item.data(), "111111"))
    if (!querySnapshot.docs.length) {
      await addDoc(collection(db, "users"), {
        email: formData.email,
        name: formData.name,
        pass: formData.password,
        timeRegister: new Date(),
      });
      alert("Tài khoản của bạn đã đăng kí thành công")
      history.push(`/login`);
    } else {
      console.log(querySnapshot.docs, "querySnapshot.docsquerySnapshot.docs")
      if(querySnapshot.docs[0].data().block) {
        alert("Tài khoản của bạn đã bị khóa")
        return
      } else {
        alert("Tài khoản đã tồn tại")
      }
    }
  };
  const { email, password, name } = formData;
  return (
    <div className="login__page">
      <div className="container">
        <div className="form__container">
          <h2>Đăng ký</h2>
          <form onSubmit={onSubmit}>
            <div id="email" className="form__group">
              <input
                onChange={onChange}
                name="email"
                value={email}
                type="email"
                placeholder="Email"
              />
            </div>
            <div id="email" className="form__group">
              <input
                onChange={onChange}
                name="name"
                value={name}
                type="text"
                placeholder="Tên bạn"
              />
            </div>
            <div id="password" className="form__group">
              <input
                onChange={onChange}
                name="password"
                value={password}
                type="password"
                placeholder="Mật khẩu"
              />
            </div>
            <div className="form__group">
              <label htmlFor="" className="checkbox">
                <input type="checkbox" />
                Đăng ký nhận thông báo về trang web
              </label>
            </div>
            <button className="login__btn">Đăng ký</button>
            <div className="divider"></div>
            <Login userProfile={userProfile} />
          </form>
          <NavLink className="helper-text" to="/login">
            Đăng nhập
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
