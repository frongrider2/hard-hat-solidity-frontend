import { mainnetTokens, serializedTokens } from "config/constants/tokens";
import React from "react";
import SwapItem from "./components/SwapItem";
import { SwapWrapper } from "./styled";

function Swap() {
  console.log(mainnetTokens);
  return (
    <SwapWrapper>
      <SwapItem />
      <SwapItem />
    </SwapWrapper>
  );
}

export default Swap;
