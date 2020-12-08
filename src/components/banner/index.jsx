import React, { useState, useEffect } from 'react';
import style from "./index.module.less";


function Banner(props){
  useEffect(()=>{
    console.log(props)
  },[])
  return(
    <div className={style.BannerAll} style={{ height:`${props.data.Height}px`,background:`url(${props.data.BannerImg}) 0 -200px`,backgroundSize:"100%" }}>
      <div className={style.model} ></div>
      <div className={style.Banner} >
        <p className={style.banner_txt_ch}> {props.data.TxtCh} </p>
        <p className={style.banner_txt_en}> {props.data.TxtEn} </p>
      </div>
    </div>
  )
}

export default Banner;