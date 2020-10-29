import React from "react";
import styled from "styled-components";

export const Items = ({ imageUrl, name, price, itemId, goToItemDetail }) => {
  return (
    <Item onClick={() => goToItemDetail(itemId)}>
      <img alt="itemPic" src={imageUrl} width="350x" height="500px" />
      <div className="name">{name}</div>
      <div className="price">${price}</div>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: none;
  text-align: center;
  cursor: pointer;
  img {
    object-fit: cover;
  }
  .name {
    margin: 10px 0 5px 0;
  }
  .price {
    margin: 5px 0 10px 0;
  }
`;
