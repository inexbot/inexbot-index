import React, { useState, useEffect } from 'react';
import style from './index.module.less';

function Banner(props) {
  return (
    <div
      className={style.BannerAll}
      style={{
        background: `url(${props.data.BannerImg}) ${props.data.BannerLeft} repeat`,
        backgroundSize: props.data.BannerSize,
      }}
    >
      <div className={style.model}></div>
      <div className={style.Banner}>
        <p className={style.banner_txt_ch}> {props.data.TxtCh} </p>
        <p className={style.banner_txt_en}> {props.data.TxtEn} </p>
      </div>
    </div>
  );
}

export default Banner;
