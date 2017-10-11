export default async (ctx, next) => {
	const message = ctx.weixin
	if(message.MsgType === 'text') {
		ctx.body = message.Content
	} else if (message.MsgType === 'link') {
		ctx.body = [{
			title: message.Title,
			description: message.Discription,
			picUrl: message.PicUrl,
			url: 'http://www.baidu.com'
		}]
	} else if (message.MsgType === 'event') {
		if(message.Event === 'subscribe') {
			ctx.body = '欢迎来到王者荣耀'
		} else if (message.Event === 'unsubscribe') {
			console.log('取消关注')
		} else if (message.Event === 'LOCATION') {
			ctx.body = message.Latitude + message.Longitude
		}
	}
}