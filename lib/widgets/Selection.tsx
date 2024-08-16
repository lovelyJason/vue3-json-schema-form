import { defineComponent, ref, watch, type PropType } from 'vue'
import { SelectionWidgetPropsDefine, type SelectionWidgetDefine } from '../types'

const Selection: SelectionWidgetDefine = defineComponent({
  name: 'SelectionWidget',
  props: SelectionWidgetPropsDefine,
  setup(props) {
    const currentValueRef = ref(props.value)

    watch(currentValueRef, (newValue) => {
      if (newValue !== props.value) {
        props.onChange(newValue)
      }
    })

    watch(
      () => props.value,
      (v: any) => {
        if (v !== currentValueRef.value) {
          currentValueRef.value = v
        }
      }
    )

    return () => {
      const { options } = props
      return (
        <select style={{ width: '100%' }} v-model={currentValueRef.value} multiple={true}>
          {options.map((item: any) => {
            return (
              <option key={item.key} value={item.value}>
                {item.key}
              </option>
            )
          })}
        </select>
      )
    }
  }
})

export default Selection
