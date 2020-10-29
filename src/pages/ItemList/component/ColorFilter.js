import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS, COLOR_NAMES } from "../constants";

export const ColorFilter = ({ updateItems, colorFilter, setColorFilter }) => {

  return (
    <ColorFilterContainer>
      {COLORS.map((color) => {
        const id = `${COLOR_NAMES[color]}-checkbox`;
        return (
          <div key={id}>
            <ColorBoxWrapper>
            <input
              id={id}
              type="checkbox"
              checked={colorFilter[color]}
              onClick={(event) => {
                setColorFilter({
                  ...colorFilter,
                  [color]: event.target.checked,
                });
              }}
            /> 
            </ColorBoxWrapper>
           <label htmlFor={id}>{COLOR_NAMES[color]}</label>
          </div>
        );
      })}
    </ColorFilterContainer>
  );
};

const ColorFilterContainer = styled.section`
  padding: 10px;
  font-size: 15px;
  `;

const ColorBoxWrapper = styled.section`
  margin-right: 15px;
  display: inline;
`;
