import { parse } from 'search-query-parser'
import _ from 'lodash'

export const parseSearchString = (string, fields) => {
  const searchable = _.filter(fields, f => f.searchable)
  const options = {
    keywords: _.map(searchable, 'alias'),
  }

  return parse(string, options)
}