import React from 'react';
import styled from 'styled-components';

export default function ImageUploader({ handleFileChange, fileInput }) {
  return (
    <Form className="uploadSteps">
      <File>
        <FileInput
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          multiple
        />
      </File>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  max-width: 300px;
  border: 1px solid #000;
`;

const File = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    top: 60px;
    display: block;
    width: 50px;
    height: 56px;
    margin: 0 auto;
    background-image: url('https://image.flaticon.com/icons/png/128/109/109612.png');
    background-size: 100%;
    background-repeat: no-repeat;
    pointer-events: none;
  }

  &::before {
    content: ' or drag it here. ';
    position: absolute;
    bottom: 10px;
    display: block;
    width: 100%;
    height: 57px;
    color: #000;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    pointer-events: none;
  }
`;

const FileInput = styled.input`
  outline: 2px dashed rgba(0, 0, 0, 0.5);
  outline-offset: -10px;
  transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
  padding: 160px 0% 85px 20%;
  text-align: center;
  margin: 0;
  width: 100%;

  &:focus {
    outline: 2px dashed #000;
    outline-offset: -10px;
    transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
    border: 1px solid #000;
  }
`;
