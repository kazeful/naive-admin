export function hasHorizontalScrollbar(element) {
  return element.scrollWidth > element.clientWidth
}

export function hasEllipsis(element) {
  const temp = element.cloneNode(true)
  temp.style.overflow = 'auto'
  const parentNode = element.parentNode
  if (!parentNode)
    return false
  // It must be loaded to the parent element, not document.body
  parentNode.appendChild(temp)
  const hasEllipsis = hasHorizontalScrollbar(temp)
  parentNode.removeChild(temp)
  return hasEllipsis
}
