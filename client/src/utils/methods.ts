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
