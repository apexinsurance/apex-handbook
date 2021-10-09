<template>
  <div>
    <PageHeader />
    <el-row>
      <el-col :span="16" :md="16" :sm="24">
        <el-form
          ref="regionForm"
          :model="regionForm"
          :rules="rules"
          class="mt-4 ml-12 handbook-form"
          label-position="top"
        >
          <el-form-item label="Code" prop="code">
            <el-input v-model.trim="regionForm.code" size="small" type="text" />
          </el-form-item>
          <el-form-item label="Регион" prop="regionId">
            <el-select
              v-model="regionForm.regionId"
              size="small"
              class="md:w-96"
              placeholder="Пожалуйста, выберите регион"
            >
              <el-option
                v-for="c in regions"
                :key="c.id"
                :label="c.fullName"
                :value="c.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Устаревший">
            <el-switch v-model="regionForm.outdated" />
          </el-form-item>
          <el-form-item>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="O'zbek" name="uz">
                <el-form-item label="Name" prop="uz.fullName">
                  <el-input
                    v-model.trim="regionForm.uz.fullName"
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
                    v-model.trim="regionForm.uz.shortName"
                    size="small"
                    type="text"
                  />
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="Русский" name="ru"
                ><el-form-item label="Name" prop="ru.fullName">
                  <el-input
                    v-model.trim="regionForm.ru.fullName"
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
                    v-model.trim="regionForm.ru.shortName"
                    size="small"
                    type="text"
                  /> </el-form-item
              ></el-tab-pane>
              <el-tab-pane label="English" name="en"
                ><el-form-item label="Name" prop="en.fullName">
                  <el-input
                    v-model.trim="regionForm.en.fullName"
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
                    v-model.trim="regionForm.en.shortName"
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
              @click="submitForm('regionForm')"
              >Сохранить</el-button
            >
            <el-button size="small" @click="resetForm('regionForm')"
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
import { RegionModule } from '@/store/modules/region'
import { ElMessage } from 'element-plus'
import { DistrictModule } from '@/store/modules/district'
import { IUpdateDistrictForm } from '@/store/modules/district/district.types'
export default defineComponent({
  name: 'EditDistrict',
  components: { PageHeader },
  data() {
    return {
      activeTab: 'uz',
      regionForm: {
        id: -1,
        outdated: false,
        code: '',
        regionId: null as any,
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
          'regionId',
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
      if (!RegionModule.regions.length) {
        RegionModule.getAllRegionsForSelect()
      }
      await DistrictModule.findDistrictById(+this.$route.params.id)
      if (DistrictModule.currentDistrict) {
        const { code, translations, id, regionId, finishDate } =
          DistrictModule.currentDistrict
        this.regionForm.code = code
        this.regionForm.id = id
        this.regionForm.regionId = regionId
        this.regionForm.outdated = !!finishDate
        const uz = translations.find((t) => t.language?.title === 'uz')
        const ru = translations.find((t) => t.language?.title === 'ru')
        const en = translations.find((t) => t.language?.title === 'en')
        if (uz) {
          this.regionForm.uz = {
            id: uz.id || -1,
            title: 'uz',
            shortName: uz.shortName,
            fullName: uz.fullName,
          }
        }
        if (ru) {
          this.regionForm.ru = {
            id: ru.id || -1,
            title: 'ru',
            shortName: ru.shortName,
            fullName: ru.fullName,
          }
        }
        if (en) {
          this.regionForm.en = {
            id: en.id || -1,
            title: 'en',
            shortName: en.shortName,
            fullName: en.fullName,
          }
        }
      }
    } catch (error) {}
  },
  methods: {
    submitForm(formName: string) {
      ;(this.$refs[formName] as any).validate(async (valid: boolean) => {
        if (valid) {
          const { id, code, outdated, regionId, ru, uz, en } = this.regionForm
          const translations = [ru, uz, en] as ITranslatioForm[]
          const formData: IUpdateDistrictForm = {
            id,
            code,
            translations,
            regionId,
            finishDate: outdated ? new Date() : null,
          }

          await DistrictModule.updateDistrict(formData)
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
    regions() {
      return RegionModule.regions
    },
  },
})
</script>
