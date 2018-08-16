import React from "react";
import { Money } from "react-format";

const MoneyFormat = ({ children }) => {
  return <Money currency={window.SAELOS_CONFIG.currency}>{children}</Money>;
};

export default MoneyFormat;
