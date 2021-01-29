import React, { useEffect, useState } from 'react';
import { connect, useHistory } from 'umi';
import Banner from 'components/banner';
import bannerImg from 'images/product-bg.jpg';
import './index.module.less';
import API from 'components/API/api';

const mapStateToProps = state => {
  return {};
};

function Product(props) {
  const [productHedList, setProductHedList] = useState(null);
  const [productNum, setProductNum] = useState(['controlSys', 0]);
  const [productData, setProductData] = useState(null);
  const [pegeNum, setPageNum] = useState(9);
  const [productPage, setProductPage] = useState(1);
  const [productDetailList, setProductDetailList] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [productDetailClick, setProductDetailClick] = useState(null);
  const [productChildrenNum, setProductChildrenNum] = useState(4);
  const history = useHistory();

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
  // 将产品中心顺序自weight从高到低排序
  function productListSort(List) {
    for (let j = 0; j < List.length - 1; j++) {
      for (let i = 0; i < List.length - j - 1; i++) {
        if (List[i].weight < List[i + 1].weight) {
          let temp = List[i];
          List[i] = List[i + 1];
          List[i + 1] = temp;
        }
      }
    }
    return List;
  }
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
        cabinet: [],
        servo: [],
        vision: [],
        weldTracking: [],
      };
      for (let i = 0; i < props.productList.list.length; i++) {
        if (props.productList.list[i].typeid === 15) {
          dataList['controlSys'].push(props.productList.list[i]);
        } else if (props.productList.list[i].typeid === 16) {
          dataList['cabinet'].push(props.productList.list[i]);
        } else if (props.productList.list[i].typeid === 17) {
          dataList['servo'].push(props.productList.list[i]);
        } else if (props.productList.list[i].typeid === 18) {
          dataList['vision'].push(props.productList.list[i]);
        } else if (props.productList.list[i].typeid === 43) {
          dataList['weldTracking'].push(props.productList.list[i]);
        }
      }

      dataList.controlSys = productListSort(dataList.controlSys);
      dataList.cabinet = productListSort(dataList.cabinet);
      dataList.servo = productListSort(dataList.servo);
      dataList.vision = productListSort(dataList.vision);
      dataList.weldTracking = productListSort(dataList.weldTracking);
      setProductData(dataList);
    }
  }, [props.productList]);

  // 获取产品的详细内容
  useEffect(() => {
    API.getProductIntroduce().then(res => {
      setProductDetailList(res.list);
    });
  }, []);

  // 点击产品展示相对应产品的详细内容
  const showProductDetail = Item => {
    setProductDetailClick(Item);
    if (productDetailList === null) {
    } else {
      productDetailList.map((item, index) => {
        if (Item.id === item.aid) {
          setProductDetail(item);
        }
      });
    }
  };

  useEffect(() => {
    if (
      props.location.query.type === null ||
      props.location.query.type === undefined
    ) {
      setProductNum(['controlSys', 0]);
    } else {
      if (props.location.query.type === '') {
        setProductNum(['controlSys', 0]);
        return;
      }
      setProductNum([props.location.query.type, props.location.query.num]);
    }
  }, [props.location.query]);

  // 手机端点击产品向上移动
  const Upmove = () => {
    if (props.BannerWidth < 760) {
      window.scrollTo(0, 140);
    } else if (props.BannerWidth > 1200) {
    } else if (props.BannerWidth > 760 && props.BannerWidth < 900) {
      window.scrollTo(0, 220);
    } else if (props.BannerWidth > 900 && props.BannerWidth < 1200) {
      window.scrollTo(0, 220);
    }
  };
  return (
    <div className="productFs">
      <Banner
        data={{
          BannerImg: bannerImg,
          BannerSize: '100%',
          BannerLeft: '0',
          TxtCh: '产品中心',
          TxtEn: 'PRODUCT CENTER',
        }}
      ></Banner>
      <div className="product_hedlist_fs">
        <div className="product_hedlist">
          {productHedList === null
            ? ''
            : productHedList.sublist.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      className={
                        index === productNum[1]
                          ? 'hoverproductTbs'
                          : 'productTbs'
                      }
                      onClick={() => {
                        setProductPage(1);
                        if (index === 0) {
                          setProductNum(['controlSys', 0]);
                          history.push({
                            pathname: '/product/index',
                            query: { type: 'controlSys', num: 0 },
                          });
                        } else if (index === 1) {
                          setProductNum(['cabinet', 1]);
                          history.push({
                            pathname: '/product/index',
                            query: { type: 'cabinet', num: 1 },
                          });
                        } else if (index === 2) {
                          setProductNum(['servo', 2]);
                          history.push({
                            pathname: '/product/index',
                            query: { type: 'servo', num: 2 },
                          });
                        } else if (index === 3) {
                          setProductNum(['vision', 3]);
                          history.push({
                            pathname: '/product/index',
                            query: { type: 'vision', num: 3 },
                          });
                        } else if (index === 4) {
                          setProductNum(['weldTracking', 4]);
                          history.push({
                            pathname: '/product/index',
                            query: { type: 'weldTracking', num: 4 },
                          });
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
      <div>
        {React.Children.map(props.children, child => {
          return React.cloneElement(child, {
            productDetailClick: productDetailClick,
            productData,
            productNum,
            productChildrenNum,
            productDetail,
            showProductDetail: showProductDetail,
            Upmove: Upmove,
            productPage,
            pegeNum,
            setProductPage: setProductPage,
            productDetailList,
            setProductDetail: setProductDetail,
            setProductDetailClick: setProductDetailClick,
            productList: props.productList,
          });
        })}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Product);
