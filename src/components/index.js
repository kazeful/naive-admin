import LazyTooltip from './LazyTooltip'
import SvgIcon from './SvgIcon'

const components = { SvgIcon, LazyTooltip }

export default {
  install(Vue) {
    Object.values(components).forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
