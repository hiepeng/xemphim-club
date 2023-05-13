import React, { useState } from "react";
import "./style.scss";
import Modal from "./Modal";
import { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export default function MovieManage() {
  const [nam, setNam] = useState([]);
  const [theLoai, setTheLoai] = useState([]);
  const [quocGia, setQuocGia] = useState([]);
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const getTheloai = async () => {
    const all = [];
    const querySnapshot = await getDocs(collection(db, "theloai"));
    querySnapshot.docs.forEach((item) => {
      const row = item.data().theloai;
      all.push(row);
    });
    setTheLoai(all);
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

  const getData = async () => {
    const all = [];
    const querySnapshot = await getDocs(collection(db, "namsx"));
    querySnapshot.docs.forEach((item) => {
      const row = item.data().nam;
      all.push(row);
    });
    setNam(all);
  };

  const handleAddMovie = () => {
    setIsShowModal(true);
  };

  const handleEditMovie = (index, id) => {
    setEditingMovie(movies[index]);
    // const value = movies.find((item) => item.id === id);
    // setEdit(value);
  };

  let valueEdit = {};

  const handleSaveMovie = async (id, index) => {
    // const newValue = {...edit}
    console.log(valueEdit, "valueEdit");
    // if(valueEdit.quocgia && valueEdit.quocgia !== edit.quocgia){
    //   newValue.quocgia = valueEdit.quocgia
    // }
    // if(valueEdit.nam && valueEdit.nam !== edit.nam){
    //   newValue.nam = valueEdit.nam
    // }
    // if(valueEdit.image && valueEdit.image !== edit.image){
    //   newValue.image = valueEdit.image
    // }
    // if(valueEdit.link && valueEdit.link !== edit.link){
    //   newValue.link = valueEdit.link
    // }
    // if(valueEdit.ten && valueEdit.ten !== edit.ten){
    //   newValue.ten = valueEdit.ten
    // }
    // if(valueEdit.theloai && valueEdit.theloai !== edit.theloai){
    //   newValue.theloai = valueEdit.theloai
    // }
    // if(JSON.stringify(newValue) === JSON.stringify(edit) ){
    //   console.log('same')
    // } else {
    const userRef = doc(db, "phim", id);
    //     console.log(newValue, "newValue")
    await updateDoc(userRef, valueEdit);
    console.log(valueEdit, "valueEdit");
    getPhim();
    // }
    valueEdit = {};
  };

  const handleCancelEdit = () => {
    setEditingMovie(null);
    valueEdit = {};
  };

  const handleChange = (e, id, field) => {
    if (field === "quocgia") {
      valueEdit.quocgia = e.target.value;
    }
    if (field === "nam") {
      valueEdit.nam = e.target.value;
    }
    if (field === "image") {
      valueEdit.image = e.target.value;
    }
    if (field === "link") {
      valueEdit.link = e.target.value;
    }
    if (field === "name") {
      valueEdit.name = e.target.value;
    }
    if (field === "theloai") {
      valueEdit.theloai = e.target.value;
    }
  };

  const deleteFilm = async (id) => {
    if (window.confirm("Bạn có chắc chắn xóa phim!")) {
      await deleteDoc(doc(db, "phim", id));
      getPhim();
    }
  };

  const getPhim = async () => {
    const all = [];
    const querySnapshot = await getDocs(collection(db, "phim"));
    querySnapshot.docs.forEach((item) => {
      const row = item.data();
      row.id = item.id;
      all.push(row);
    });
    all.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds || a.createdAt.nanoseconds - b.createdAt.nanoseconds);
    all.reverse()
    setMovies(all);
  };

  useEffect(() => {
    getPhim();
    getTheloai();
    getQuocGia();
    getData();
  }, []);

  return (
    <div className="movie-manage" style={{height: '100%'}}>
      {isShowModal && (
        <Modal setIsShowModal={setIsShowModal} getPhim={getPhim} />
      )}
      <div className="movie-manage-header">
        <div className="movie-manage-header-cell">Tên phim</div>
        <div className="movie-manage-header-cell">Link phim</div>
        <div className="movie-manage-header-cell">Image</div>
        <div className="movie-manage-header-cell">Năm sản xuất</div>
        <div className="movie-manage-header-cell">Thể loại</div>
        <div className="movie-manage-header-cell">Quốc gia</div>
        <div className="movie-manage-header-cell">Hành động</div>
      </div>
      <div style={{overflow: 'auto', height: 'calc(100% - 100px)'}}>
      {movies.map((movie, index) => (

        <div key={index} className="movie-manage-row">
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <input
                type="text"
                defaultValue={movie.name}
                onChange={(e) => handleChange(e, movie.id, "name")}
              />
            ) : (
              movie.name
            )}
          </div>
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <input
                type="text"
                defaultValue={movie.link}
                onChange={(e) => handleChange(e, movie.id, "link")}
              />
            ) : (
              movie.link
            )}
          </div>
          <div className="movie-manage-cell img-wrapper">
            {editingMovie === movie ? (
              <input
                type="text"
                defaultValue={movie.image}
                onChange={(e) => handleChange(e, movie.id, "image")}
              />
            ) : (
              <img className="img" src={movie.image} alt={movie.image} />
            )}
          </div>
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <select
                defaultValue={movie.nam}
                onChange={(e) => handleChange(e, movie.id, "nam")}
              >
                {nam.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              movie.nam
            )}
          </div>
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <select
                defaultValue={movie.theloai}
                onChange={(e) => handleChange(e, movie.id, "theloai")}
              >
                {theLoai.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              movie.theloai
            )}
          </div>
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <select
                defaultValue={movie.quocgia}
                onChange={(e) => handleChange(e, movie.id, "quocgia")}
              >
                {quocGia.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              movie.quocgia
            )}
          </div>
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <>
                <button
                  className="movie-manage-save-button"
                  onClick={() => handleSaveMovie(movie.id, index)}
                >
                  Save
                </button>
                <button
                  className="movie-manage-cancel-button"
                  onClick={() => handleCancelEdit()}
                >
                  Cancel
                </button>
              </>
            ) : (
              <div>
                <button
                  className="movie-manage-edit-button"
                  onClick={() => handleEditMovie(index, movie.id)}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFilm(movie.id)}
                  className="movie-manage-edit-button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
        </div>

      <div className="movie-manage-add-button-container">
        <button
          className="movie-manage-add-button"
          onClick={() => handleAddMovie()}
        >
          Add movie
        </button>
      </div>
    </div>
  );
}
