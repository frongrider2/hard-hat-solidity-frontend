import { colors } from "colors/colors";
import styled from "styled-components/macro";

export const SwapWrapper = styled.div`
  width: 80rem;
  padding: 2rem;
  background-color: ${colors.PINK1};
  margin: 0 auto;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 2rem;
`;
