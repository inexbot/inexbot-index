import React, { useEffect, useState } from 'react';
import { connect, useHistory } from 'umi';
import Banner from 'components/banner/index';
import image from 'images/about-bg.jpg';
import API from 'components/API/api';
import './index.module.less';

const mapStateToProps = state => {
  return {
    headerScroll: state.index.headerScroll,
  };
};

function Partner(props) {
  const [TypeList, setTypeList] = useState(null);
  const [strategy, setStrategy] = useState([]);
  const [core, setCore] = useState([]);
  const [gold, setGold] = useState([]);
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
    API.getPartner().then(res => {
      let _gold = [];
      let _strategy = [];
      let _core = [];
      res.list.forEach(value => {
        if (value.typeid === 53) {
          //strategy
          _strategy.push(
            <div className="partnersPic" key={value.id}>
              <img src={value.litpic}></img>
            </div>,
          );
        } else if (value.typeid === 54) {
          //core
          _core.push(
            <div className="partnersPic" key={value.id}>
              <img src={value.litpic}></img>
            </div>,
          );
        } else if (value.typeid === 55) {
          //gold
          _gold.push(
            <div className="partnersPic" key={value.id}>
              <img src={value.litpic}></img>
            </div>,
          );
        }
      });
      setCore(_core);
      setGold(_gold);
      setStrategy(_strategy);
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
                <a className="aboutTbs">
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
                <a className="hoveraboutTbs">
                  <p>合作伙伴</p>
                  <span></span>
                </a>
              </li>
            </ul>
          </div>
          <div className="multirobot">
            <div className="multirobot_center_l">
              <h1>战略</h1>
              <div className="partners">{strategy}</div>
              <h1>金牌服务商</h1>
              <div className="partners">{gold}</div>
              <h1>核心客户</h1>
              <div className="partners">{core}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(Partner);
