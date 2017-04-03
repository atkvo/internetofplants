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
        v-bind:title="plant.name"
        v-bind:temperature="plant.temperature"
        v-bind:humidity="plant.humidity"
        v-bind:lightLevel="plant.lightLevel">
      </plant-card>
    </div>
    <!-- <h1>{{ msg }}</h1> -->
  </div>
</template>

<script>
import MaterialButton from './MaterialButton.vue'
import PlantCard from './PlantCard.vue'

export default {
  name: 'hello',
  props: {
    plants: {
      type: Array,
      default: function () {
        return [
          {
            name: 'Fern',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%'
          },
          {
            name: 'AirPlant',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%'
          },
          {
            name: 'Room Plant',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%'
          },
          {
            name: 'Frontdoor Plant',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%'
          }
        ]
      }
    }
  },
  components: {
    'material-button': MaterialButton,
    'plant-card': PlantCard
    // 'card-layout': MaterialButton
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
  height: 180px;
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
