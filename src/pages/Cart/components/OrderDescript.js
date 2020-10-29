import React from "react";
import styled from "styled-components";

export default function OrderDescript() {
  return (
    <OrderDescription>
      <div>
        <span>Read more about how to return an item here</span>
        <span>Free shipping on orders over 200 USD*</span>
        <span>Read more about delivery options here</span>
      </div>
      <div>
        <span>Secure payment</span>
        <span>Cards, Klarna & PayPal. Read more about Payment.</span>
        <span>
          In order to use the PayPal option, pop-ups need to be enabled in your
          browser settings.
        </span>
      </div>
      <div>
        <span>Do you need help?</span>
        <span>Go to Customer service</span>
        <span>
          ARKET will process your personal data to manage your order, in
          accordance with ARKET Privacy Notice
        </span>
      </div>
    </OrderDescription>
  );
}

const OrderDescription = styled.div`
  margin-top: 10px;
  padding-top: 20px;
  border-top: 4px solid black;

  div {
    margin-bottom: 50px;
    
    span {
      display: block;
      font-size: 14px;
      opacity: 0.6;
      margin-bottom: 23px;
    }
  }
`;
