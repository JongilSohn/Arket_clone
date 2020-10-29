import React from "react";
import styled from "styled-components";
import OrderDescript from "./OrderDescript";

export default function PriceContainers({ totalPrice }) {
  return (
    <PriceContainer>
      <h2>Bag Total</h2>
      <OrderContainer>
        <OrderPriceBox>
          <span>Order value</span>
          <span>$ {totalPrice}</span>
        </OrderPriceBox>
        <OrderPriceBox>
          <span>Delivery</span>
          <span>FREE</span>
        </OrderPriceBox>
        <DiscountBox>
          <span>Do you have a discount code?</span>
          <span></span>
        </DiscountBox>
      </OrderContainer>
      <TotalBox>
        <TotalText>TOTAL</TotalText>
        <TotalPrice>${totalPrice}</TotalPrice>
      </TotalBox>
      <AddBtnBox>
        <span>Checkout</span>
      </AddBtnBox>
      <OrderDescript />
    </PriceContainer>
  );
}

const PriceContainer = styled.div`
  width: calc(33.33% - 20px);

  h2 {
    margin-top: 20px;
    padding-bottom: 13px;
    font-size: 20px;
    border-bottom: 2px solid black;
  }
`;

const OrderContainer = styled.div`
  padding-top: 10px;
`;

const OrderPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;

  span {
    font-size: 13px;
  }
`;

const DiscountBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
  
  span {
    font-size: 13px;
  }
`;

const TotalBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  padding: 16px 0px;
  border-top: 4px solid black;
`;

const TotalText = styled.span`
  font-size: 13px;
`;

const TotalPrice = styled.span`
  font-size: 33px;
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
