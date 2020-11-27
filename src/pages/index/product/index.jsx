import React, { useState, useEffect } from "react";
import "./index.css"
import style from "./index.module.less";


function Product(props){
  const [productHedList, setProductHedList] = useState(null);
  const [productNum, setProductNum] = useState(["controlSys",0]);
  const [productData, setProductData] = useState(null);

  useEffect(()=>{
    // 更新产品中心的标签页
    if( props.TypeList !== null ){
      props.TypeList.map((item,index)=>{
        if( item.id === 14 ){
          setProductHedList(item)
          console.log(item)
        }
      })
    }
  },[props.TypeList])
  // 点击切换主要产品
  useEffect(()=>{
    if( props.productList !== null ){
      let dataList = {controlSys:[],NRB:[],servo:[],vision:[],weldTracking:[]};
      for( let i=0; i<props.productList.list.length;i++ ){
        if(props.productList.list[i].typeid === 15){
          dataList["controlSys"].push(props.productList.list[i])
        }else if(props.productList.list[i].typeid === 16){
          dataList["NRB"].push(props.productList.list[i])
        }else if(props.productList.list[i].typeid === 17){
          dataList["servo"].push(props.productList.list[i])
        }else if(props.productList.list[i].typeid === 18){
          dataList["vision"].push(props.productList.list[i])
        }else if(props.productList.list[i].typeid === 43){
          dataList["weldTracking"].push(props.productList.list[i])
        }
      }
      console.log(dataList)
      setProductData(dataList)
    }
  },[props.productList])


  return(
    <div className={style.productAll} style={{padding:`0 ${(props.BannerWidth-1200)/2.6}px  200px ${(props.BannerWidth-1280)/2.6}px`}}>
      <div className={style.product_top}>
        <p> { productHedList===null? "" :  productHedList.typename} </p>
        <p> { productHedList===null? "" :  productHedList.typenameen} </p>
      </div>
      <p>  </p>
      <div className={style.product_hedlist}>
        { productHedList ===null?"":
           productHedList.sublist.map((item,index)=>{
            return(
              <li key={index} >
                <a className={index === productNum[1]? style.hoverproductTbs:style.productTbs} onClick={()=>{
                  if(index ===0){
                    setProductNum(["controlSys",0]);
                  }else if( index ===1 ){
                    setProductNum(["NRB",1]);
                  }else if( index ===2 ){
                    setProductNum(["servo",2]);
                  }else if( index ===3 ){
                    setProductNum(["vision",3]);
                  }else if( index ===4 ){
                    setProductNum(["weldTracking",4]);
                  }
                }} >{item.typename} <span></span></a>
              </li>
            )
        })}  
      </div>
        {productData === null? "" :
          <div className={style.product_center}>
            <div className={style.product_center_list_l} onClick={()=>{
              location.href = `/product/${productNum[0]}/${productData[productNum[0]][0].id}.html`
            }}>
              <div className={style.product__center_l} >
                <p> {productData[productNum[0]][0].description} </p>
                <img src={`${productData[productNum[0]][0].litpic}`} alt=""/>
              </div>
            </div>
            <div className={style.product_center_list_r}>
              {productData[[productNum[0]]].map((item,index)=>{
                if( index !== 0 ){
                  return(
                    <div key={index} className={style.product__center_r} style={index === 1 ?{}:{marginTop:"35px"}} onClick={()=>{
                      location.href = `/product/${productNum[0]}/${item.id}.html`
                    }}>
                      <img src={`${item.litpic}`} alt=""/>
                      <p style={item.description.length>20?{width:"242px",overflow: "hidden",whiteSpace: "nowrap",textOverflow:"ellipsis",marginLeft:"30px"}
                      :{ width:"100%",display:"flex",justifyContent:"center"}} >{item.description}</p>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        }
    </div>
  )
}

export default Product;
