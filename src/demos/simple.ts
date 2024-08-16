export default {
  name: 'Simple',
  schema: {
    description: '简单示例',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        type: 'string',
        default: 'Jason'
      },
      lastName: {
        type: 'string'
      },
      telephone: {
        type: 'string',
        minLength: 10
      },
      // staticArray: {
      //   type: 'array',
      //   items: [
      //     {
      //       type: 'string'
      //     },
      //     {
      //       type: 'number'
      //     }
      //   ]
      // },
      // sigleTypeArray: {
      //   type: 'array',
      //   items: {
      //     type: 'string'
      //   }
      // },
      sigleTypeArray2: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['123', '456', '789']
        }
      }
    }
  },
  uiSchema: {
    title: 'ui schema',
    properties: {
      firstName: {
        title: 'First Name'
      },
      lastName: {
        title: 'Last Name'
      },
      telephone: {
        title: 'Telephone'
      }
    }
  },
  default: {
    firstName: 'Jason',
    lastName: 'Huang',
    age: 18,
    bio: 'I am king',
    password: 'none'
    // staticArray: ['3', 2],
    // sigleTypeArray: ['aaa', 'bbb']
  }
}
