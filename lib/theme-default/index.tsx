import { defineComponent } from 'vue'
import SelectionWidget from './Selection'

import { CommonWidgetPropsDefine, type CommonWidgetDefine } from '../types'

const CommonWidget: CommonWidgetDefine = defineComponent({
  props: CommonWidgetPropsDefine,
  setup(props, ctx) {
    return () => null
  }
})

export default defineComponent({
  widgets: {
    SelectionWidget,
    TextWidget: CommonWidget,
    NumberWidget: CommonWidget
  }
})
