import React from 'react';
import styled, { keyframes } from 'styled-components';
import Menu from './components/Menus';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function Main() {
  const [mainCategory, aboutArdog] = MENUS;

  return (
    <>
      <Nav />
      <Upcycled>
        <Inner>
          <Title>Upcycled Down</Title>
          <ButtonContainer>
            {BUTTONS.map((button) => {
              return <Button key={button}>{button}</Button>;
            })}
          </ButtonContainer>
        </Inner>
      </Upcycled>
      <Menu menus={mainCategory} />
      <CafePromo>
        <div>
          <img src="/Images/cafe.png" alt="일러스트" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id doloribus
          eveniet odit veritatis ipsum dicta. Sit consequatur necessitatibus
          eveniet similique accusamus dolorum. Libero magnam dolor, ex possimus
          pariatur impedit voluptas quidem tempora quisquam iusto! A, deserunt
          facere ad.
        </p>
        <Button>ARDOG Café</Button>
      </CafePromo>
      <MoreArdog>
        <h3>Learn more about ARDOG</h3>
      </MoreArdog>
      <Menu menus={aboutArdog} />
      <Footer />
    </>
  );
}

const MENUS = [
  [
    {
      id: 'Women',
      image: '/Images/women.jpg',
    },
    {
      id: 'Men',
      image: '/Images/men.jpg',
    },
    {
      id: 'Children',
      image: '/Images/children.jpg',
    },
    {
      id: 'Homeware',
      image: '/Images/homeware.jpg',
    },
    {
      id: 'Travel',
      image: '/Images/travel.jpg',
    },
    {
      id: 'Baby',
      image: '/Images/baby.jpg',
    },
    {
      id: 'External brands',
      image: '/Images/external_brands.jpg',
    },
    {
      id: 'Decorating',
      image: '/Images/decorating.jpg',
    },
  ],
  [
    {
      id: 'Suppliers',
      image: '/Images/suppliers.jpg',
    },
    {
      id: 'Care',
      image: '/Images/care.jpg',
    },
    {
      id: 'Recycling',
      image: '/Images/recycling.jpg',
    },
  ],
];

const BUTTONS = ['Women', 'Men', 'Children', 'Homeware'];

const revealImage = keyframes`
  0% {
    filter: blur(10px);
  }
  100% {
    filter: blur(0);
  }
`;

const Upcycled = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 900px;
  overflow: hidden;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Inner = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')}
  width: 100%;
  height: 100%;
  background: url('/Images/main.jpg') no-repeat center center;
  background-size: cover;
  filter: blur(10px);
  animation: ${revealImage} 1s forwards;
  animation-delay: 0.3s;
`;

const Title = styled.h2`
  margin-top: 30px;
  color: #000;
  font-size: 80px;
  text-align: center;
  text-shadow: 0px 0px 30px rgba(255, 255, 255, 1);
`;

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  padding: 30px 0;
`;

export const Button = styled.button`
  padding: 10px;
  margin: 0 2px;
  background: ${({ backgroundColor }) => backgroundColor || '#000'};
  color: ${({ color }) => color || '#fff'};
  font-size: 18px;
  letter-spacing: 1px;
  cursor: pointer;
`;

const CafePromo = styled.div`
  padding: 30px 0;

  > div {
    width: 180px;
    height: 120px;
    margin: 0 auto;
    background-color: #000;
  }

  p {
    max-width: 880px;
    padding-top: 40px;
    margin: 0 auto;
    font-weight: light;
    font-size: 22px;
    letter-spacing: 1.5px;
    line-height: 1.4;
  }

  button {
    display: block;
    padding: 10px;
    margin: 30px auto 0;
    background: #000;
    color: #fff;
    font-size: 18px;
    letter-spacing: 1px;
  }
`;

const MoreArdog = styled.div`
  width: 1330px;
  padding: 40px 0 20px;
  margin: 0 auto;
  border-bottom: 1px solid #000;
  font-size: 24px;
  text-align: center;
  letter-spacing: 2px;
`;
