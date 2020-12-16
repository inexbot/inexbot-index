import React, {useEffect, useState} from "react";
import {connect} from "umi";
import {Pagination, Button} from "antd";
import Banner from "components/banner";
import bannerImg from "images/product-bg.jpg";
import "./index.module.less"
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
  const [productDetailClick, setProductDetailClick] = useState(null);
  const [productChildrenNum, setProductChildrenNum] = useState(4);

  // 更新产品中心的标签页
  useEffect(() => {
    if (props.TypeList !== null) {
      props.TypeList.map((item, index) => {
        if (item.id === 14) {
          setProductHedList(item);
        }
      });
    }
  }, [props.TypeList]);

  // 更新滚动高度header颜色改变
  useEffect(() => {
    let num = 0;
    if (props.BannerWidth < 760) {
      num = 196;
      setPageNum(6);
    } else if (props.BannerWidth > 760 && props.BannerWidth < 900) {
      num = 250;
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
    }
  }, [props.productList]);

  // 获取产品的详细内容
  useEffect(()=>{
    API.getProductIntroduce().then(res=>{
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
    setContentShow(false)
    setProductDetailClick(Item);
    if( productDetailList === null ){
      showProductDetailList(Item);
    }else{
      productDetailList.map((item,index)=>{
        if( Item.id === item.aid ){
          setProductDetail(item)
        }
      })
    }
  }

  useEffect(()=>{
    if( props.location.query.type === "" ){
      return;
    }
    setProductNum([props.location.query.type,props.location.query.num])
  },[props.location.query])

  // 手机端点击产品向上移动
  const Upmove = () =>{
    if (props.BannerWidth < 760) {
      window.scrollTo(0, 140);
    } else if (props.BannerWidth > 1200) {
    } else if (props.BannerWidth > 760 && props.BannerWidth < 900) {
      window.scrollTo(0, 220);
    } else if (
      props.BannerWidth > 900 &&
      props.BannerWidth < 1200
    ) {
      window.scrollTo(0, 220);
    }
  }
  return(
    <div className="productFs">
      <Banner
        data={{
          BannerImg:bannerImg,
          BannerSize: '100%',
          BannerLeft: '0',
          TxtCh: "产品中心",
          TxtEn: "PRODUCT CENTER",
        }}
      ></Banner>
      <div className="product_hedlist_fs">
        <div
          className="product_hedlist"
        >
          {productHedList === null
            ? ''
            : productHedList.sublist.map((item, index) => {
              return (
                <li key={index}>
                  <a
                    className={
                      index === productNum[1]
                        ? "hoverproductTbs"
                        : "productTbs"
                    }
                    onClick={() => {
                      setProductPage(1);
                      setContentShow(true);
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
      <div className="product_content_probably" style={ContentShow? { display:"block" }: { display:"none" }} > 
        <div>
          { productData === null?"" :
            productData[[productNum[0]]].slice(
              (productPage - 1) * pegeNum,
              (productPage - 1) * pegeNum + pegeNum,
              ).map((item, index) => {
              return(
                <div key={index} className="product_content_children" onClick={ ()=>{
                  showProductDetail(item);
                  Upmove()
                  }}>
                  <img src={item.litpic} alt="" />
                  <p> { item.title } </p>
                </div>
              )
            })
          }
        </div>
        <Pagination
          className="product_bottom_page"
          current={productPage}
          itemRender={itemRender}
          pageSize={pegeNum}
          total={productData === null ? 1 : productData[productNum[0]].length}
          onChange={(page, pageSize) => {
            setProductPage(page);
          }}
        />
      </div>
      <div className="product_content_detail" style={ContentShow? { display:"none" }: { display:"block" }}>
        <div className="detail_left">
          {productDetailClick === null? "" : 
            <dl className="detail_left_top">
              <dt> {productDetailClick.title} </dt>
              <dd> <img src={productDetailClick.litpic} alt=""/>  </dd>
            </dl>
          }
          <p> 产品简介 </p>
          <div className="product_content_detail_html"
            dangerouslySetInnerHTML={ productDetail===null?{__html:"<div></div>"}
            :{ __html: productDetail.body }}>
          </div>
        </div>
        <ul className="detail_right">
          {productData === null? "" :
            productData[[productNum[0]]].slice(0,productChildrenNum).map((item,index)=>{
              return(
                <li key={index} className="detail_right_list" onClick={()=>{
                  showProductDetail(item);
                  Upmove();
                }}>
                  <img src={item.litpic} alt=""/>
                  <p> {item.title} </p>
                </li>
              )
            })
          }
          {/* <p style={productData === null?{display:"none"}:productData[[productNum[0]]].length <= 4?{ display:"none" }:{ display:"block" }}> 更多产品 </p> */}
          <p onClick={()=>{setContentShow(true)}} > 更多产品 </p>
        </ul>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Product);