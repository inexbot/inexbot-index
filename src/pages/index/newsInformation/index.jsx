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
            <div className={style.NewsInformation_content_l} key={0}>
              <img src={`${DataList[newsSelect][0].litpic}`} alt=""/>
              <p> {DataList[newsSelect][0].title} </p>
              <span className={style.NewsInformation_content_txt1}> {DataList[newsSelect][0].description.slice(0,49)} </span>
              <span className={style.NewsInformation_content_txt2} style={DataList[newsSelect][0].description.length<49?{display:"none"}:{display:"block"}}>{DataList[newsSelect][0].description.slice(49,99)}</span>
              <span className={style.NewsInformation_content_txt3} style={DataList[newsSelect][0].description.length<99?{display:"none"}:{display:"block"}}>{DataList[newsSelect][0].description.slice(99)}</span>
              <span className={style.NewsInformation_content_date}>{`
              ${new Date((DataList[newsSelect][0].pubdate)*1000).getFullYear()} -
              ${new Date((DataList[newsSelect][0].pubdate)*1000).getMonth()+1 < 10?'0'+( new Date((DataList[newsSelect][0].pubdate)*1000).getMonth()+1) :new Date(DataList[newsSelect][0].pubdate*1000).getMonth()+1} -
              ${new Date((DataList[newsSelect][0].pubdate)*1000).getDate()<10? '0'+ new Date((DataList[newsSelect][0].pubdate)*1000).getDate() :new Date((DataList[newsSelect][0].pubdate)*1000).getDate()}
              `
                }</span>
            </div>
          }
        </div>
        <div className={style.NewsInformation_bottom_r}>
          {DataList === null? "": DataList[newsSelect].map((item,index)=>{
            return (
              <div key={index} className={style.NewsInformation_content_r} style={index ===0?{display:"none"}:index === 1?{}:{marginTop:"10px"}}>
                <img src={`${item.litpic}`} alt=""/>
                <div>
                  <p> {item.title} </p>
                  <span className={style.NewsInformation_content_txt1}> { item.id===241? item.description.slice(0,40):item.description.slice(0,22)} </span>
                  <span className={style.NewsInformation_content_txt2} style={item.id===241?item.description.length<40?{display:"none"}:{display:"block"}:item.description.length<22?{display:"none"}:{display:"block"}}>
                    {item.id===241? item.description.slice(40):item.description.slice(22)}
                  </span>
                  <span className={style.NewsInformation_content_date}>{`
                  ${new Date((item.pubdate)*1000).getFullYear()} -
                  ${new Date((item.pubdate)*1000).getMonth()+1 < 10?'0'+( new Date((item.pubdate)*1000).getMonth()+1) :new Date(item.pubdate*1000).getMonth()+1} -
                  ${new Date((item.pubdate)*1000).getDate()<10? '0'+ new Date((item.pubdate)*1000).getDate() :new Date((item.pubdate)*1000).getDate()}
                  `
                }</span>
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