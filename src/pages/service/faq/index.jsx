import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import style from './index.module.less';
import Banner from 'components/banner/index.jsx';

const mapStateToProps = state => {
  return {
    headerScroll: state.index.headerScroll,
  };
};

function Faq(props) {
  useEffect(() => {
    props.dispatch({
      type: 'index/setHeaderScroll',
      data: 500,
    });
  }, []);
  return (
    <div className={style.faq}>
      <Banner
        data={{
          BannerImg:
            'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner1.jpg',
          TxtCh: '常见问题',
          TxtEn: 'FREQUENTLY  ASKED QUESTIONS',
          Height: 500,
        }}
      ></Banner>
    </div>
  );
}

export default connect(mapStateToProps)(Faq);
