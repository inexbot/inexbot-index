import React, {useState, useEffect} from "react";
import { useHistory } from "umi";


function Content(props){

  const history = useHistory();

  useEffect(()=>{
    console.log(props.newsContent,props,"news页面")
    if( props.newsContent === null ){
      return;
    }
    if( props.location.query.id === null || props.location.query.id === undefined ){
      props.setNewsListChildren(props.newsContent[0])
    }else if( props.location.query.id === "" ){
      props.setNewsListChildren(props.newsContent[0])
      return;
    }else{
      props.newsContent.map((item,index)=>{
        if(item.aid === Number(props.location.query.id)){
          props.setNewsListChildren(item)
          console.log(item)
        }
      })
    }
  },[props.newsContent,props.location.query])

  return(
    <div className="newlist_children" >
    <div
      dangerouslySetInnerHTML={ props.newsListChildren===null?{__html:"<div></div>"}
      :{ __html: props.newsListChildren.body }}>
    </div>
    </div>
  )
}

export default Content;



