<template>
  <input type="number" :value="props.value" @input="onChange" />
</template>

<script setup lang="ts">
import { FieldProps } from '../types'

// 注意此处props不能解构，否则丧失响应式
const props = withDefaults(defineProps<FieldProps>(), {})

const onChange = (e: any) => {
  const value = e.target.value
  const num = Number.parseFloat(value)
  if (Number.isNaN(num)) {
    props.onChange(undefined)
  } else {
    props.onChange(e.target.value)
  }
}
</script>
