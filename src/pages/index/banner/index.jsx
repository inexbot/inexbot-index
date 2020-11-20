import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Button } from 'antd';
import API from 'components/API/api';
import style from './index.module.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function Banner(props) {
  let carousel = useRef(null);
  // 初始获取图片上的文字
  let banner1 =
    'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner1.jpg';
  let banner2 =
    'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner2.jpg';
  let banner3 =
    'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner3.jpg';
  return (
    <div className={style.banner} style={{ boxSizing: 'border-box' }}>
      <Carousel
        // autoplay
        ref={carousel}
        dots={false}
      >
        <div>
          {/* <div className={style.banner1}  style={{ background: `url(${banner1}) no-repeat ${-( 1919 - props.BannerWidth )/2}px `,height:props.BannerHeight  }}> */}
          <div
            className={style.banner1}
            style={{
              background: `url(${banner1}) no-repeat 50% `,
              height: props.BannerHeight,
            }}
          >
            <LeftOutlined
              onClick={() => {
                carousel.current.prev();
              }}
              className={style.LectOutlined}
              style={{
                left: `${(props.BannerWidth - 1280) / 1.8}px`,
                top: `${props.BannerHeight / 2}px`,
              }}
            />
            <RightOutlined
              onClick={() => {
                carousel.current.next();
              }}
              className={style.RightOutlined}
              style={{
                right: `${(props.BannerWidth - 1280) / 1.8}px`,
                top: `${props.BannerHeight / 2}px`,
              }}
            />
            <div className={style.Btmbtn}>
              <p></p>
            </div>
          </div>
        </div>
        <div>
          <div
            className={style.banner2}
            style={{
              background: `url(${banner2}) no-repeat ${-(
                1919 - props.BannerWidth
              ) / 2}px`,
            }}
          >
            <LeftOutlined
              onClick={() => {
                carousel.current.prev();
              }}
              className={style.LectOutlined}
              style={{
                left: `${(props.BannerWidth - 1280) / 1.8}px`,
                top: `${props.BannerHeight / 2}px`,
              }}
            />
            <RightOutlined
              onClick={() => {
                carousel.current.next();
              }}
              className={style.RightOutlined}
              style={{
                right: `${(props.BannerWidth - 1280) / 1.8}px`,
                top: `${props.BannerHeight / 2}px`,
              }}
            />
            <div className={style.Btmbtn}>
              <p></p>
            </div>
          </div>
        </div>
        <div>
          <div
            className={style.banner3}
            style={{
              background: `url(${banner3}) no-repeat ${-(
                1919 - props.BannerWidth
              ) / 2}px`,
            }}
          >
            <LeftOutlined
              onClick={() => {
                carousel.current.prev();
              }}
              className={style.LectOutlined}
              style={{
                left: `${(props.BannerWidth - 1280) / 1.8}px`,
                top: `${props.BannerHeight / 2}px`,
              }}
            />
            <RightOutlined
              onClick={() => {
                carousel.current.next();
              }}
              className={style.RightOutlined}
              style={{
                right: `${(props.BannerWidth - 1280) / 1.8}px`,
                top: `${props.BannerHeight / 2}px`,
              }}
            />
            <div className={style.Btmbtn}>
              <p></p>
            </div>
          </div>
        </div>
      </Carousel>
      ,
    </div>
  );
}

export default Banner;
