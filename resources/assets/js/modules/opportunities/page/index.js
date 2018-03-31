import React from 'react'
import List from './panels/list'
import Record from './panels/record'
import Detail from './panels/detail'

const Page = () => (
  <React.Fragment>
    <List />
    <Record />
    <Detail />
  </React.Fragment>
)

export default Page;
