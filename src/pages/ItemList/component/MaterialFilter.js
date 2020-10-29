import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DEFAULT_MATERIALS, MATERIALS, MATERIAL_NAMES } from "../constants";

export const MaterialFilter = ({
  updateItems,
  materialFilter,
  setMaterialFilter,
}) => {
  return (
    <MaterialFilterContainer>
      {MATERIALS.map((material) => {
        const id = `${MATERIAL_NAMES[material]}-checkbox`;
        return (
          <div key={id}>
            <MaterialBoxWrapper>
              <input
                id={id}
                type="checkbox"
                checked={materialFilter[material]}
                onClick={(event) => {
                  setMaterialFilter({
                    ...materialFilter,
                    [material]: event.target.checked,
                  });
                }}
              />
            </MaterialBoxWrapper>
            <label htmlFor={id}>{MATERIAL_NAMES[material]}</label>
          </div>
        );
      })}
    </MaterialFilterContainer>
  );
};

const MaterialFilterContainer = styled.section`
  padding: 10px;
  font-size: 15px;
`;

const MaterialBoxWrapper = styled.section`
  margin-right: 15px;
  display: inline;
`;

