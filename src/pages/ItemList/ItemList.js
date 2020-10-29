import React, { useState, useEffect } from "react";
import axios from "axios";
import SimpleSlider from "./component/SimpleSlider";
import Popover from "react-popover";
import styled from "styled-components";
import { API } from "../../config";
import { FilterCount } from './component/FilterCount';
import { ItemsData } from "./component/ItemsData";
import { FilterList } from "./component/FilterList";
import { DEFAULT_COLORS, DEFAULT_MATERIALS } from "./constants";
import Nav from "../../../src/components/Nav";

export default function ItemList(props) {
  const [popover, setPopover] = useState(false);
  const [listData, setListData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [colorFilter, setColorFilter] = useState(DEFAULT_COLORS);
  const [materialFilter, setMaterialFilter] = useState(DEFAULT_MATERIALS);

  useEffect(() => {
    axios.get(`${API}/products`).then((res) => setListData(res.data.data));
  }, []);

  useEffect(() => {
    const selectedColors = Object.keys(colorFilter).filter(
      (el) => !!colorFilter[el]
    );
    const colorQuery = selectedColors.map((el) => "&color=" + el);
    const selectedMaterials = Object.keys(materialFilter).filter(
      (el) => !!materialFilter[el]
    );
    const materialQuery = selectedMaterials.map((el) => "&material=" + el);

    const combinedQuery = colorQuery + materialQuery + categoryFilter;
    console.log(combinedQuery.length)
    axios
      .get(`${API}/products?${combinedQuery.split(",").join("")}`)
      .then((res) => setListData(res.data.data));
  }, [categoryFilter, colorFilter, materialFilter]);

  return (
    <>
      <Nav />
      <SimpleSlider
        updateItems={setListData}
        setCategoryFilter={setCategoryFilter}
      />
      <FilterContainer>
        <FilterCount listData={listData}  setCategoryFilter={setCategoryFilter}/>
        <Popover
          isOpen={popover}
          place="below"
          body={
            <FilterList
              updateItems={setListData}
              closePopover={() => setPopover(false)}
              colorFilter={colorFilter}
              setColorFilter={setColorFilter}
              materialFilter={materialFilter}
              setMaterialFilter={setMaterialFilter}
              setCategoryFilter={setCategoryFilter}
            />
          }
        >
          <button className="filter" onClick={() => setPopover(!popover)}>
            Filter
          </button>
        </Popover>
      </FilterContainer>
      <ItemsData data={listData} onButtonClick={setListData} />
    </>
  );
}

const FilterContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;
