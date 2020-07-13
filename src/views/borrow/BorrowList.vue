<template>
  <div>
    <el-breadcrumb class="breadcrumb-row" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>图书借阅记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="borrowList" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="book_id" label="图书ID"></el-table-column>
        <el-table-column prop="bookName" label="图书名称"></el-table-column>
        <el-table-column prop="bookPress" label="图书出版社"></el-table-column>
        <el-table-column prop="bookAuthor" label="图书作者"></el-table-column>
        <el-table-column prop="userName" label="借阅人"></el-table-column>
        <el-table-column prop="user_id" label="借阅者ID"></el-table-column>
        <el-table-column prop="borrow_date" label="借出时间" sortable width="200px"></el-table-column>
        <el-table-column prop="back_date" label="归还时间" sortable width="200px"></el-table-column>
        <el-table-column
          label="已经归还"
          :filters="[{ text: '已归还', value: '1' }, { text: '未归还', value: '0' }]"
          :filter-method="filterMethod"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.back_date?'primary' : 'success'"
              disable-transitions
            >{{scope.row.back_date?'已归还' : '未归还'}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getBorrowAll } from "@/request";
export default {
  data() {
    return {
      borrowList: []
    };
  },
  created() {
    this.getBorrowList();
  },
  methods: {
    async getBorrowList() {
      const data = await getBorrowAll();
      if (data.code != 200) return this.$message.error(data.msg);
      this.borrowList = data.data;
    },
    filterMethod(value, row) {
      if (value == 1) {
        return row.back_date;
      } else {
        return !row.back_date;
      }
    }
  }
};
</script>

<style>
</style>
