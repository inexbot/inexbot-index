import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import style from './index.module.less';
import { Pagination, Button } from 'antd';
import Banner from 'components/banner/index';
import API from '../../components/API/api';

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
  const [newListShow, setNewListShow] = useState(true);

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
    if( props.location.query.type === "" ){
      return;
    }
    setNewsSelect(props.location.query.type)
  },[props.location.query.type])

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

  // 点击新闻切换content内容
  const ChangeNewsContent = (Item) =>{
    if( newsContent === null ){
      ChangeNewsContent( Item )
    }else{
      newsContent.map((item,index)=>{
        if( Item.id === item.aid ){
          setNewsListChildren(item)
          setNewListShow(false)
        }
      })
    }
  }

  return (
    <div>
      {TypeList === null ? (
        ''
      ) : (
        <div className={style.news}>
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
          <div className={style.newslist_select}>
            {TypeList.sublist.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    index === 0
                      ? newSelect === 'Company'
                        ? style.newslist_select_children_h
                        : style.newslist_select_children
                      : newSelect === 'Industry'
                      ? style.newslist_select_children_h
                      : style.newslist_select_children
                  }
                  onClick={() => {
                    setnewListPage(1);
                    setNewListShow(true)
                    if (index === 0) {
                      setNewsSelect('Company');
                    } else {
                      setNewsSelect('Industry');
                    }
                  }}
                >
                  {item.typename}
                </div>
              );
            })}
          </div>
          <div className={style.newlist} style={newListShow? {display:"flex"} : {display:"none"}}>
            {productList === null
              ? ''
              : productList[newSelect]
                  .slice(
                    (newListPage - 1) * pegeNum,
                    (newListPage - 1) * pegeNum + pegeNum,
                  )
                  .map((item, index) => {
                    return (
                      <div key={index} className={style.newlist_center} onClick={ChangeNewsContent.bind(null,item)}>
                        <div className={style.newlist_center_img}>
                          <img src={item.litpic} alt="" />
                        </div>
                        <p className={style.newlist_center_title}>
                          {' '}
                          {item.title}{' '}
                        </p>
                        <p className={style.newlist_center_dis}>
                          {' '}
                          {item.description}{' '}
                        </p>
                        <span className={style.newlist_center_date}>{`
                      ${new Date(item.pubdate * 1000).getFullYear()} -
                      ${
                        new Date(item.pubdate * 1000).getMonth() + 1 < 10
                          ? '0' + (new Date(item.pubdate * 1000).getMonth() + 1)
                          : new Date(item.pubdate * 1000).getMonth() + 1
                      } -
                      ${
                        new Date(item.pubdate * 1000).getDate() < 10
                          ? '0' + new Date(item.pubdate * 1000).getDate()
                          : new Date(item.pubdate * 1000).getDate()
                      }
                      `}</span>
                      </div>
                    );
                  })}
            <Pagination
              className={style.newlist_bottom_page}
              current={newListPage}
              itemRender={itemRender}
              pageSize={pegeNum}
              total={productList === null ? 1 : productList[newSelect].length}
              onChange={(page, pageSize) => {
                setnewListPage(page);
                if (props.BannerWidth < 760) {
                  window.scrollTo(0, 160);
                } else if (props.BannerWidth > 1200) {
                  window.scrollTo(0, 361);
                } else if (props.BannerWidth > 760 && props.BannerWidth < 900) {
                  window.scrollTo(0, 240);
                } else if (
                  props.BannerWidth > 900 &&
                  props.BannerWidth < 1200
                ) {
                  window.scrollTo(0, 240);
                }
              }}
            />
          </div>
          <div className={style.newlist_children} style={newListShow? {display:"none"} : {display:"block"}} >
            <div
              dangerouslySetInnerHTML={ newsListChildren===null?{__html:"<div></div>"}
              :{ __html: newsListChildren.body }}>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(News);
