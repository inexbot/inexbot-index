import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import API from 'components/API/api';
import Banner from './index/banner/index.jsx';
import Solution from './index/solution/index.jsx';
import Product from './index/product/index.jsx';
import InexbotIntroduce from './index/inexbotIntroduce/index.jsx';
import ServiceSupport from './index/serviceSupport/index.jsx';
import Patner from './index/partner/index.jsx';
import NewsInformation from './index/newsInformation/index.jsx';
import './index.css';

const mapStateToProps = state => {
  return {
    headerScroll: state.index.headerScroll,
  };
};

function Connect(props) {
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);

  // 进入到主页时候，头目栏目滑到banner图下背景颜色才会改变
  useEffect(() => {
    props.dispatch({
      type: 'index/setHeaderScroll',
      data: props.BannerHeight,
    });
  }, [props.BannerHeight]);

  // 实时更新页面的宽度和高度
  useEffect(() => {
    setBannerWidth(props.BannerWidth);
  }, [props.BannerWidth]);

  return (
    <div>
      {/* banner图 */}
      <div className="banner">
        <Banner BannerWidth={BannerWidth} />
      </div>
      {/* 解决方案 */}
      <div className="solution">
        <Solution BannerWidth={BannerWidth} TypeList={props.TypeList} />
      </div>
      {/* 产品中心 */}
      <div className="product">
        <Product
          BannerWidth={BannerWidth}
          TypeList={props.TypeList}
          productList={props.productList}
        />
      </div>
      {/* 产品介绍 */}
      <div className="InexbotIntroduce">
        <InexbotIntroduce TypeList={props.TypeList} />
      </div>
      {/* 服务支持 */}
      <div className="ServiceSupport">
        <ServiceSupport TypeList={props.TypeList} />
      </div>
      {/* 合作伙伴 */}
      <div className="partner">
        <Patner
          BannerWidth={BannerWidth}
          productList={props.productList}
          TypeList={props.TypeList}
        />
      </div>
      {/* 新闻资讯 */}
      <div className="newsInformation">
        <NewsInformation
          BannerWidth={BannerWidth}
          inpormation={props.productList}
          TypeList={props.TypeList}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Connect);
