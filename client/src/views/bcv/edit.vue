<template>
  <div>
    <PageHeader />
    <el-row>
      <el-col :span="16" :md="16" :sm="24">
        <el-form
          ref="bcvForm"
          :model="bcvForm"
          :rules="rules"
          class="mt-4 ml-12 handbook-form"
          label-position="top"
        >
          <el-form-item label="Date" prop="date">
            <el-date-picker
              v-model="bcvForm.date"
              type="date"
              placeholder="Выбрать дату"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="Value" prop="value">
            <el-input
              v-model.number="bcvForm.value"
              size="small"
              type="number"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              size="small"
              @click="submitForm('bcvForm')"
              >Сохранить</el-button
            >
            <el-button size="small" @click="resetForm('bcvForm')"
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
import { BcvModule } from '@/store/modules/bcv'
import { IUpdateBCVForm } from '@/store/modules/bcv/bcv.types'
export default defineComponent({
  name: 'EditBCV',
  components: { PageHeader },
  data() {
    return {
      bcvForm: {
        id: -1,
        value: null as any,
        date: new Date() as any,
      },
      rules: {
        ...generateFormRules(['value', 'date']),
      },
    }
  },
  async mounted() {
    try {
      await BcvModule.findBcvById(+this.$route.params.id)
      if (BcvModule.currentBCV) {
        const { id, date, value } = BcvModule.currentBCV
        this.bcvForm.id = id
        this.bcvForm.value = value
        this.bcvForm.date = date
      }
    } catch (error) {}
  },
  methods: {
    submitForm(formName: string) {
      ;(this.$refs[formName] as any).validate(async (valid: boolean) => {
        if (valid) {
          const { id, date, value } = this.bcvForm

          const formData: IUpdateBCVForm = {
            id,
            date,
            value,
          }

          await BcvModule.updateBcv(formData)
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
})
</script>
