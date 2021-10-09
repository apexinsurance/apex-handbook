<template>
  <div>
    <table-header
      :currentLang="currentLang"
      :languageFilter="false"
      @add-click="handleAddClick"
    />
    <handbook-table
      :tableColumn="tableColumn"
      :tableData="currencyRates"
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
import TableHeader from '@/components/TableHeader/index.vue'
import HandbookTable from '@/components/HandbookTable/index.vue'
import { IHandbookColumn } from '@/utils/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CurrencyRateModule } from '@/store/modules/currency-rate'
import { dateFormatter } from '@/utils/methods'
export default defineComponent({
  name: 'CurrencyRate',
  components: { TableHeader, HandbookTable },
  data() {
    return {
      currentLang: 'ru' as any,
      currentPage: 1 as any,
      limit: 30,
      tableColumn: [
        {
          prop: 'date',
          label: 'Date',
          width: '200',
        },
        {
          prop: 'count',
          label: 'Count',
          width: '220',
        },
        {
          prop: 'rate',
          label: 'Rate',
          width: '200',
        },
        {
          prop: 'currencyCode',
          label: 'Currency Code',
          width: '220',
        },
      ] as Array<IHandbookColumn>,
    }
  },
  mounted() {
    this.updateQuery()
    CurrencyRateModule.getAllCurrencies(this.query)
  },
  methods: {
    handleAddClick() {
      this.$router.push('/currency-rate/create')
    },
    handleDelete(id: number) {
      ElMessageBox.confirm('Вы хотите удалить этот данные?', 'Предупреждение', {
        confirmButtonText: 'Подтвердить',
        cancelButtonText: 'Отменить',
        type: 'warning',
      })
        .then(async () => {
          await CurrencyRateModule.deleteCurrencyRate(id)
          CurrencyRateModule.getAllCurrencies(this.query)
          ElMessage({
            type: 'success',
            message: 'Удалить завершено',
          })
        })
        .catch(() => {})
    },
    handleEdit(id: number) {
      this.$router.push(`/currency-rate/edit/${id}`)
    },
    async onPaginationChange(value: number) {
      this.currentPage = value
      this.setQuery({ page: value.toString() })
      CurrencyRateModule.getAllCurrencies(this.query)
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
    currencyRates() {
      return CurrencyRateModule.currencyRates.map((item) => ({
        ...item,
        date: dateFormatter(item.date),
      }))
    },
    total() {
      return CurrencyRateModule.total
    },
    query(): string {
      return `?lang=${this.currentLang}&page=${this.currentPage}&limit=${this.limit}`
    },
    loading(): boolean {
      return CurrencyRateModule.loading
    },
  },
})
</script>
