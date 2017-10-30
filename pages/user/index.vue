<template lang="pug">
  .container
    .shopping
      .title 用戶信息
      .list
        .items(v-for='(item, index) in products' :key='index' @click='showProduct(item)')
          .body
            .title {{item.title}}
            .content {{item.content}}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'products',
        ])
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
      this.$store.dispatch('fetchProducts')
    }
  }
</script>

<style lang='sass' src="static/sass/shopping.sass"></style>


