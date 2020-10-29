import { useState } from "react";
import React from "react";
import styled from "styled-components";

export const FilterSections = ({ children, type }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <FilterSectionsWrapper>
      <div onClick={() => setExpanded(!expanded)}>{type}</div>
      {expanded && children && <div>{children}</div>}
    </FilterSectionsWrapper>
  );
};

const FilterSectionsWrapper = styled.section`
  width: 200px;
  border: 1px solid black;
  padding: 10px;
  background: white;
  font-size: 17px;
  margin-right: 20px;
`;
