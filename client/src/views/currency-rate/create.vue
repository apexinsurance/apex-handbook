<template>
  <div>
    <PageHeader />
    <el-row>
      <el-col :span="16" :md="16" :sm="24">
        <el-form
          ref="currencyRateForm"
          :model="currencyRateForm"
          :rules="rules"
          class="mt-4 ml-12 handbook-form"
          label-position="top"
        >
          <el-form-item label="Date" prop="date">
            <el-date-picker
              v-model="currencyRateForm.date"
              type="date"
              placeholder="Выбрать дату"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="Count" prop="count">
            <el-input
              v-model.number="currencyRateForm.count"
              size="small"
              type="number"
            />
          </el-form-item>
          <el-form-item label="Rate" prop="rate">
            <el-input
              v-model.number="currencyRateForm.rate"
              size="small"
              type="number"
            />
          </el-form-item>
          <el-form-item label="Валюта" prop="currencyId">
            <el-select
              v-model="currencyRateForm.currencyId"
              size="small"
              class="md:w-96"
              clearable
              filteable
              placeholder="Пожалуйста, выберите валюта"
            >
              <el-option
                v-for="c in currencies"
                :key="c.id"
                :label="c.fullName"
                :value="c.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              size="small"
              @click="submitForm('currencyRateForm')"
              >Сохранить</el-button
            >
            <el-button size="small" @click="resetForm('currencyRateForm')"
              >Сброс</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from '@/components/PageHeader/index.vue'
import { generateFormRules } from '@/utils/methods'
import { ElMessage } from 'element-plus'
import { CurrencyModule } from '@/store/modules/currency'
import { CurrencyRateModule } from '@/store/modules/currency-rate'
import { ICreateCurrencyRateForm } from '@/store/modules/currency-rate/currency-rate.types'
export default defineComponent({
  name: 'CreateCurrencyRate',
  components: { PageHeader },
  data() {
    return {
      currencyRateForm: {
        rate: 0,
        count: 0,
        date: new Date() as any,
        currencyId: null as any,
      },
      rules: {
        ...generateFormRules(['rate', 'count', 'date', 'currencyId']),
      },
    }
  },
  async mounted() {
    try {
      if (!CurrencyModule.currencies.length) {
        CurrencyModule.getAllCurrenciesForSelect()
      }
    } catch (error) {}
  },
  methods: {
    submitForm(formName: string) {
      ;(this.$refs[formName] as any).validate(async (valid: boolean) => {
        if (valid) {
          const { date, count, rate, currencyId } = this.currencyRateForm

          const formData: ICreateCurrencyRateForm = {
            date: new Date(date),
            count,
            rate,
            currencyId,
          }

          await CurrencyRateModule.createCurrencyRate(formData)
          ElMessage({
            message: 'Успешно обнавлена',
            type: 'success',
          })
        } else {
          ElMessage({
            message: 'Пожалуйста, заполните все необходимые поля',
            type: 'error',
          })
          return false
        }
      })
    },
    resetForm(formName: string) {
      ;(this.$refs[formName] as any).resetFields()
    },
  },
  computed: {
    currencies() {
      return CurrencyModule.currencies
    },
  },
})
</script>
