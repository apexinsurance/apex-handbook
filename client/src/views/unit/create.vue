<template>
  <div>
    <PageHeader />
    <el-row>
      <el-col :span="16" :md="16" :sm="24">
        <el-form
          ref="unitForm"
          :model="unitForm"
          :rules="rules"
          class="mt-4 ml-12 handbook-form"
          label-position="top"
        >
          <el-form-item label="Code" prop="code">
            <el-input v-model.trim="unitForm.code" size="small" type="text" />
          </el-form-item>
          <el-form-item label="Язык по умолчанию" prop="isDefault">
            <el-radio-group v-model="unitForm.isDefault">
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
                    v-model="unitForm.uz.fullName"
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
                    v-model="unitForm.uz.shortName"
                    size="small"
                    type="text"
                  />
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="Русский" name="ru"
                ><el-form-item label="Name" prop="ru.fullName">
                  <el-input
                    v-model="unitForm.ru.fullName"
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
                    v-model="unitForm.ru.shortName"
                    size="small"
                    type="text"
                  /> </el-form-item
              ></el-tab-pane>
              <el-tab-pane label="English" name="en"
                ><el-form-item label="Name" prop="en.fullName">
                  <el-input
                    v-model="unitForm.en.fullName"
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
                    v-model="unitForm.en.shortName"
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
              @click="submitForm('unitForm')"
              >Сохранить</el-button
            >
            <el-button size="small" @click="resetForm('unitForm')"
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
import { ICreateUnitForm } from '@/store/modules/unit/unit.types'
import { UnitModule } from '@/store/modules/unit'
export default defineComponent({
  name: 'CreateRegion',
  components: { PageHeader },
  data() {
    return {
      activeTab: 'uz',
      unitForm: {
        code: '',
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
          const { code, isDefault, ru, uz, en } = this.unitForm
          this.unitForm[isDefault].isDefault = true
          const translations = [ru, uz, en] as ITranslationForm[]

          const formData: ICreateUnitForm = {
            code,
            translations,
          }
          await UnitModule.createUnit(formData)
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
