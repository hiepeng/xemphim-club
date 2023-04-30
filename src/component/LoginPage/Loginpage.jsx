import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./LoginPage.scss";
import Login from "./Login";
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
  const onSubmit = (e) => {
    e.preventDefault();
    // userProfile(formData);
    axios
      .post("http://localhost:8000/auth/login", formData)
      .then((res) => {
        //Perform Success Action
        alert("Đăng nhập thành công!");
        console.log(res);
        redirectHome();
      })
      .catch((error) => {
        // error.response.status Check status code
        alert(error.response.data.message);
      })
      .finally(() => {
        //Perform action in always
      });
  };
  const { email, password } = formData;
  return (
    <div className="login__page">
      <div className="container">
        <div className="form__container">
          <h2>Đăng nhập</h2>
          <form onSubmit={onSubmit}>
            {/* <div id="email" className="form__group">
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
            <div className="divider"></div> */}
            <Login userProfile={userProfile} />
          </form>
          {/* <NavLink className="helper-text" to="/signup">
            Đăng ký
          </NavLink> */}
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
