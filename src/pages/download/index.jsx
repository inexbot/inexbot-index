import React, { useEffect, useState } from 'react';
import DownloadBanner from 'components/downloadbanner';
import './index.module.less';
import { connect } from 'umi';
import API from 'components/API/api';
import { Select } from 'antd';
const { Option } = Select;

const mapStateToProps = state => {
  return {};
};

function Download(props) {
  const [version, setVersion] = useState('');
  const [selected, setSelected] = useState('');
  const [links, setLinks] = useState({});
  const [versionList, setVersionList] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  function changeVersion(val) {
    setSelected(val);
    setUpdateData(versionList[val].updatedata);
  }

  // 更新滚动高度header颜色改变
  useEffect(() => {
    let num = 0;
    if (props.BannerWidth < 760) {
      num = 160;
    } else if (props.BannerWidth > 760 && props.BannerWidth < 900) {
      num = 225;
    } else if (props.BannerWidth > 900 && props.BannerWidth < 1200) {
      num = 225;
    } else {
      num = 500;
    }
    props.dispatch({
      type: 'index/setHeaderScroll',
      data: num,
    });
  }, [props.BannerWidth]);

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
      setUpdateData(_r.updatedata);
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
      <div className="children_download">
        <div className="title">
          <div className="enTitle">UPDATE HISTORY</div>
          <div className="cnTitle">更新历史</div>
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
          className="content"
          dangerouslySetInnerHTML={{ __html: updateData }}
        />
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(Download);
