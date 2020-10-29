import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import S3 from 'react-aws-s3';
import { useSelector } from 'react-redux';
import Grade from './Grade';
import ImageUploader from './ImageUploader';
import {
  API,
  accessKeyId,
  secretAccessKey,
  reviewsTestToken,
} from '../../../config';

export default function ReviewForm({ setReviewData }) {
  const { login } = useSelector((state) => ({
    login: state.login,
  }));
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [grade, setGrade] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const fileInput = useRef();

  const handleFileChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const newFileName = file.name;
    const config = {
      bucketName: 'uploadtestdb',
      dirName: 'photos',
      region: 'ap-northeast-2',
      accessKeyId,
      secretAccessKey,
    };
    const ReactS3Client = new S3(config);
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    ReactS3Client.uploadFile(file, newFileName)
      .then((data) => setImageUrl(data.location))
      .catch((err) => console.error(err));
  };

  const decreaseGrade = () => {
    setGrade(grade === 1 ? 1 : grade - 1);
  };

  const increaseGrade = () => {
    setGrade(grade === 5 ? 5 : grade + 1);
  };

  const resetFormData = () => {
    setTimeout(() => {
      setImagePreviewUrl('');
      setImageUrl('');
      setGrade(5);
      setTitle('');
      setDescription('');
    }, 500);
    setIsActive(false);
    fileInput.current.value = null;
  };

  const fetchReviewData = async (api, requestOptions) => {
    const res = await fetch(api, requestOptions);
    const { data } = await res.json();
    setReviewData(data);
  };

  const postReviewData = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: reviewsTestToken,
      },
      body: JSON.stringify({
        grade,
        title,
        description,
        imageUrl,
      }),
    };

    fetchReviewData(`${API}/reviews`, requestOptions);

    resetFormData();
  };

  return (
    <Form isActive={isActive}>
      <AddReviewButton
        isLoggedIn={login}
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'Cancel review' : 'Write a Review'}
      </AddReviewButton>
      <div>
        <ImageUploader
          fileInput={fileInput}
          handleFileChange={handleFileChange}
        />
        <Right>
          <DetailReview>
            <Preview>
              {!imagePreviewUrl && 'Photo'}
              {imagePreviewUrl && (
                <PreviewImage src={imagePreviewUrl} alt="리뷰 이미지" />
              )}
            </Preview>
            <Detail>
              <Grade
                grade={grade}
                setGrade={setGrade}
                increaseGrade={increaseGrade}
                decreaseGrade={decreaseGrade}
              />
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your review a title"
                value={title}
              />
              <input
                type="text"
                placeholder="Write your comments here"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Detail>
          </DetailReview>
          <SubmitButton onClick={postReviewData}>Upload</SubmitButton>
        </Right>
      </div>
    </Form>
  );
}

const Form = styled.div`
  width: 1280px;
  max-height: ${({ isActive }) => (isActive ? '2000px' : '55px')};
  margin: 0 auto 100px;
  overflow: hidden;
  transition: max-height 1s ease-in-out;

  > div {
    padding-top: 50px;
    display: flex;
    justify-content: space-between;
  }
`;

const Right = styled.div`
  ${({ theme }) => theme.flex('center', 'flex-start', 'column')}
`;

const Preview = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  width: 180px;
  height: 180px;
  border: 1px solid #000;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const AddReviewButton = styled.button`
  width: 1280px;
  padding: 20px;
  background: ${({ isLoggedIn }) => (isLoggedIn ? '#000' : '#ddd')};
  color: ${({ isLoggedIn }) => (isLoggedIn ? '#fff' : '#000')};
  pointer-events: ${({ isLoggedIn }) => (isLoggedIn ? 'initial' : 'none')};
  cursor: pointer;
`;

const DetailReview = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}
  width: 100%;

  input {
    border: 1px solid #000;
  }
`;

const Detail = styled.div`
  ${({ theme }) => theme.flex('space-between', null, 'column')}
  height: 180px;
  padding-left: 20px;

  input[type='text'] {
    padding: 20px;
    width: 720px;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 920px;
  padding: 20px 0;
  margin-top: 30px;
  background: #fff;
  color: #000;
  border: 1px solid #000;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }
`;
