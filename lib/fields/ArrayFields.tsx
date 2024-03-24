import { defineComponent, type PropType } from 'vue'
import { FieldPropsDefine } from '../types'
import { useVJSFContext } from '../context'
import { createUseStyles } from 'vue-jss'
import SelectionWidget from '../widgets/Selection'

import type { Schema } from '../types'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee'
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right'
  },
  action: {
    '& + &': {
      marginLeft: 10
    }
  },
  content: {
    padding: 10
  }
})

// 包裹schemaItem
const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDel: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    const onAdd = () => props.onAdd(props.index)
    const onDel = () => props.onDel(props.index)
    const onUp = () => props.onUp(props.index)
    const onDown = () => props.onDown(props.index)

    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          {/* 增删排序按钮 */}
          <div class={classes.actions}>
            <button onClick={onAdd} class={classes.action}>
              新增
            </button>
            <button onClick={onDel} class={classes.action}>
              删除
            </button>
            <button onClick={onUp} class={classes.action}>
              上移
            </button>
            <button onClick={onDown} class={classes.action}>
              下移
            </button>
          </div>
          {/* 内容，slots.default */}
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  }
})

/**
 * ① 类型相同，数组长度没有限制除非限制了minLength, maxLength
 * {
 *  items: { type: string }
 * }
 * ② 固定数组的schema节点
 * {
 *  items: [
 *    { type: string },
 *    { type: number }
 *  ]
 * }
 * ③
 * {
 *  itmes: { type: string, enum: ['1', '2'] }
 * }
 */
export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props, ctx) {
    const context = useVJSFContext()

    const onArrayItemChange = (v: any, index: number) => {
      console.log('onarrayitemchange', v)
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      arr[index] = v // 这里搞错了value循环递归了
      props.onChange(arr)
    }

    // 按钮操作集合

    const onAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      arr.splice(index + 1, 0, undefined)
      // ['a', 'b', undefined]
      props.onChange(arr)
    }
    const onDel = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      arr.splice(index, 1)
      props.onChange(arr)
    }
    const onUp = (index: number) => {
      if (index === 0) return
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, item[0])
    }
    const onDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      if (index === arr.length - 1) return

      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, item[0])
    }

    return () => {
      const { schema, rootSchema, value } = props
      console.log('render', value)

      const SchemaItem = context.SchemaItem

      const isMultiType = Array.isArray(schema.items)
      const isSlect = schema.items && (schema.items as any).enum
      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => (
          <SchemaItem
            schema={s}
            key={index}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v: any) => onArrayItemChange(v, index)}
          />
        ))
      } else if (!isSlect) {
        const arr = Array.isArray(value) ? value : []
        console.log('arr', arr)

        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper index={index} onAdd={onAdd} onDel={onDel} onUp={onUp} onDown={onDown}>
              <SchemaItem
                key={index}
                schema={schema.items as Schema}
                rootSchema={rootSchema}
                value={v}
                onChange={(v: any) => onArrayItemChange(v, index)}
              />
            </ArrayItemWrapper>
          )
        })
      } else {
        const options = (schema as any).items.enum.map((item: any) => {
          return {
            key: item,
            value: item
          }
        })
        // 直接变化整个数组
        return <SelectionWidget value={props.value} options={options} onChange={props.onChange} />
      }
    }
  }
})
