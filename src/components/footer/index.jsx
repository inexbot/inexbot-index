import React, { useEffect, useState } from 'react';
import style from './index.module.less';
import { useHistory } from "umi";

export function Footer(props) {
  const [footerList, setFooterList] = useState([]);

  const history  = useHistory();

  useEffect(() => {
  // 点击一级导航跳转链接
  const firstNavClick = (Item) =>{
    window.scrollTo(0, 0);
    if( Item.id === 19 ){
      location.href = getLink(Item.typedir);
    }else if( Item.id === 34 ){
      history.push("download")
    }else if( Item.id === 1 ){
      history.push("about/inexbot")
    }else{
      history.push({
        pathname:getLink(Item.typedir),
        query: { type: "" },
      });
    }
  }

  // 点击二级导航跳转链接
  const secondNavClick = (Item) =>{
    window.scrollTo(0, 0);
    if( Item.id === 65 ){
      location.href = getLink(Item.typedir);
    }else if( Item.id === 8 ){
      history.push({
        pathname:getLink(Item.sitepath),
        query: { type: Item.typenameen.slice(0,7) },
      });
    }else if( Item.id === 9 ){
      history.push({
        pathname:getLink(Item.sitepath),
        query: { type: Item.typenameen.slice(0,8) },
      });
    }else{
      if( Item.reid === 25 ){
        if( Item.sortrank <3 ){
          history.push({
            pathname:getLink(Item.sitepath),
            query: { type: Item.typenameen, num: Item.sortrank-1},
          });
        }else{
          history.push({
            pathname:getLink(Item.sitepath),
            query: { type: Item.typenameen, num: Item.sortrank-2},
          });
        }
      }else if( Item.reid === 14 ){
        history.push({
          pathname:getLink(Item.sitepath),
          query: { type: Item.typenameen, num: Item.sortrank-1},
        });
      }else{
        history.push({
          pathname:getLink(Item.typedir),
          query: { type: Item.typenameen },
        });
      }
    }
  }



    if (props.typeList === null) {
      return;
    }
    let _l = [];
    props.typeList.forEach(value => {
      if (value.sublist.length !== 0) {
        let _ll = [];
        value.sublist.forEach(_value => {
          _ll.push(
            <dd key={_value.typename}>
              <a  onClick={secondNavClick.bind(null,_value)}>{_value.typename}</a>
            </dd>,
          );
        });
        _l.push(
          <dl key={value.typename}>
            <dt className={style.footer_list_top} onClick={firstNavClick.bind(null,value)} >{value.typename}</dt>
            {_ll}
          </dl>,
        );
      }
    });
    setFooterList(_l);
    // dth();
  }, [props.typeList]);
  function getLink(link) {
    let _cms = '{cmspath}';
    if (link.match(_cms)) {
      let _linkArray = link.split('}');
      return _linkArray[1];
    } else {
      return link;
    }
  }
  function dth() {
    let _s =
      '19968 20999 37117 26159 21629 36816 10 19968 20999 37117 26159 28895 20113 10 19968 20999 37117 26159 27809 26377 32467 23616 30340 24320 22987 10 19968 20999 37117 26159 31245 32437 21363 36893 30340 36861 23547 10 19968 20999 27426 20048 37117 27809 26377 24494 31505 10 19968 20999 33510 38590 37117 27809 26377 27882 30165 10 19968 20999 35821 35328 37117 26159 37325 22797 10 19968 20999 20132 24448 37117 26159 21021 36898 10 19968 20999 29233 24773 37117 22312 24515 37324 10 19968 20999 24448 20107 37117 22312 26790 20013 10 19968 20999 24076 26395 37117 24102 30528 27880 37322 10 19968 20999 20449 20208 37117 24102 30528 21627 21535 10 19968 20999 29190 21457 37117 26377 29255 21051 30340 23425 38745 10 19968 20999 27515 20129 37117 26377 20887 38271 30340 22238 22768 ';
    let _v = '';
    let _a = _s.split(' ');
    _a.forEach(_u => {
      _v += String.fromCharCode(_u);
    });
    console.log(_v);
  }
  return (
    <div className={style.footer}>
      <div className={style.footer_information}>
        <div className={style.footer_logo}>
          <div>
            <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/logowithtext-w.png" />
          </div>
          <div className={style.footer_qrcode}>
            <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/qrcode.jpg" />
            <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/miniproqr.jpg" />
          </div>
        </div>
        <div className={style.footer_list}>
          <div className={style.footer_list_content}>{footerList}</div>
        </div>
      </div>
      <div className={style.footer_copyright}>
        Copyright© 2015-2020 纳博特南京科技有限公司 备案号：
        <a href="">苏ICP备20033607号-1</a>
      </div>
    </div>
  );
}
