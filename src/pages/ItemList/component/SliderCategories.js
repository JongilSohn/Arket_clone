import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const SliderCategories = ({
  text,
  updateItems,
  id,
  setCategoryFilter,
}) => {
  const goToCategory = () => {
    setCategoryFilter(`&category=${id}`);
  };

  return <button onClick={goToCategory}>{text}</button>;
};

SliderCategories.propTypes = {
  text: PropTypes.string,
};
