import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import './index.module.less';

function DownloadBanner(props) {
  return (
    <div
      className="download_BannerAll"
    >
      <div className="model"></div>
      <div className="Banner">
        <Row>
          <Col span={8}>
            <div className="title">
              <p className="banner_txt_ch">软件下载</p>
              <p className="banner_txt_en">SOFTWARE DOWNLOADING</p>
            </div>
            <div className="version">
              <p>当前版本: &nbsp; &nbsp;&nbsp; {props.data.version}</p>
              <div className="notice">
                <div className="title">
                  <span>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;意：</span>
                </div>
                <div className="info">
                  <span>
                    请认准示教器型号后再进行升级，若程序与硬件不匹配会导致程序无法启动!
                  </span>
                </div>
              </div>
              <div className="otherDownload">
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                className="downloadButton"
              >
                <a href={props.data.links.eni} style={{ color: 'white' }}>
                  ENI文件
                </a>
              </Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                id="baiduPan"
                className="downloadButton"
              >
                <a href={props.data.links.baiduPan} style={{ color: 'white' }}>
                  百度网盘(提取码:{props.data.links.baiduPanPass})
                </a>
              </Button>
            </div>
            </div>
          </Col>

          <Col span={16}>
            <Row >
              <Col className="program">
                <img src={require('images/T30.png')} alt="" />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  className="downloadButton"
                >
                  <a href={props.data.links.t30} style={{ color: 'white' }}>
                    NexDroid T30版
                  </a>
                </Button>
              </Col>
              <Col className="program">
                <img src={require('images/T20.png')} alt="" />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  className="downloadButton"
                >
                  <a href={props.data.links.t20} style={{ color: 'white' }}>
                    NexDroid T20版
                  </a>
                </Button>
              </Col>
              <Col className="program">
                <img src={require('images/PC.png')} alt="" />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  className="downloadButton"
                >
                  <a href={props.data.links.pc} style={{ color: 'white' }}>
                    NexDroid PC版
                  </a>
                </Button>
              </Col>
              <Col className="program">
                <img src={require('images/vs-code.png')} />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  className="downloadButton"
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
