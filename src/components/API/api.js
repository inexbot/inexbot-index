import axios from 'axios';
const url = 'https://hd215.api.yesapi.cn/';
const app_key = 'A9B8F37512C199D5FE1BDC229CD9E36C';

function post(model, params, order, logic = 'and', database = 'super') {
  return axios({
    method: 'POST',
    url: url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
      s: 'App.SuperTable.FreeQuery',
      database,
      app_key: app_key,
      model_name: model,
      where: params,
      logic,
      order,
      page: 1,
      perpage: 9999,
    },
  })
    .then(res => res.data.data)
    .catch(res => {
      console.log(res);
    });
}

export default {
  // 获取列表
  getTypeList() {
    return post('dede_arctype', `[["id", ">", "0"]]`, '["sortrank ASC"]').then(
      res => {
        let _l = [];
        res.list.forEach(value => {
          if (value.topid == 0 && value.ishidden == 0) {
            value.sublist = [];
            _l.push(value);
          }
        });
        res.list.forEach(value => {
          for (let i = 0; i < _l.length; i++) {
            if (value.reid == _l[i].id && value.ishidden == 0) {
              _l[i].sublist.push(value);
            }
          }
        });
        return _l;
      },
    );
  },
  // 获取新闻列表，合作伙伴和产品中心列表
  getNewslist() {
    return post('dede_archives', `[["id",">","0"]]`, ['senddate DESC']);
  },
  // 获取banner图上的文字
  getBannerTxt() {
    return post('dede_myppt', `[["typeid",">","0"]]`, ['typeid ASC']);
  },
  // 获取解决方案模块的数据
  getSolutionType() {
    return post('dede_arctype', `[["reid","=","25"]]`, ['sortrank ASC']);
  },
  // 获取产品中心模块的产品简介
  getProductIntroduce() {
    return post('dede_addonimages', `[["aid",">","0"]]`, ['typeid ASC']);
  },
  // 获取软件下载页面的内容
  getDownloadLink() {
    return post('dede_download', `[["aid",">","0"]]`, ['sort DESC']);
  },
  getManualList() {
    return post('dede_allmanual', `[["typeid","=","58"]]`, ['sort ASC']);
  },
  getOtherDocList() {
    return post('dede_allmanual', `[["typeid","=","63"]]`, ['sort ASC']);
  },
  // 获取教学视频的视频
  getTeachvideo() {
    return post('dede_teachclass', `[["aid",">","0"]]`, ['sort ASC']);
  },
  getPartner() {
    return post(
      'dede_archives',
      `[["typeid","=","53"],["typeid","=","54"],["typeid","=","55"]]`,
      ['weight ASC'],
      'or',
    );
  },
  getJoin() {
    return post('dede_archives', `[["typeid","=","40"]]`, ['weight ASC']);
  },
  // 获取常见问题页面的问题列表
  getFaqSelect() {
    return post(
      'inexbot_faq_type',
      '[["id", ">", "0"]]',
      ['id ASC'],
      'and',
      'iu',
    );
  },

  // 获取常见问题页面的标题
  getFaqtitle() {
    return post(
      'inexbot_faq',
      `[["id", ">", "0" ]]`,
      ['id ASC'],
      'and',
      'iu',
    );
  },
  // 获取新闻资讯的详细内容
  getNewsContent() {
    return post('dede_addonarticle', '[[ "typeid" , "<" , "10"]]', ['aid ASC']);
  },

  // 获取解决方案页面的视频
  getSolutionVideo() {
    return post('dede_addonarticle', '[[ "typeid" , "=" , "50"]]', ['aid ASC']);
  },
};
