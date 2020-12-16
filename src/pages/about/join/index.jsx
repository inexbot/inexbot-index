import React, { useEffect, useState } from 'react';
import { connect, useHistory } from 'umi';
import Banner from 'components/banner/index';
import API from 'components/API/api';
import image from 'images/faq-bg.jpg';
import './index.module.less';

const mapStateToProps = state => {
  return {
    headerScroll: state.index.headerScroll,
  };
};

function Partner(props) {
  const [TypeList, setTypeList] = useState(null);
  const [joinList, setJoinList] = useState([]);
  const history = useHistory();
  // 获取解决方案页面的全部数据
  useEffect(() => {
    if (props.TypeList === null) {
      return;
    }
    props.TypeList.map((item, index) => {
      if (item.id === 1) {
        setTypeList(item);
      }
    });
  }, [props.TypeList]);
  useEffect(() => {
    API.getJoin().then(res => {
      let _l = [];
      res.list.forEach(value => {
        _l.push(
          <li key={value.id}>
            <div className="joinlist">
              <h1>{value.title}</h1>
              {/* <hr style="height: 1px; border: none; border-top: 1px solid #.join-list h1;" /> */}
              <p>{value.description}</p>
            </div>
          </li>,
        );
      });
      setJoinList(_l);
    });
  }, []);
  // 更新滚动高度header颜色改变
  useEffect(() => {
    let num = 0;
    if (props.BannerWidth < 760) {
      num = 200;
    } else if (props.BannerWidth > 760 && props.BannerWidth < 1200) {
      num = 280;
    } else {
      num = 500;
    }
    props.dispatch({
      type: 'index/setHeaderScroll',
      data: num,
    });
  }, [props.BannerWidth]);

  return (
    <div>
      {TypeList === null ? (
        ''
      ) : (
        <div className="children_about">
          <Banner
            data={{
              BannerImg: image,
              BannerSize: '150%',
              BannerLeft: '40%',
              TxtCh: '关于纳博特',
              TxtEn: 'about',
            }}
          ></Banner>
          <div className="about_select_All">
            <ul className="about_select">
              <li
                key={0}
                onClick={() => {
                  history.push('/about/inexbot');
                }}
              >
                <a className="aboutTbs">
                  <p>公司简介</p>
                  <span></span>
                </a>
              </li>
              <li
                key={1}
                onClick={() => {
                  history.push('/about/contact');
                }}
              >
                <a className="aboutTbs">
                  <p>联系我们</p>
                  <span></span>
                </a>
              </li>
              <li
                key={2}
                onClick={() => {
                  history.push('/about/join');
                }}
              >
                <a className="hoveraboutTbs">
                  <p>加入我们</p>
                  <span></span>
                </a>
              </li>
              <li
                key={3}
                onClick={() => {
                  history.push('/about/partner');
                }}
              >
                <a className="aboutTbs">
                  <p>合作伙伴</p>
                  <span></span>
                </a>
              </li>
            </ul>
          </div>
          <div className="multirobot">
            <div className="multirobot_center_l">
              <ul>{joinList}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(Partner);
