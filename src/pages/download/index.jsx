import React, { useEffect, useState } from 'react';
import DownloadBanner from 'components/downloadbanner';
import style from './index.module.less';
import API from 'components/API/api';
function Download(props) {
  const [version, setVersion] = useState('');
  const [links, setLinks] = useState({});
  const [updateData, setUpdateData] = useState([]);
  const [TypeList, setTypeList] = useState(null);
  useEffect(() => {
    API.getDownloadLink().then(res => {
      let _r = res.list[0];
      setVersion(_r.version);
      setLinks({
        baiduPan: _r.baidupan,
        baiduPanPass: _r.pass,
        eni: _r.eni,
        pc: _r.pc,
        t20: _r.t20,
        t30: _r.t30,
        vscode: _r.vscode,
        translate: _r.translate,
      });
    });
  }, []);
  return (
    <div>
      <DownloadBanner
        data={{
          BannerImg: '',
          links: links,
          version: version,
        }}
      />
    </div>
  );
}
export default Download;
