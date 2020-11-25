import React, { useState, useEffect } from "react";
import API from "components/API/api";
import {Button} from "antd"
import style from "./index.module.less";

function partner(props){
  const [contentList, setContentList] = useState(null);
  useEffect(()=>{
    console.log(props.productList)
    let dataList = [];
    if( props.productList !== null ){
      for(let i=0; i<props.productList.list.length; i++){
        if(props.productList.list[i].typeid === 54){
          dataList.push(props.productList.list[i])
        }
      }
    }
    setContentList(dataList);
  },[props.productList])
  return(
    <div className={style.partner} style={{padding:`0 ${(props.BannerWidth-1280)/2.6}px`}}>
      <div className={style.partner_top}>
        <p> 合作伙伴 </p>
        <p> PARTNER </p>
      </div>
      <p > 我们定期提供最新软件升级包、操作手册以及相关文档。 </p>
      { contentList === null? "" :
        <div className={style.partner_content}>
          {contentList.slice(0,20).map((item,index)=>{
            return(
              <div key={index} className={style.partner_photo}> 
                <img src={item.litpic} alt=""/>
                <span></span>
              </div>
            )
          })}
        </div>
      }
      <div className={style.partner_bottom}>
        <Button ghost style={{borderRadius:"10px",height:"44px",width:"239px"}}>更多合作伙伴</Button>
      </div>
    </div>
  )
}

export default partner