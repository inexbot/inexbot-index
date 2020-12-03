import React, { useRef, useState } from 'react';
import { Carousel, Button } from 'antd'
import style from './index.module.less';
import API from "components/API/api";
import { useEffect } from 'react';

function Banner(props) {
  const [TypeList, setTypeList] = useState(null);
  const [bannerTxt, setBannertxt] = useState(null);
  const [bannerChangeNum,setBannerChangeNum] = useState(0);

  let carousel = useRef(null);

  useEffect(()=>{
    API.getBannerTxt().then(res=>{
      console.log(res,"这里是banner图")
      let DataList = {};
      res.list.map((item,index)=>{
        if(item.aid === 11){
          DataList.banner1ch = item.title;
          DataList.banner1en = item.introduce;
        }else if(item.aid === 12){
          DataList.banner2ch = item.title;
          DataList.banner2en = item.introduce;
        }else if(item.aid === 15){
          DataList.banner3ch = item.title;
          DataList.banner3en = item.introduce;
        }
      })
      console.log(DataList);
      setBannertxt(DataList);
    })
  },[])

  const bannerChange=(num)=>{
    console.log(num)
    setBannerChangeNum(num)
  }

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
      <div className={style.Btmbtn}>
        <p></p>
      </div>
      <Carousel
      //  autoplay
      afterChange={bannerChange}
       ref={carousel} >
        <div className={style.banner1}>
        {  props.BannerWidth< 1200 ?
              <img  src={banner1} alt="" style={{
                height:props.BannerHeight, width:"292vw"
              }} />
              :
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
          <span className={bannerChangeNum===0?style.banner1_txt_ch :style.banner1_txt_ch_hover} dangerouslySetInnerHTML={  bannerTxt === null? {__html:"<div></div>"} :{ __html:`<p> ${bannerTxt.banner1ch} </p>` }}>
          </span>
          <span className={bannerChangeNum===0?style.banner1_txt_en :style.banner1_txt_en_hover} dangerouslySetInnerHTML={  bannerTxt === null? {__html:"<div></div>"} :{ __html:`<p> ${bannerTxt.banner1en} </p>` }}>
          </span>
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
          <span className={bannerChangeNum===1?style.banner2_txt_ch :style.banner2_txt_ch_hover} dangerouslySetInnerHTML={  bannerTxt === null? {__html:"<div></div>"} :{ __html:`<p> ${bannerTxt.banner2ch} </p>` }}>
          </span>
          <span className={bannerChangeNum===1?style.banner2_txt_en :style.banner2_txt_en_hover} dangerouslySetInnerHTML={  bannerTxt === null? {__html:"<div></div>"} :{ __html:`<p> ${bannerTxt.banner2en} </p>` }}>
          </span>
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
            <span className={bannerChangeNum===3?style.banner3_txt_ch :style.banner3_txt_ch_hover} dangerouslySetInnerHTML={  bannerTxt === null? {__html:"<div></div>"} :{ __html:`<p> ${bannerTxt.banner3ch} </p>` }}>
            </span>
            <span className={bannerChangeNum===3?style.banner3_txt_en :style.banner3_txt_en_hover} dangerouslySetInnerHTML={  bannerTxt === null? {__html:"<div></div>"} :{ __html:`<p> ${bannerTxt.banner3en} </p>` }}>
          </span>
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
