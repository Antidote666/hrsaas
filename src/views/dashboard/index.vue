<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div style="height: 1000px;" />
    <button @click="flag=!flag">fa</button>
    <img v-show="flag" v-imglazy="url" src="/" alt="">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      url: 'https:img1.baidu.com/it/u=2248367700,2903730111&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665594000&t=a5f6018dea05e196aaa191467f1e10b6',
      flag: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  }
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

</style>
