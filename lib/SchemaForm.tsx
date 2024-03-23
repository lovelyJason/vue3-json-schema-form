import { defineComponent, type PropType } from 'vue'
import { SchemaTypes, type Schema } from './types'
import SchemaItem from './SchemaItem'

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
  },
  setup(props, ctx) {
    const onChange = (v: any) => {
      props.onChange(v)
    }
    return () => {
      const { schema, value } = props
      return <SchemaItem schema={schema} value={value} onChange={onChange} />
    }
  }
})
