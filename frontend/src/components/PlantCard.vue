<template>
  <div class="card">
    <h1>{{ title }}</h1>
    <div class="graph-box">
      <plant-chart :chart-data="datacollection"></plant-chart>
      <!-- <button @click="fillData()">Fill</button> -->
    </div>
    <p>Temperature: <span>{{ temperature }}</span></p>
    <p>Humidity: <span>{{ humidity }}</span></p>
    <p>Light level: <span>{{ lightLevel }}</span></p>
    <p>Soil Moisture: <span>{{ soilMoisture }}</span></p>
    <button class="material-clickable-text" id="refresh" @click="requestPlantData()">Refresh</button>
  </div>
</template>  

<script>
import PlantChart from './PlantChart.vue'
export default {
  name: 'material-button',
  props: {
    nodeID: {
      type: String,
      default: ''
    },
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
      default: '1.00'
    },
    soilMoisture: {
      default: '0.98'
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
    requestPlantData () {
      var xmlHttp = new XMLHttpRequest()
      // var baseURL = window.location.hostname
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          console.log(xmlHttp.responseText)
          var o = JSON.parse(xmlHttp.responseText)
          if (o !== null) {
            this.title = o.PlantName
            this.lightLevel = o.Light
            this.humidity = o.Humidity
            this.soilMoisture = o.Moisture
            this.temperature = o.Temperature
          }
        }
      }
      var params = 'NodeID=' + this.nodeID
      xmlHttp.open('GET', '/plants/currentdata' + '?' + params, true) // true for asynchronous
      xmlHttp.send(null)
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
    margin: 0 0 0 10px;
    padding-left: 35px;
    text-align: left;
  }

  p span {
    font-weight: bold;
    float: right;
    margin-right: 50px;
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

  #refresh {
    font-size: 18px;
    margin: 5px;
    float: right;
  }
</style>
