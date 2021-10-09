import moment from 'moment'
moment.locale('ru')
export const generateFormRules = (array: string[]) => {
  const rules = {} as Record<string, unknown>
  array.forEach((item) => {
    rules[item] = [
      {
        required: true,
        message: 'Пожалуйста, введите имя активности',
        trigger: 'blur',
      },
    ]
  })
  return rules
}

export const dateFormatter = (date: Date) => {
  return moment(date).format('LL')
}
