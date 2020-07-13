<template>
  <div>
    <el-breadcrumb class="breadcrumb-row" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>图书信息添加</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-steps :active="Number(activeTab)" simple>
        <el-step title="信息完善" icon="el-icon-s-order"></el-step>
        <el-step title="作者完善" icon="el-icon-s-custom"></el-step>
        <el-step title="出版完善" icon="el-icon-upload"></el-step>
        <el-step title="描述完善" icon="el-icon-picture"></el-step>
      </el-steps>
      <el-row :gutter="20" class="content-row">
        <el-col :span="16">
          <el-form :model="addForm" :rules="addrules" ref="addbookForm">
            <el-tabs tab-position="left" v-model="activeTab" :before-leave="beforeLeave">
              <el-tab-pane label="书籍信息" name="1">
                <el-form-item label="书籍ISBN" prop="isbn">
                  <el-input v-model="addForm.isbn"></el-input>
                </el-form-item>
                <el-form-item label="书籍名称" prop="name">
                  <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="书籍价格" prop="price">
                  <el-input v-model="addForm.price"></el-input>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="书籍作者" name="2">
                <el-form-item label="作者名称" prop="author">
                  <el-input v-model="addForm.author"></el-input>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="书籍出版" name="3">
                <el-form-item label="出版社" prop="press">
                  <el-input v-model="addForm.press"></el-input>
                </el-form-item>
                <el-form-item label="出版时间" prop="press_time">
                  <el-date-picker
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM"
                    v-model="addForm.press_time"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="书籍描述" name="4">
                <el-form-item label="书籍的简要描述" prop="desc">
                  <el-input
                    type="textarea"
                    placeholder="请输入书籍的简要描述...."
                    v-model="addForm.desc"
                    maxlength="30"
                    show-word-limit
                    rows="12"
                  ></el-input>
                </el-form-item>
                <el-button type="primary" @click="addBookClick">添加图书</el-button>
              </el-tab-pane>
            </el-tabs>
          </el-form>
        </el-col>
        <el-col :span="8">
          <img src="../../assets/imgs/book.jpg" alt />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { addBook } from "@/request";
export default {
  data() {
    return {
      addForm: {
        name: "",
        author: "",
        press: "",
        press_time: "",
        price: "",
        isbn: "",
        desc: ""
      },
      addrules: {
        name: [
          { required: true, message: "书籍名称不能为空", trigger: "blur" }
        ],
        author: [
          { required: true, message: "作者名称不能为空", trigger: "blur" }
        ],
        press: [{ required: true, message: "出版社不能为空", trigger: "blur" }],
        press_time: [
          { required: true, message: "出版时间不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "书籍价格不能为空", trigger: "blur" },
          {
            type: "number",
            message: "必须为数字",
            trigger: "blur",
            transform: value => Number(value)
          }
        ],
        isbn: [{ required: true, message: "ISBN不能为空", trigger: "blur" }],
        desc: [{ required: true, message: "书记描述不能为空", trigger: "blur" }]
      },
      activeTab: "1"
    };
  },
  methods: {
    beforeLeave(activeName, oldActiveName) {
      if (oldActiveName == 1) {
        if (!this.addForm.name || !this.addForm.isbn || !this.addForm.price) {
          this.$message.error("请完善书籍的信息");
          return false;
        }
        return true;
      }
      return true;
    },
    addBookClick() {
      this.$refs.addbookForm.validate(async valid => {
        if (!valid) return this.$message.error("请完善书籍表单的内容");
        const data = await addBook(this.addForm);
        if (data.code != 200) return this.$message.error(data.msg);

        this.$message.success(data.msg);

        this.activeTab = "1";
        this.$refs.addbookForm.resetFields();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content-row {
  margin-top: 50px;
}
.el-tab-pane {
  text-align: left;
}
</style>
