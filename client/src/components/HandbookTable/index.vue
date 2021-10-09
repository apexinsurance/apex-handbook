<template>
  <div class="p-2">
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      size="mini"
    >
      <el-table-column
        v-for="(c, idx) in tableColumn"
        :key="idx"
        :prop="c.prop"
        header-align="center"
        align="center"
        :label="c.label"
        show-overflow-tooltip
      />
      <el-table-column
        label="Operations"
        fixed="right"
        header-align="center"
        align="center"
        width="160"
      >
        <template #default="{ row: { id } }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="handleEdit(id)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="handleDelete(id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IHandbookColumn } from '@/utils/types'
export default defineComponent({
  name: 'HandbookTable',
  emits: ['handle-edit', 'handle-delete'],
  props: {
    tableColumn: {
      type: Array as () => IHandbookColumn[],
    },
    tableData: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleDelete(id: number) {
      this.$emit('handle-delete', id)
    },
    handleEdit(id: number) {
      this.$emit('handle-edit', id)
    },
  },
})
</script>
