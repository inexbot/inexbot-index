import React, { useState, useEffect } from 'react';
import API from 'components/API/api';
import Header from 'components/header/index.jsx';
import { Footer } from 'components/footer/index.jsx';
import style from './index.module.less';

function App(props) {
  const [TypeList, setTypeList] = useState(null);
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);
  const [BannerHeight, setBannerHeight] = useState(document.body.clientHeight);
  const [productList, setProductList] = useState(null);
  const [headerTopSelect, setHeaderTopSelect] = useState("/");

  useEffect(() => {
    // 获取总数据
    API.getTypeList().then(res => {
      setTypeList(res);
    });
    // 获取新闻列表,合作伙伴和产品中心列表
    API.getNewslist().then(res=>{
      setProductList(res)
    })
    window.onresize = function() {
      setBannerWidth(document.body.clientWidth);
      setBannerHeight(document.body.clientHeight);
    };
  }, []);

  useEffect(()=>{
    setHeaderTopSelect(props.location.pathname)
  },[props.location.pathname])

  return (
    <div className={style.App}>
      {/* 主页头部,Header组件*/}
      <div className={style.Header}>
        <Header
          TypeList={TypeList}
          BannerHeight={BannerHeight}
          BannerWidth={BannerWidth}
          headerTopSelect={headerTopSelect}
        />
      </div>
      {/* 中间内容 */}
      <div className="content">
        {React.Children.map(props.children, child => {
          return React.cloneElement(child, {
            TypeList: TypeList,
            BannerHeight: BannerHeight,
            BannerWidth: BannerWidth,
            productList:productList,
          });
        })}
      </div>
      {/* 主页页脚，footer组件 */}
      <div>
        <Footer typeList={TypeList} />
      </div>
    </div>
  );
}

export default App;
