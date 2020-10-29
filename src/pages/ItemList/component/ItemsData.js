import React from "react";
import styled from "styled-components";
import { Items } from "./Items";
import { useHistory } from "react-router-dom";

export const ItemsData = ({ data }) => {
  let history = useHistory();

  const goToItemDetail = (itemId) => {
    history.push(`/item-detail/${itemId}`);
  };

  return (
    <SingleItem>
      {data?.map(({ itemName, itemPrice, itemImage, itemId }) => {
        return (
          <Items
            key={itemId}
            itemId={itemId}
            name={itemName}
            price={itemPrice}
            imageUrl={itemImage}
            goToItemDetail={goToItemDetail}
          />
        );
      })}
    </SingleItem>
  );
};

const SingleItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;
