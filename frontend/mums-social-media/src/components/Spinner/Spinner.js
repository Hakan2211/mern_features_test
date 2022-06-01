import React from "react";
import { css } from "@emotion/react";
import RiseLoader from "react-spinners/CircleLoader";

const Spinner = () => {
  return <RiseLoader color="red" loading={true} css={override} />;
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default Spinner;
