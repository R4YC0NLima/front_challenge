<template>
  <div>
    <Navbar />
    <RouterView />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Default",
  components: {
    Navbar
  }
}
</script>

<style scoped>

</style>