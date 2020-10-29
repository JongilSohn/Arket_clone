import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { API, reviewsTestToken } from '../../config';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';
import Nav from '../../components/Nav';

export default function Reviews() {
  const [reviewData, setReviewData] = useState([]);

  const getReviewData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: reviewsTestToken,
      },
    };
    const res = await fetch(`${API}/reviews`, requestOptions);
    const { data } = await res.json();
    setReviewData(data);
  };

  useEffect(() => {
    getReviewData();
  }, []);

  return (
    <>
      <Nav />
      <MainImage>
        <Inner>
          <Title>Customer Reviews</Title>
          <span>See why people love Ardog.</span>
        </Inner>
      </MainImage>
      <ReviewList reviewData={reviewData} setReviewData={setReviewData} />
      <ReviewForm setReviewData={setReviewData} />
    </>
  );
}

const revealImage = keyframes`
  0% {
    filter: blur(10px);
  }
  100% {
    filter: blur(0px);
  }
`;

const MainImage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 900px;
  overflow: hidden;

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
  background: url('/Images/reviews.jpg') no-repeat center center;
  background-size: cover;
  filter: blur(10px);
  animation: ${revealImage} 1s forwards;
  animation-delay: 0.3s;

  span {
    font-size: 18px;
    line-height: 30px;
  }
`;

const Title = styled.h2`
  margin-top: 30px;
  color: #000;
  text-shadow: 0px 0px 40px rgba(255, 255, 255, 0.8);
  font-size: 80px;
  text-align: center;
`;
