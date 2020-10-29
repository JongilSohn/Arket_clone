import React from "react";
import styled from "styled-components";

export const FilterCount = ({listData, categoryFilter, setCategoryFilter}) => {
  return <FilterCountItems>{listData.length + " items"}</FilterCountItems>;
};

const FilterCountItems = styled.section`
  margin-right: 10px;
  font-size: 14px;
  margin-top: 2px;
`;
