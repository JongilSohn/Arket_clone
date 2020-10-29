import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderCategories } from "./SliderCategories";
import { CATEGORIES } from "../constants";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  centerMode: true,
  className: "slide",
};

function SimpleSlider({ updateItems, setCategoryFilter }) {
  return (
    <Container>
      <StyledSlider {...settings}>
        {CATEGORIES.map(({ id, text }) => {
          return (
            <CategoryContainer key={id}>
              <SliderCategories
                setCategoryFilter={setCategoryFilter}
                updateItems={updateItems}
                id={id}
                text={text}
              />
            </CategoryContainer>
          );
        })}
      </StyledSlider>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;
  margin-top: 30px;
  position: relative;
  z-index: 1;
`;

const StyledSlider = styled(Slider)`
  width: 600px;
  margin: 0 auto;
  .slick-prev {
    left: 0;
    top: 29%;
    z-index: 5;
    &:before {
      background: url("https://cdn.pixabay.com/photo/2016/09/05/10/50/app-1646213_960_720.png")
        center center / 10px no-repeat;
    }
  }

  .slick-next {
    right: 0;
    top: 30%;
    z-index: 5;
    &:before {
      background: url("https://cdn.pixabay.com/photo/2016/09/05/10/50/app-1646214_960_720.png")
        center center / 10px no-repeat;
    }
  }

  .slick-prev:before,
  .slick-next:before {
    content: "";
    background-size: contain;
    width: 25px;
    height: 25px;
    z-index: 10;
    display: block;
  }

  .slick-slide div {
    outline: none;
    display: inline;
  }
  .slick-list {
    width: 500px;
    margin: auto;
  }
`;

const CategoryContainer = styled.div`
  margin: 0 16px;
  cursor: pointer;
`;

export default SimpleSlider;
