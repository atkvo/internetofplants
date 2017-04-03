<template>
    <button>{{ name }}</button>
</template>  

<script>
export default {
  name: 'material-button',
  props: ['name']
}
</script>

<style lang="scss" scoped>
  $primary-color: #3F51B5;
  $accent-color: #00E676;
  $accent-color-100: #69F0AE;
  $primary-text-color: rgba(0, 0, 0, 0.92);
  $icon-color: rgba(255, 255, 255, 0.92);

  @import "colorscheme";
  button {
    // background: $accent-color;
    background: rgba(0, 0, 0, 0);
    color: $icon-color;
    border: 0;
    width: 110px;
    font-weight: bold;
    font-family: Arial;
    font-size: 14px;
  }
  
  button:hover {
    cursor: pointer;
    background: $accent-color-100;
  }
  
  button:active {
    background: $accent-color;
  }

  @mixin transition($transition...) {
  -webkit-transition: $transition;
     -moz-transition: $transition;
      -ms-transition: $transition;
          transition: $transition;
  }

  button {
    @include transition(all ease-out 0.2s);
  }
</style>
