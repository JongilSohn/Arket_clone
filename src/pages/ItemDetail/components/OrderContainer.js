import React from "react";
import styled from "styled-components";
import {useSelector} from 'react-redux'

export default function ItemDetail({
  product,
  addToBag,
  size,
  isSizeChoice,
  activeSize,
  isSoldOut,
}) {
  const {login} = useSelector((state) => ({
    login: state.login
  }))
  return (
    <div>
      <ProductMaterials>
        <p>{product?.product.Material.Material_Name}</p>
      </ProductMaterials>
      <ProductInfo>
        <ProducTitle>
          <h1>{product?.product.Title}</h1>
        </ProducTitle>
        <ProductPrice>
          <span>${product?.product.Price}</span>
        </ProductPrice>
      </ProductInfo>
      <SizeContainer>
        <SizeGuideBox>
          <span>SIZE</span>
          <span>/</span>
          <span>SIZE GUIDE</span>
        </SizeGuideBox>
        <SizeInfoBox>
          {product?.ProductSize.map((item, i) => {
            return item.SoldOut === "true"? (
              <SizeSoldOut
                key={i}
                onClick={() =>
                  isSizeChoice(item.Size, item.SoldOut, item.ProductSize)
                }
              >
                <span>{item.Size}</span>
              </SizeSoldOut>
            ) : (
              <SizeChoice
                key={i}
                onClick={() =>
                  isSizeChoice(item.Size, item.SoldOut, item.ProductSize)
                }
                size={size}
                style={{
                  backgroundColor: activeSize === item.Size ? "black" : "white",
                  color: activeSize === item.Size ? "white" : "black",
                }}
              >
                <span>{item.Size}</span>
              </SizeChoice>
            );
          })}
        </SizeInfoBox>
        {!login || isSoldOut === "true" ? (
          <DisalbedBtnBox>
            <span>ADD TO BAG</span>
          </DisalbedBtnBox>
        ) : (
          <AddBtnBox onClick={size.none !== null && addToBag}>
            <span>ADD TO BAG</span>
          </AddBtnBox>
        )}
        <ShippingInfo>
          <span>FREE SHIPPING ON ORDERS OVER 200 USD.</span>
        </ShippingInfo>
      </SizeContainer>
    </div>
  );
}

const ProductMaterials = styled.div`
  p {
    font-size: 13px;
    padding-bottom: 10px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 1px solid #cdd1d7;
`;

const ProducTitle = styled.div`
  display: inline-block;
  
  h1 {
    max-width: 224px;
    font-size: 20px;
    margin-right: 5px;
  }
`;

const ProductPrice = styled.div`
  display: inline-block;

  span {
    font-size: 20px;
  }
`;

const SizeContainer = styled.div``;

const SizeGuideBox = styled.div`
  padding-top: 10px;
  padding-bottom: 8px;

  span {
    font-size: 13px;
  }
`;

const SizeInfoBox = styled.div`
  margin-top: 8px;
  margin-bottom: 4px;
`;

const SizeChoice = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 8px;
  margin-bottom: 14px;
  border: 1px solid #000;
  border-radius: 50%;
  cursor: pointer;
`;

const SizeSoldOut = styled(SizeChoice)`
  border: 1px solid #979797;
  background: linear-gradient(
    to top right,
    rgba(151, 151, 151, 0) 0,
    rgba(151, 151, 151, 0) calc(50% - 0.8px),
    #979797 50%,
    rgba(151, 151, 151, 0) calc(50% + 0.8px),
    rgba(151, 151, 151, 0) 100%
  );

  span {
    color: #979797;
  }
`;

const AddBtnBox = styled.button`
  width: 100%;
  height: 50px;
  background-color: black;
  margin-bottom: 15px;
  cursor: pointer;

  span {
    color: white;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const DisalbedBtnBox = styled.button`
  width: 100%;
  height: 50px;
  background-color: gray;
  margin-bottom: 15px;
  opacity: 0.7;
  cursor: pointer;

  span {
    color: white;
  }

  &:hover {
    opacity: 0.5;
  }
`;

const ShippingInfo = styled.div`
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #000;
  
  span {
    font-size: 12px;
  }
`;
