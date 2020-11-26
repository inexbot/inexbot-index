import React, { useState, useEffect } from 'react';
import API from 'components/API/api';
import Header from 'components/header/index.jsx';
import { Footer } from 'components/footer/index.jsx';
import style from './index.module.less';

function App(props) {
  const [TypeList, setTypeList] = useState(null);
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);
  const [BannerHeight, setBannerHeight] = useState(document.body.clientHeight);
  const [headerBgc, setHeaderBgc] = useState('');

  useEffect(() => {
    API.getTypeList().then(res => {
      setTypeList(res);
      console.log(res)
    });
    window.onresize = function() {
      setBannerWidth(document.body.clientWidth);
      setBannerHeight(document.body.clientHeight);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', function(e) {
      if (e.srcElement.documentElement.scrollTop + 60 > BannerHeight) {
        setHeaderBgc('#1c3e5a');
      } else {
        setHeaderBgc('');
      }
    });
  }, [BannerHeight]);

  return (
    <div className="App">
      {/* 主页头部,Header组件*/}
      <div className={style.Header} style={{ background: headerBgc }}>
        <Header
          TypeList={TypeList}
          BannerHeight={BannerHeight}
          BannerWidth={BannerWidth}
        />
      </div>
      {/* 中间内容 */}
      <div className="content">
        {React.Children.map(props.children, child => {
          return React.cloneElement(child, {
            TypeList: TypeList,
            BannerHeight: BannerHeight,
            BannerWidth: BannerWidth,
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
