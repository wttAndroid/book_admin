<template>
  <div class="regist">
    <el-card class="box-card">
      <div class="login-title">欢迎来到晋城职院图书管理系统</div>
      <el-form :model="registForm" status-icon :rules="registRules" ref="registForm" size="medium">
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            type="text"
            v-model="registForm.name"
            autocomplete="off"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            prefix-icon="el-icon-s-cooperation"
            type="password"
            v-model="registForm.pwd"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="clas">
          <el-input
            prefix-icon="el-icon-s-cooperation"
            type="text"
            v-model="registForm.clas"
            autocomplete="off"
            placeholder="请输入班级"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="registForm.admin" label="0">学生</el-radio>
          <el-radio v-model="registForm.admin" label="1">管理员</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即注册</el-button>
          <el-button @click="resetForm">已有账号，去登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getRegist, getLogin } from "@/request";
export default {
  data() {
    return {
      registForm: { name: "", pwd: "", clas: "", admin: "0" },
      registRules: {
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
  methods: {
    resetForm() {
      this.$router.push("/login");
    },
    submitForm() {
      this.$refs.registForm.validate(async valid => {
        if (!valid) return this.$message.error("请完善有效的注册信息！");
        const data = await getRegist(this.registForm);
        if (data.code != 200) return this.$message.error(data.msg);

        this.$message.success(data.msg);
        this.login();
      });
    },
    async login() {
      const data = await getLogin({
        name: this.registForm.name,
        pwd: this.registForm.pwd
      });
      if (data.code != 200) {
        this.$message.error(data.msg);
        return;
      }

      window.sessionStorage.setItem("user", JSON.stringify(data.data));
      this.$message.success(data.msg);
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss" scoped>
.regist {
  position: relative;
  height: 100%;
  color: $font-color;
  background-color: rgba($color: #000000, $alpha: 0.4);

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url(http://www.sxjczy.cn:88/gb2015/images/2.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
    filter: blur(3px);
    z-index: -100;
  }

  .box-card {
    z-index: 200;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%);
    min-width: 500px;
    padding: 30px;
  }
  .login-title {
    font-size: 20px;
    margin-bottom: 50px;
  }
}
</style>
