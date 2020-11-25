import React, { useState, useEffect } from "react";
import API from "components/API/api";
import style from "./index.module.less";


function NewsInformation(props){
  const [DataList, setDataList] = useState(null);
  const [newsSelect, setNewsSelect] = useState("news");
  useEffect(()=>{
    let dataList = {news:[],dms:[]};
    if( props.inpormation !== null ){
      for(let i=0; i<props.inpormation.list.length; i++){
        if(props.inpormation.list[i].typeid === 8){
          dataList.news.push(props.inpormation.list[i])
        }else if(props.inpormation.list[i].typeid === 9){
          dataList.dms.push(props.inpormation.list[i])
        }
      }
      console.log(dataList)
      setDataList(dataList)
    }
  },[props.inpormation])

  return(
    <div className={style.NewsInformation} style={{padding:`0 ${(props.BannerWidth-1280)/2.6}px`}}>
      <div className={style.NewsInformation_top}>
        <p> 新闻资讯 </p>
        <p> NEWSINFORMATION </p>
      </div>
      <div className={style.NewsInformation_select}>
        <ul>
          <li>
            <a className={newsSelect === "news"? style.hoverNewsInformationTbs:style.NewsInformationTbs} onClick={()=>{setNewsSelect("news")}} >公司新闻 <span></span></a>
          </li>
          <li>
            <a className={newsSelect === "dms"? style.hoverNewsInformationTbs:style.NewsInformationTbs} onClick={()=>{setNewsSelect("dms")}} >行业动态 <span></span></a>
          </li>
        </ul>
      </div>
      <div className={style.NewsInformation_bottom}>
        <div className={style.NewsInformation_bottom_l}>
          {DataList === null? "": 
            <div className={style.NewsInformation_content_l}>
              <img src={`https://inexbot.com${DataList[newsSelect][0].litpic}`} alt=""/>
              <p> {DataList[newsSelect][0].title} </p>
            </div>
          }
        </div>
        <div className={style.NewsInformation_bottom_r}>
          {DataList === null? "": DataList[newsSelect].map((item,index)=>{
            return (
              <div className={style.NewsInformation_content_r} style={index ===0?{display:"none"}:index === 1?{}:{marginTop:"10px"}}>
                <img src={`${DataList[newsSelect][index].litpic}`} alt=""/>
                <div>
                  <p> {DataList[newsSelect][index].title} </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NewsInformation