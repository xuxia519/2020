## 项目技术栈

node10.15.3 + react@16.12.0 + redux@3.7.2 + react-router@3.2.0 + webpack@4.41.2 + axios@0.19.0 + less@2.7.1 + antd@3.25.2

## 项目运行


```
git clone https://github.com/xuxia519/2020.git 

cd project (进入项目)

npm install (安装依赖包)

npm start (启动服务)

最后的构建命令
```
npm run build (正式环境的打包部署)
npm run testing (测试环境的打包部署命令，可以根据具体需求自行配置修改)


### 取消http请求示例：
```
import axios from 'axios'
const axiosHandle = axios.CancelToken.source()

login(){
  this.props.dispatch(fetchLogin(values, (res) => {},(error)=>{},axiosHandle)
  取消请求的操作
  setTimeout(() => {
    axiosHandle.cancel('手动取消。')
  }, 3000)
}

