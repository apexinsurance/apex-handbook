<template>
  <div>
    <div class="px-4 py-1 border-b-1 flex justify-between items-center">
      <el-button type="primary" size="small" @click="onAddClick">
        Добавить <i class="el-icon-plus" />
      </el-button>
      <div class="flex items-center" v-if="languageFilter">
        <el-button
          v-for="key in Object.keys(languages)"
          :key="key"
          type="text"
          :disabled="currentLang === key"
          @click="onLanguageClick(key)"
          >{{ languages[key] }}</el-button
        >
      </div>
    </div>
    <el-divider class="m-0" />
  </div>
</template>

<script lang="ts">
import { existLangauges } from '@/utils/constants'
import { LanguageType } from '@/utils/types'
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      languages: {
        uz: "O'zbek",
        en: 'English',
        ru: 'Русский',
      } as Record<LanguageType, string>,
    }
  },
  props: {
    currentLang: {
      type: String,
      default: 'ru',
    },
    languageFilter: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    'add-click': null,
    'language-click'(payload: string) {
      return existLangauges.includes(payload)
    },
  },
  methods: {
    onAddClick() {
      this.$emit('add-click')
    },
    onLanguageClick(payload: string) {
      this.$emit('language-click', payload)
    },
  },
})
</script>
