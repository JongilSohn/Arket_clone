import React from "react";
import styled from "styled-components";
import { FilterSections } from "./FilterSections";
import { ColorFilter } from "./ColorFilter";
import { MaterialFilter } from "./MaterialFilter";
import { FilterClearBtn } from "./FilterClearBtn";
import { FilterOkBtn } from "./FilterOkBtn";

export const FilterList = (props) => {
  const {
    updateItems,
    closePopover,
    colorFilter,
    setColorFilter,
    materialFilter,
    setMaterialFilter,
    setCategoryFilter,
    listData,
  } = props;

  return (
    <div className="Filter">
      <FilterSections type="Color">
        <ColorFilter
          updateItems={updateItems}
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
        />
      </FilterSections>
      <FilterSections type="Material">
        <MaterialFilter
          updateItems={updateItems}
          materialFilter={materialFilter}
          setMaterialFilter={setMaterialFilter}
        />
      </FilterSections>
      <FilterBtn>
        <FilterClearBtn updateItems={updateItems} setColorFilter={setColorFilter} setMaterialFilter={setMaterialFilter}
setCategoryFilter={setCategoryFilter}/>
        <FilterOkBtn closePopover={closePopover} />
      </FilterBtn>
    </div>
  );
};

const FilterBtn = styled.div`
  display: flex;
`;
