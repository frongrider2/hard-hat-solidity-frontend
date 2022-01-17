import { colors } from "colors/colors";
import React from "react";
import styled from "styled-components/macro";

const SwapItemWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 0.8rem;
  background-color: ${colors.PINK2};
`;

function SwapItem() {
  return <SwapItemWrapper></SwapItemWrapper>;
}

export default SwapItem;
