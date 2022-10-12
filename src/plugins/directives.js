const imgerror = {
  inserted(el, binding, vnode) {
    el.onerror = function() {
      el.src = binding.value
    }
  }
}

const imglazy = {
  bind(el, binding, vnode) {
    console.log(el, binding, vnode)
  },
  inserted(el, binding, vnode) {
    console.log(el, binding, vnode)
    const observer = new IntersectionObserver((entries) => {
      // 遍历
      for (const i of entries) {
        // 如果元素处于可视区
        if (i.isIntersecting > 0) {
          // 获取该元素
          // const img = i.target
          // 重新设置src值
          el.src = binding.value
          // 取消对该元素的观察
          observer.unobserve(el)
        }
      }
    })
    // 为 img 标签添加一个观察
    observer.observe(el)
  }
}
const directives = { imgerror, imglazy }

export default (Vue) => {
  Object.keys(directives).forEach(item => {
    Vue.directive(item, directives[item])
  })
}

