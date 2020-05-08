import M from 'materialize-css'
import localizeFilter from '../filter/localaze.filter'

export default {
  install(Vue) {
    Vue.prototype.$message = function (html) {
      M.toast({html})
    }

    Vue.prototype.$error = function (html) {
      M.toast({html:`[${localizeFilter('Error ')}]: ${html}`})
    }
  }
}
