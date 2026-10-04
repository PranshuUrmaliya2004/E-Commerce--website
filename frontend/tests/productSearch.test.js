import { describe, expect, it } from 'vitest'
import { findProductSuggestions } from '../src/Utils/productSearch.js'

const products = [
  { name: 'Women wool coat' },
  { name: 'Wool blend jacket' },
  { name: 'Cotton shirt' },
]

describe('findProductSuggestions', () => {
  it('matches names without case sensitivity and trims the query', () => {
    expect(findProductSuggestions(products, '  WOOL ')).toEqual(products.slice(0, 2))
  })

  it('returns no suggestions for an empty query', () => {
    expect(findProductSuggestions(products, '   ')).toEqual([])
  })

  it('limits the number of suggestions', () => {
    const matchingProducts = Array.from({ length: 8 }, (_, index) => ({ name: `Jacket ${index}` }))
    expect(findProductSuggestions(matchingProducts, 'jacket')).toHaveLength(6)
  })
})