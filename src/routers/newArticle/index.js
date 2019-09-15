import React, { useState, useRef } from "react";
import { GetObjectUrl, categorys } from "../../utils";
import { Affix, Button, message, Modal, Select } from "antd";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/codeBlock";
import { createArticle } from "../../api/request";

import "../article/index.less";

const { Option } = Select;

const Index = ({ history }) => {
  const [modal, setModal] = useState({ visible: false, confirmLoading: false });
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState(false);
  const [coverImage, setCoverImage] = useState(
    "http://i.caigoubao.cc/612200/7551-quotes-typography-define-your-self.jpg"
  );
  const [content, setContent] = useState("");
  const cover = useRef(null);
  const contentRef = useRef(null);
  const title = useRef(null);

  function handlePreview() {
    if (!preview) {
      setContent(contentRef.current.innerText);
    }
    setPreview(preview ? false : true);
  }

  function handlePreviewCover() {
    cover.current.click();
  }

  function showCoverImage() {
    setCoverImage(GetObjectUrl(cover.current.files[0]));
  }

  function handleSubmit() {
    if (!category) {
      message.info("请选择文章分类!");
      return;
    }
    if (cover.current.files[0] === undefined) {
      message.info("请先上传文章封面!");
      return;
    }
    let articletitle = title.current.value.trim();
    if (!articletitle) {
      message.info("文章标题不能为空!");
      return;
    }
    if (contentRef.current !== null) {
      message.info("请先预览文章!");
      return;
    }
    let articlecontent = content.trim();
    if (!articlecontent) {
      message.info("文章内容不能为空!");
      return;
    }
    setModal({ ...modal, visible: true });
  }

  function handleOk() {
    setModal({ ...modal, confirmLoading: true });
    createArticle({
      title: title.current.value.trim(),
      cover: cover.current.files[0],
      content: content.trim(),
      category: category
    }).then(res => {
      if (res.ok) {
        message.info("发布成功!");
        history.push(`/article/${res.id}`);
      } else {
        setModal({ ...modal, visible: false, confirmLoading: false });
        if (res.err === "NOT_LOGGED") {
          message.warning("请先登录!");
        } else if (res.err === "UPLOAD_COVER_FAILED") {
          message.warning("文章封面上传失败!");
        } else if (res.err === "DATABASE_ERROR") {
          message.warning("当前服务器罢工中, 无法发布文章...");
        }
      }
    });
  }

  function handleCancel() {
    setModal({ ...modal, visible: false });
  }

  function handleCategorySelect(value) {
    setCategory(value.toString());
  }

  return (
    <div className="article-container">
      <Modal
        title="发布文章"
        visible={modal.visible}
        onOk={handleOk}
        confirmLoading={modal.confirmLoading}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
      >
        <p>是否确定发布文章?</p>
      </Modal>
      <div className="article-container-header">
        <input
          type="file"
          ref={cover}
          style={{ display: "none" }}
          onChange={showCoverImage}
        />
        <div
          className="article-container-header-bg"
          style={{
            backgroundImage: `url(${coverImage})`
          }}
          onClick={handlePreviewCover}
        />
        <input
          ref={title}
          type="text"
          className="article-container-header-title"
          placeholder="文章标题"
        />
      </div>
      <div className="home-container-content">
        <div className="home-container-content-left">
          {preview ? (
            <ReactMarkdown
              className="article-container-content"
              source={content}
              renderers={{ code: CodeBlock }}
            />
          ) : (
            <div
              ref={contentRef}
              className="article-container-content"
              contentEditable={true}
              suppressContentEditableWarning={true}
              placeholder="文章内容"
            >
              {content}
            </div>
          )}
        </div>
        <div className="home-container-content-right">
          <div className="article-container-content-toolbox">
            <Select
              className="article-container-content-toolbox-category"
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="选择文章分类"
              onChange={handleCategorySelect}
            >
              {categorys.map((v, k) => (
                <Option key={k}>{v.name}</Option>
              ))}
            </Select>
            <Affix
              offsetTop={10}
              className="article-container-content-toolbox-preview"
            >
              <Button type="primary" onClick={handlePreview}>
                {preview ? "编辑" : "预览"}
              </Button>
            </Affix>
            <Affix
              offsetTop={50}
              className="article-container-content-toolbox-submit"
            >
              <Button type="primary" onClick={handleSubmit}>
                发布
              </Button>
            </Affix>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
