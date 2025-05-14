import React from "react";
import Slider from "react-slick";
import { Box, useTheme } from "@mui/material";

import bannerImage1 from "../../assets/banner_women.png";
import bannerImage2 from "../../assets/banner_mens.png";
import bannerImage3 from "../../assets/banner_kids.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [bannerImage1, bannerImage2, bannerImage3];

const MUISlider = () => {
  const theme = useTheme();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    customPaging: () => (
      <span
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "gray",
          borderRadius: "50%",
          display: "inline-block",
          margin: "0 5px",
        }}
      />
    ),
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`Slide ${index + 1}`}
            sx={{
              width: "100%",
              height: { xs: "200px", sm: "300px", md: "400px" },
              objectFit: "fill",
            }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default MUISlider;
