<!-- <template lang="pug">
	nav#nav
		nuxt-link(v-for='(item, index) in navList' :to='item.path' :key='index')
			div(v-if='index === 0')
				img(src='~static/img/home.png')
			div(v-else-if='index === 1')
				img(src='~static/img/shopping.png')
			div(v-else)
				img(src='~static/img/user.png')
</template>
 -->
<script>
	export default {
		data() {
			return {
				navList: [
						{
							'path': '/',
							'name': 'index',
							'text': '冰火脸谱'
						},
						{
							'path': '/shopping',
							'name': 'shopping',
							'text': '手办商城'
						},
						{
							'path': '/user',
							'name': 'user',
							'text': '我的账户'
						}
				]
			}
		},
		computed: {

		}
	}
</script>

<!-- <style lang='sass' scoped="true" src='static/sass/nav.sass'></style> -->