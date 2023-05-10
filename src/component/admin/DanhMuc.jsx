import React, { useEffect, useState } from "react";
import "./style.scss";
import { db } from "../../config/firebase";
import { addDoc, collection, getDocs, deleteField, doc, updateDoc, deleteDoc  } from "firebase/firestore";

export default function DanhMuc() {
  const [addNamSx, setAddNamSx] = useState()
  const [namSanXuat, setNamSanXuat] = useState();
  const [theLoai, setTheLoai] = useState();
  const [quocGia, setQuocGia] = useState(); // tạo một mảng các quốc gia

  const handleAddNamSanXuat = async() => {
    await addDoc(collection(db, "namsx"), {
      nam: addNamSx,
    });
    getData()
    setAddNamSx('')
  };

  const handleDeleteNamSanXuat = async(year) => {
    console.log(year, "year")
    await deleteDoc(doc(db, "namsx", year.id));
    getData()
  };

  const handleEditNamSanXuat = (year, newYear) => {
    const updatedYears = namSanXuat.map((y) => (y === year ? newYear : y));
    setNamSanXuat(updatedYears);
  };

  const handleAddTheLoai = async() => {
    const name = prompt('Nhập tên thể loại')
    await addDoc(collection(db, "theloai"), {
      theloai: name,
    });
    getTheloai()
  };

  const handleDeleteTheLoai = async(t) => {
    await deleteDoc(doc(db, "theloai", t.id));
    getTheloai()
  };

  const handleEditTheLoai = async(value) => {
    const name = prompt('Nhập tên thể loại')
    const userRef = doc(db, "theloai", value.id);
    await updateDoc(userRef, { theloai: name });
    getTheloai()
  };

  const handleAddQuocGia = async() => {
    const name = prompt('Nhập tên quoc gia')
    await addDoc(collection(db, "quocgia"), {
      quocgia: name,
    });
    getQuocGia()
  };

  const getQuocGia = async() => {
    const all = [];
    const querySnapshot = await getDocs(collection(db, "quocgia"));
    querySnapshot.docs.forEach((item) => {
      const row = item.data();
      row.id = item.id;
      all.push(row);
    });
    setQuocGia(all);
  }
  const handleDeleteQuocGia = async(q) => {
    await deleteDoc(doc(db, "quocgia", q.id));
    getQuocGia()
  };

  const handleEditQuocGia = async(newValue) => {
    const name = prompt('Nhập tên quốc gia')
    const userRef = doc(db, "quocgia", newValue.id);
    await updateDoc(userRef, { quocgia: name });
    getQuocGia()
  };

  const getTheloai = async () => {
    const all = [];
    const querySnapshot = await getDocs(collection(db, "theloai"));
    querySnapshot.docs.forEach((item) => {
      const row = item.data();
      row.id = item.id;
      all.push(row);
    });
    setTheLoai(all);
  }

  const getData = async () => {
    const all = [];
    const querySnapshot = await getDocs(collection(db, "namsx"));
    querySnapshot.docs.forEach((item) => {
      const row = item.data();
      row.id = item.id;
      all.push(row);
    });
    setNamSanXuat(all);
  };

  useEffect(() => {
    getData();
    getTheloai()
    getQuocGia()
  }, []);

  return (
    <div className="danh-muc">
      <div className="nam-san-xuat">
        <div className="title">Năm sản xuất</div>
        <div className="table namSanXuat">
          {namSanXuat && namSanXuat.map((year) => (
            <div key={year.id} className="row">
              <div>{year.nam}</div>
              <div className="action-buttons">
                <button onClick={() => handleDeleteNamSanXuat(year)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
        <input value={addNamSx} onChange={(e) => {console.log(setAddNamSx(e.target.value))}} className="addnamsx" placeholder="Nhập năm sản xuất cần thêm" /><button onClick={handleAddNamSanXuat}>Thêm</button>
      </div>
      <div className="the-loai">
        <div className="title">Thể loại</div>
        <div className="table">
          {theLoai && theLoai.map((genre) => (
            <div key={genre.id} className="row">
              <div>{genre.theloai}</div>
              <div className="action-buttons">
                <button
                  onClick={() => handleEditTheLoai(genre)}
                >
                  Sửa
                </button>
                <button onClick={() => handleDeleteTheLoai(genre)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleAddTheLoai}>Thêm thể loại</button>
      </div>
      <div className="quoc-gia">
        <div className="title">Quốc gia</div>
        <div className="table">
          {quocGia && quocGia.map((country) => (
            <div key={country.id} className="row">
              <div>{country.quocgia}</div>
              <div className="action-buttons">
                <button
                  onClick={() => handleEditQuocGia(country)}
                >
                  Sửa
                </button>
                <button onClick={() => handleDeleteQuocGia(country)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleAddQuocGia}>Thêm quốc gia</button>
      </div>
    </div>
  );
}
