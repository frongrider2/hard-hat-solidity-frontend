import React, { useMemo } from "react";
import { Currency, ETHER, Token } from "sdk";
import styled from "styled-components/macro";
import getTokenLogoURL from "utils/getTokenLogoURL";
import Logo from "./Logo";

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

export default function CurrencyLogo({
  currency,
  size = "24px",
  style,
}: {
  currency?: Currency;
  size?: string;
  style?: React.CSSProperties;
}) {
  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return [];

    if (currency instanceof Token) {
      return [getTokenLogoURL(currency.address)];
    }
    return [];
  }, [currency]);

  if (currency === ETHER) {
    return <StyledLogo size={"24px"} srcs={srcs} alt={`${currency?.symbol ?? "token"} logo`} />;
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? "token"} logo`} style={style} />;
}
