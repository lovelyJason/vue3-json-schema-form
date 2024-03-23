// import { Format, MacroKeywordDefinition } from 'ajv'
import type { PropType, DefineComponent } from 'vue'
import type { ErrorSchema } from './validator'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean'
}

type SchemaRef = { $ref: string }

export interface Schema {
  type?: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any

  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export const FieldPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: false
  },
  uiSchema: {
    type: Object as PropType<UISchema>,
    required: false
  }
} as const

export type CommonFieldType = DefineComponent<typeof FieldPropsDefine>

export const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  errors: {
    type: Object as PropType<string[]>
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  options: {
    type: Object as PropType<{ [keys: string]: any }>
  }
} as const

export const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<{ key: string; value: any }[]>,
    required: true
  }
} as const

export type CommonWidgetDefine = DefineComponent<typeof CommonWidgetPropsDefine>

export type SelectionWidgetDefine = DefineComponent<typeof SelectionWidgetPropsDefine>

export interface Theme {
  widgets: {
    SelectionWidget: SelectionWidgetDefine
    TextWidget: CommonWidgetDefine
    NumberWidget: CommonWidgetDefine
  }
}

export type UISchema = {
  widget?: string | CommonWidgetDefine
  properties?: {
    [key: string]: UISchema
  }
  items?: UISchema | UISchema[]
} & {
  [key: string]: string
}

export interface CustomFormat {
  name: string
  definition: any
  component: CommonWidgetDefine
}

export interface CustomKeyword {
  name: string
  definition: any
  transformSchema: (originSchema: Schema) => Schema
}
export interface FieldProps {
  schema: Schema
  value: any
  onChange: (v: any) => void
}
