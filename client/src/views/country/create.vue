<template>
  <div>
    <PageHeader />
    <el-row>
      <el-col :span="16" :md="16" :sm="24">
        <el-form
          ref="countryForm"
          :model="countryForm"
          :rules="rules"
          class="mt-4 ml-12 handbook-form"
          label-position="top"
        >
          <el-form-item label="Code" prop="code">
            <el-input
              v-model.trim="countryForm.code"
              size="small"
              type="text"
            />
          </el-form-item>
          <el-form-item label="ISOCode" prop="ISOCode">
            <el-input
              v-model.trim="countryForm.ISOCode"
              size="small"
              type="text"
            />
          </el-form-item>
          <el-form-item label="Язык по умолчанию" prop="isDefault">
            <el-radio-group v-model="countryForm.isDefault">
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
                    v-model="countryForm.uz.fullName"
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
                    v-model="countryForm.uz.shortName"
                    size="small"
                    type="text"
                  />
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="Русский" name="ru"
                ><el-form-item label="Name" prop="ru.fullName">
                  <el-input
                    v-model="countryForm.ru.fullName"
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
                    v-model="countryForm.ru.shortName"
                    size="small"
                    type="text"
                  /> </el-form-item
              ></el-tab-pane>
              <el-tab-pane label="English" name="en"
                ><el-form-item label="Name" prop="en.fullName">
                  <el-input
                    v-model="countryForm.en.fullName"
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
                    v-model="countryForm.en.shortName"
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
              @click="submitForm('countryForm')"
              >Сохранить</el-button
            >
            <el-button size="small" @click="resetForm('countryForm')"
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
import { ICreateCountryForm } from '@/store/modules/country/country.types'
import { CountryModule } from '@/store/modules/country'
import { ElMessage } from 'element-plus'
import { ITranslationForm } from '@/utils/types'
export default defineComponent({
  name: 'CreateCountry',
  components: { PageHeader },
  data() {
    return {
      activeTab: 'uz',
      countryForm: {
        code: '',
        ISOCode: '',
        isDefault: 'uz',
        uz: {
          title: 'uz',
          shortName: '',
          fullName: '',
        },
        ru: {
          title: 'ru',
          shortName: '',
          fullName: '',
        },
        en: {
          title: 'en',
          shortName: '',
          fullName: '',
        },
      } as Record<string, any>,
      rules: {
        ...generateFormRules([
          'code',
          'ISOCode',
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
  methods: {
    submitForm(formName: string) {
      ;(this.$refs[formName] as any).validate(async (valid: boolean) => {
        if (valid) {
          const { code, ISOCode, isDefault, ru, uz, en } = this.countryForm
          this.countryForm[isDefault].isDefault = true
          const translations = [ru, uz, en] as ITranslationForm[]

          const formData: ICreateCountryForm = {
            code,
            ISOCode,
            translations,
          }
          await CountryModule.createCountry(formData)
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
})
</script>
