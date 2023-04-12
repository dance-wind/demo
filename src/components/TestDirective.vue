<template>
  <div v-demo:foo.a.b="message" @click="copyTextMixin('nice')">
    233
  </div>
</template>

<script>
import { demo } from "../utill/directive"
export default {
  data: () => ({
    message: 'hello world'
  }),
  directives: {
    demo
  },
}
</script>

<style>

</style>