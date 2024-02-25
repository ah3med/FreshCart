import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 7000,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: true,
    autoplaySpeed: 100,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { data } = useQuery("category", getCategories);
  const categories = data?.data.data;

  return (
    <div className="my-5">
      <h2 className="h5 fw-semibold">Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories? categories.map((el) => {
              return (
                <div key={el._id}>
                  <img
                    src={el.image}
                    alt={el.name}
                    className="w-100 cursor-pointer"
                    height={200}
                  />
                  <h3 className="h6 mt-2">{el.name}</h3>
                </div>
              );
            })
          : ""}
      </Slider>
    </div>
  );
} 