import { createApp, defineComponent, h, reactive, ref, watchEffect } from 'vue'
import MonacoEditor from './components/MonacoEditor'
import { createUseStyles } from 'vue-jss'
import SchemaForm from '../lib'

import demos from './demos'

import type { Ref } from 'vue'

function toJson(data: any) {
  console.log('tojson,', data)
  return JSON.stringify(data, null, 2)
}

const schema = {
  type: 'string'
}

type Schema = any
type UIShema = any

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto'
  },
  menu: { marginBottom: 20 },
  code: { width: 700, flexShrink: 0 },
  codePanel: {
    minHeight: 400,
    marginBottom: 20
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%'
    }
  },
  content: {
    display: 'flex'
  },
  form: {
    padding: '0 20px',
    flexGrow: 1
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      backgroundColor: '#efefef'
    }
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7'
    }
  },
  editor: {
    minHeight: 400
  }
})

export default defineComponent({
  setup() {
    // 记录选中的demo
    const selectedRef: Ref<number> = ref(0)

    const demo: {
      schema: Schema | null
      data: any
      uiSchema: UIShema | null
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: ''
    })
    const schemaRef: Ref<any> = ref(schema)
    const methodRef: Ref<any> = ref()
    const classesRef = useStyles()

    watchEffect(() => {
      const index = selectedRef.value
      const d = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
    })

    const onChange = (v: any) => {
      demo.data = v
      demo.dataCode = toJson(v)
    }

    // 工厂函数 代码在编辑器中被编辑
    const onCodeChange = (filed: 'schema' | 'data' | 'uiSchema', value: string) => {
      let shema_c: any
      try {
        const json = JSON.parse(value)
        demo[filed] = json
        ;(demo as any)[`${filed}Code`] = value
      } catch (error: any) {
        console.log(error.message)
      }
      schemaRef.value = shema_c
    }

    const onSchemaChange = (v: string) => onCodeChange('schema', v)
    const onDataChange = (v: string) => onCodeChange('data', v)
    const onUISchemaChange = (v: string) => onCodeChange('uiSchema', v)

    return () => {
      const classes = classesRef.value
      // const code = toJson(schemaRef.value)
      const selected = selectedRef.value

      return (
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>hello JSON Schema Form by Jasonhuang</h1>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{ [classes.menuButton]: true, [classes.menuSelected]: index === selected }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                class={classes.codePanel}
                code={demo.schemaCode}
                onChange={onSchemaChange}
                title="schema"
              />
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  class={classes.codePanel}
                  code={demo.uiSchemaCode}
                  onChange={onUISchemaChange}
                  title="UISchema"
                />
                <MonacoEditor
                  class={classes.codePanel}
                  code={demo.dataCode}
                  onChange={onDataChange}
                  title="value"
                />
              </div>
            </div>
            <div class={classes.form}>
              <SchemaForm schema={demo.schema} onChange={onChange} value={demo.data} />
            </div>
          </div>
        </div>
      )
    }
  }
})
