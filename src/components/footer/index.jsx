import React, { useEffect } from 'react';
import style from './index.module.less';
import API from 'components/API/api';

export function Footer(props) {
  useEffect(() => {
    API.getTypeList().then(res => {
      console.log(res);
    });
  }, []);
  return (
    <div className={style.footer}>
      <div className={style.footer_information}>
        a
        <div className={style.footer_logo}>
          <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/logowithtext.jpg" />
          <div className={style.footer_qrcode}>
            <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/qrcode.jpg" />
            <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/qrcode.jpg" />
          </div>
        </div>
        <div className={style.footer_list}>{}</div>
      </div>
      <div className={style.footer_copyright}>
        Copyright© 2015-2020 纳博特南京科技有限公司 备案号：
        <a href="">苏ICP备20033607号-1</a>
      </div>
    </div>
  );
}
