import React, { useState, useEffect } from "react";
import API from "components/API/api";
import style from "./index.module.less";


function NewsInformation(props){
  const [DataList, setDataList] = useState(null);
  const [newsSelect, setNewsSelect] = useState("company");
  const [TypeList, setTypeList] = useState(null);
  useEffect(()=>{
    let dataList = {company:[],industry:[]};
    if( props.inpormation !== null ){
      for(let i=0; i<props.inpormation.list.length; i++){
        if(props.inpormation.list[i].typeid === 8){
          dataList.company.push(props.inpormation.list[i])
        }else if(props.inpormation.list[i].typeid === 9){
          dataList.industry.push(props.inpormation.list[i])
        }
      }
      setDataList(dataList)
    }
  },[props.inpormation])

  useEffect(()=>{
    if( props.TypeList !== null ){
      props.TypeList.map((item,index)=>{
        if( item.id === 7 ){
          setTypeList(item)
        }
      })
    }
  },[props.TypeList])

  return(
    <div className={style.NewsInformation} style={ props.BannerWidth> 1200? {padding:`0 ${(props.BannerWidth-1200)/2.6}px`,height:"1040px"}:{}}>
      <div className={style.NewsInformation_top}>
        <p> {TypeList === null? "":TypeList.typename} </p>
        <p> {TypeList === null? "":TypeList.typenameen} </p>
      </div>
      <div className={style.NewsInformation_select}>
        <ul>
          <li>
            <a className={newsSelect === "company"? style.hoverNewsInformationTbs:style.NewsInformationTbs} onClick={()=>{setNewsSelect("company")}} > {TypeList === null? "":TypeList.sublist[0].typename} <span></span></a>
          </li>
          <li>
            <a className={newsSelect === "industry"? style.hoverNewsInformationTbs:style.NewsInformationTbs} onClick={()=>{setNewsSelect("industry")}} >{TypeList === null? "":TypeList.sublist[1].typename} <span></span></a>
          </li>
        </ul>
      </div>
      <div className={style.NewsInformation_bottom}>
        <div className={style.NewsInformation_bottom_l}>
          {DataList === null? "": 
            <div className={style.NewsInformation_content_l} key={0} onClick={()=>{
             location.href = `/news/${newsSelect}/${DataList[newsSelect][0].id}.html`;
            }}>
              <img src={`${DataList[newsSelect][0].litpic}`} alt=""/>
              <p> {DataList[newsSelect][0].title} </p>
              <span className={style.NewsInformation_content_txt1}> {DataList[newsSelect][0].description.slice(0,49)} </span>
              <span className={style.NewsInformation_content_txt2} style={ props.BannerWidth > 1200?  DataList[newsSelect][0].description.length>49?{display:"block"} : {display:"none"} : {display:"none"}}>{DataList[newsSelect][0].description.slice(49,99)}</span>
              <span className={style.NewsInformation_content_txt3} style={ props.BannerWidth > 1200?  DataList[newsSelect][0].description.length>99?{display:"block"}: {display:"none"} : {display:"none"}}>{DataList[newsSelect][0].description.slice(99)}</span>
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
          <div >
            {DataList === null? "": DataList[newsSelect].slice(0,6).map((item,index)=>{
              return (
                <div key={index} className={style.NewsInformation_content_r} style={index ===0?{display:"none"}:index === 1?{}:{marginTop:"10px"}} onClick={()=>{
                  location.href = `/news/${newsSelect}/${item.id}.html`;
                }}>
                  <img src={`${item.litpic}`} alt=""/>
                  <div>
                    <p> {item.title} </p>
                    <span className={style.NewsInformation_content_txt1}> { item.id===241? item.description.slice(0,40):item.description.slice(0,22)} </span>
                    <span className={style.NewsInformation_content_txt2} style={ props.BannerWidth > 1200? item.id===241?item.description.length>40?{display:"block"} :{display:"none"}:item.description.length<22?{display:"none"}:{display:"block"}:{display:"none"}}>
                      {item.id===241? item.description.slice(40):item.description.slice(22)}
                    </span>
                    <span className={style.NewsInformation_content_date} >{`
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
    </div>
  )
}

export default NewsInformation