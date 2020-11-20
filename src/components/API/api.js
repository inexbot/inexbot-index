import axios from "axios"
const url = 'https://hd215.api.yesapi.cn/';
const app_key = 'A9B8F37512C199D5FE1BDC229CD9E36C';

function post(model, params, order,logic="and" ) {
    return axios({
      method: 'POST',
      url: url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        s: 'App.SuperTable.FreeQuery',
        database: 'super',
        app_key: app_key,
        model_name: model,
        where: params,
        logic,
        order,
        page: 1,
        perpage: 100,
      },
    })
    .then(res => res.data.data)
    .catch(res => {
      console.log(res);
    })
  }

export default ({
  // 获取首页头部导航列表
  getHeaderList(){
    return post('dede_arctype',`[["id", "=", "14"],["id","=","25"]]`,'["sortrank ASC"]',"or")
  },
  // 获取新闻列表
  getNewslist(){
    return post('dede_archives',`[["typeid","=","8"]]`,["id DESC"])
  },
  // 获取banner图上的文字
  getBannerTxt(){
    return post('dede_myppt',`[["typeid",">","0"]]`,["typeid ASC"])
  },
  // 获取解决方案模块的数据
  getSolutionType(){
    return post('dede_arctype',`[["reid","=","25"]]`,["sortrank ASC"])
  }
})