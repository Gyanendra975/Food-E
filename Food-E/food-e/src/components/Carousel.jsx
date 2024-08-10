import React from 'react';

export default function Carousel({ onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div>
      <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ zIndex: "10", bottom: "20px", left: "50%", transform: "translateX(-50%)", width: "100%", textAlign: "center", objectFit:"contain !important" }}>
        <form className="form-inline d-flex" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ width: "300px" }}
            onChange={handleInputChange}
          />
          <button className="btn btn-outline-danger my-2 my-sm-0 text-white" style={{ marginLeft: "5px" }} type="submit">
            Search
          </button>
        </form>
      </div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://media.istockphoto.com/id/1473452859/photo/tasty-cheeseburger-glass-of-cola-and-french-fries-on-wooden-tray-close-up.jpg?s=1024x1024&w=is&k=20&c=6qf02Pl4XQoSCD29sX410Z_QyVxaKTSEY8bbhhLT0-A=" className="d-block w-100" style={{ width: "800px", height: "600px", filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/id/1341504203/photo/fried-momos-dumpling.jpg?s=1024x1024&w=is&k=20&c=z7M1LloPSo747Lr9j0lCn2e6ZxZuw2O8-fRa21punn8=" className="d-block w-100" style={{ width: "800px", height: "600px", filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/id/483137365/photo/asian-chow-mein-noodles.jpg?s=1024x1024&w=is&k=20&c=1QTNpeWMO6ueJRzHVm-59h0FAlsaWEkJplidjkmzzzc=" className="d-block w-100" style={{ width: "800px", height: "600px", filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
