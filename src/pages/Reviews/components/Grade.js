import React from 'react';
import styled from 'styled-components';

export default function Grade({
  grade,
  setGrade,
  increaseGrade,
  decreaseGrade,
}) {
  return (
    <GradeContainer>
      <button onClick={increaseGrade}>+</button>
      <GradeInput
        onChange={(e) => setGrade(e.target.value)}
        type="number"
        value={grade}
        min="1"
        max="5"
      />
      <button onClick={decreaseGrade}>-</button>
      <Stars>{'★'.repeat(grade) + '☆'.repeat(5 - grade)}</Stars>
    </GradeContainer>
  );
}

const GradeContainer = styled.div`
  button {
    padding: 11px 12px;
    background: #000;
    color: #fff;
  }

  input {
    width: 30px;
    padding: 10px;
    border: 1px solid #000;
  }
`;

const Stars = styled.span`
  margin-left: 10px;
  font-size: 18px;
  font-family: 'IBMPlexSansKR-Regular';
`;

const GradeInput = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
