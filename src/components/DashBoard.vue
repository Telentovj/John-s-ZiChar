<template>
  <div>
      <p class = "header">DashBoard</p>
      <ul class="ul">
            <router-link to="/" class="routes">Home</router-link>
            <router-link to="/dashboard" class="routes">DashBoard</router-link>
            <router-link to="/orders" class="routes">Orders</router-link>
        </ul>
      <bar-chart></bar-chart>
      <APIChart/>
  </div>
</template>

<script>
import BarChart from './BarChart.vue';
import APIChart from './CallAPI.vue';
export default {
    components: {
        BarChart,
        APIChart
    },
}
</script>

<style>

</style>