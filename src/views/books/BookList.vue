<template>
  <div>
    <el-breadcrumb class="breadcrumb-row" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>图书信息查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="bookParams.bookname">
            <el-select v-model="selectType" slot="prepend" placeholder="请选择">
              <el-option label="书名" value="1"></el-option>
              <el-option label="作者" value="2"></el-option>
              <el-option label="ISBN编号" value="3"></el-option>
              <el-option label="图书id" value="4"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>

      <!-- 表格部分 -->
      <el-table :data="bookList" style="width: 100%" size="medium">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="style-table-expand" label-width="100px">
              <el-form-item label="图书ID：">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="图书名称：">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="图书出版社：">
                <span>{{ props.row.press }}</span>
              </el-form-item>
              <el-form-item label="出版时间：">
                <span>{{ props.row.press_time }}</span>
              </el-form-item>
              <el-form-item label="图书价钱：">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="图书描述：">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="图书 ISBN" prop="ISBN" sortable></el-table-column>
        <el-table-column label="图书名称" prop="name" sortable></el-table-column>
        <el-table-column label="图书作者" prop="author" sortable></el-table-column>
        <el-table-column label="图书照片">
          <template>
            <img src="../../assets/imgs/book.jpg" alt class="img-wrap" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="objscope">
            <el-tooltip content="修改书籍" placement="top-start">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="editBookClick(objscope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除书籍" placement="top-start">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="deleteBookClick(objscope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="bookParams.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="bookParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  findBook,
  findBookAuthor,
  findBookIsbn,
  findBookId,
  deleteBookId
} from "@/request";
export default {
  data() {
    return {
      selectType: "1",
      valueSearch: "",
      bookParams: {
        bookname: "", //名称
        pagenum: 1, //当前页数
        pagesize: 5
      },
      total: 0,
      bookList: []
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    searchClick() {
      this.getBookData();
    },
    async getBookData() {
      if (this.selectType == 1) {
        this.getBookList();
      } else {
        let data;
        if (this.selectType == 2) {
          data = await findBookAuthor({
            author: this.bookParams.bookname
          });
        } else if (this.selectType == 3) {
          data = await findBookIsbn({
            isbn: this.bookParams.bookname
          });
        } else if (this.selectType == 4) {
          data = await findBookId({
            id: this.bookParams.bookname
          });
        }
        if (data.code != 200) return this.$message.error(data.msg);
        this.$message.success(data.msg);
        this.total = data.data.length;
        this.bookList = data.data;
      }
    },
    async getBookList() {
      const data = await findBook(this.bookParams);
      if (data.code != 200) return this.$message.error(data.msg);

      this.$message.success(data.msg);
      this.total = data.data.total;
      this.bookList = data.data.result;
    },
    handleSizeChange(num) {
      this.bookParams.pagesize = num;
      this.getBookList();
    },
    handleCurrentChange(curnum) {
      this.bookParams.pagenum = curnum;
      this.getBookList();
    },
    deleteBookClick(obj) {
      this.$confirm("你却要删除 【 " + obj.name + " 】 这本书吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const data = await deleteBookId({ id: obj.id });
          if (data.code != 200) return this.$message.error(data.msg);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getBookList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editBookClick(obj) {
      this.$notify({
        title: "警告",
        message: "书籍信息的编辑功能尚不支持哦~",
        type: "warning"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.style-table-expand {
  font-size: 0;
  color: #99a9bf;
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;

    label {
      width: 90px;
    }
    span {
    }
  }
}
.img-wrap {
  max-width: 70px;
}
</style>
