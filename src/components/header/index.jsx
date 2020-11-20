import React, { useState, useEffect } from "react";
import API from "components/API/api";
import style from "./index.module.less";
import {SearchOutlined , } from "@ant-design/icons"
import { Button, Popconfirm} from "antd";
import intl from "react-intl-universal";

function Header(props){
  const [headerList, setHeaderList] = useState([]);
  const [headerIndex, setHeaderIndex]= useState(0);
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);
  const [BannerHeight, setBannerHeight] = useState(document.body.clientHeight);

  window.onresize = function(){
    setBannerWidth(document.body.clientWidth)
    setBannerHeight(document.body.clientHeight)
  };
  return (
    <div className={style.header} style={{ width:BannerWidth, padding:`0 ${(BannerWidth-1280)/2}px` }}>
      <h1>
        <a>
          <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/logo.png" ></img>
          <span>纳博特科技</span>
        </a>
      </h1>
      <ul className={style.header_list}>
        {/* { props.headerList.map((item,Index)=>{
          return(
            <li key={Index} >
              <a  >{item.typename} <span></span></a>
            </li>
          )
        })} */}
      </ul>
      <div className={style.header_txt}>
        <a style={{fontSize: "15px",color:"white"}}> 中文 </a>
        <span >&nbsp; / &nbsp;</span>
        <a style={{fontSize:"14px",color:"#a5b3be"}}> EN </a>
      </div>
      <div className={style.top_sousuo} style={{ position:"relative" }}>
        <a className={style.icon_sousuo} ><SearchOutlined  /></a>
        <input className={style.icon_sousuo_ipt} />
        <span></span>
      </div>
      
    </div>
  )
}

export default Header;