import React, {useEffect, useState} from "react";
import {connect} from "umi";
import {Pagination, Button} from "antd";
import Banner from "components/banner";
import bannerImg from "images/product-bg.jpg";
import style from "./index.module.less"
import API from "components/API/api";

const mapStateToProps = state =>{
  return{
    
  }
}

function Product(props){
  const [productHedList, setProductHedList] = useState(null);
  const [productNum, setProductNum] = useState(['controlSys', 0]);
  const [productData, setProductData] = useState(null);
  const [pegeNum, setPageNum] = useState(9);
  const [productPage, setProductPage] = useState(1);
  const [ContentShow, setContentShow] = useState(true);
  const [productDetailList, setProductDetailList] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [productDetailClick, setProductDetailClick] = useState(null)

  // 更新产品中心的标签页
  useEffect(() => {
    if (props.TypeList !== null) {
      props.TypeList.map((item, index) => {
        if (item.id === 14) {
          setProductHedList(item);
          console.log(item)
        }
      });
    }
  }, [props.TypeList]);

  // 更新滚动高度header颜色改变
  useEffect(() => {
    let num = 0;
    if (props.BannerWidth < 760) {
      num = 200;
      setPageNum(6);
    } else if (props.BannerWidth > 760 && props.BannerWidth < 900) {
      num = 270;
      setPageNum(6);
    } else if (props.BannerWidth > 900 && props.BannerWidth < 1200) {
      num = 270;
      setPageNum(8);
    } else {
      num = 500;
      setPageNum(9);
    }
    props.dispatch({
      type: 'index/setHeaderScroll',
      data: num,
    });
  }, [props.BannerWidth]);

  // 点击切换主要产品
  useEffect(() => {
    if (props.productList !== null) {
      let dataList = {
        controlSys: [],
        NRB: [],
        servo: [],
        vision: [],
        weldTracking: [],
      };
      for (let i = 0; i < props.productList.list.length; i++) {
        if (props.productList.list[i].typeid === 15) {
          dataList['controlSys'].push(props.productList.list[i]);
        } else if (props.productList.list[i].typeid === 16) {
          dataList['NRB'].push(props.productList.list[i]);
        } else if (props.productList.list[i].typeid === 17) {
          dataList['servo'].push(props.productList.list[i]);
        } else if (props.productList.list[i].typeid === 18) {
          dataList['vision'].push(props.productList.list[i]);
        } else if (props.productList.list[i].typeid === 43) {
          dataList['weldTracking'].push(props.productList.list[i]);
        }
      }
      setProductData(dataList);
      console.log(dataList)
    }
  }, [props.productList]);

  // 获取产品的详细内容
  useEffect(()=>{
    API.getProductIntroduce().then(res=>{
      console.log(res,"这里是详细内容")
      setProductDetailList(res.list);
    })
  },[])

  // 修改分页的显示样式
  function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <Button> 上一页 </Button>;
    }
    if (type === 'next') {
      return <Button> 下一页 </Button>;
    }
    return originalElement;
  }

  // 点击产品展示相对应产品的详细内容
  const showProductDetail = ( Item )=>{
    console.log(Item);
    setProductDetailClick(Item);
    if( productDetailList === null ){
      showProductDetailList(Item);
    }else{
      productDetailList.map((item,index)=>{
        if( Item.id === item.aid ){
          console.log(item);
          setProductDetail(item)
        }
      })
    }
  }
  return(
    <div className={style.productFs}>
      <Banner
        data={{
          BannerImg:bannerImg,
          BannerSize: '100%',
          BannerLeft: '0',
          TxtCh: "产品中心",
          TxtEn: "PRODUCT CENTER",
        }}
      ></Banner>
      <div className={style.product_hedlist_fs}>
        <div
          className={style.product_hedlist}
        >
          {productHedList === null
            ? ''
            : productHedList.sublist.map((item, index) => {
              return (
                <li key={index}>
                  <a
                    className={
                      index === productNum[1]
                        ? style.hoverproductTbs
                        : style.productTbs
                    }
                    onClick={() => {
                      setProductPage(1);
                      if (index === 0) {
                        setProductNum(['controlSys', 0]);
                      } else if (index === 1) {
                        setProductNum(['NRB', 1]);
                      } else if (index === 2) {
                        setProductNum(['servo', 2]);
                      } else if (index === 3) {
                        setProductNum(['vision', 3]);
                      } else if (index === 4) {
                        setProductNum(['weldTracking', 4]);
                      }
                    }}
                  >
                    {' '}
                    <p>{item.typename}</p> <span></span>
                  </a>
                </li>
              );
            })}
        </div>
      </div>
      <div className={style.product_content_probably}>
        <div>
          { productData === null?"" :
            productData[[productNum[0]]].slice(
              (productPage - 1) * pegeNum,
              (productPage - 1) * pegeNum + pegeNum,
              ).map((item, index) => {
              return(
                <div key={index} className={style.product_content_children} onClick={showProductDetail.bind(null,item)}>
                  <img src={item.litpic} alt="" />
                  <p> { item.title } </p>
                </div>
              )
            })
          }
        </div>
        <Pagination
          className={style.product_bottom_page}
          current={productPage}
          itemRender={itemRender}
          pageSize={pegeNum}
          total={productData === null ? 1 : productData[productNum[0]].length}
          onChange={(page, pageSize) => {
            setProductPage(page);
          }}
        />
      </div>
      <div className={style.product_content_detail}>
        {/* <div className={style.product_content_detail_html}
          dangerouslySetInnerHTML={ productDetail===null?{__html:"<div></div>"}
          :{ __html: productDetail.body }}>
        </div> */}
        <div className={style.detail_left}>
          {productDetailClick === null? "" : 
            <dl className={style.detail_left_top}>
              <dt> {productDetailClick.title} </dt>
              <dd> <img src={productDetailClick.litpic} alt=""/>  </dd>
            </dl>
          }
        </div>
        <ul className={style.detail_right}>
          {productData === null? "" :
            productData[[productNum[0]]].slice(0,4).map((item,index)=>{
              return(
                <li className={style.detail_right_list}>
                  <img src={item.litpic} alt=""/>
                  <p> {item.title} </p>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Product);