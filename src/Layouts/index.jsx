import React, { useState, useEffect } from 'react';
import API from 'API/api';
import Header from 'components/header/index.jsx';
import Banner from 'components/banner/index.jsx';
import Solution from 'components/solution/index.jsx';
import style from './index.module.less';
function App(props) {
  const [headerList, setHeaderList] = useState([]);
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);
  const [BannerHeight, setBannerHeight] = useState(document.body.clientHeight);
  const [headerSonList] = useState([[], [], [], [], [], [], [], []]);
  useEffect(() => {
    console.log(API);
    API.getPermissions().then(res => {
      let dataList = [];
      for (let i = 0; i < res.list.length; i++) {
        if (res.list[i].reid === 0) {
          dataList.push(res.list[i]);
        } else if (res.list[i].reid === 25) {
          headerSonList[1].push(res.list[i]);
        } else if (res.list[i].reid === 14) {
          headerSonList[2].push(res.list[i]);
        } else if (res.list[i].reid === 34) {
          headerSonList[3].push(res.list[i]);
        } else if (res.list[i].reid === 7) {
          headerSonList[5].push(res.list[i]);
        } else if (res.list[i].reid === 1) {
          headerSonList[6].push(res.list[i]);
        }
      }
      dataList.splice(8);
      setHeaderList(dataList);
    });
  }, []);

  window.onresize = function() {
    setBannerWidth(document.body.clientWidth);
    setBannerHeight(document.body.clientHeight);
  };

  return (
    <div className="App">
      {/* 顶部状态栏，加载Header组件*/}
      <div className={style.Header}>
        <Header
          headerList={headerList}
          headerSonList={headerSonList}
          BannerWidth={BannerWidth}
        />
      </div>
      {/* banner图 */}
      <div className="banner">
        <Banner BannerHeight={BannerHeight} BannerWidth={BannerWidth} />
      </div>
      {/* 解决方案 */}
      <div className="solution">
        <Solution BannerHeight={BannerHeight} BannerWidth={BannerWidth} />
      </div>
    </div>
  );
}

export default App;
