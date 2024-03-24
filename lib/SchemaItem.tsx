import { defineComponent, computed } from 'vue'
import { SchemaTypes } from './types'
// import StringField from './fields/StringField'
import StringField from './fields/StringField.vue'
// import NumberField from './fields/NumberField'
import NumberField from './fields/NumberField.vue'
import ObjectField from './fields/ObjectField'
import ArrayFields from './fields/ArrayFields'
// 这个组件的作用是根据schema的类型不同，交给渲染schema的工作交给不同组件来做
import { FieldPropsDefine } from './types'
import { retrieveSchema } from './utils'

export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
  setup(props, ctx) {
    // 避免性能浪费
    const { schema, rootSchema, value } = props
    const retrievedSchemaRef = computed(() => {
      return retrieveSchema(schema, rootSchema, value)
    })
    return () => {
      const { schema, rootSchema, value } = props
      const retrievedSchema = retrievedSchemaRef.value

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
        case SchemaTypes.OBJECT:
          {
            Component = ObjectField
          }
          break
        case SchemaTypes.ARRAY:
          {
            Component = ArrayFields
          }
          break

        default:
          console.warn('type必传')
      }
      return <Component {...props} />
    }
  }
})
