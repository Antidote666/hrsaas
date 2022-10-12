const fn = require.context('../components', true, /\.vue$/)
const components = fn.keys().map(fn)
export default (Vue) => {
  components.forEach((component, index) => {
    Vue.component(fn.keys()[index].split('/')[1], component.default)
  })
}

