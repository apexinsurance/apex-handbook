<template>
  <div>
    <PageHeader />
    <el-row>
      <el-col :span="16" :md="16" :sm="24">
        <el-form
          ref="bankForm"
          :model="bankForm"
          :rules="rules"
          class="mt-4 ml-12 handbook-form"
          label-position="top"
        >
          <el-form-item label="MFO" prop="MFO">
            <el-input v-model.trim="bankForm.MFO" size="small" type="text" />
          </el-form-item>
          <el-form-item label="NCEA" prop="NCEA">
            <el-input v-model.trim="bankForm.NCEA" size="small" type="text" />
          </el-form-item>
          <el-form-item label="TIN" prop="TIN">
            <el-input v-model.trim="bankForm.TIN" size="small" type="text" />
          </el-form-item>

          <el-form-item label="Cтрана" prop="countryId">
            <el-select
              v-model="bankForm.countryId"
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
          <el-form-item label="Язык по умолчанию" prop="isDefault">
            <el-radio-group v-model="bankForm.isDefault">
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
                    v-model.trim="bankForm.uz.fullName"
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
                    v-model.trim="bankForm.uz.shortName"
                    size="small"
                    type="text"
                  />
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="Русский" name="ru"
                ><el-form-item label="Name" prop="ru.fullName">
                  <el-input
                    v-model.trim="bankForm.ru.fullName"
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
                    v-model.trim="bankForm.ru.shortName"
                    size="small"
                    type="text"
                  /> </el-form-item
              ></el-tab-pane>
              <el-tab-pane label="English" name="en"
                ><el-form-item label="Name" prop="en.fullName">
                  <el-input
                    v-model.trim="bankForm.en.fullName"
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
                    v-model.trim="bankForm.en.shortName"
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
              @click="submitForm('bankForm')"
              >Сохранить</el-button
            >
            <el-button size="small" @click="resetForm('bankForm')"
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
import { CountryModule } from '@/store/modules/country'
import { ICreateBankForm } from '@/store/modules/bank/bank.types'
import { BankModule } from '@/store/modules/bank'
export default defineComponent({
  name: 'CreateBank',
  components: { PageHeader },
  data() {
    return {
      activeTab: 'uz',
      bankForm: {
        MFO: '',
        NCEA: '',
        TIN: '',
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
          'MFO',
          'NCEA',
          'TIN',
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
          const { ru, uz, en, isDefault, ...otherData } = this.bankForm
          this.bankForm[isDefault].isDefault = true
          const translations = [ru, uz, en] as ITranslationForm[]
          const formData = {
            translations,
            ...otherData,
          } as ICreateBankForm

          await BankModule.createBank(formData)
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
