import React, { useState, useEffect } from "react";
import API from "components/API/api";
import "./index.css"
import style from "./index.module.less";


function Product(props){
  const [productHedList, setProductHedList] = useState(null);
  const [productList, setProductList] = useState(null);
  const [productNum, setProductNum] = useState(0);
  const [productData] = useState([[],[],[],[],[]]);

  useEffect(()=>{
    // 更新产品中心的标签页
    if( props.TypeList !== null ){
      props.TypeList.map((item,index)=>{
        if( item.id === 14 ){
          setProductHedList(item)
        }
      })
    }
  },[props.TypeList])

  // 更新产品中心的主要数据
  useEffect(()=>{
    if( props.productList !== null ){
      let List = [];
      for(let i=0; i<props.productList.list.length;i++){
        if( props.productList.list[i].typeid === 15 || props.productList.list[i].typeid === 16 || props.productList.list[i].typeid === 17
           || props.productList.list[i].typeid === 18 || props.productList.list[i].typeid === 43  ){
          List.push(props.productList.list[i]);
        }
      }
      setProductList(List)
    }
  },[props.productList])

  // 点击切换主要产品
  useEffect(()=>{
    if( productList !== null ){
      for( let i=0; i<productList.length;i++ ){
        if(productList[i].typeid === 15){
          productData[0].push(productList[i])
        }else if(productList[i].typeid === 16){
          productData[1].push(productList[i])
        }else if(productList[i].typeid === 17){
          productData[2].push(productList[i])
        }else if(productList[i].typeid === 18){
          productData[3].push(productList[i])
        }else if(productList[i].typeid === 43){
          productData[4].push(productList[i])
        }
      }
    }
  },[productNum,productList])

  // 产品介绍数据
  useEffect(()=>{
    API.getProductIntroduce().then(res=>{
      setProductList(res.list[4].body)
    })
  },[])

  return(
    <div className={style.productAll} style={{padding:`0 ${(props.BannerWidth-1280)/2}px  200px ${(props.BannerWidth-1280)/2}px`}}>
      <div className={style.product_top}>
        <p> 产品中心 </p>
        <p> PRODUCT </p>
      </div>
      <p>  </p>
      <div className={style.product_hedlist}>
        { productHedList ===null?"":
           productHedList.sublist.map((item,index)=>{
            return(
              <li key={index} >
                <a className={productNum === index? style.hoverproductTbs:style.productTbs} onClick={()=>{setProductNum(index)}} >{item.typename} <span></span></a>
              </li>
            )
        })}  
      </div>
      <div className={style.product_center}>
      <div className={style.product_center_list} >
        { productData[0][0] === undefined? "" : productData[productNum].map((item,index)=>{
          if( (index+3)%3 === 0  ){
            return(
              <div key={index} className={style.product__center_l} style={index === 0 ?{}:{marginTop:"10px"}}>
                <p> {item.description} </p>
                <img src={`${item.litpic}`} alt=""/>
              </div>
            )
          }else if(  (index+2)%3 === 0){
            return(
              <div key={index} className={style.product__center_rt} style={index === 1 ?{}:{marginTop:"10px"}}>
                <img src={`${item.litpic}`} alt=""/>
                <p style={item.description.length>20?{width:"242px",overflow: "hidden",whiteSpace: "nowrap",textOverflow:"ellipsis"}
                :{ width:"100%",display:"flex",justifyContent:"center"}} >{item.description}</p>
              </div>
            )
          }else if( (index+1)%3 === 0 ){
            return(
              <div key={index} className={style.product__center_rb}>
                <img src={`${item.litpic}`} alt=""/>
                <p style={item.description.length>20?{width:"97%",overflow: "hidden",whiteSpace: "nowrap",textOverflow:"ellipsis",textIndent:"10px"}
                :{ width:"100%",display:"flex",justifyContent:"center"}} >{item.description}</p>
              </div>
            )
          }
        }) }
        </div>
      </div>
    </div>
  )
}

export default Product;
