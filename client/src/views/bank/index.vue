<template>
  <div>
    <table-header
      :currentLang="currentLang"
      @add-click="handleAddClick"
      @language-click="handleLanguageClick"
    />
    <handbook-table
      :tableColumn="tableColumn"
      :tableData="banks"
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
import { BankModule } from '@/store/modules/bank'
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
          width: '240',
        },
        {
          prop: 'shortName',
          label: 'ShortName',
          width: '200',
        },
        {
          prop: 'mfo',
          label: 'MFO',
        },
        {
          prop: 'ncea',
          label: 'NCEA',
        },
        {
          prop: 'tin',
          label: 'TIN',
        },
        {
          prop: 'countryISOCode',
          label: 'Country Code',
        },
      ] as Array<IHandbookColumn>,
    }
  },
  mounted() {
    this.updateQuery()
    BankModule.getAllBanks(this.query)
  },
  methods: {
    handleAddClick() {
      this.$router.push('/bank/create')
    },
    handleLanguageClick(payload: string) {
      this.currentLang = payload
      this.setQuery({ lang: payload })
      BankModule.getAllBanks(this.query)
    },
    handleDelete(id: number) {
      ElMessageBox.confirm('Вы хотите удалить этот данные?', 'Предупреждение', {
        confirmButtonText: 'Подтвердить',
        cancelButtonText: 'Отменить',
        type: 'warning',
      })
        .then(async () => {
          await BankModule.deleteBank(id)
          BankModule.getAllBanks(this.query)
          ElMessage({
            type: 'success',
            message: 'Удалить завершено',
          })
        })
        .catch(() => {})
    },
    handleEdit(id: number) {
      this.$router.push(`/bank/edit/${id}`)
    },
    async onPaginationChange(value: number) {
      this.currentPage = value
      this.setQuery({ page: value.toString() })
      BankModule.getAllBanks(this.query)
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
    banks() {
      console.log('BankModule.banks', BankModule.banks)
      return BankModule.banks
    },
    total() {
      return BankModule.total
    },
    query(): string {
      return `?lang=${this.currentLang}&page=${this.currentPage}&limit=${this.limit}`
    },
    loading(): boolean {
      return BankModule.loading
    },
  },
})
</script>
