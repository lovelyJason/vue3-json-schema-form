import {
  defineComponent,
  ref,
  onMounted,
  watch,
  onBeforeUnmount,
  shallowReadonly,
  shallowRef
} from 'vue'

import * as Monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { createUseStyles } from 'vue-jss'

import type { PropType, Ref } from 'vue'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5
  },
  title: {
    backgroundColor: '#eee',
    padding: '10px 0',
    paddingLeft: 20
  },
  code: {
    flexGrow: 1
  }
})

// 在初始化之前，先设置MonacoEnvironment,
// TODO:将来可以写为一个vite插件
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }

    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }

    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }

    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >,
      required: true
    },
    title: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    // console.log(self)
    // must be shallowRef, if not, editor.getValue() won't work
    const editorRef = shallowRef()

    const containerRef = ref()

    let _subscription: Monaco.IDisposable | undefined
    let __prevent_trigger_change_event = false

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(containerRef.value, {
        value: props.code,
        language: 'json',
        formatOnPaste: true,
        tabSize: 2,
        minimap: {
          enabled: false
        }
      }))

      _subscription = editor.onDidChangeModelContent((event) => {
        console.log('--------->', __prevent_trigger_change_event)
        if (!__prevent_trigger_change_event) {
          props.onChange(editor.getValue(), event)
        }
      })
    })

    onBeforeUnmount(() => {
      if (_subscription) _subscription.dispose()
    })

    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value
        const model = editor.getModel()
        if (v !== model.getValue()) {
          editor.pushUndoStop()
          __prevent_trigger_change_event = true
          // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v
              }
            ]
          )
          editor.pushUndoStop()
          __prevent_trigger_change_event = false
        }
        // if (v !== editorRef.value.getValue()) {
        //   editorRef.value.setValue(v)
        // }
      }
    )

    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value

      return (
        <div class={classes.container}>
          <div class={classes.title}>
            <span>{props.title}</span>
          </div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      )
    }
  }
})
