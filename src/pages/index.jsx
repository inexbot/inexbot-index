import React, { useState, useEffect } from 'react';
import API from "components/API/api";
import Banner from './index/banner/index.jsx';
import Solution from './index/solution/index.jsx';
import Product from "./index/product/index.jsx";
import InexbotIntroduce from "./index/inexbotIntroduce/index.jsx";
import ServiceSupport from "./index/serviceSupport/index.jsx";
import "./index.css"

function Connect(props) {
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);
  const [BannerHeight, setBannerHeight] = useState(document.body.clientHeight);
  const [TypeList, setTTyoeList] = useState(props.TypeList);
  const [productList, setProductList] = useState(null);

  // 实时更新页面的宽度和高度
  useEffect(() => {
    setBannerWidth(props.BannerWidth);
    setBannerHeight(props.BannerHeight);
  }, [props.BannerWidth,props.BannerHeight,]);

  // 更新layouts页面获取到的总数据
  useEffect(()=>{
    setTTyoeList(props.TypeList)
  },[props.TypeList])

  // 获取新闻列表和产品中心列表
  useEffect(()=>{
    API.getNewslist().then(res=>{
      console.log(res)
      setProductList(res)
    })
  },[])
  return (
    <div>
      {/* banner图 */}
      <div className="banner">
        <Banner BannerHeight={BannerHeight} BannerWidth={BannerWidth}  />
      </div>
      {/* 解决方案 */}
      <div className="solution">
        <Solution BannerHeight={BannerHeight} BannerWidth={BannerWidth} />
      </div>
      <div className="product">
        <Product BannerHeight={BannerHeight} BannerWidth={BannerWidth} TypeList={TypeList} productList={productList} />
      </div>
      {/* 产品介绍 */}
      <div className="InexbotIntroduce">
        <InexbotIntroduce BannerHeight={BannerHeight} BannerWidth={BannerWidth} TypeList={TypeList} />
      </div>
      {/* 服务支持 */}
      <div className="ServiceSupport">
        <ServiceSupport BannerHeight={BannerHeight} BannerWidth={BannerWidth} TypeList={TypeList} />
      </div>
    </div>
  );
}

export default Connect;
