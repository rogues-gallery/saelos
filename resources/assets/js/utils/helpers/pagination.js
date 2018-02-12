import React from 'react';

export const getInitialPage = (pagination) => {
    let initialPage = 0;
    if (pagination.hasOwnProperty('current_page')) {
        initialPage = (pagination.current_page - 1);
    }

    return initialPage;
};

export const getPageCount = (pagination) => {
    let pageCount = 10;
    if (pagination.hasOwnProperty('last_page')) {
        pageCount = pagination.last_page;
    }

    return pageCount;
};