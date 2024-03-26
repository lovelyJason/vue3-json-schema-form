import { defineComponent, type PropType, type ComputedRef, provide, computed, inject } from 'vue'
import type { Theme } from './types'

const THEME_PROVIDER_KEY = Symbol()

const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }
  },
  setup(props, ctx) {
    const context = computed(() => props.theme)
    provide(THEME_PROVIDER_KEY, context)
    return () => ctx.slots.default && ctx.slots.default()
  }
})

export function getWidget(name: string) {
  const context: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)
  if (!context) {
    // 防止用户没 传入
    throw Error('请传入theme')
  }
  // context.value.widgets 不可变
  const widgetRef = computed(() => {
    const widgets = context.value.widgets as any // TODO:name为字符串，在theme.widgets中找不到这个类型
    return widgets[name]
  })

  return widgetRef
}

export default ThemeProvider
