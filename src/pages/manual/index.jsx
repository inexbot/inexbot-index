import React, { useEffect, useState } from 'react';
import { useHistory, connect } from 'umi';
import Banner from 'components/banner';
import style from './index.module.less';
import API from 'components/API/api';
import { Table } from 'antd';
const columns = [
  {
    title: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>文档名</span>,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>版本</span>,
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: (
      <span style={{ fontWeight: 'bold', fontSize: '18px' }}>下载链接</span>
    ),
    dataIndex: 'link',
    key: 'link',
    render: text => <a href={text}>点击下载</a>,
  },
];
const mapStateToProps = state => {
  return {};
};
function Manual(props) {
  const [selectedType, setSelectedType] = useState('');
  const [manualList, setManualList] = useState([]);
  const [manualLoading, setManualLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    if (history.location.query.type === selectedType) {
      return;
    }
    setSelectedType(
      history.location.query.type === 'other' ? 'other' : 'manual',
    );
  }, []);
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
      num = 420;
    }
    props.dispatch({
      type: 'index/setHeaderScroll',
      data: num,
    });
  }, [props.BannerWidth]);
  useEffect(() => {
    if (selectedType === '') {
      return;
    } else {
      if (selectedType === 'manual') {
        getManual();
      } else {
        getOtherDoc();
      }
    }
  }, [selectedType]);
  async function getManual() {
    API.getManualList().then(res => {
      setList(res);
    });
  }
  async function getOtherDoc() {
    API.getOtherDocList().then(res => {
      setList(res);
    });
  }
  function setList(res) {
    setManualList(
      res.list.map(value => {
        return {
          key: value.aid,
          name: value.name,
          version: value.version,
          link: value.link,
        };
      }),
    );
    setManualLoading(false);
  }
  function selectType(type) {
    if (type === selectedType) {
      return;
    }
    setManualLoading(true);
    // type === 'other' ? getOtherDoc() : getManual();
    setSelectedType(type);
  }
  return (
    <div className={style.manual}>
      <Banner
        data={{
          BannerImg:
            'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/file.jpg',
          BannerSize: '100%',
          BannerLeft: '0',
          TxtCh: '手册与文档',
          TxtEn: 'MANUALS AND DOCUMENTATION',
          Height: 500,
        }}
      />
      <div className={style.manual_select}>
        <div
          className={
            selectedType === 'manual'
              ? style.manual_select_selected
              : style.manual_select_unSelected
          }
          onClick={selectType.bind(this, 'manual')}
        >
          操作手册
        </div>
        <div
          className={
            selectedType === 'other'
              ? style.manual_select_selected
              : style.manual_select_unSelected
          }
          onClick={selectType.bind(this, 'other')}
        >
          其它文档
        </div>
      </div>
      <Table
        style={{ width: '90%', margin: 'auto' }}
        tableLayout="fixed"
        // style={style.manual_table}
        columns={columns}
        dataSource={manualList}
        loading={manualLoading}
      />
    </div>
  );
}

export default connect(mapStateToProps)(Manual);
