import React from "react";
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

const Spinner = () => {
  return <MoonLoader size={50} color="#ebe1c1" loading={true} css={override} />;
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default Spinner;
