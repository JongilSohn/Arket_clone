import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {useDispatch} from 'react-redux'
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OrderContainer from "./components/OrderContainer";
import ProductDetail from "./components/ProductDetail";
import ProductDescription from "./components/ProductDescription";
import Nav from "../../components/Nav";
import { addToCart } from '../../modules/cart';
import { API } from "../../config";
import { BsArrowRightShort } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ItemDetail() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [size, setSize] = useState({ none: null });
  const [activeSize, setActiveSize] = useState('');
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [viewBag, setViewBag] = useState(false);
  const [timer, setTimer] = useState(0);
  const countTimer = useRef(timer);
  const viewStatus = useRef(false);
  const { productId } = useParams();

  const choiceStatus = (soldOut) => {
    setIsSoldOut(soldOut);
  };

  const isSizeChoice = (size, soldOut, ProductSize) => {
    setActiveSize(size);
    setSize(
      {
        Size: size,
        SoldOut: soldOut,
        product_size_id: ProductSize,
      },
      choiceStatus(soldOut)
    );
  };

  const fetchItemDetail = async (productId) => {
    const result = await fetch(`${API}/products/${productId}`);
    const { data } = await result.json();

    setProduct(data);
  };

  useEffect(() => {
    fetchItemDetail(productId);
  }, [productId]);

  const fetchAdd = async () => {
    try {
      const addResult = await fetch(`${API}/cart`, {
        method: 'post',
        headers: { Authorization: localStorage.getItem('token') },
        body: JSON.stringify({
          product_id: product.product.id,
          count: '1',
          product_size_id: size.product_size_id,
        }),
      });
      const { message } = await addResult.json();

      if (message === "SUCCESS") {
        dispatch(addToCart(product))
        const repeat = setInterval(() => {
          viewStatus.current = !viewStatus.current;
          countTimer.current += 1;
          setTimer(countTimer.current);
          setViewBag(viewStatus.current);
          if (countTimer.current === 2) {
            countTimer.current = 0;
            setTimer(countTimer.current);
            clearInterval(repeat);
          }
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Nav />
      <Section>
        <AddToBox>
          <AddToContent viewBag={viewBag}>
            <AddToImg src={product?.Images[0].Img_Url} />
            <div>
              <AddToText>
                <span>ADDED TO BAG</span>
              </AddToText>
              <AddToTitle>
                <span>{product?.product.Title}</span>
                <span>$ {product?.product.Price}</span>
              </AddToTitle>
              <Link to="/cart">
                <ViewBagBtn>View bag</ViewBagBtn>
              </Link>
            </div>
          </AddToContent>
        </AddToBox>
        <MainContent>
          <ItemInfoBox>
            <ItemRoot>
              <span>
                ARKET
                <ArrowText />
                Women
                <ArrowText />
                {product?.product.Type}
                <ArrowText />
                {product?.product.Title}
              </span>
            </ItemRoot>
            <ItemColors>
              <ItemInfoCategory>COLORS</ItemInfoCategory>
              <ItemCategoryContainer>
                <ColorItem product={product} />
              </ItemCategoryContainer>
            </ItemColors>
            <ItemMaterials>
              <ItemInfoCategory>MATERIALS</ItemInfoCategory>
              <ItemCategoryContainer>
                <MaterialsItem product={product} />
              </ItemCategoryContainer>
            </ItemMaterials>
          </ItemInfoBox>
          <ItemImgBox>
            <StyledSlider {...SETTINGS}>
              {product?.Images.map((productImages, i) => {
                return (
                  <div key={i}>
                    <MainImg src={productImages.Img_Url} />
                  </div>
                );
              })}
            </StyledSlider>
          </ItemImgBox>
          <ItemDetailInfoBox>
            <OrderContainer
              product={product}
              addToBag={fetchAdd}
              size={size}
              isSizeChoice={isSizeChoice}
              activeSize={activeSize}
              isSoldOut={isSoldOut}
            />
            <ProductDetail
              product={product}
              MaterialsItem={MaterialsItem}
              ColorItem={ColorItem}
            />
            <ProductDescription />
          </ItemDetailInfoBox>
        </MainContent>
      </Section>
    </>
  );
}

const Section = styled.section`
  margin: 0 auto;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
`;

const AddToBox = styled.div`
  position: absolute;
  width: 320px;
  right: 34px;
  top: 62px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  text-overflow: hidden;
`;

const AddToContent = styled.div`
  display: flex;
  transition: all 1s ease-in-out 0.5s;
  max-height: ${(props) =>
    props.viewBag ? 'calc(100vh - 56px - 43px)' : '0px'};
  padding: 0 19px;
`;

const AddToText = styled.div`
  display: block;
  height: 42px;
  width: 172px;
  margin-bottom: 10px;
  padding-top: 22px;
  border-bottom: 1px solid #000;

  span {
    font-size: 13px;
  }
`;

const AddToTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 172px;

  span {
    font-size: 13px;
  }
`;

const ViewBagBtn = styled.button`
  width: 172px;
  height: 40px;
  background-color: black;
  text-align: center;
  color: white;
  cursor: pointer;
`;

const AddToImg = styled.img`
  width: 90px;
  height: 154px;
  margin-right: 20px;
  padding-top: 22px;
  padding-bottom: 22px;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemInfoBox = styled.div`
  max-width: 280px;
  width: calc(50% - 299px);
`;

const ItemRoot = styled.div`
  height: 17px;
  text-overflow: hidden;
  white-space: nowrap;

  span {
    font-size: 14px;
  }
`;

const ItemDetailInfoBox = styled.div`
  max-width: 299px;
  width: 100%;
`;

const ItemCategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ItemInfoCategory = styled.h4`
  font-size: 13px;
  margin-bottom: 10px;
`;

const ItemCategoryBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 56px;
  height: 90px;
  padding-bottom: 5px;
  margin-right: 10px;
  cursor: pointer;

  p {
    font-size: 11px;
    text-align: center;
  }

  &:hover {
    p {
      opacity: 0.6;
    }
  }
`;

const ItemColors = styled.div`
  margin-top: 15px;
  padding-bottom: 4px;
  padding-top: 20px;
  border-top: 2px solid #000;
`;

const ItemColorImg = styled.img`
  width: 49px;
  height: 65px;
  src: '/Images/test_jean.jpg';
`;

const ItemMaterials = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-top: 2px solid #000;
`;

const ItemMaterialImg = styled.img`
  width: 49px;
  height: 49px;
  border-radius: 50%;
  border: 1px solid black;
`;

const ItemImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 56px - 40px);
`;

const ArrowBox = styled.button`
  cursor: pointer;

  svg {
    width: 49px;
    height: 92px;
  }
`;

const MainImg = styled.img`
  padding-top: 10px;
  padding-bottom: 30px;
  max-height: 100%;
  max-width: 100%;
`;

const SETTINGS = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  draggable: true,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  nextArrow: <NextBtn />,
  prevArrow: <PrevBtn />,
};

const StyledSlider = styled(Slider)`
  display: flex;
  align-items: center;

  .slick-list {
    width: 500px;
  }
`;

function ArrowText() {
  return (
    <BsArrowRightShort
      style={{ verticalAlign: 'text-top', marginLeft: '3px' }}
    />
  );
}

function PrevBtn(props) {
  const { style, onClick } = props;
  return (
    <ArrowBox style={{ ...style, display: 'block' }} onClick={onClick}>
      <IoIosArrowBack to="prev" />
    </ArrowBox>
  );
}

function NextBtn(props) {
  const { style, onClick } = props;
  return (
    <ArrowBox style={{ ...style, display: 'block' }} onClick={onClick}>
      <IoIosArrowForward to="next" />
    </ArrowBox>
  );
}

function MaterialsItem({ product }) {
  return (
    <ItemCategoryBox>
      <ItemMaterialImg src={product?.product.Material.Material_Img} />
      <p>{product?.product.Material.Material_Name}</p>
    </ItemCategoryBox>
  );
}

function ColorItem({ product }) {
  return (
    <>
      {product?.Color.map((productColor, i) => {
        return (
          <ItemCategoryBox key={i}>
            <Link to={`/item-detail/${productColor.Color_Url}`}>
              <ItemColorImg src={productColor.Color_Img} />
              <p>{productColor.Color_Name}</p>
            </Link>
          </ItemCategoryBox>
        );
      })}
    </>
  );
}
