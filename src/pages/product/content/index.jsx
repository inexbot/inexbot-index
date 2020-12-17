import React, {useState, useEffect} from "react";
import { useHistory } from "umi";


function Content(props){

  const history = useHistory();
  useEffect(()=>{
    if( props.productDetailList === null ){
      return;
    }
    if( props.location.query.id === null || props.location.query.id === undefined ){
      props.setProductDetail(props.productDetailList[0])
    }else{
      props.productDetailList.map((Item,index)=>{
        if(Item.aid === Number(props.location.query.id)){
          props.setProductDetail(Item)
          if( props.productList !== null ){
            props.productList.list.map((item,index)=>{
              if( item.id === Item.aid){
                props.setProductDetailClick(item)
              }
            })
          }
        }
      })
    }
  },[props.location.query,props.productDetailList,props.productList])

  
  return(
      <div className="product_content_detail">
        <div className="detail_left">
          {props.productDetailClick === null? "" : 
            <dl className="detail_left_top">
              <dt> {props.productDetailClick.title} </dt>
              <dd> <img src={props.productDetailClick.litpic} alt=""/>  </dd>
            </dl>
          }
          <p> 产品简介 </p>
          <div className="product_content_detail_html"
            dangerouslySetInnerHTML={ props.productDetail===null?{__html:"<div></div>"}
            :{ __html: props.productDetail.body }}>
          </div>
        </div>
        <ul className="detail_right">
          {props.productData === null? "" :
            props.productData[[props.productNum[0]]].slice(0,props.productChildrenNum).map((item,index)=>{
              return(
                <li key={index} className="detail_right_list" onClick={()=>{
                  props.showProductDetail(item);
                  props.Upmove();
                }}>
                  <img src={item.litpic} alt=""/>
                  <p> {item.title} </p>
                </li>
              )
            })
          }
          <p onClick={()=>{
            props.Upmove();
            history.push({
              pathname:"/product/index",
              query: {type: props.productNum[0],num:props.productNum[1]},
            });
          }}> 更多产品 </p>
        </ul>
      </div> 
  )
}

export default Content;