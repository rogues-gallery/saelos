import React from "react";

/**
 * Get number of page from pagination
 *
 * @param pagination
 * @returns {number}
 */
export const getPageNumber = pagination => {
  let initialPage = 0;
  if (pagination.hasOwnProperty("current_page")) {
    initialPage = pagination.current_page - 1;
  }

  return initialPage;
};

/**
 * Get page count from pagination
 *
 * @param pagination
 * @returns {number}
 */
export const getPageCount = pagination => {
  let pageCount = 10;
  if (pagination.hasOwnProperty("last_page")) {
    pageCount = pagination.last_page;
  }

  return pageCount;
};
