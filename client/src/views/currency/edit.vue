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
              clearable
              filteable
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
          <el-form-item label="Устаревший">
            <el-switch v-model="currencyForm.outdated" />
          </el-form-item>
          <el-form-item label="Язык по умолчанию" prop="isDefault">
            <el-radio-group v-model="currencyForm.isDefault">
              <el-radio label="uz">O'zbek</el-radio>
              <el-radio label="ru">Русский</el-radio>
              <el-radio label="en">English</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="O'zbek" name="uz">
                <el-form-item label="Name" prop="uz.fullName">
                  <el-input
                    v-model="currencyForm.uz.fullName"
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
                    v-model="currencyForm.uz.shortName"
                    size="small"
                    type="text"
                  />
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="Русский" name="ru"
                ><el-form-item label="Name" prop="ru.fullName">
                  <el-input
                    v-model="currencyForm.ru.fullName"
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
                    v-model="currencyForm.ru.shortName"
                    size="small"
                    type="text"
                  /> </el-form-item
              ></el-tab-pane>
              <el-tab-pane label="English" name="en"
                ><el-form-item label="Name" prop="en.fullName">
                  <el-input
                    v-model="currencyForm.en.fullName"
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
                    v-model="currencyForm.en.shortName"
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
import { ITranslationForm } from '@/utils/types'
import { ElMessage } from 'element-plus'
import { IUpdateCurrencyForm } from '@/store/modules/currency/currency.types'
import { CountryModule } from '@/store/modules/country'
import { CurrencyModule } from '@/store/modules/currency'
export default defineComponent({
  name: 'EditCurrency',
  components: { PageHeader },
  data() {
    return {
      activeTab: 'uz',
      currencyForm: {
        id: -1,
        outdated: false,
        code: '',
        ISOCode: '',
        countryId: null as any,
        isDefault: 'uz',
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
      } as Record<string, any>,
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
      await CurrencyModule.findCurrencyById(+this.$route.params.id)
      if (CurrencyModule.currentCurrency) {
        const { code, ISOCode, translations, id, countryId, finishDate } =
          CurrencyModule.currentCurrency
        this.currencyForm.code = code
        this.currencyForm.ISOCode = ISOCode
        this.currencyForm.id = id
        this.currencyForm.countryId = countryId
        this.currencyForm.outdated = !!finishDate
        const uz = translations.find((t) => t.language?.title === 'uz')
        const ru = translations.find((t) => t.language?.title === 'ru')
        const en = translations.find((t) => t.language?.title === 'en')
        if (uz) {
          this.currencyForm.uz = {
            id: uz.id || -1,
            title: 'uz',
            shortName: uz.shortName,
            fullName: uz.fullName,
          }
          if (uz.isDefault) this.currencyForm.isDefault = 'uz'
        }
        if (ru) {
          this.currencyForm.ru = {
            id: ru.id || -1,
            title: 'ru',
            shortName: ru.shortName,
            fullName: ru.fullName,
          }
          if (ru.isDefault) this.currencyForm.isDefault = 'ru'
        }
        if (en) {
          this.currencyForm.en = {
            id: en.id || -1,
            title: 'en',
            shortName: en.shortName,
            fullName: en.fullName,
          }
          if (en.isDefault) this.currencyForm.isDefault = 'en'
        }
      }
    } catch (error) {}
  },
  methods: {
    submitForm(formName: string) {
      ;(this.$refs[formName] as any).validate(async (valid: boolean) => {
        if (valid) {
          const {
            id,
            code,
            ISOCode,
            outdated,
            isDefault,
            countryId,
            ru,
            uz,
            en,
          } = this.currencyForm
          this.currencyForm[isDefault].isDefault = true
          const translations = [ru, uz, en] as ITranslationForm[]
          const formData: IUpdateCurrencyForm = {
            id,
            code,
            ISOCode,
            translations,
            countryId,
            finishDate: outdated ? new Date() : null,
          }

          await CurrencyModule.updateCurrency(formData)
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
    countries() {
      return CountryModule.countries
    },
  },
})
</script>
