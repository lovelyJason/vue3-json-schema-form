export default {
  name: 'Simple',
  schema: {
    description: '简单示例',
    type: 'string',
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
  }
}
