import React from 'react';
import styled from 'styled-components';
import { FcGlobe } from 'react-icons/fc';
import FOOTERDATA from './data/footerData';
export default function Footer() {
  return (
    <Container>
      <FooterWrap>
        <FooterList>
          {FOOTERDATA.map((footer) => {
            return (
              <FooterComment>
                <span>{footer}</span>
              </FooterComment>
            );
          })}
        </FooterList>
      </FooterWrap>
      <FooterWrap>
        <FooterList>
          <FooterComment>
            <span>My account</span>
          </FooterComment>
          <FooterComment>
            <span>Privacy policy </span>
          </FooterComment>
          <FooterComment>
            <FcGlobe />
            <span> International</span>
          </FooterComment>
        </FooterList>
      </FooterWrap>
    </Container>
  );
}

const Container = styled.footer`
  width: 100%;
  height: 152px;
  line-height: 21px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  padding: 50px;
`;

const FooterWrap = styled.div`
  &:last-child ul {
    margin-top: 12px;
  }
`;

const FooterList = styled.ul`
  display: flex;
  justify-content: center;
  font-size: 14px;
  list-style: none;
`;

const FooterComment = styled.li`
  display: inline-block;
  margin-left: 40px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
