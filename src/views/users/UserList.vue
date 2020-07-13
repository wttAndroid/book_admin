<template>
  <div>
    <el-breadcrumb class="breadcrumb-row" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 头部 -->
      <el-row class="card-head-row">
        <el-col :span="8">
          <div class="grid-content bg-purple-dark"></div>
          <el-input placeholder="请输入查找的姓名" v-model="searchName">
            <el-button slot="append" icon="el-icon-search" @click="findUserClick"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="showAddUserDialog">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userData" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="class" label="班级"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="statusscope">
            <el-switch
              :value="statusscope.row.status?true:false"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switchChange(statusscope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="admin" label="身份">
          <template slot-scope="adminscope">
            <el-tag v-if="adminscope.row.admin">管理员</el-tag>
            <el-tag v-else type="info">学生</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="last_login_time" label="注册时间" min-width="150px"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="deleUser">
            <el-tooltip content="修改用户" placement="top-start">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                circle
                @click="editUser(deleUser.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除用户" placement="top-start">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="deleteUser(deleUser.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogAddVisible" width="500px">
      <el-form :model="addForm" status-icon :rules="addRules" ref="adduserForm" size="medium">
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            type="text"
            v-model="addForm.name"
            autocomplete="off"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            prefix-icon="el-icon-s-cooperation"
            type="password"
            v-model="addForm.pwd"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="clas">
          <el-input
            prefix-icon="el-icon-s-cooperation"
            type="text"
            v-model="addForm.clas"
            autocomplete="off"
            placeholder="请输入班级"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="addForm.admin" label="0">学生</el-radio>
          <el-radio v-model="addForm.admin" label="1">管理员</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserClick">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户资料 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogUpVisible" width="500px">
      <el-form :model="upForm" status-icon :rules="addRules" ref="upuserForm" size="medium">
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            type="text"
            v-model="upForm.name"
            autocomplete="off"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="clas">
          <el-input
            prefix-icon="el-icon-s-cooperation"
            type="text"
            v-model="upForm.clas"
            autocomplete="off"
            placeholder="请输入班级"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="upForm.admin" label="0">学生</el-radio>
          <el-radio v-model="upForm.admin" label="1">管理员</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpVisible = false">取 消</el-button>
        <el-button type="primary" @click="upUserClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserAll,
  updateUserstat,
  findUsername,
  getRegist,
  deletUser,
  upUserinfo
} from "@/request";
export default {
  data() {
    return {
      dialogAddVisible: false,
      dialogUpVisible: false,
      userData: [],
      searchName: "",
      addForm: { name: "", pwd: "", clas: "", admin: "0" },
      upForm: {},
      addRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "姓名长度在2~5之间！", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "密码长度在3~12之间！", trigger: "blur" }
        ],
        clas: [
          { required: true, message: "请输入班级", trigger: "blur" },
          { min: 3, max: 15, message: "请输入有效的班级！", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserlist();
  },
  computed: {},
  methods: {
    async getUserlist() {
      const data = await getUserAll();
      if (data.code != 200) return this.$message.error(data.msg);

      this.userData = data.data;
    },
    async switchChange(obj) {
      console.log(obj, obj.status);
      obj.status = obj.status ? 0 : 1;
      const data = await updateUserstat({ id: obj.id, status: obj.status });
      if (data.code != 200) return this.$message.error(data.msg);
      console.log(data);
      this.$message.success(data.msg);
    },
    async findUserClick() {
      const data = await findUsername({ name: this.searchName });
      if (data.code != 200) return this.$message.error(data.msg);
      this.userData = data.data;
    },
    showAddUserDialog() {
      this.dialogAddVisible = true;
    },
    addUserClick() {
      this.$refs.adduserForm.validate(async valid => {
        if (!valid) return this.$message.error("请完善有效的注册信息！");
        const data = await getRegist(this.addForm);
        if (data.code != 200) return this.$message.error(data.msg);

        this.$message.success(data.msg);
        this.$refs.adduserForm.resetFields();
        this.dialogAddVisible = false;
        this.getUserlist();
      });
    },
    deleteUser(obj) {
      this.$confirm("你确定要删除用户：" + obj.name + "吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const data = await deletUser({ id: obj.id });
          if (data.code != 200) return this.$message.error(data.msg);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getUserlist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editUser(obj) {
      this.upForm = {
        id: obj.id,
        name: obj.name,
        clas: obj.class,
        admin: obj.admin + ""
      };
      this.dialogUpVisible = true;
    },
    async upUserClick() {
      this.$refs.upuserForm.validate(async valid => {
        if (!valid) return this.$message.error("请完善有效的注册信息！");
        const data = await upUserinfo(this.upForm);
        if (data.code != 200) this.$message.error(data.msg);
        this.$message.success(data.msg);
        this.dialogUpVisible = false;
        this.$refs.upuserForm.resetFields();
        this.getUserlist();
      });
    }
  }
};
</script>

<style>
</style>
