import React, { useRef, useState } from 'react';
import { Carousel } from 'antd';
import style from './index.module.less';
import API from 'components/API/api';
import { useEffect } from 'react';

function Banner(props) {
  const [bannerTxt, setBannertxt] = useState(null);
  const [bannerChangeNum, setBannerChangeNum] = useState(0);

  let carousel = useRef(null);

  // 初始获取图片上的文字
  useEffect(() => {
    API.getBannerTxt().then(res => {
      let DataList = {};
      res.list.map((item, index) => {
        if (item.aid === 11) {
          DataList.banner1ch = item.title;
          DataList.banner1en = item.introduce;
        } else if (item.aid === 12) {
          DataList.banner2ch = item.title;
          DataList.banner2en = item.introduce;
        } else if (item.aid === 15) {
          DataList.banner3ch = item.title;
          DataList.banner3en = item.introduce;
        }
      });
      setBannertxt(DataList);
    });
  }, []);

  const bannerChange = (from, to) => {
    setBannerChangeNum(to);
  };

  let banner1 =
    'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner1.jpg';
  let banner1Video =
    'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner1.mp4';
  let banner2 =
    'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner2.jpg';
  let banner2Video =
    'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner2.mp4';
  let banner3 =
    'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner3.jpg';
  let banner3Video =
    'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner3.mp4';
  return (
    <div
      className={style.banner}
      style={
        props.BannerWidth > 1200
          ? { boxSizing: 'border-box', height: document.body.clientHeight }
          : {}
      }
    >
      <div className={style.Btmbtn}>
        <p></p>
      </div>
      <Carousel
        autoplay
        beforeChange={bannerChange}
        ref={carousel}
        autoplaySpeed={8000}
      >
        <div className={style.banner1}>
          {props.BannerWidth < 1200 ? (
            <div>
              <img
                src={banner1}
                alt=""
                style={{
                  height: '100vh',
                  width: '292vw',
                }}
              />
              <span
                className={
                  bannerChangeNum === 0
                    ? style.banner1_txt_ch
                    : style.banner1_txt_ch_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner1ch} </p>` }
                }
              ></span>
              <span
                className={
                  bannerChangeNum === 0
                    ? style.banner1_txt_en
                    : style.banner1_txt_en_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner1en} </p>` }
                }
              ></span>
            </div>
          ) : (
            <div
              className={style.banner1}
              style={
                props.BannerWidth > 1200
                  ? {
                      // background: `url(${banner1}) no-repeat 50% `,
                      height: '100vh',
                      position: 'relative',
                    }
                  : {
                      // background: `url(${banner1}) no-repeat ${-(
                      //   1919 - '100vw'
                      // ) / 2}px `,
                      position: 'relative',
                    }
              }
            >
              <video
                autoPlay
                loop
                muted
                preload="auto"
                playsInline
                webkit-playsinline="true"
                x5-video-player-type="h5"
                x5-video-orientation="portraint"
                src={banner1Video}
              ></video>
              <span
                className={
                  bannerChangeNum === 0
                    ? style.banner1_txt_ch
                    : style.banner1_txt_ch_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner1ch} </p>` }
                }
              ></span>
              <span
                className={
                  bannerChangeNum === 0
                    ? style.banner1_txt_en
                    : style.banner1_txt_en_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner1en} </p>` }
                }
              ></span>
            </div>
          )}
        </div>
        <div className={style.banner2}>
          {props.BannerWidth < 1200 ? (
            <div>
              <img
                src={banner2}
                alt=""
                style={{
                  height: '100vh',
                  width: '292vw',
                }}
              />
              <span
                className={
                  bannerChangeNum === 1
                    ? style.banner2_txt_ch
                    : style.banner2_txt_ch_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner2ch} </p>` }
                }
              ></span>
              <span
                className={
                  bannerChangeNum === 1
                    ? style.banner2_txt_en
                    : style.banner2_txt_en_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner2en} </p>` }
                }
              ></span>
            </div>
          ) : (
            <div
              className={style.banner2}
              style={
                props.BannerWidth > 1200
                  ? {
                      // background: `url(${banner2}) no-repeat 50% `,
                      height: '100vh',
                      position: 'relative',
                    }
                  : {
                      // background: `url(${banner2}) no-repeat ${-(
                      //   1919 - '100vw'
                      // ) / 2}px `,
                      position: 'relative',
                    }
              }
            >
              <video
                autoPlay
                loop
                muted
                preload="auto"
                playsInline
                webkit-playsinline="true"
                x5-video-player-type="h5"
                x5-video-orientation="portraint"
                src={banner2Video}
              ></video>
              <span
                className={
                  bannerChangeNum === 1
                    ? style.banner2_txt_ch
                    : style.banner2_txt_ch_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner2ch} </p>` }
                }
              ></span>
              <span
                className={
                  bannerChangeNum === 1
                    ? style.banner2_txt_en
                    : style.banner2_txt_en_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner2en} </p>` }
                }
              ></span>
            </div>
          )}
        </div>
        <div className={style.banner3}>
          {props.BannerWidth < 1200 ? (
            <div>
              <img
                src={banner3}
                alt=""
                style={{
                  height: '100vh',
                  width: '292vw',
                }}
              />
              <span
                className={
                  bannerChangeNum === 2
                    ? style.banner3_txt_ch
                    : style.banner3_txt_ch_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner3ch} </p>` }
                }
              ></span>
              <span
                className={
                  bannerChangeNum === 2
                    ? style.banner3_txt_en
                    : style.banner3_txt_en_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner3en} </p>` }
                }
              ></span>
            </div>
          ) : (
            <div
              className={style.banner3}
              style={
                props.BannerWidth > 1200
                  ? {
                      // background: `url(${banner3}) no-repeat 50% `,
                      height: '100vh',
                      position: 'relative',
                    }
                  : {
                      // background: `url(${banner3}) no-repeat ${-(
                      //   1919 - '100vw'
                      // ) / 2}px `,
                      position: 'relative',
                    }
              }
            >
              <video
                autoPlay
                loop
                muted
                preload="auto"
                playsInline
                webkit-playsinline="true"
                x5-video-player-type="h5"
                x5-video-orientation="portraint"
                src={banner3Video}
              ></video>
              <span
                className={
                  bannerChangeNum === 2
                    ? style.banner3_txt_ch
                    : style.banner3_txt_ch_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner3ch} </p>` }
                }
              ></span>
              <span
                className={
                  bannerChangeNum === 2
                    ? style.banner3_txt_en
                    : style.banner3_txt_en_hover
                }
                dangerouslySetInnerHTML={
                  bannerTxt === null
                    ? { __html: '<div></div>' }
                    : { __html: `<p> ${bannerTxt.banner3en} </p>` }
                }
              ></span>
            </div>
          )}
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
