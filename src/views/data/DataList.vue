<template>
  <div>
    <el-breadcrumb class="breadcrumb-row" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户数据统计</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div id="main" class="echar-row" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { userDataCount } from "@/request";
export default {
  mounted() {
    this.request();
  },
  methods: {
    async request() {
      let data = await userDataCount();

      if (data.code != 200) return this.$message.error(data.msg);

      this.$message.success(data.msg);
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "用户和管理员比例",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 100,
          max: 700,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "用户比例",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: data.data[0].count, name: "用户" },
              { value: data.data[1].count, name: "管理员" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "#663300"
            },
            labelLine: {
              lineStyle: {
                color: "#663300"
              },
              smooth: 0.2,
              length: 20,
              length2: 30
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 300,
              shadowColor: "#990099"
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.echar-row {
  margin: 0 auto;
}
</style>
