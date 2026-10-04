export const findProductSuggestions = (products, query, limit = 6) => {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return []

  return products
    .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
    .slice(0, limit)
}