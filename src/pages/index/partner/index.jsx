import React, { useState, useEffect } from "react";
import {Button} from "antd"
import style from "./index.module.less";
import bg_2 from "images/bg-2.jpg";

function partner(props){
  const [contentList, setContentList] = useState(null);
  const [TypeList, setTypeList] = useState(null);
  useEffect(()=>{
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

  useEffect(()=>{
    if( props.TypeList === null ){
      return;
    }
    for(let i=0; i<props.TypeList.length; i++){
      if(props.TypeList[i].id === 1){
        setTypeList(props.TypeList[i])
        console.log(props.TypeList[i],"合作伙伴")
      }
    }
  },[props.TypeList])

  return(
    <div className={style.partner} style={{padding:`0 ${(props.BannerWidth-1200)/2.6}px`,background:`url(${bg_2}) no-repeat`}}>
      <div className={style.partner_top}>
        <p> {TypeList=== null? "" : TypeList.sublist[1].typename} </p>
        <p> {TypeList=== null? "" : TypeList.sublist[1].typenameen} </p>
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