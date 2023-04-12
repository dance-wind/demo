<template>
  <div id="app">
    <PhoneNumber />
    <TestDirective />
  </div>
</template>

<script>
import PhoneNumber from './components/PhoneNumber.vue'
import TestDirective from './components/TestDirective.vue';
export default {
  name: 'App',
  components: {
    PhoneNumber,
    TestDirective
  }
}
</script>

<style>

</style>
