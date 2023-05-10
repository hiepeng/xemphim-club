import React, { useState } from "react";
import "./style.scss";
import Modal from "./Modal";

export default function MovieManage() {
  const [movies, setMovies] = useState([
    {
      name: "Movie A",
      link: "https://example.com/movie-a",
      year: 2021,
      genre: "Action",
      country: "USA",
    },
    {
      name: "Movie B",
      link: "https://example.com/movie-b",
      year: 2022,
      genre: "Comedy",
      country: "Canada",
    },
    {
      name: "Movie C",
      link: "https://example.com/movie-c",
      year: 2020,
      genre: "Drama",
      country: "UK",
    },
  ]);
  const [editingMovie, setEditingMovie] = useState(null);

  const handleAddMovie = () => {
    // const name = prompt('Nhập tên quoc gia')
    // await addDoc(collection(db, "quocgia"), {
    //   quocgia: name,
    // });
    // getQuocGia()
  };

  const handleEditMovie = (index) => {
    setEditingMovie(movies[index]);
  };

  const handleSaveMovie = (index, updatedMovie) => {
    const newMovies = [...movies];
    newMovies[index] = updatedMovie;
    setMovies(newMovies);
    setEditingMovie(null);
  };

  const handleCancelEdit = () => {
    setEditingMovie(null);
  };

  const handleChange = (e, index, field) => {
    const newMovies = [...movies];
    newMovies[index][field] = e.target.value;
    setMovies(newMovies);
  };

  return (
    <div className="movie-manage">
      <Modal />
      <div className="movie-manage-header">
        <div className="movie-manage-header-cell">Tên phim</div>
        <div className="movie-manage-header-cell">Link phim</div>
        <div className="movie-manage-header-cell">Năm sản xuất</div>
        <div className="movie-manage-header-cell">Thể loại</div>
        <div className="movie-manage-header-cell">Quốc gia</div>
        <div className="movie-manage-header-cell">Hành động</div>
      </div>
      {movies.map((movie, index) => (
        <div key={index} className="movie-manage-row">
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <input
                type="text"
                value={movie.name}
                onChange={(e) => handleChange(e, index, "name")}
              />
            ) : (
              movie.name
            )}
          </div>
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <input
                type="text"
                value={movie.link}
                onChange={(e) => handleChange(e, index, "link")}
              />
            ) : (
              movie.link
            )}
          </div>
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <input
                type="text"
                value={movie.year}
                onChange={(e) => handleChange(e, index, "year")}
              />
            ) : (
              movie.year
            )}
          </div>
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <input
                type="text"
                value={movie.genre}
                onChange={(e) => handleChange(e, index, "genre")}
              />
            ) : (
              movie.genre
            )}
          </div>
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <input
                type="text"
                value={movie.country}
                onChange={(e) => handleChange(e, index, "country")}
              />
            ) : (
              movie.country
            )}
          </div>
          <div className="movie-manage-cell">
            {editingMovie === movie ? (
              <>
                <button
                  className="movie-manage-save-button"
                  onClick={() => handleSaveMovie(index, movie)}
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
              <button
                className="movie-manage-edit-button"
                onClick={() => handleEditMovie(index)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ))}
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
