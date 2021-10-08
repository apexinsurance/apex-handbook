<template>
  <div>
    <PageHeader />
    <el-row>
      <el-col :span="16" :md="16" :sm="24">
        <el-form
          ref="currencyForm"
          :model="currencyForm"
          :rules="rules"
          class="mt-4 ml-12 handbook-form"
          label-position="top"
        >
          <el-form-item label="Code" prop="code">
            <el-input
              v-model.trim="currencyForm.code"
              size="small"
              type="text"
            />
          </el-form-item>
          <el-form-item label="ISOCode" prop="ISOCode">
            <el-input
              v-model.trim="currencyForm.ISOCode"
              size="small"
              type="text"
            />
          </el-form-item>
          <el-form-item label="Cтрана" prop="countryId">
            <el-select
              v-model="currencyForm.countryId"
              size="small"
              class="md:w-96"
              placeholder="Пожалуйста, выберите страна"
            >
              <el-option
                v-for="c in countries"
                :key="c.id"
                :label="c.fullName"
                :value="c.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="O'zbek" name="uz">
                <el-form-item label="Name" prop="uz.fullName">
                  <el-input
                    v-model.trim="currencyForm.uz.fullName"
                    size="small"
                    type="text"
                  />
                </el-form-item>
                <el-form-item
                  label="ShortName"
                  prop="uz.shortName"
                  label-position="top"
                >
                  <el-input
                    v-model.trim="currencyForm.uz.shortName"
                    size="small"
                    type="text"
                  />
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="Русский" name="ru"
                ><el-form-item label="Name" prop="ru.fullName">
                  <el-input
                    v-model.trim="currencyForm.ru.fullName"
                    size="small"
                    type="text"
                  />
                </el-form-item>
                <el-form-item
                  label="ShortName"
                  prop="ru.shortName"
                  label-position="top"
                >
                  <el-input
                    v-model.trim="currencyForm.ru.shortName"
                    size="small"
                    type="text"
                  /> </el-form-item
              ></el-tab-pane>
              <el-tab-pane label="English" name="en"
                ><el-form-item label="Name" prop="en.fullName">
                  <el-input
                    v-model.trim="currencyForm.en.fullName"
                    size="small"
                    type="text"
                  />
                </el-form-item>
                <el-form-item
                  label="ShortName"
                  prop="en.shortName"
                  label-position="top"
                >
                  <el-input
                    v-model.trim="currencyForm.en.shortName"
                    size="small"
                    type="text"
                  /> </el-form-item
              ></el-tab-pane>
            </el-tabs>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              size="small"
              @click="submitForm('currencyForm')"
              >Сохранить</el-button
            >
            <el-button size="small" @click="resetForm('currencyForm')"
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
import { ITranslatioForm } from '@/utils/types'
import { ElMessage } from 'element-plus'
import { CountryModule } from '@/store/modules/country'
import { CurrencyModule } from '@/store/modules/currency'
import { ICreateCurrencyForm } from '@/store/modules/currency/currency.types'
export default defineComponent({
  name: 'CreateRegion',
  components: { PageHeader },
  data() {
    return {
      activeTab: 'uz',
      currencyForm: {
        code: '',
        ISOCode: '',
        countryId: null as any,
        uz: {
          id: -1,
          title: 'uz',
          shortName: '',
          fullName: '',
        },
        ru: {
          id: -1,
          title: 'ru',
          shortName: '',
          fullName: '',
        },
        en: {
          id: -1,
          title: 'en',
          shortName: '',
          fullName: '',
        },
      },
      rules: {
        ...generateFormRules([
          'code',
          'ISOCode',
          'countryId',
          'ru.fullName',
          'ru.shortName',
          'en.fullName',
          'en.shortName',
          'uz.fullName',
          'uz.shortName',
        ]),
      },
    }
  },
  async mounted() {
    try {
      if (!CountryModule.countries.length) {
        CountryModule.getAllCountriesForSelect()
      }
    } catch (error) {}
  },
  methods: {
    submitForm(formName: string) {
      ;(this.$refs[formName] as any).validate(async (valid: boolean) => {
        if (valid) {
          const { code, ISOCode, countryId, ru, uz, en } = this.currencyForm
          const translations = [ru, uz, en] as ITranslatioForm[]
          const formData: ICreateCurrencyForm = {
            code,
            ISOCode,
            translations,
            countryId,
          }

          await CurrencyModule.createCurrency(formData)
          this.resetForm(formName)
          ElMessage({
            message: 'Успешно создана',
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
    countries() {
      return CountryModule.countries
    },
  },
})
</script>
