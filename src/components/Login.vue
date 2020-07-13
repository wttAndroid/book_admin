<template>
  <div class="login">
    <el-card class="box-card">
      <div class="login-title">欢迎来到晋城职院图书管理系统</div>
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" size="medium">
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            type="text"
            v-model="loginForm.name"
            autocomplete="off"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            prefix-icon="el-icon-s-cooperation"
            type="password"
            v-model="loginForm.pwd"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即登录</el-button>
          <el-button @click="resetForm">立即注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getLogin } from "@/request";
export default {
  data() {
    return {
      loginForm: {
        name: "",
        pwd: ""
      },
      loginRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "姓名长度在2~5之间！", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "密码长度在3~12之间！", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return this.$message.error("请输入有效的用户名和密码！");
        const data = await getLogin(this.loginForm);
        if (data.code != 200) {
          this.$message.error(data.msg);
          return;
        }

        window.sessionStorage.setItem("user", JSON.stringify(data.data));
        this.$message.success(data.msg);
        this.$router.push("/home");
      });
    },
    resetForm() {
      this.$router.push("/regist");
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
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
