import React, { useEffect, useState } from "react";
import FilterMovie from "../FilterMovie/FilterMovie";
import Pagination from "../Pagination/Pagination";
import Poster from "../Poster/Poster";
import { collection, getDocs } from "firebase/firestore";
import { useHistory } from "react-router-dom";

import { db } from "../../config/firebase";
function MoviePage({ getId }) {
  const [nam, setNam] = useState([]);
  const [theLoai, setTheLoai] = useState([]);
  const [quocGia, setQuocGia] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  const [selectedOption3, setSelectedOption3] = useState("");

  const [renderfilm, setRenderFilm] = useState([]);

  const [movies, setMovies] = useState([]);
  let history = useHistory();
  const getPhim = async () => {
    const all = [];
    const querySnapshot = await getDocs(collection(db, "phim"));
    querySnapshot.docs.forEach((item) => {
      const row = item.data();
      row.id = item.id;
      all.push(row);
    });
    all.sort(
      (a, b) =>
        a.createdAt.seconds - b.createdAt.seconds ||
        a.createdAt.nanoseconds - b.createdAt.nanoseconds
    );
    all.reverse();
    setMovies(all);
  };

  useEffect(() => {
    getPhim();
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

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
  useEffect(() => {
    getQuocGia();
    getTheloai();
    getData();
  }, []);

  return (
    <div className="movie-section">
      <div className="container">
        <input
          style={{
            width: "50%",
            height: "40px",
            outline: "none",
            paddingLeft: "10px",
          }}
          placeholder="Tìm kiếm tên phim..."
        />
        <div>
          <select onChange={handleChange}>
            <option value="">Năm</option>
            {nam.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select onChange={handleChange2}>
            <option value="">Thể loại</option>
            {theLoai.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select onChange={handleChange3}>
            <option value="">Quốc gia</option>
            {quocGia.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* <Poster
            type={"movie"}
            getId={getId}
            filmData={renderfilm}
            number={16}
          /> */}

          <div>
            <div className="title-list">
              <ul>
                {movies.map((film) => {
                  return (
                    <li
                      key={film.id}
                      onClick={() => {
                        history.push(`/watchmovie/${film.id}`);
                      }}
                      className="poster-item"
                    >
                      <div className="poster-img">
                        <img
                          src={film.image}
                          alt=""
                        />
                      </div>
                      <h3 className="poster-name">{film.name}</h3>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* <Pagination
            page={filters.page}
            totalPage={totalPage}
            handlePageChange={handlePageChange}
          /> */}
        </div>
      </div>
    </div>
  );
}
export default MoviePage;
