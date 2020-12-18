import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import './index.module.less';
import Banner from 'components/banner/index';
import API from '../../components/API/api';
import { useHistory } from "umi";

const mapStateToProps = state => {
  return {
    headerScroll: state.index.headerScroll,
  };
};

function News(props) {
  const [TypeList, setTypeList] = useState(null);
  const [newSelect, setNewsSelect] = useState('Company');
  const [productList, setProductList] = useState(null);
  const [newListPage, setnewListPage] = useState(1);
  const [pegeNum, setPageNum] = useState(9);
  const [newsContent, setNewsContent] = useState(null);
  const [newsListChildren, setNewsListChildren] = useState(null);

  const history = useHistory();

  // 更新滚动高度header颜色改变
  useEffect(() => {
    let num = 0;
    if (props.BannerWidth < 760) {
      num = 160;
      setPageNum(6);
    } else if (props.BannerWidth > 760 && props.BannerWidth < 900) {
      num = 225;
      setPageNum(6);
    } else if (props.BannerWidth > 900 && props.BannerWidth < 1200) {
      num = 225;
      setPageNum(8);
    } else  {
      num = 420;
      setPageNum(9);
    }
    props.dispatch({
      type: 'index/setHeaderScroll',
      data: num,
    });
  }, [props.BannerWidth]);

  useEffect(()=>{
    if( props.location.query.type === null || props.location.query.type === undefined ){
      setNewsSelect("Company");
    }else{
      if( props.location.query.type === "" ){
        return;
      }
      setNewsSelect(props.location.query.type)
    }
  },[props.location.query])

  // 从数据库筛选出来公司新闻和行业动态的数据
  useEffect(() => {
    let dataList = { Company: [], Industry: [] };
    if (props.productList === null) {
      return;
    }
    for (let i = 0; i < props.productList.list.length; i++) {
      if (props.productList.list[i].typeid === 8) {
        dataList.Company.push(props.productList.list[i]);
      } else if (props.productList.list[i].typeid === 9) {
        dataList.Industry.push(props.productList.list[i]);
      }
    }
    setProductList(dataList);
  }, [props.productList]);

  // 获取数据
  useEffect(() => {
    if (props.TypeList !== null) {
      props.TypeList.map((item, index) => {
        if (item.id === 7) {
          setTypeList(item);
        }
      });
    }
  }, [props.TypeList]);

  // 获取新闻详细内容
  useEffect(()=>{
    API.getNewsContent().then(res=>{
      setNewsContent(res.list)
    })
  },[])


  // 点击新闻切换content内容
  const ChangeNewsContent = (Item) =>{
    if( newsContent === null ){
    }else{
      newsContent.map((item,index)=>{
        if( Item.id === item.aid ){
          setNewsListChildren(item)
        }
      })
    }
  }

  return (
    <div>
      {TypeList === null ? (
        ''
      ) : (
        <div className="news">
          <Banner
            data={{
              BannerImg:
                'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/video.jpg',
              BannerSize: '100%',
              BannerLeft: '0',
              TxtCh: TypeList.typename,
              TxtEn: TypeList.typenameen,
            }}
          ></Banner>
          <div className="newslist_select">
            {TypeList.sublist.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    index === 0
                      ? newSelect === 'Company'
                        ? "newslist_select_children_h"
                        : "newslist_select_children"
                      : newSelect === 'Industry'
                      ? "newslist_select_children_h"
                      : "newslist_select_children"
                  }
                  onClick={() => {
                    setnewListPage(1);
                    if (index === 0) {
                      setNewsSelect('Company');
                      history.push({
                        pathname:"/news/index",
                        query: {type: "Company"},
                      });
                    } else {
                      setNewsSelect('Industry');
                      history.push({
                        pathname:"/news/index",
                        query: {type: "Industry"},
                      });
                    }
                  }}
                >
                  {item.typename}
                </div>
              );
            })}
          </div>
          <div>
        {React.Children.map(props.children, child => {
          return React.cloneElement(child, {
            productList:productList,
            newSelect,
            newListPage,
            pegeNum,
            ChangeNewsContent:ChangeNewsContent,
            setnewListPage:setnewListPage,
            newsListChildren,
            newsContent,
            setNewsListChildren:setNewsListChildren,
          });
        })}</div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(News);
