import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineX } from "react-icons/hi";

export default function CartItems({
  cart,
  item,
  idx,
  changeCount,
  fetchRemove,
}) {
  const [isHover, setIsHover] = useState(false);
  const onMouseOver = () => setIsHover(!isHover);
  return (
    <CartItem
      key={idx}
      style={{
        borderRight: idx % 2 === 0 && "1px solid #000",
        borderBottom:
          (cart.length - 2 === 0 || cart.length - 2 < idx) && "none",
      }}
      count={item.count}
      onMouseOver={() => onMouseOver()}
      onMouseOut={() => onMouseOver()}
    >
      <CartImgBox>
        <span>
          <RemoveBox onClick={() => fetchRemove(idx)}>
            <span>X</span>
          </RemoveBox>
        </span>
        <CartImg src={item.main_image} />
      </CartImgBox>
      <CountBox>
        <div>
          <Minus
            onClick={() => changeCount(idx, -1)}
            count={item.count}
            isHover={isHover}
          >
            <MinusText>-</MinusText>
          </Minus>
        </div>
        <CountX>
          <CountText>{item.count}</CountText>
          <Xcount />
        </CountX>
        <div>
          <Plus
            onClick={() => {
              item.count !== 20 && changeCount(idx, 1);
            }}
            count={item.count}
            isHover={isHover}
          >
            <PlusText>+</PlusText>
          </Plus>
        </div>
      </CountBox>
      <TitleBox>
        <span>{item.title}</span>
      </TitleBox>
      <TitleBox>
        <span>{item.serial_num}</span>
      </TitleBox>
      <TitleBox>
        <span>
          {item.size} {item.color}
        </span>
      </TitleBox>
      <TitleBox>
        <span>$ {item.price}</span>
      </TitleBox>
      <TotalPriceBox>
        <span>Total $ {item.price * item.count}</span>
      </TotalPriceBox>
    </CartItem>
  );
}

const CartItem = styled.div`
  display: inline-block;
  width: 50%;
  padding: 20px;
  border-bottom: 1px solid black;

  div {
    span {
      div {
        color: white;
        span {
          font-size: 20px;
        }
      }
    }
  }

  &:hover {
    div {
      span {
        div {
          color: black;
        }
      }
    }
  }
`;

const RemoveBox = styled.div`
  position: absolute;
  right: 0;
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    margin-top: 4px;
    font-weight: bold;
  }

  &:hover {
    border: 2px solid #000;
    color: #000;
  }
`;

const CartImgBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  padding-bottom: 26px;
`;

const CartImg = styled.img`
  max-height: 160px;
  cursor: pointer;
`;

const CountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const CountText = styled.span`
  margin-left: 15px;
  font-size: 20px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 3px 0px;

  span {
    font-size: 13px;
  }
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0px;

  span {
    font-size: 13px;
  }
`;

const TotalPriceBox = styled(PriceBox)`
  span {
    font-size: 20px;
  }
`;

function Xcount() {
  return (
    <HiOutlineX
      style={{
        verticalAlign: "text-top",
        marginRight: "5px",
        width: "22px",
        height: "22px",
        color: "#000",
      }}
    />
  );
}

const CountX = styled.div`
  display: flex;
  justify-content: center;
  width: 65px;
`;

const Plus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #cdd1d7;
  border: 2px solid #cdd1d7;
  border-radius: 50%;
  width: 23px;
  height: 23px;
  cursor: pointer;
  border: ${({ isHover, count }) =>
    isHover && count !== 20 ? "2px solid black" : "2px solid cdd1d7"};
  color: ${({ isHover, count }) =>
    isHover && count !== 20 ? "black" : "cdd1d7"};

  &:hover {
    color: ${({ count }) => count !== 20 && "white"};
    background-color: ${({ count }) => count !== 20 && "#000"};
    border: ${({ count }) => count !== 20 && "2px solid black"};
  }
`;

const PlusText = styled.span`
  display: block;
  margin-top: 3px;
  margin-right: 1px;
  font-size: 24px;
`;

const Minus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #cdd1d7;
  border-radius: 50%;
  width: 23px;
  height: 23px;
  cursor: pointer;
  border: ${({ isHover }) => isHover && "2px solid black"};
  color: ${({ isHover }) => (isHover ? "black" : "#cdd1d7")};

  &:hover {
    color: ${({ count }) => (count === 1 ? "red" : "white")};
    background-color: ${({ count }) => (count === 1 ? "white" : "#000")};
    border: ${({ count }) =>
      count === 1 ? "2px solid red" : "2px solid black"};
  }
`;

const MinusText = styled.span`
  display: block;
  margin-top: 3px;
  font-size: 24px;
`;
