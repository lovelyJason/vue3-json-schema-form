import { inject, type Ref } from 'vue'
import type { CommonFieldType, CommonWidgetDefine, Schema, Theme } from './types'

export const SchemaFormContextKey = Symbol()

export function useVJSFContext() {
  const context:
    | {
        // theme: Theme
        SchemaItem: CommonFieldType
        formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
        transformSchemaRef: Ref<(schema: Schema) => Schema>
      }
    | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error('SchemaForm needed')
  }

  return context
}
