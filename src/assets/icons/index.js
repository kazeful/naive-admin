const req = require.context('./svg', false, /\.svg$/)
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
