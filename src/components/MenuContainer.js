import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { BiPlusCircle } from 'react-icons/bi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Data from './data/MenuContainerData';

function MenuContainer({ currentMenu, openMenu, history, option }) {
  const [currentMain, setCurrentMain] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentIcon, setCurrentIcon] = useState('');
  const [open, setOpen] = useState(false);

  const iconChange = (index) => {
    setCurrentIcon(index);
  };

  const handleCategories = (menu, index) => {
    menu !== 'REVIEWS' && setCurrentMain(index);
    menu !== 'REVIEWS' && openMenu(menu);
    menu !== 'REVIEWS' && setOpen(!open);
    menu === 'REVIEWS' && history.push('/reviews');
  };

  return (
    <Nav>
      <NavBar>
        <MainCategories>
          {Data.mainData.map((menu, index) => {
            return (
              <li key={menu} onClick={() => handleCategories(menu, index)}>
                {menu}
              </li>
            );
          })}
        </MainCategories>
      </NavBar>
      <MenuBox currentMenu={currentMenu} option={option}>
        <Categories>
          {Data?.categoriesData[currentMain]?.map((menu, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setCurrentCategory(index);
                  iconChange(index);
                }}
                style={{ color: menu === 'SALE' && 'red' }}
              >
                {menu}
                {Data?.subCategoriesData[currentMain][index]?.length > 1 ? (
                  currentIcon === index ? (
                    <AiOutlineArrowRight
                      style={{ marginLeft: '10px', fontSize: '20px' }}
                    />
                  ) : (
                    <PlusIcon />
                  )
                ) : (
                  ''
                )}
              </li>
            );
          })}
        </Categories>
        <SubCategoriesBox>
          <SubCategoriesTitle>
            {Data.subCategoriesData[currentMain][currentCategory]?.[0]}
          </SubCategoriesTitle>
          <SubCategories>
            {Data.subCategoriesData[currentMain][currentCategory]?.map(
              (menu, i) => {
                return i === 0 ? (
                  ''
                ) : (
                  <li
                    onClick={() => {
                      menu === 'All clothing' && history.push('/item-list');
                    }}
                    onkey={menu}
                  >
                    {menu}
                  </li>
                );
              }
            )}
          </SubCategories>
        </SubCategoriesBox>
        <SubBar>
          <TrendingTitle>{Data.subBarData[currentMain]?.[0]}</TrendingTitle>
          <TrendingContent>
            {Data?.subBarData[currentMain].map((menu, i) => {
              return <li key={menu}>{menu}</li>;
            })}
          </TrendingContent>
        </SubBar>
      </MenuBox>
    </Nav>
  );
}
export default withRouter(MenuContainer);

const NavBar = styled.div`
  &:before {
    background-color: #fff;
    z-index: -1;
    display: block;
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;

const MainCategories = styled.ul`
  display: flex;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
  li {
    display: flex;
    align-items: center;
    width: auto;
    height: 23px;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 10px;
    letter-spacing: 1px;
    padding: 0 6px;
    &:hover {
      border-radius: 2px;
      background-color: black;
      color: white;
    }
  }
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 56px;
  left: 0px;
  width: 100%;
  height: ${({ option }) => (option[0] ? '355px' : '0px')};
  padding: ${({ option }) => (option[0] ? '0px 20px' : '0px 20px')};
  text-overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  background-color: white;
  visibility: visible;
  opacity: 1;
  z-index: 2;
  box-shadow: 0 17px 32px rgba(0, 0, 0, 0.2);
  transition: width 1s, height 1s, transform 2s;
`;

const Categories = styled.ul`
  padding-top: 25px;
  padding-bottom: 25px;
  li {
    margin-bottom: 7px;
    font-size: 23px;
    line-height: 22px;
    max-width: 175px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    letter-spacing: 0.5px;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
  }
`;

const SubCategoriesBox = styled.div`
  position: absolute;
  top: 25px;
  left: 218px;
  margin-top: 5px;
`;

const SubCategories = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 300px;
  max-height: 300px;
  margin-left: 20px;
  column-count: 2;
  column-gap: 50px;
  li {
    display: flex;
    align-items: center;
    width: auto;
    height: 22px;
    margin: 5px;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
      border-radius: 2px;
    }
  }
`;

const SubCategoriesTitle = styled.h1`
  margin: 0 0 10px 25px;
  font-weight: 400;
  font-size: 12px;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
`;

function PlusIcon() {
  return (
    <BiPlusCircle
      style={{
        fontSize: '20px',
        verticalAlign: 'text-top',
        marginLeft: '10px',
      }}
    />
  );
}

const SubBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 867px;
  height: 300px;
`;

const TrendingContent = styled.div`
  display: flex;
  justify-content: center;
  width: 210px;
  height: 300px;
  border-left: 1px solid black;
  margin-top: 20px;
  float: left;
  padding: 0 31px;
  overflow: auto;
  display: block;
  li {
    font-size: 14px;
    margin-top: 10px;
    padding-bottom: 10px;
  }
`;

const TrendingTitle = styled.h1`
  margin-left: 32px;
  font-weight: 400;
  font-size: 12px;
  padding-top: 25px;
`;
