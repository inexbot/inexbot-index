import React, { useState, useEffect } from "react";
import {Carousel,Button } from "antd";
import API from "API/api";
import style from "./index.module.less";
import {LeftOutlined , RightOutlined } from "@ant-design/icons"
import banner1 from "images/banner1.jpg";
import banner2 from "images/banner2.jpg";
import banner3 from "images/banner3.jpg";

function Banner(props){
  const [CarouselRef,setCarouselRef ] = useState(null);
  // 初始获取图片上的文字
  useEffect(()=>{
    API.getBannerTxt().then(res=>{
      console.log(res)
    })
  },[])

  return(
    <div className={style.banner} style={{ width:`${props.BannerWidth}px`,height:`${props.BannerHeight}px` }}>
      <Carousel
        // autoplay
        ref={ el =>setCarouselRef(el)}
        dots={false}
      >
        <div >
          <div className={style.banner1}  style={{ background: `url(${banner1}) no-repeat ${-( 1919 - props.BannerWidth )/2}px ` ,padding:`0 ${(props.BannerWidth-1280)/2}px` }}>
            <LeftOutlined onClick={()=>{CarouselRef.prev()}} className={style.LectOutlined} style={{ left:`${(props.BannerWidth-1280)/1.8}px`,top:`${(props.BannerHeight)/2}px` }}/>
            <RightOutlined onClick={()=>{CarouselRef.next()}} className={style.RightOutlined} style={{ right:`${(props.BannerWidth-1280)/1.8}px`,top:`${(props.BannerHeight)/2}px` }}/>
            <div className={style.Btmbtn}>
              <p></p>
            </div>
          </div>
        </div>
        <div>
          <div className={style.banner2} style={{ background: `url(${banner2}) no-repeat ${-( 1919 - props.BannerWidth )/2}px`,padding:`0 ${(props.BannerWidth-1280)/2}px` }}>
            <LeftOutlined onClick={()=>{CarouselRef.prev()}} className={style.LectOutlined} style={{ left:`${(props.BannerWidth-1280)/1.8}px`,top:`${(props.BannerHeight)/2}px` }}/>
            <RightOutlined onClick={()=>{CarouselRef.next()}} className={style.RightOutlined} style={{ right:`${(props.BannerWidth-1280)/1.8}px`,top:`${(props.BannerHeight)/2}px` }}/>
            <div className={style.Btmbtn}>
              <p></p>
            </div>
          </div>
        </div>
        <div>
          <div className={style.banner3} style={{ background: `url(${banner3}) no-repeat ${-( 1919 - props.BannerWidth )/2}px`,padding:`0 ${(props.BannerWidth-1280)/2}px` }}>
            <LeftOutlined onClick={()=>{CarouselRef.prev()}} className={style.LectOutlined} style={{ left:`${(props.BannerWidth-1280)/1.8}px`,top:`${(props.BannerHeight)/2}px` }}/>
            <RightOutlined onClick={()=>{CarouselRef.next()}} className={style.RightOutlined} style={{ right:`${(props.BannerWidth-1280)/1.8}px`,top:`${(props.BannerHeight)/2}px` }}/>
            <div className={style.Btmbtn}>
              <p></p>
            </div>
          </div>
        </div>
      </Carousel >,
    </div>
  )
}

export default Banner;