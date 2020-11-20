import React, { useEffect, useState } from 'react';
import style from './index.module.less';
import API from 'components/API/api';

export function Footer(props) {
  const [footerList, setFooterList] = useState([]);
  useEffect(() => {
    API.getTypeList().then(res => {
      let _l = [];
      res.forEach(value => {
        if (value.sublist.length !== 0) {
          let _ll = [];
          value.sublist.forEach(_value => {
            _ll.push(
              <dd key={_value.typename}>
                <a href={getLink(_value.sitepath)}>{_value.typename}</a>
              </dd>,
            );
          });
          _l.push(
            <dl key={value.typename}>
              <dt>{value.typename}</dt>
              {_ll}
            </dl>,
          );
        }
      });
      setFooterList(_l);
    });
  }, []);
  function getLink(link) {
    let _cms = '{cmspath}';
    if (link.match(_cms)) {
      let _linkArray = link.split('}');
      return _linkArray[1];
    } else {
      return link;
    }
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
            <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/qrcode.jpg" />
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
