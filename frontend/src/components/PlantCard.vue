<template>
  <div class="card">
    <h1>{{ title }}</h1>
    <p>Temperature: {{ temperature }}</p>
    <p>Humidity: {{ humidity }}</p>
    <p>Light level: {{ lightLevel }}</p>
    <p>Soil Moisture: {{ soilMoisture }}</p>
  </div>
</template>  

<script>
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
  @import "colorscheme";

  h1 {
    background: $primary-color;
    color: $icon-color;
    padding: 0px;
    margin: 0px;
  }

  .card {
    background: white;
    // width: 96%;
    // height: 40%;
    // margin: 30px auto;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.4);
  }
</style>
