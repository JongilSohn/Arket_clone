import React from 'react';
import styled from 'styled-components';
import { Button } from '../Main';

export default function Menus({ menus }) {
  return (
    <MenuContainer>
      {menus.map((menu, index) => {
        const { id, image } = menu;
        return (
          <Menu key={id}>
            <ImageContainer>
              <img src={image} alt={id} />
            </ImageContainer>
            <Button backgroundColor="#fff" color="#000">
              {id}
            </Button>
          </Menu>
        );
      })}
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  ${({ theme }) => theme.flex('center')}
  flex-wrap: wrap;
  width: 100%;

  &:last-child > div {
    width: 23%;
    margin: 30px 2.5px 120px;
  }
`;

const Menu = styled.div`
  position: relative;
  width: 25%;
  height: 640px;
  background-color: ${(props) => props.backgroundColor};

  button {
    position: absolute;
    bottom: 40px;
    left: 50%;
    padding: 10px;
    margin: 0 2px;
    background: #fff;
    color: #000;
    font-size: 18px;
    letter-spacing: 1px;
    transform: translateX(-50%);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.4s ease-in-out;
    z-index: 9;
  }

  img {
    width: 100%;
    height: 640px;
    object-fit: cover;
    transform: scale(1.1);
    transition: transform 0.4s ease-in-out;
  }

  &:hover {
    &::before {
      background-color: rgba(0, 0, 0, 0.2);
    }

    img {
      transform: scale(1);
    }
  }
`;
