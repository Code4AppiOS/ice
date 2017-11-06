<template lang="pug">
  .container
    .shopping
      .title 荣耀周边
      .list
        .items(v-for='item in products' @click='showProduct(item)')
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
        products: ''
      }
    },
    methods: {
      showProduct(item) {
        this.$router.push({
          path: '/deal',
          query: {
            id: item._id
          }
        })
      }
    },
    beforeCreate() {
      this.$store.dispatch('fetchProducts').then(res => {
        this.products = res.data
      })
    }
  }
</script>

<!-- <style lang='sass' src="static/sass/shopping.sass"></style>
 -->

