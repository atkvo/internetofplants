<template>
  <div class="hello">
      <nav>
        <h1>Internet of Plants</h1>
        <div class="nav-buttons">
          <material-button name="b1"></material-button>
          <material-button name="b2"></material-button>
          <material-button name="b3"></material-button>
      </div>
    </nav>
    <div class="card-holder">
      <plant-card class="card"
        v-for="plant in plants"
        v-bind:key="plant"
        v-bind:title="plant.PlantName"
        v-bind:nodeID="plant.NodeID"
        v-bind:temperature="plant.Temperature"
        v-bind:humidity="plant.Humidity"
        v-bind:lightLevel="plant.Light"
        v-bind:soilMoisture="plant.Moisture">
      </plant-card>
    </div>
  </div>
</template>

<script>
import MaterialButton from './MaterialButton.vue'
import PlantCard from './PlantCard.vue'

export default {
  name: 'hello',
  components: {
    'material-button': MaterialButton,
    'plant-card': PlantCard
  },
  data () {
    return {
      plants: []
    }
  },
  methods: {
    getPlantsFake () {
      if (this.plants.length < 10) {
        this.plants.push({
          ID: this.plants.length + 1,
          PlantName: 'fake',
          Temperature: 0,
          Humidity: 0,
          Light: 0,
          Moisture: 0
        })
      }
    },
    doesPlantExist (nodeID) {
      return this.plants.some(function (item) {
        return item.NodeID === nodeID
      })
    },
    getPlants (callback) {
      var xmlHttp = new XMLHttpRequest()
      var baseURL = window.location.hostname
      console.log('Setting HTTP get request to ' + baseURL + '/plants')
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          console.log(xmlHttp.responseText)
          if (process.env.NODE_ENV === 'development') {
            var p = [
              {
                Id: 0,
                NodeID: 'Node2',
                PlantName: 'Fern',
                Temperature: '40c',
                Humidity: '39',
                Light: '.85',
                Moisture: '.85'
              },
              {
                Id: 43,
                NodeID: 'Node1',
                PlantName: 'CantSeeMe',
                Temperature: '40c',
                Humidity: '39',
                Light: '.85',
                Moisture: '.85'
              }
            ]
            if (this.doesPlantExist(p[0].NodeID) === false) {
              this.plants.push(p[0])
            }
            if (this.doesPlantExist(p[1].NodeID) === false) {
              this.plants.push(p[1])
            }
          } else {
            var o = JSON.parse(xmlHttp.responseText)
            if (o !== null) {
              for (var i = 0; i < o.length; i++) {
                if (this.doesPlantExist(o[i].NodeID) === false) {
                  this.plants.push(o[i])
                }
              }
            }
          }
        }
      }
      xmlHttp.open('GET', '/plants', true) // true for asynchronous
      xmlHttp.send(null)
    }
  },
  mounted () {
    console.log('Hello ready')
    setInterval(function () {
      if (process.env.NODE_ENV === 'development') {
        this.getPlants(this)
      } else {
        this.getPlants(this)
      }
      console.log('Calling get plants')
    }.bind(this), 3000)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "colorscheme";
nav {
  $text-alignment: center;
  $nav-bar-height: 50px;
  // background-color: rgba(255, 255, 255, 1.0);
  background-color: $primary-color;
  font-family: Arial;
  padding: 0px 10px 0 10px;
  margin: 5px auto;
  height: $nav-bar-height;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  // display: table;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @mixin vertically-align() {
    display: inline;
    // height: $nav-bar-height;
    // line-height: $nav-bar-height;
    vertical-align: middle;
  }
  
  .nav-buttons {
    margin-left: 20px;
    margin-right: 0px;
    display: flex;
    height: 100%;
    // background: gray;
  }
  
  material-button {
    // background: $accent-color;
    background: rgba(0, 0, 0, 0);
    color: $icon-color;
    border: 0;
    width: 110px;
    font-weight: bold;
    font-family: Arial;
    font-size: 14px;
  }
  
  material-button:hover {
    cursor: pointer;
    background: $accent-color-100;
  }
  
  material-button:active {
    background: $accent-color;
  }

  h1 {
    color: $icon-color;
    font-size: 28px;
    @include vertically-align();
  }
  
  h2 {
    color: $primary-text-color;
    text-align: $text-alignment;
    @include vertically-align();
  }
  
  h3 {
    color: $primary-text-color;
    text-align: $text-alignment;
    @include vertically-align();
  }
}

h1, h2 {
  font-weight: normal;
}

.card-holder {
  width: 100vw;
  // background: #EFEFEF;
  // height: 100vh;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.card {
  width: 250px;
  // height: 180px;
  margin: 15px;
  // display: flex;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
