import React, { useEffect } from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux'
import CartItem from "./components/CartItem";
import PriceContainer from "./components/PriceContainer";
import Nav from "../../components/Nav";
import { API } from "../../config";
import {getItems, increaseCount, decreaseCount, removeItem} from '../../modules/cart';

export default function Cart() {
  const dispatch = useDispatch();
  const {items, totalPrice} = useSelector(({cart}) => ({
    items: cart.items,
    totalPrice: cart.totalPrice
  }))

  useEffect(() => {
    (async () => {
      const result = await fetch(`${API}/cart`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      const {data} = await result.json();
      dispatch(getItems(data))
    })()
  }, [dispatch]);

  const deleteCart = (idx) => {
    const cartList = [...items];
    const updateItem = cartList.filter(
      (item) => item.cart_id !== items[idx].cart_id
    );
    dispatch(removeItem(updateItem));
  };

  const fetchRemove = async (idx) => {
    try {
      const deleteResult = await fetch(`${API}/cart`, {
        method: "delete",
        headers: { Authorization: localStorage.getItem("token") },
        body: JSON.stringify({
          cart_id: items[idx].cart_id,
        }),
      });
      const { message } = await deleteResult.json();

      if (message === "SUCCESS") {
        deleteCart(idx);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCount = async (idx, change, cartList) => {
    try {
      const patchResult = await fetch(`${API}/cart`, {
        method: "patch",
        headers: { Authorization: localStorage.getItem("token") },
        body: JSON.stringify({
          cart_id: items[idx].cart_id,
          count: cartList[idx].count,
        }),
      });
      const { message } = await patchResult.json();

      if (message === "SUCCESS") {
        if (change === 1) {
          dispatch(increaseCount(cartList))
        } else {
          dispatch(decreaseCount(cartList))
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeCount = (idx, change) => {
    const cartList = [...items];
    const isDelete = cartList[idx].count === 1 && change === -1

    const changeCartList = 
    cartList.map((item, index ) => {
        const isSame = index === idx;
        if(isSame) {
          return {...item, count :item.count+change}
        }
        if(!isSame) {
          return item
        }
      })

    if (isDelete) fetchRemove(idx);
    if (!isDelete) fetchCount(idx, change, changeCartList);
  };

  return (
    <>
      <Nav />
      <Section>
        <CartContainer>
          <h2>Shopping bag</h2>
          {items?.map((item, idx) => (
              <CartItem
                key={idx}
                cart={items}
                idx={idx}
                item={item}
                changeCount={changeCount}
                deleteCart={deleteCart}
                fetchRemove={fetchRemove}
              />
            )
          )}
        </CartContainer>
        <PriceContainer totalPrice={totalPrice} />
      </Section>
    </>
  );
}

const Section = styled.section`
  display: flex;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const CartContainer = styled.div`
  margin-right: 40px;
  width: calc(66.66% - 20px);
  border-bottom: 2px solid black;
  margin-bottom: 100px;
  height: 100%;

  h2 {
    margin-top: 20px;
    padding-bottom: 13px;
    font-size: 20px;
    border-bottom: 2px solid black;
  }
`;
