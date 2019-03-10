<template>
  <div>
    <ul>
      <li>{{ name }}</li>
      <li>{{ startDate }}</li>
      <li>{{ endDate }}</li>
      <li>{{ isPresent }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: `createIlness`,
  props: {
    name: {
      type: String,
      default: `Testing`
    },
    startDate: {
      type: String,
      default: `01-03-1997`
    },
    endDate: {
      type: String,
      default: `02-12-1998`
    },
    isPresent: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.li {
  color: aqua;
}
</style>
