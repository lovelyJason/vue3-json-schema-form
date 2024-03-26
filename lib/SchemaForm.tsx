import { defineComponent, type PropType, provide } from 'vue'
import { SchemaTypes, type Schema, type Theme } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'

export default defineComponent({
  name: 'SchemaForm',
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
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true
    // }
  },
  setup(props, ctx) {
    const context = {
      SchemaItem
      // theme: props.theme
    }
    provide(SchemaFormContextKey, context)

    const onChange = (v: any) => {
      props.onChange(v)
    }
    return () => {
      const { schema, value } = props
      console.log(value)
      return <SchemaItem schema={schema} rootSchema={schema} value={value} onChange={onChange} />
    }
  }
})
