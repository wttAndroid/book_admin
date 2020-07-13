<template>
  <div class="home home-page">
    <el-container class="home-row">
      <el-header>
        <div class="header-title">
          <img src="../assets/imgs/logo2.png" alt />
          <h4>晋城职业技术学院图书管理系统</h4>
        </div>
        <el-button type="info" @click="exitClick">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏部分 -->
        <el-aside :width="isCollapse?'65px':'200px'">
          <div class="flex-bott" @click="collapseClick">
            <i class="el-icon-more-outline" v-if="isCollapse"></i>
            <i v-else class="el-icon-more"></i>
          </div>
          <el-menu
            :default-active="activeMenuId"
            unique-opened
            router
            class="el-menu-vertical-demo"
            background-color="#363D40"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
          >
            <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
              <template slot="title">
                <i :class="'iconfont '+item.icon "></i>
                <span slot="title">{{item.authName}}</span>
              </template>
              <el-menu-item :index="'/'+item2.path" v-for="item2 in item.children" :key="item2.id">
                <i class="iconfont el-icon-menu"></i>
                {{item2.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 主要内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menulist from "../assets/list.json";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      isCollapse: false,
      menulist: menulist.menulist
    };
  },
  computed: {
    activeMenuId: {
      get() {
        return this.$route.path;
      },
      set(val) {}
    }
  },
  methods: {
    collapseClick() {
      this.isCollapse = !this.isCollapse;
      console.log(this.menulist);
    },
    exitClick() {
      this.$confirm("您确定要退出账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.clear();
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出！"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
.home-row {
  height: 100vh;
}
.el-header {
  background-color: $page-color-header;
  height: 70px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .header-title {
    display: flex;
    font-size: 20px;
    height: 100%;
    img {
      height: 100%;
      margin-right: 5px;
    }
    h4 {
      color: white;
      font-family: Georgia, "Times New Roman", Times, serif;
    }
  }
}
.el-aside {
  background-color: $page-color-aside;
  .flex-bott {
    color: white;
    padding: 10px 0 20px 0;
  }
  .el-menu {
    border: none;
    .el-submenu {
      text-align: left;
      .iconfont {
        margin-right: 10px;
      }
    }
  }
}
.el-main {
}
</style>
