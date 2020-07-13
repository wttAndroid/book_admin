<template>
  <div>
    <el-breadcrumb class="breadcrumb-row" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>图书借阅添加</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-tabs type="border-card">
        <!-- 借阅添加 -->
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 添加借阅
          </span>
          <el-row>
            <el-col :span="15">
              <el-form label-width="100px" :model="formBook" ref="bookAddFrom" class="bookAddFrom">
                <el-form-item label="图书ID">
                  <el-input v-model="formBook.book_id" @change="idChangeEvent"></el-input>
                </el-form-item>
                <el-form-item label="图书名称">
                  <el-input v-model="formBook.book_name" @change="bookNameChangeEvent"></el-input>
                </el-form-item>
                <el-form-item label="图书作者">
                  <el-input v-model="formBook.author" disabled></el-input>
                </el-form-item>
                <el-form-item label="图书出版社">
                  <el-input v-model="formBook.press" disabled></el-input>
                </el-form-item>
                <el-form-item label="借阅者ID">
                  <el-input v-model="formBook.user_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="借阅人">
                  <el-input v-model="formBook.user_name" @change="userChangeEvent"></el-input>
                </el-form-item>
                <el-form-item label="借阅册数">
                  <el-input value="1" type="Number" disabled></el-input>
                </el-form-item>
                <el-form-item label="借阅时间">
                  <el-input type="text" suffix-icon="el-icon-date" :value="new Date()+''" disabled></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="addBorrowClick">进行借阅</el-button>
              <el-button type="info" @click="resetClick">重置</el-button>
            </el-col>
            <el-col :span="9">
              <img src="../../assets/imgs/book.jpg" alt />
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 还书添加 -->
        <el-tab-pane label="添加还书">
          <el-form :inline="true" :model="addreturnFrom">
            <el-form-item label="借阅人">
              <el-input
                v-model="addreturnFrom.username"
                @change="addreturnnameChangeEvent"
                placeholder="借阅人姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="借阅图书">
              <el-select v-model="addreturnFrom.book_id" placeholder="借阅图书列表">
                <el-option
                  :label="item.name"
                  :value="item.book_id"
                  v-for="(item,index) in selectList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitClick">还书</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="添加权限" disabled></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {
  findBookId,
  findUserInfo,
  findBook,
  findBorrowUser,
  addBookStatus,
  addBorrow
} from "@/request";
export default {
  data() {
    return {
      formBook: {
        book_id: "",
        book_name: "",
        author: "",
        press: "",
        user_id: "",
        user_name: ""
      },
      addreturnFrom: {
        username: "",
        book_id: "",
        user_id: ""
      },
      selectList: []
    };
  },
  methods: {
    resetClick() {
      this.$refs.bookAddFrom.resetFields();
    },
    async idChangeEvent(value) {
      let data = await findBookId({ id: value });
      if (data.code != 200) {
        this.formBook = {};
        this.$message.error("该图书不存在，请重新输入正确的图书ID！");
        return;
      }
      this.formBook.book_name = data.data[0].name;
      this.formBook.author = data.data[0].author;
      this.formBook.press = data.data[0].press;
    },
    async bookNameChangeEvent(value) {
      let data = await findBook({ bookname: value });
      if (data.code != 200) {
        this.formBook.user_id = "";
        this.formBook.user_name = "";
        this.formBook.author = "";
        this.formBook.press = "";
        this.$message.error("该图书不存在，请重新输入正确的图书名称！");
        return;
      }
      this.formBook.book_id = data.data.result[0].id;
      this.formBook.book_name = data.data.result[0].name;
      this.formBook.author = data.data.result[0].author;
      this.formBook.press = data.data.result[0].press;
    },
    async userChangeEvent(value) {
      let data = await findUserInfo({ name: value });
      if (data.code != 200) {
        this.formBook.user_id = "";
        this.formBook.user_name = "";
        this.$message.error("该用户不存在，请重新输入正确的用户姓名！");
        return;
      }
      this.formBook.user_id = data.data.id;
    },
    async addreturnnameChangeEvent(value) {
      let data = await findUserInfo({ name: value });
      if (data.code != 200) {
        this.selectList = [];
        this.$message.error("该用户不存在，请重新输入正确的用户姓名！");
        return;
      }

      let result = await findBorrowUser({ user_id: data.data.id });
      this.addreturnFrom.user_id = data.data.id;
      if (result.code != 200) {
        this.selectList = [];
        this.$message.error("该用户不存在未还的书！");
        return;
      }
      this.selectList = result.data;
    },
    async submitClick() {
      let data = await addBookStatus({
        user_id: this.addreturnFrom.user_id,
        book_id: this.addreturnFrom.book_id
      });
      if (data.code != 200) return this.$message.error("还书失败");
      this.$message.success("还书成功");
      this.addreturnFrom = {};
    },
    async addBorrowClick() {
      if (!this.formBook.book_id || !this.formBook.user_id)
        return this.$message.error("请输入有效的借阅信息");
      let data = await addBorrow({
        book_id: this.formBook.book_id,
        user_id: this.formBook.user_id
      });
      if (data.code != 200) return this.$message.error("借阅失败");
      this.$message.success("借阅成功");
      this.$refs.bookAddFrom.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.formValue {
  color: darkblue;
}
</style>
