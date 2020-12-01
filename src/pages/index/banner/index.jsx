import React, { useRef } from 'react';
import { Carousel, Button } from 'antd'
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
    <div
      className={style.banner}
      style={ props.BannerWidth > 1200?{ boxSizing: 'border-box', height: document.body.clientHeight }:{}}
    >
            <LeftOutlined
              onClick={() => {
                carousel.current.prev();
              }}
              className={style.LectOutlined}
              style={{
                left: `${(props.BannerWidth - 1200) / 2.4}px`,
                top: `${props.BannerHeight / 2}px`,
              }}
            />
            <RightOutlined
              onClick={() => {
                carousel.current.next();
              }}
              className={style.RightOutlined}
              style={{
                right: `${(props.BannerWidth - 1200) / 2.2}px`,
                top: `${props.BannerHeight / 2}px`,
              }}
            />
            <div className={style.Btmbtn}>
              <p></p>
            </div>
      <Carousel
      //  autoplay
       ref={carousel} dots={false}>
        <div className={style.banner1}>
        {  props.BannerWidth< 1200 ? 
              <img  src={banner1} alt="" style={{
                height:props.BannerHeight, width:"292vw"
              }} />:
              <div
                className={style.banner1}
                style={ props.BannerWidth > 1200?{
                  background: `url(${banner1}) no-repeat 50% `,
                  height: props.BannerHeight,
                }:{background: `url(${banner1}) no-repeat ${-(
                  1919 - props.BannerWidth
                ) / 2}px `,}}
              >
              </div> 
           }
        </div>
        <div className={style.banner2}>
        {  props.BannerWidth< 1200 ? 
              <img  src={banner2} alt="" style={{
                height:props.BannerHeight, width:"292vw"
              }} />:
              <div
                className={style.banner2}
                style={ props.BannerWidth > 1200?{
                  background: `url(${banner2}) no-repeat 50% `,
                  height: props.BannerHeight,
                }:{background: `url(${banner2}) no-repeat ${-(
                  1919 - props.BannerWidth
                ) / 2}px `,}}
              >
              </div> 
           }
        </div>
        <div className={style.banner3}>
          {  props.BannerWidth< 1200 ? 
              <img  src={banner3} alt="" style={{
                height:props.BannerHeight, width:"292vw"
              }} />:
              <div
                className={style.banner3}
                style={ props.BannerWidth > 1200?{
                  background: `url(${banner3}) no-repeat 50% `,
                  height: props.BannerHeight,
                }:{background: `url(${banner3}) no-repeat ${-(
                  1919 - props.BannerWidth
                ) / 2}px `,}}
              >
              </div> 
           }
        </div>
      </Carousel>
      ,
    </div>
  );
}

export default Banner;
