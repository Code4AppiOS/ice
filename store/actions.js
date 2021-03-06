import Services from './services'

export default {
	getWechatSignature({commit}, url) {
		return Services.getWechatSignature(url)
	},

	getUserByOAuth({commit}, url) {
		return Services.getUserByOAuth(url)
	},

	async fetchHouses({state}) {
		const res = await Services.fetchHouses()
		state.houses = res.data
		return res
	},

	async fetchCharacters({state}) {
		const res = await Services.fetchCharacters()
		state.characters = res.data
		return res
	},

	async fetchCities({state}) {
		const res = await Services.fetchCities()
		state.cities = res.data
		return res
	},


	async fetchProducts({state}) {
		const res = await Services.fetchProducts()
		state.products = res.data
		return res
	}
}