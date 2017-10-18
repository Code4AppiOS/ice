<template lang="pug">
  .container
    .shopping
      .title 王者荣耀周边
      .list
        .item(v-for='(item, index) in products' :key='index' @click='showProduct(item)')
          .body
            .title {{item.title}}
            .content {{item.content}}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    head() {
      return {
        title: '手办商城'
      }
    },
    data() {
      return {
        
      }
    },
    computed: {
      ...mapState([
        'houses',
        'characters'
        ])
    },
    methods: {
    },
    beforeCreate() {
      this.$store.dispatch('fetchProducts')
    }
  }
</script>

<style scoped lang='sass' src='~static/sass/shopping.sass'></style>
</style>

