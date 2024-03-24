import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

import JsonSchemaForm from '../../lib'
import NumberField from '../../lib/fields/NumberField.vue'
import StringField from '../../lib/fields/StringField.vue'

describe('ObjectField', () => {
  let schema: any
  beforeEach(() => {
    // 以便重新初始化
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
    }
  })
  it('根据properties正确渲染不同的fields', async () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: {},
        onChange: () => {}
      }
    })
    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)

    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })
  it('子节点变化时会触发onChange', async () => {
    let value: any = {}
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)
    await strField.props('onChange')('1')
    expect(value.name).toEqual('1')
    await numField.props('onChange')(1)
    expect(value.age).toEqual(1)
  })
})
