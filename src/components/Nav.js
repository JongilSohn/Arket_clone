import React, { useState } from 'react';
import styled from 'styled-components';
import Login from '../components/Login';
import { GrSearch } from 'react-icons/gr';
import { VscAccount } from 'react-icons/vsc';
import { BsQuestionCircle } from 'react-icons/bs';
import { BsBag } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuContainer from './MenuContainer';

const Nav = () => {
  const login = useSelector((state) => state.login);
  const { totalCount } = useSelector((state) => state.cart);

  const [option, setOption] = useState(new Array(3).fill(false));
  const openMenu = () => {
    setOption([true, false, false]);
  };
  return (
    <>
      <NavBox>
        <Container>
          <Link to="/">ARDOG</Link>
          <NavBar>
            <MenuContainer
              option={option}
              onClick={openMenu}
              openMenu={openMenu}
            />
          </NavBar>
        </Container>
        <Icons>
          <Button>
            <GrSearch />
          </Button>
          <Button>
            <VscAccount onClick={() => setOption([false, !option[1], false])} />
          </Button>
          <Button>
            <BsQuestionCircle
              onClick={() => setOption([false, false, !option[2]])}
            />
          </Button>
          <Button>
            <BsBag></BsBag>
            <CartBox>
              <CartNum>{totalCount}</CartNum>
            </CartBox>
          </Button>
        </Icons>
      </NavBox>
      {!login && <Login option={option} setOption={setOption} />}
      <QuestionBox option={option}>
        <AboutWrap>
          <AboutBox>
            <About src="/Images/tag.png" alt="About ARKET" />
            <AboutTitle>About ARKET</AboutTitle>
          </AboutBox>
          <AboutBox>
            <About src="/Images/coffee.png" alt="Stores & cafés" />
            <AboutTitle>Stores & cafés</AboutTitle>
          </AboutBox>
          <AboutBox>
            <About src="/Images/smile.png" alt="Customer service" />
            <AboutTitle>Customer service</AboutTitle>
          </AboutBox>
          <AboutBox>
            <About src="/Images/closed-tag.png" alt="Newsletter" />
            <AboutTitle>Newsletter</AboutTitle>
          </AboutBox>
          <AboutBox>
            <About src="/Images/shopping-bag.png" alt="Size guide" />
            <AboutTitle>Size guide</AboutTitle>
          </AboutBox>
          <AboutBox>
            <About src="/Images/cycle.png" alt="Recycle with ARKET" />
            <AboutTitle>Recycle with ARKET</AboutTitle>
          </AboutBox>
        </AboutWrap>
        <QuestionBottom>
          <InternationalButton>
            <span>International</span>
          </InternationalButton>
        </QuestionBottom>
      </QuestionBox>
      <EmptyBox
        onClick={() => {
          setOption([false, false, false]);
        }}
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  margin-top: 5px;
  margin-right: 0px;
  a {
    font-size: 27px;
    margin-top: 31px;
    width: 90px;
    cursor: pointer;
  }
`;

const NavBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  margin-left: 20px;
  border-bottom: 2.5px solid black;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 5px;
  width: auto;
  height: 20px;
  list-style-type: none;
`;

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: auto;
  height: auto;
`;

const AboutBox = styled.div`
  height: auto;
  width: 135px;
  text-align: center;
`;
const QuestionBox = styled.div`
  z-index: 10;
  display: ${({ option }) => (option[2] ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  right: 30px;
  width: 450px;
  height: auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  background-color: white;
  transform-origin: 30% 0;
  padding: 15px 15px 10px;
  flex-wrap: wrap;
  justify-content: center;
`;
const AboutWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const About = styled.img`
  width: 75px;
  height: 75px;
  margin: 10px 10px 10px 20px;
  cursor: pointer;
`;

const AboutTitle = styled.span`
  font-size: 13px;
  line-height: 24px;
  margin-left: 9px;
  border-radius: 2px;
  padding: 5px 8px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: black;
  }
`;

const QuestionBottom = styled.div`
  text-align: center;
  width: 100%;
  height: auto;
  border-top: 1px solid #ddd;
  margin-top: 20px;
`;

const InternationalButton = styled.button`
  font-size: 14px;
  cursor: pointer;
  margin-top: 5px;
  &:hover {
    opacity: 0.6;
  }
`;

const Button = styled.button`
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  font-size: 22px;
  margin-left: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const EmptyBox = styled.div`
  position: absolute;
  width: 100%;
  height: ${({ option }) =>
    option === [false, false, false] ? '0px' : '960px'};
`;

const CartBox = styled.div`
  position: relative;
  top: 3px;
  left: -50%;
  font-size: 14px;
  width: 30px;
  height: 30px;
`;

const CartNum = styled.span`
  position: absolute;
  display: block;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default Nav;
