import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { SchemaTypes } from './types'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'
// 这个组件的作用是根据schema的类型不同，交给渲染schema的工作交给不同组件来做

export default defineComponent({
  name: 'SchemaItem',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props, ctx) {
    return () => {
      const { schema } = props
      const type = schema.type
      let Component: any
      // TODO:如果用户没传入type，需要做出一个猜测

      switch (type) {
        case SchemaTypes.STRING:
          {
            Component = StringField
          }
          break
        case SchemaTypes.NUMBER:
          {
            Component = NumberField
          }
          break

        default:
          console.warn('type必传')
      }

      return <Component />
    }
  }
})
