<template>
  <input type="text" :value="props.value" @input="onChange" />
</template>

<script setup lang="ts">
import { FieldProps } from '../types'

// 注意此处props不能解构，否则丧失响应式
const props = withDefaults(defineProps<FieldProps>(), {})

const onChange = (e: any) => {
  console.log(e.target.value)
  props.onChange(e.target.value)
}
</script>
