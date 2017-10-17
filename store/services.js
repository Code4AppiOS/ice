import axios from 'axios'

const baseUrl = ''
const apiURL = 'https://www.easy-mock.com/mock/591fdc739aba4141cf292914/evcard-fas/api'

class Services {
	getWechatSignature(url) {
		return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
	}

	getUserByOAuth(url) {
		return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
	}

	fetchHouse() {
		return axios.get(`${apiURL}/house`)
	}

	fetchCities() {
		return axios.get(`${apiURL}/cities`)
	}

	fetchCharacters() {
		return axios.get(`${apiURL}/cities`)
	}
}

export default new Services()