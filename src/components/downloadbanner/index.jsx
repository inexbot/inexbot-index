import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import style from './index.module.less';

function DownloadBanner(props) {
  return (
    <div
      className={style.BannerAll}
      style={{
        background: `url(https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/download.jpg) 0 -200px`,
        backgroundSize: '100%',
      }}
    >
      <div className={style.model}></div>
      <div className={style.Banner}>
        <Row>
          <Col span={8}>
            <div className={style.title}>
              <p className={style.banner_txt_ch}>软件下载</p>
              <p className={style.banner_txt_en}>SOFTWARE DOWNLOADING</p>
            </div>
            <div className={style.version}>
              <p>当前版本: {props.data.version}</p>
              <div className={style.notice}>
                <div className={style.title}>
                  <p>注意：</p>
                </div>
                <div className={style.info}>
                  <p>
                    请认准示教器型号后再进行升级，若程序与硬件不匹配会导致程序无法启动!
                  </p>
                </div>
              </div>
            </div>
            <div className={style.otherDownload}>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                className={style.downloadButton}
              >
                <a href={props.data.links.eni} style={{ color: 'white' }}>
                  ENI文件
                </a>
              </Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                id={style.baiduPan}
                className={style.downloadButton}
              >
                <a href={props.data.links.baiduPan} style={{ color: 'white' }}>
                  百度网盘(提取码:{props.data.links.baiduPanPass})
                </a>
              </Button>
            </div>
          </Col>
          <Col span={16}>
            <Row gutter={[50, 50]}>
              <Col className={style.program}>
                <img src={require('images/T30.png')} alt="" />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  className={style.downloadButton}
                >
                  <a href={props.data.links.t30} style={{ color: 'white' }}>
                    NexDroid T30版
                  </a>
                </Button>
              </Col>
              <Col className={style.program}>
                <img src={require('images/T20.png')} alt="" />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  className={style.downloadButton}
                >
                  <a href={props.data.links.t20} style={{ color: 'white' }}>
                    NexDroid T20版
                  </a>
                </Button>
              </Col>
              <Col className={style.program}>
                <img src={require('images/PC.png')} alt="" />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  className={style.downloadButton}
                >
                  <a href={props.data.links.pc} style={{ color: 'white' }}>
                    NexDroid PC版
                  </a>
                </Button>
              </Col>
              <Col className={style.program}>
                <img src={require('images/vs-code.png')} />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  className={style.downloadButton}
                >
                  <a href={props.data.links.vscode} style={{ color: 'white' }}>
                    程序编辑器
                  </a>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DownloadBanner;
