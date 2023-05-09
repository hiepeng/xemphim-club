import React, { useState } from "react";
import "./style.scss";

export default function DanhMuc() {
  const [namSanXuat, setNamSanXuat] = useState(
    [...Array(34)].map((_, i) => 1990 + i)
  ); // tạo một mảng các năm từ 1990 đến 2023
  const [theLoai, setTheLoai] = useState([
    "Hành động",
    "Phim hài",
    "Phim Việt",
  ]); // tạo một mảng các thể loại
  const [quocGia, setQuocGia] = useState([
    "Việt Nam",
    "Trung Quốc",
    "Hàn Quốc",
  ]); // tạo một mảng các quốc gia

  const handleAddNamSanXuat = () => {
    const lastYear = namSanXuat[namSanXuat.length - 1];
    setNamSanXuat([...namSanXuat, lastYear + 1]);
  };

  const handleDeleteNamSanXuat = (year) => {
    const updatedYears = namSanXuat.filter((y) => y !== year);
    setNamSanXuat(updatedYears);
  };

  const handleEditNamSanXuat = (year, newYear) => {
    const updatedYears = namSanXuat.map((y) => (y === year ? newYear : y));
    setNamSanXuat(updatedYears);
  };

  const handleAddTheLoai = () => {
    setTheLoai([...theLoai, ""]);
  };

  const handleDeleteTheLoai = (index) => {
    const updatedGenres = theLoai.filter((_, i) => i !== index);
    setTheLoai(updatedGenres);
  };

  const handleEditTheLoai = (index, newValue) => {
    const updatedGenres = theLoai.map((value, i) =>
      i === index ? newValue : value
    );
    setTheLoai(updatedGenres);
  };

  const handleAddQuocGia = () => {
    setQuocGia([...quocGia, ""]);
  };

  const handleDeleteQuocGia = (index) => {
    const updatedCountries = quocGia.filter((_, i) => i !== index);
    setQuocGia(updatedCountries);
  };

  const handleEditQuocGia = (index, newValue) => {
    const updatedCountries = quocGia.map((value, i) =>
      i === index ? newValue : value
    );
    setQuocGia(updatedCountries);
  };

  return (
    <div className="danh-muc">
      <div className="nam-san-xuat">
        <div className="title">Năm sản xuất</div>
        <div className="table namSanXuat">
          {namSanXuat.map((year) => (
            <div key={year} className="row">
              <div>{year}</div>
              <div className="action-buttons">
                <button onClick={() => handleEditNamSanXuat(year, year + 1)}>
                  Sửa
                </button>
                <button onClick={() => handleDeleteNamSanXuat(year)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleAddNamSanXuat}>Thêm năm sản xuất</button>
      </div>
      <div className="the-loai">
        <div className="title">Thể loại</div>
        <div className="table">
          {theLoai.map((genre, index) => (
            <div key={index} className="row">
              <div>{genre}</div>
              <div className="action-buttons">
                <button
                  onClick={() => handleEditTheLoai(index, genre + " mới")}
                >
                  Sửa
                </button>
                <button onClick={() => handleDeleteTheLoai(index)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleAddTheLoai}>Thêm thể loại</button>
      </div>
      <div className="quoc-gia">
        <div className="title">Quốc gia</div>
        <div className="table">
          {quocGia.map((country, index) => (
            <div key={index} className="row">
              <div>{country}</div>
              <div className="action-buttons">
                <button
                  onClick={() => handleEditQuocGia(index, country + " mới")}
                >
                  Sửa
                </button>
                <button onClick={() => handleDeleteQuocGia(index)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleAddQuocGia}>Thêm quốc gia</button>
      </div>
    </div>
  );
}
