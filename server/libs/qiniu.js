import qiniu = from 'qiniu'
import config from './config'

qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

// 上传的空间
const bucket = 'Bucket_Name';