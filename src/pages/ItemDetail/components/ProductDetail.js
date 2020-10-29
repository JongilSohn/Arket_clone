import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  FiAlertTriangle,
  FiCloudDrizzle,
  FiEyeOff,
  FiCameraOff,
  FiDollarSign,
} from "react-icons/fi";

export default function ItemDetail({ product, MaterialsItem, ColorItem }) {
  const [selectOpt, setSelectOpt] = useState(new Array(4).fill(true));
  const onOptCheck = (i) => {
    setSelectOpt(
      selectOpt.map((isSelected, idx) => {
        return idx === i ? (isSelected ? false : true) : true;
      })
    );
  };

  return (
    <ProductDetail>
      <IdContainer>
        <ProductDetailBox>
          <span>ID</span>
        </ProductDetailBox>
        <span>{product?.product.Serial_Number}</span>
      </IdContainer>
      <DepartmentContainer>
        <ProductDetailBox>
          <span>DEPARTMENT</span>
        </ProductDetailBox>
        <span>Women</span>
      </DepartmentContainer>
      <DepartmentContainer>
        <ProductDetailBox>
          <span>TYPE</span>
        </ProductDetailBox>
        <span>{product?.product.Type}</span>
      </DepartmentContainer>
      <ProductContainer>
        <ProductDetailBox>
          <span>PRODUCT</span>
        </ProductDetailBox>
        <div>
          <span>{product?.product.Title}</span>
        </div>
      </ProductContainer>
      <MaterialContainer>
        <MaterialText onClick={() => onOptCheck(0)} data-name="material">
          <ProductDetailBox>
            <span>MATERIAL</span>
          </ProductDetailBox>
          <span>{product?.product.Material.Material_Name}</span>
          <PlusIcon />
        </MaterialText>
        <MaterialsBox
          style={{
            height: selectOpt[0] ? "0px" : "120px",
            margin: selectOpt[0] && "0px",
            padding: selectOpt[0] && "0px",
            border: selectOpt[0] && "0px",
          }}
        >
          <MaterialsItem product={product} />
        </MaterialsBox>
      </MaterialContainer>
      <ColorContainer>
        <ColorText
          to="/item-detail"
          onClick={() => onOptCheck(1)}
          data-name="color"
        >
          <ProductDetailBox>
            <span>COLOR</span>
          </ProductDetailBox>
          <span>Black</span>
          <PlusIcon />
        </ColorText>
        <ColorBox
          style={{
            height: selectOpt[1] ? "0px" : "120px",
            margin: selectOpt[1] && "0px",
            padding: selectOpt[1] && "0px",
            border: selectOpt[1] && "0px",
          }}
        >
          <ColorItem product={product} />
        </ColorBox>
      </ColorContainer>
      <MadeContainer>
        <MadeText onClick={() => onOptCheck(2)} data-name="made">
          <ProductDetailBox />
          <span>MADE IN TURKEY</span>
          <PlusIcon />
        </MadeText>
        <MadeBox
          style={{
            height: selectOpt[2] ? "0px" : "67px",
            margin: selectOpt[2] && "0px",
            padding: selectOpt[2] && "0px",
            border: selectOpt[2] && "0px",
          }}
        >
          <div>
            <ProductDetailBox>MADE IN</ProductDetailBox>
            <span>TURKEY</span>
          </div>
          <div>
            <ProductDetailBox>SUPPLIER</ProductDetailBox>
            <span>Casa Tekstil</span>
          </div>
        </MadeBox>
      </MadeContainer>
      <CareContainer>
        <CareText onClick={() => onOptCheck(3)} data-name="care">
          <ProductDetailBox />
          <span>CARE INSTRUCTIONS</span>
          <PlusIcon />
        </CareText>
        <CareBox
          style={{
            height: selectOpt[3] ? "0px" : "120px",
            margin: selectOpt[3] && "0px",
            padding: selectOpt[3] && "0px",
            border: selectOpt[3] && "0px",
          }}
        >
          <div>
            <FiAlertTriangle />
            <FiCloudDrizzle />
            <FiEyeOff />
            <FiCameraOff />
            <FiDollarSign />
          </div>
          <span>
            Line dry, Iron at low temperature, Only non-chlorine bleach, Wash at
            or below 40°C, Dry clean any solvent except tetrachloroethylene.
          </span>
        </CareBox>
      </CareContainer>
    </ProductDetail>
  );
}

const ProductDetail = styled.div`
  margin-top: 15px;
  transition-timing-function: width 3s ease-in-out;
`;

const IdContainer = styled.div`
  padding: 5px 0px;
`;

const ProductDetailBox = styled.div`
  display: inline-block;
  width: 30%;
  text-align: end;
  margin-right: 12px;
`;

const DepartmentContainer = styled.div`
  padding: 5px 0px;
`;

const ProductContainer = styled.div`
  display: flex;
  padding: 5px 0px;
  
  div {
    max-width: 68%;
  }
`;

const MaterialContainer = styled.div`
  padding: 5px 0px;
`;

const ColorContainer = styled.div`
  padding: 5px 0px;
`;

const MadeContainer = styled.div`
  padding: 5px 0px;
  cursor: pointer;
`;

const MadeBox = styled.div`
  margin: 10px 0px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  opacity: 1;
  transition-duration: 0.5s;
  transition-delay: 0.2s;
  transition-timing-function: ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  div {
    margin: 5px 0px;

    span {
      margin-left: 15px;
      font-size: 15px;
    }
  }
`;

const CareContainer = styled.div`
  padding: 5px 0px;

  span {
    &:hover {
      opacity: 0.5;
    }
  }
`;

const MaterialText = styled.div`
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const ColorText = styled.div`
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const CareText = styled.div`
  width: 100%;

  &:hover {
    opacity: 0.5;
  }
`;

const MadeText = styled.div`
  width: 100%;

  &:hover {
    opacity: 0.5;
  }
`;

const CareBox = styled.div`
  margin: 10px 0px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  opacity: 1;
  transition-duration: 0.5s;
  transition-delay: 0.2s;
  transition-timing-function: ease-in-out;
  overflow: hidden;

  div {
    display: flex;
    justify-content: space-evenly;
    margin: 15px 0px;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  span {
    margin-top: 20px;
    font-size: 13px;
  }
`;

const MaterialsBox = styled.div`
  margin: 10px 0px;
  padding: 12px 0px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  opacity: 1;
  transition-duration: 0.5s;
  transition-delay: 0.2s;
  transition-timing-function: ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ColorBox = styled.div`
  display: flex;
  margin: 10px 0px;
  padding: 12px 0px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  opacity: 1;
  transition-duration: 0.5s;
  transition-delay: 0.2s;
  transition-timing-function: ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function PlusIcon() {
  return (
    <AiOutlinePlusCircle
      style={{ verticalAlign: "text-top", marginLeft: "3px" }}
    />
  );
}
