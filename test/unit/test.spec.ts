import { describe, it, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

import JsonSchemaForm from '../../lib'
import NumberField from '../../lib/fields/NumberField.vue'

describe('JsonSchemaForm', () => {
  it('正确渲染input number', async () => {
    let value = ''
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'number'
        },
        value,
        onChange: (v: any) => {
          value = v
        }
      }
    })

    // 测试关心叶子节点
    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy()
    // 忽略底层的具体实现
    // await numberField.props('onChange')('123')
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe('123')
  })
})
