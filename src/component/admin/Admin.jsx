import React, { useEffect, useState } from "react";
import "./style.scss";
import { db } from "../../config/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export default function Admin() {
  const [step, setStep] = useState(2);
  const [statusManage, setStatusManage] = useState(1);
  const [users, setUsers] = useState(null);
  const checkPass = (event) => {
    const password = event.target.previousSibling.value; // Lấy giá trị từ ô nhập liệu
    if (password === "9999") {
      setStep(2); // Nếu mật khẩu đúng, cập nhật giá trị của biến step
    }
  };

  const getUsers = async () => {
    const getuser = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log(querySnapshot,"querySnapshot")
    querySnapshot.docs.forEach((item) => {
        const row = item.data()
        row.id = item.id
        getuser.push(row)
    });
    setUsers(getuser);
    console.log(users, "usersusersusersusersusers");
  };

  const handleDelete = async (user) => {
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, { block: true });
    getUsers()
  };

  const handleUnDelete = async (user) => {
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, { block: false });
    getUsers()
  };

  useEffect(() => {
    getUsers();
  }, [statusManage]);

  return (
    <div className="admin">
      {step === 1 ? (
        <div className="password">
          <input placeholder="enter password" />
          <button type="button" onClick={checkPass}>
            submit
          </button>
        </div>
      ) : (
        <div className="step-two">
          <div className="menu">
            <div
              className={`menu-item ${statusManage === 3 && "active"}`}
              onClick={() => setStatusManage(3)}
            >
              User
            </div>
            <div
              className={`menu-item ${statusManage === 1 && "active"}`}
              onClick={() => setStatusManage(1)}
            >
              Thể loại phim
            </div>
            <div
              className={`menu-item ${statusManage === 2 && "active"}`}
              onClick={() => setStatusManage(2)}
            >
              Danh sách phim
            </div>
          </div>
          <div>
            {statusManage === 1 ? (
              <div>a</div>
            ) : statusManage === 2 ? (
              <div>b</div>
            ) : (
              <div>
                <div className="user-list user-table">
                  <div className="user-list-header table-header">
                    <div>Email</div>
                    <div>Name</div>
                    <div>Google ID</div>
                    <div>Image</div>
                    <div>Time Register</div>
                    <div>BLock</div>
                    <div></div>
                    <div></div>
                  </div>
                  <div className="user-list-body ">
                    {users.map((user) => (
                      <div className="user-item table-row" key={user.email}>
                        <div>{user.email}</div>
                        <div>{user.name}</div>
                        <div>{user.googleId}</div>
                        <div>
                          <img src={user.imageUrl} alt={user.name} />
                        </div>
                        <div>{new Date(user.timeRegister.seconds * 1000).toLocaleString()}</div>
                        <div>{user.block ? 'Block' : 'No'}</div>
                        <div>
                          <button onClick={() => handleDelete(user)}>
                            Block
                          </button>
                        </div>
                        <div>
                          <button onClick={() => handleUnDelete(user)}>
                            UnBlock
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
