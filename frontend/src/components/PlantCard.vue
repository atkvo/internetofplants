<template>
  <div class="card">
    <h1>{{ title }}</h1>
    <div class="graph-box">
      <plant-chart :chart-data="datacollection"></plant-chart>
      <!-- <button @click="fillData()">Fill</button> -->
      <button class="material-clickable-text" @click="addData()">Refresh</button>
    </div>
    <p>Temperature: {{ temperature }}</p>
    <p>Humidity: {{ humidity }}</p>
    <p>Light level: {{ lightLevel }}</p>
    <p>Soil Moisture: {{ soilMoisture }}</p>
  </div>
</template>  

<script>
import PlantChart from './PlantChart.vue'
export default {
  name: 'material-button',
  props: {
    title: {
      type: String,
      default: 'Card Title'
    },
    temperature: {
      default: '100c'
    },
    humidity: {
      default: '100'
    },
    lightLevel: {
      default: '100%'
    },
    soilMoisture: {
      default: '98%'
    }
  },
  components: {
    'plant-chart': PlantChart
  },
  data () {
    return {
      datacollection: null,
      rawData: []
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      var newLabels = []
      for (var i = 0; i < this.rawData.length; i++) {
        newLabels.push(i)
      }
      this.datacollection = {
        labels: newLabels,
        datasets: [
          {
            label: 'D1',
            backgroundColor: '#f84818',
            data: this.rawData
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    addData () {
      this.rawData.push(this.getRandomInt())
      this.rawData.push(this.getRandomInt())
      this.rawData.push(this.getRandomInt())
      this.rawData.push(this.getRandomInt())
      this.fillData()
    }
  }
}
</script>

<style lang="scss" scoped>
/* Default color scheme */
  $primary-color: #3F51B5;
  $accent-color: #00E676;
  $accent-color-100: #69F0AE;
  $primary-text-color: rgba(0, 0, 0, 0.92);
  $icon-color: rgba(255, 255, 255, 0.92);

/* Global color scheme */
  @import "buttontheme";
  @import "colorscheme";

  button:hover {
    cursor: pointer;
    color: $accent-color-100;
  }

  button:active {
    color: $accent-color;
  }
  h1 {
    background: $primary-color;
    color: $icon-color;
    padding: 0px;
    margin: 0px;
  }

  p {
    margin: 0;
  }

  .card {
    background: white;
    // width: 96%;
    // height: 40%;
    // margin: 30px auto;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.4);
  }

  .graph-box {
    background-color: $icon-color;
  }
</style>
