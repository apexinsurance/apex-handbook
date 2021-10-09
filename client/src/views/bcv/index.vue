<template>
  <div>
    <table-header
      :currentLang="currentLang"
      :languageFilter="false"
      @add-click="handleAddClick"
    />
    <handbook-table
      :tableColumn="tableColumn"
      :tableData="bcv"
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
import { BcvModule } from '@/store/modules/bcv'
import { dateFormatter } from '@/utils/methods'
export default defineComponent({
  name: 'Bcv',
  components: { TableHeader, HandbookTable },
  data() {
    return {
      currentPage: 1 as any,
      limit: 30,
      tableColumn: [
        {
          prop: 'date',
          label: 'Date',
          width: '200',
        },
        {
          prop: 'value',
          label: 'Value',
        },
      ] as Array<IHandbookColumn>,
    }
  },
  mounted() {
    this.updateQuery()
    BcvModule.getAllBcv(this.query)
  },
  methods: {
    handleAddClick() {
      this.$router.push('/bcv/create')
    },
    handleDelete(id: number) {
      ElMessageBox.confirm('Вы хотите удалить этот данные?', 'Предупреждение', {
        confirmButtonText: 'Подтвердить',
        cancelButtonText: 'Отменить',
        type: 'warning',
      })
        .then(async () => {
          await BcvModule.deleteBcv(id)
          BcvModule.getAllBcv(this.query)
          ElMessage({
            type: 'success',
            message: 'Удалить завершено',
          })
        })
        .catch(() => {})
    },
    handleEdit(id: number) {
      this.$router.push(`/bcv/edit/${id}`)
    },
    async onPaginationChange(value: number) {
      this.currentPage = value
      this.setQuery({ page: value.toString() })
      BcvModule.getAllBcv(this.query)
    },
    setQuery(payload: Record<string, string>) {
      this.$router.replace({ query: { ...this.$route.query, ...payload } })
    },

    updateQuery() {
      const { page } = this.$route.query
      if (page) this.currentPage = +page
    },
  },
  computed: {
    bcv() {
      console.log('BcvModule.bcv', BcvModule.bcv)

      return BcvModule.bcv.map((item) => ({
        ...item,
        date: dateFormatter(item.date),
      }))
    },
    total() {
      return BcvModule.total
    },
    query(): string {
      return `?page=${this.currentPage}&limit=${this.limit}`
    },
    loading(): boolean {
      return BcvModule.loading
    },
  },
})
</script>
