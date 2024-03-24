import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

import JsonSchemaForm from '../../lib'
import NumberField from '../../lib/fields/NumberField.vue'
import StringField from '../../lib/fields/StringField.vue'
import ArrayFields from '../../lib/fields/ArrayFields'
import SelectionWidget from '../../lib/widgets/Selection'

describe('ArrayField', () => {
  it('应该渲染多类型', async () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: [{ type: 'string' }, { type: 'number' }]
        },
        value: [],
        onChange: (v: any) => {}
      }
    })

    const arr = wrapper.findComponent(ArrayFields)
    const str = arr.findComponent(StringField)
    const num = arr.findComponent(NumberField)

    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })

  it('应该渲染单类型', async () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        value: ['1', '2'],
        onChange: () => {}
      }
    })

    const arr = wrapper.findComponent(ArrayFields)
    const strs = arr.findAllComponents(StringField)

    expect(strs.length).toBe(2)
    expect(strs[0].props('value')).toBe('1')
  })
  it('应该渲染枚举类型的select', async () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['123', '456', '789']
          }
        },
        value: [],
        onChange: () => {}
      }
    })

    const arr = wrapper.findComponent(ArrayFields)
    const select = arr.findComponent(SelectionWidget)

    expect(select.exists()).toBeTruthy()
  })
})
