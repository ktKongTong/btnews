const categoryMap = {
  "btnews": "睡前消息",
  "refnews":"参考信息",
  "commercial":"讲点黑话",
  "opinion":"高见"
}
const namespaceMap = {
  "btnews": "睡前消息",
  "other": "其他"
}
export function getCategoryName(category:string) {
  return categoryMap[category as keyof typeof categoryMap] ?? category
}

export function getNSName(ns:string) {
  return namespaceMap[ns as keyof typeof namespaceMap] ?? ns
}
