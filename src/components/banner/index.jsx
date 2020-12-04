import React, { useState, useEffect } from 'react';
import style from "./index.module.less";


function Banner(props){
  useEffect(()=>{
    console.log(props)
  },[])
  return(
    <div className={style.Banner}>
      <img src={`${props.bannerImg}`} title="" />
      <p className={style.banner_txt_ch}> 常见问题 </p>
      <p className={style.banner_txt_en}> FREQUENTLY  ASKED QUESTIONS </p>
    </div>
  )
}

export default Banner;