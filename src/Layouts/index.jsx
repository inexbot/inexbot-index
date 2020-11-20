<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Header from 'components/header/index.jsx';
import style from './index.module.less';
=======
import React, { useState, useEffect } from "react";
import API from "API/api";
import intl from "react-intl-universal";
import Header from "components/header/index.jsx";
import style from  "./index.module.less";
>>>>>>> louwenkai

function App(props) {
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);

  window.onresize = function() {
    setBannerWidth(document.body.clientWidth);
    // setBannerHeight(document.body.clientHeight)
  };

  return (
<<<<<<< HEAD
    <div className="App">
      {/* 主页头部,Header组件*/}
      <div className={style.Header}>
        <Header BannerWidth={BannerWidth} />
      </div>
      {/* 中间内容 */}
      <div className="content">{props.children}</div>
    </div>
=======
      <div className="App">
        {/* 主页头部,Header组件*/}
        <div className={style.Header}>
          <Header BannerWidth={BannerWidth} />
        </div>
        {/* 中间内容 */}
        <div className="content">{props.children}</div>
      </div>
>>>>>>> louwenkai
  );
}

export default App;
