<template>
  <div>
    <el-breadcrumb class="breadcrumb-row" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户资料</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="content-row">
        <h2>您当前的信息</h2>
        <el-form label-position="left" label-width="80px" :model="userinfo" size="medium">
          <el-form-item label="ID">
            <el-input v-model="userinfo.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="userinfo.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="userinfo.class" disabled></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input :value="userinfo.status==1?'使用中':'丢失'" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份">
            <el-input :value="userinfo.admin==0?'学生':'管理员'" disabled></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input v-model="userinfo.last_login_time" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码" class="pass-line-row">
            <el-button type="primary" @click="showUpdalog">修改密码</el-button>
          </el-form-item>
        </el-form>

        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="editParams" label-width="120px" :rules="formrules" ref="editForm">
            <el-form-item label="旧密码" prop="orlpass">
              <el-input v-model="editParams.orlpass" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpass">
              <el-input v-model="editParams.newpass" type="password"></el-input>
            </el-form-item>
            <el-form-item label="再次确认密码" prop="yespass">
              <el-input v-model="editParams.yespass" type="password"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="upPassClick">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { findUserInfo, editUserpass } from "@/request";

export default {
  data() {
    var validatorPass = (rule, value, callback) => {
      if (value !== this.editParams.newpass) {
        callback(new Error("两次密码输入一样"));
        return;
      }
      callback();
    };
    return {
      editParams: { orlpass: "", newpass: "", yespass: "" },
      formrules: {
        orlpass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        newpass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "密码长度在3-12之间",
            trigger: "blur"
          }
        ],
        yespass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "密码长度在3-12之间",
            trigger: "blur"
          },
          {
            validator: validatorPass,
            trigger: "blur"
          }
        ]
      },
      userinfo: {},
      dialogFormVisible: false,
      upForm: {}
    };
  },
  created() {
    this.findUserinfo();
  },
  methods: {
    async findUserinfo() {
      const user = JSON.parse(window.sessionStorage.getItem("user"));
      // const data=await findUserInfo({ name: user.name });
      // console.log(user);
      this.userinfo = user ? user : {};
    },
    showUpdalog() {
      this.dialogFormVisible = true;
    },
    async upPassClick() {
      this.$refs.editForm.validate(async valid => {
        if (!valid) return this.$message.error("请完善修改信息！");
        const data = await editUserpass({
          id: this.userinfo.id,
          pwd: this.editParams.orlpass,
          newpwd: this.editParams.yespass
        });
        if (data.code != 200) return this.$message.error(data.msg);

        this.$message.success(data.msg);
        this.dialogFormVisible = false;
        this.$refs.editForm.resetFields();

        window.sessionStorage.clear();
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content-row {
  margin: 0 auto;
  max-width: 600px;
}
.pass-line-row {
  text-align: left;
}
</style>
