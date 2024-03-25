import { defineComponent, inject, type DefineComponent, type ExtractPropTypes } from 'vue'
import { FieldPropsDefine } from '../types'
// import SchemaItem from '../SchemaItem' // 循环引用
// console.log(SchemaItem)
import { SchemaFormContextKey } from '../context'
import type { extractRuntimeProps } from 'vue/compiler-sfc'
import { isObject } from '../utils'

type SchemaItemDefine = DefineComponent<typeof FieldPropsDefine>

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props, ctx) {
    // TODO:改为useVJSF
    const context: { SchemaItem: SchemaItemDefine } | undefined = inject(SchemaFormContextKey)
    if (!context) {
      throw Error('必须包裹在schemaForm中')
    }

    const onChange = (k: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[k]
      } else {
        value[k] = v
      }
      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      const properties = schema.properties || {}
      const value_pack: any = isObject(value) ? value : {}
      return Object.keys(properties).map((k: string, i: number) => (
        <SchemaItem
          schema={properties[k]}
          rootSchema={rootSchema}
          value={value_pack[k]}
          key={i}
          onChange={(v: any) => onChange(k, v)}
        />
      ))
    }
  }
})
