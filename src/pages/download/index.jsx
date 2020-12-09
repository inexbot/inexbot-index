import React, { useEffect, useState } from 'react';
import DownloadBanner from 'components/downloadbanner';
import style from './index.module.less';
import API from 'components/API/api';
import { Select } from 'antd';
const { Option } = Select;
function Download(props) {
  const [version, setVersion] = useState('');
  const [selected, setSelected] = useState('');
  const [links, setLinks] = useState({});
  const [versionList, setVersionList] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  function changeVersion(val) {
    setSelected(val);
    setUpdateData(versionList[val].updateData);
  }
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
      setSelected(0);
      setUpdateData(_r.updateData);
      let _l = [];
      res.list.forEach(value => {
        _l.push(value);
      });
      setVersionList(_l);
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
      <div className={style.download}>
        <div className={style.title}>
          <div className={style.enTitle}>UPDATE HISTORY</div>
          <div className={style.cnTitle}>更新历史</div>
          <Select
            onChange={changeVersion}
            value={selected}
            bordered={false}
            style={{
              marginTop: '50px',
              width: '150px',
              height: '40px',
              fontSize: '25px',
            }}
          >
            {versionList.map((value, index) => (
              <Option key={index} value={index}>
                {value.version}
              </Option>
            ))}
          </Select>
        </div>
        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: updateData }}
        />
      </div>
    </div>
  );
}
export default Download;
