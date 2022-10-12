import components from './components'
import directives from './directives'
import filters from './filters'
export default (Vue) => {
  components(Vue)
  directives(Vue)
  filters(Vue)
}
