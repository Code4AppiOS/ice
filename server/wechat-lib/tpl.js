import ejs from 'ejs'

const tpl = `<xml>
<ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
<CreateTime><%= createTime %></CreateTime>
<MsgType><![CDATA[<%= msgType %>]]></MsgType>
<Content><![CDATA[<%- content %>]]></Content>

<% if (msgType === 'news') { %>
<ArticleCount><%= content.length %></ArticleCount>
<Articles>
<% content.forEach(item => { %>
<item>
<Title><![CDATA[<%= item.title %>]]></Title> 
<Description><![CDATA[<%= item.description%>]]></Description>
<PicUrl><![CDATA[<%=item.picurl%>]]></PicUrl>
<Url><![CDATA[<%=item.url%>]]></Url>
</item>
<% }) %>
</Articles>
<% } %>
</xml>`

const compiled = ejs.compile(tpl)
export default compiled 