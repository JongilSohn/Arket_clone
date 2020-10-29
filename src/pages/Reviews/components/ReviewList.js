import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { API, reviewsTestToken } from '../../../config';

export default function ReviewList({ reviewData, setReviewData }) {
  const { login } = useSelector((state) => ({
    login: state.login,
  }));

  const [editedDescription, setEditedDescription] = useState();
  const [editedTitle, setEditedTitle] = useState();

  const getUserId = (email) => {
    const userName = email.split('@')[0];
    return [...userName].map((letter, index) => (index > 2 ? '*' : letter));
  };

  const fetchReviewData = async (api, requestOptions) => {
    const res = await fetch(api, requestOptions);
    const { data } = await res.json();
    setReviewData(data);
  };

  const editReviewData = (method, reviewId, title, description) => {
    const requestOptions = {
      method,
      headers: {
        Authorization: reviewsTestToken,
      },
      body: JSON.stringify({
        reviewId,
        title,
        description,
      }),
    };

    fetchReviewData(`${API}/reviews`, requestOptions);
  };

  const removeReviewData = (method, reviewId) => {
    const requestOptions = {
      method,
      headers: {
        Authorization: reviewsTestToken,
      },
    };

    fetchReviewData(`${API}/reviews/${reviewId}`, requestOptions);
  };

  return (
    <Container>
      {reviewData?.map((review) => {
        const {
          reviewId,
          email,
          grade,
          imageUrl,
          title,
          description,
          date,
          product,
          isLoggedInUser,
          isEditing,
        } = review;
        return (
          <li key={reviewId}>
            <Info>
              <span>{getUserId(email)}</span>
              <span>{product}</span>
              <Grade>{'★'.repeat(grade) + '☆'.repeat(5 - grade)}</Grade>
            </Info>
            <Review>
              <Image>
                <img src={imageUrl} alt="리뷰" />
              </Image>
              <div>
                <Title
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onKeyUp={(e) => {
                    setEditedTitle(e.target.innerText);
                  }}
                >
                  {title}
                </Title>
                <Description
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onKeyUp={(e) => {
                    setEditedDescription(e.target.innerText);
                  }}
                >
                  {description}
                </Description>
              </div>
            </Review>
            <Date>{date}</Date>
            {login && isLoggedInUser && (
              <ButtonContainer>
                <button
                  onClick={(e) => {
                    setReviewData(
                      reviewData.map((el) => {
                        if (reviewId === el.reviewId) {
                          return { ...el, isEditing: !el.isEditing };
                        }
                        return el;
                      })
                    );

                    if (e.target.innerText === 'Save') {
                      editReviewData(
                        'PATCH',
                        reviewId,
                        editedTitle,
                        editedDescription
                      );
                    }
                  }}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => {
                    removeReviewData('DELETE', reviewId);
                  }}
                >
                  Remove
                </button>
              </ButtonContainer>
            )}
          </li>
        );
      })}
    </Container>
  );
}

const Container = styled.ul`
  width: 1280px;
  margin: 100px auto 0;

  li {
    position: relative;
    ${({ theme }) => theme.flex('space-between')}
    padding: 65px 0;
  }
`;

const Info = styled.div`
  flex: 1;
  ${({ theme }) => theme.flex(null, null, 'column')}

  span:not(:last-child) {
    padding-bottom: 20px;
  }
`;

const Grade = styled.span`
  font-size: 18px;
  font-family: 'IBMPlexSansKR-Regular';
`;

const Review = styled.div`
  flex: 3;
  display: flex;
`;

const Image = styled.div`
  min-width: 170px;
  margin-right: 20px;

  img {
    width: 170px;
    height: 170px;
    object-fit: cover;
  }
`;

const Title = styled.h4`
  font-weight: bold;
  padding-bottom: 20px;
`;
const Description = styled.p`
  line-height: 24px;
`;

const Date = styled.span`
  flex: 1;
  text-align: right;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 100px;
  display: flex;

  button {
    padding: 10px;
    background: #000;
    color: #fff;
    cursor: pointer;

    &:last-child {
      margin-left: 10px;
    }
  }
`;
