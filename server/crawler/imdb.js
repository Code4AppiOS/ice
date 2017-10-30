import cheerio from 'cheerio'
import rp from 'request-promise'

export const getIMDBCharacters = async () => {
	const options = {
		uri: 'http://pvp.qq.com/web201605/herolist.shtml',
		transform: body => cheerio.load(body)
	}

	const $ = await rp(options)
	$('.herolist-content ul.herolist, li').each(function() {
		console.log($(this))
	})

}

getIMDBCharacters()