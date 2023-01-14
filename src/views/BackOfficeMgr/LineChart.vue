<!--
 * @Author: zaijin
 * @Date: 2022-03-15 10:16:01
 * @LastEditTime: 2022-08-03 16:58:40
 * @LastEditors: 空白格
 * @Description: 总后台 => 数据统计--数据统计---折线图
 * @FilePath: \airport_web\src\projects\overall\views\Statistics\StatisticsData\LineChart.vue
-->

<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import resize from './mixins/resize';

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData);
    },
    setOptions({ data, xAxisData, title, dataZoom } = {}) {
      this.chart.setOption({
        title: {
          text: '',
          textStyle: {
            color: '#333333'
          },
          top: 0
        },
        xAxis: {
          data: xAxisData,
          boundaryGap: false,
          axisTick: {
            show: true
          }
        },
        dataZoom,
        grid: {
          left: 80,
          right: 50,
          bottom: 70,
          top: 30
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          name: '收益(元)',
          axisTick: {
            show: true
          }
        },
        series: [
          {
            name: '营收',
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }
        ]
      });
    }
  }
};
</script>
