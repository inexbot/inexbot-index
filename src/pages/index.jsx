import React, { useState, useEffect } from 'react';
import Banner from './index/banner/index.jsx';
import Solution from './index/solution/index.jsx';
import Product from "./index/product/index.jsx";
import { Footer } from '../components/footer/index.jsx';

function Connect(props) {
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);
  const [BannerHeight, setBannerHeight] = useState(document.body.clientHeight);

  useEffect(() => {
    setBannerWidth(props.BannerWidth);
    setBannerHeight(props.BannerHeight);
  }, [props.BannerWidth,props.BannerHeight,]);

  useEffect(()=>{
    
  },[props.TypeList])
  return (
    <div>
      {/* banner图 */}
      <div className="banner">
        <Banner BannerHeight={BannerHeight} BannerWidth={BannerWidth} />
      </div>
      {/* 解决方案 */}
      <div className="solution">
        <Solution BannerHeight={BannerHeight} BannerWidth={BannerWidth} />
      </div>
      <div className="product">
        <Product BannerHeight={BannerHeight} BannerWidth={BannerWidth} />
      </div>
      {/*  */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Connect;
