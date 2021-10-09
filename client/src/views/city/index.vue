<template>
  <div>
    <table-header
      :currentLang="currentLang"
      @add-click="handleAddClick"
      @language-click="handleLanguageClick"
    />
    <handbook-table
      :tableColumn="tableColumn"
      :tableData="cities"
      :loading="loading"
      @handle-delete="handleDelete"
      @handle-edit="handleEdit"
    />
    <el-pagination
      background
      layout="prev, pager, next"
      hide-on-single-page
      :page-size="limit"
      :pager-count="11"
      :total="total"
      :current-page="currentPage"
      @current-change="onPaginationChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from '@/components/PageHeader/index.vue'
import TableHeader from '@/components/TableHeader/index.vue'
import HandbookTable from '@/components/HandbookTable/index.vue'
import { IHandbookColumn } from '@/utils/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CityModule } from '@/store/modules/city'
export default defineComponent({
  name: 'City',
  components: { PageHeader, TableHeader, HandbookTable },
  data() {
    return {
      currentLang: 'ru' as any,
      currentPage: 1 as any,
      limit: 30,
      tableColumn: [
        {
          prop: 'fullName',
          label: 'Name',
          width: '280',
        },
        {
          prop: 'shortName',
          label: 'ShortName',
          width: '220',
        },
        {
          prop: 'code',
          label: 'Code',
        },
        {
          prop: 'regionCode',
          label: 'Region Code',
        },
      ] as Array<IHandbookColumn>,
    }
  },
  mounted() {
    this.updateQuery()
    CityModule.getAllCities(this.query)
  },
  methods: {
    handleAddClick() {
      this.$router.push('/city/create')
    },
    handleLanguageClick(payload: string) {
      this.currentLang = payload
      this.setQuery({ lang: payload })
      CityModule.getAllCities(this.query)
    },
    handleDelete(id: number) {
      ElMessageBox.confirm('Вы хотите удалить этот данные?', 'Предупреждение', {
        confirmButtonText: 'Подтвердить',
        cancelButtonText: 'Отменить',
        type: 'warning',
      })
        .then(async () => {
          await CityModule.deleteCity(id)
          CityModule.getAllCities(this.query)
          ElMessage({
            type: 'success',
            message: 'Удалить завершено',
          })
        })
        .catch(() => {})
    },
    handleEdit(id: number) {
      this.$router.push(`/city/edit/${id}`)
    },
    async onPaginationChange(value: number) {
      this.currentPage = value
      this.setQuery({ page: value.toString() })
      CityModule.getAllCities(this.query)
    },
    setQuery(payload: Record<string, string>) {
      this.$router.replace({ query: { ...this.$route.query, ...payload } })
    },

    updateQuery() {
      const { page, lang } = this.$route.query
      if (page) this.currentPage = +page
      if (page) this.currentLang = lang
    },
  },
  computed: {
    cities() {
      return CityModule.cities
    },
    total() {
      return CityModule.total
    },
    query(): string {
      return `?lang=${this.currentLang}&page=${this.currentPage}&limit=${this.limit}`
    },
    loading(): boolean {
      return CityModule.loading
    },
  },
})
</script>
