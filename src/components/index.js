import SvgIcon from './SvgIcon'
import LazyTooltip from './LazyTooltip'

const components = { SvgIcon, LazyTooltip }

export default {
  install(Vue) {
    Object.values(components).forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
