import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./LoginPage.scss";
import Login from "./Login";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
function Loginpage({ userProfile }) {
  const initialState = {
    email: "",
    password: "",
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
    userProfile(formData);
    const q = query(
      collection(db, "users"),
      where("email", "==", formData.email),
      where("pass", "==", formData.password),
    );

    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length) {
      history.push(`/`);
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác")
    }
  };
  const { email, password } = formData;
  return (
    <div className="login__page">
      <div className="container">
        <div className="form__container">
          <h2>Đăng nhập</h2>
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
                Ghi nhớ
              </label>
            </div>
            <button className="login__btn">Đăng nhập</button>
            <div className="divider"></div>
            <Login userProfile={userProfile} />
          </form>
          <NavLink className="helper-text" to="/signup">
            Đăng ký
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
