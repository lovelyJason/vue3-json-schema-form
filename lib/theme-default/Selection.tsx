import { defineComponent, ref, watch, type PropType } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    },
    options: {
      type: Array as PropType<
        {
          key: string
          value: any
        }[]
      >,
      required: true
    }
  },
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
