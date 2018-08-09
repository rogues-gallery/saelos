import React from "react";
import { Money } from "react-format";

const MoneyFormat = ({ children }) => {
  return <Money currency={window.SAELOS_CONFIG.CURRENCY}>{children}</Money>;
};

export default MoneyFormat;
