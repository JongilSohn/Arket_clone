import React, { useState } from "react";
import styled from "styled-components";

export const FilterOkBtn = ({ closePopover }) => {
  return <OkButton onClick={closePopover}>OK</OkButton>;
};

const OkButton = styled.button`
  width: 100px;
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
  background: white;
`;
