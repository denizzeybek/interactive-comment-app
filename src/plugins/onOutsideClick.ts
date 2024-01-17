import type { App, Directive, DirectiveBinding } from 'vue'

const handleClick = (e: Event, binding: DirectiveBinding) => {
  if (binding.value && !binding.instance?.$el.contains(e.target as Node)) {
    binding.value(e)
  }
}

const clickDirective: Directive = {
  mounted(_: HTMLElement, binding: DirectiveBinding) {
    document.addEventListener('click', (e) => handleClick(e, binding))
  },
  unmounted(_: HTMLElement, binding: DirectiveBinding) {
    document.removeEventListener('click', (e) => handleClick(e, binding))
  }
}

export default {
  install(app: App) {
    app.directive('onOutsideClick', clickDirective)
  }
}
