import React from "react";
import styled from "styled-components";

export default function ItemDetail() {
  return (
    <ProductDescription>
      <FullDescription>
        <p>
          Crafted from a slightly stretchy denim twill made of organic cotton,
          these five-pocket trousers are cut with a mid-rise waist and cropped,
          kick-flare legs.
        </p>
      </FullDescription>
      <Description>
        <li>- Zip fly with button closure</li>
        <li>- Silver-tone metal hardware</li>
        <li>- Belt loops</li>
        <li>
          - Organic cotton is cultivated and harvested from non-genetically
          modified plants, without the use of chemical fertilisers and
          pesticides.
        </li>
        <li>- Women > Jeans > Cropped</li>
        <li>- Cotton 99%, Elastane 1%</li>
      </Description>
    </ProductDescription>
  );
}

const ProductDescription = styled.div`
  margin: 15px 0px;
`;

const FullDescription = styled.div`
  margin: 30px 0px;
  line-height: 1.3em;

  p {
    font-size: 13px;
  }
`;

const Description = styled.ul`
  margin: 10px 0px;
  
  li {
    font-size: 13px;
    margin: 5px 0px;
  }
`;
