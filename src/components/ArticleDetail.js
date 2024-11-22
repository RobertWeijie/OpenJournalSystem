import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './ArticleDetail.css';

// 设置pdf.js的worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ArticleDetail({ article }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfError, setPdfError] = useState(false);
  const [activeTab, setActiveTab] = useState('abstract');
  
  // 示例文章数据
  const articleData = article || {
    id: 1,
    title: '基于机器学习的数据分析方法研究',
    authors: [
      { name: '张三', affiliation: '某某大学计算机科学系', isCorresponding: true, email: 'zhangsan@example.com' },
      { name: '李四', affiliation: '某某研究院' },
      { name: '王五', affiliation: '某某大学数学系' }
    ],
    abstract: '本研究探讨了机器学习在数据分析中的应用...',
    keywords: ['机器学习', '数据分析', 'AI', '深度学习'],
    doi: '10.1234/xxxx.2024.01.001',
    journal: '计算机科学与技术',
    volume: '36',
    issue: '1',
    pages: '1-15',
    publishDate: '2024-03-01',
    citations: 23,
    downloads: 156,
    views: 1890,
    funding: '国家自然科学基金(No.12345678)',
    references: [
      { id: 1, title: '机器学习概论', authors: '李明等', journal: '计算机研究', year: '2023' }
    ],
    relatedArticles: [
      { id: 2, title: '深度学习在图像识别中的应用', authors: ['赵六', '钱七'], citations: 45 }
    ],
    // 添加 PDF 相关信息
    pdfUrl: 'public/pdfs/article.pdf',  // PDF文件路径
    pdfSize: '2.5MB',              // PDF文件大小
    pdfPages: 15,                  // PDF页数
  };

  // PDF下载处理函数
  const handlePdfDownload = () => {
    // 获取PDF文件URL
    const pdfUrl = articleData.pdfUrl || `/pdfs/${articleData.id}/article.pdf`;
    
    // 创建一个隐藏的a标签来触发下载
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${articleData.title}.pdf`; // 设置下载文件名
    
    // 添加其他必要的文件信息到文件名
    // const fileName = `${articleData.journal}_${articleData.volume}_${articleData.issue}_${articleData.title}.pdf`;
    // link.download = fileName;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF文档加载成功的处理函数
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // 页面切换处理函数
  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  // 修改PDF查看器部分
  const renderPdfViewer = () => {
    const pdfUrl = articleData.pdfUrl;
    console.log('Loading PDF from:', pdfUrl);

    return (
      <div className="fulltext-section">
        <div className="pdf-info">
          <span>
            <i className="icon-file"></i>
            PDF大小: {articleData.pdfSize}
          </span>
          <span>
            <i className="icon-pages"></i>
            页数: {numPages || articleData.pdfPages}
          </span>
        </div>
        
        <div className="pdf-viewer">
          {pdfError ? (
            <div className="pdf-fallback">
              <p>PDF加载失败，请尝试下载后查看</p>
              <p>错误信息: {pdfError.message}</p>
              <button 
                className="btn-primary"
                onClick={handlePdfDownload}
              >
                下载PDF
              </button>
            </div>
          ) : (
            <>
              <div className="pdf-controls">
                <button 
                  onClick={() => changePage(-1)}
                  disabled={pageNumber <= 1}
                >
                  上一页
                </button>
                <span>
                  第 {pageNumber} 页，共 {numPages} 页
                </span>
                <button 
                  onClick={() => changePage(1)}
                  disabled={pageNumber >= numPages}
                >
                  下一页
                </button>
              </div>
              
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => {
                  console.error('PDF加载错误:', error);
                  setPdfError(error);
                }}
                loading={<div className="pdf-loading">正在加载PDF...</div>}
              >
                <Page 
                  pageNumber={pageNumber}
                  scale={1.2}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </Document>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="article-detail-container">
      {/* 文章头部信息 */}
      <header className="article-header">
        <div className="article-type-badge">研究论文</div>
        <h1 className="article-title">{articleData.title}</h1>
        
        <div className="article-meta">
          <div className="authors-list">
            {articleData.authors.map((author, index) => (
              <div key={index} className="author-item">
                <span className="author-name">
                  {author.name}
                  {author.isCorresponding && <sup>*</sup>}
                </span>
                <span className="author-affiliation">{author.affiliation}</span>
              </div>
            ))}
          </div>
          
          <div className="publication-info">
            <span>发表于: {articleData.journal}</span>
            <span>卷 {articleData.volume}, 期 {articleData.issue}</span>
            <span>页码: {articleData.pages}</span>
          </div>
        </div>

        <div className="article-metrics">
          <div className="metric-item">
            <span className="metric-value">{articleData.citations}</span>
            <span className="metric-label">引用</span>
          </div>
          <div className="metric-item">
            <span className="metric-value">{articleData.downloads}</span>
            <span className="metric-label">下载</span>
          </div>
          <div className="metric-item">
            <span className="metric-value">{articleData.views}</span>
            <span className="metric-label">浏览</span>
          </div>
        </div>
      </header>

      {/* 文章操作栏 */}
      <div className="article-actions-bar">
        <div className="action-buttons">
          <button 
            className="btn-primary"
            onClick={handlePdfDownload}
          >
            <i className="icon-download"></i>
            下载PDF
          </button>
          <button className="btn-secondary">
            <i className="icon-cite"></i>
            引用
          </button>
          <button className="btn-secondary">
            <i className="icon-share"></i>
            分享
          </button>
        </div>
      </div>

      {/* 文章内容区 */}
      <div className="article-content">
        <nav className="content-tabs">
          <button 
            className={`tab-btn ${activeTab === 'abstract' ? 'active' : ''}`}
            onClick={() => setActiveTab('abstract')}
          >
            摘要
          </button>
          <button 
            className={`tab-btn ${activeTab === 'fulltext' ? 'active' : ''}`}
            onClick={() => setActiveTab('fulltext')}
          >
            全文
          </button>
          <button 
            className={`tab-btn ${activeTab === 'references' ? 'active' : ''}`}
            onClick={() => setActiveTab('references')}
          >
            参考文献
          </button>
        </nav>

        <div className="content-panel">
          {activeTab === 'abstract' && (
            <div className="abstract-section">
              <div className="keywords">
                <strong>关键词：</strong>
                {articleData.keywords.map((keyword, index) => (
                  <span key={index} className="keyword-tag">{keyword}</span>
                ))}
              </div>
              <h3>摘要</h3>
              <p>{articleData.abstract}</p>
              <div className="funding-info">
                <h3>基金项目</h3>
                <p>{articleData.funding}</p>
              </div>
            </div>
          )}

          {activeTab === 'fulltext' && (
            <div className="fulltext-section">
              {renderPdfViewer()}
            </div>
          )}

          {activeTab === 'references' && (
            <div className="references-section">
              <h3>参考文献 ({articleData.references.length})</h3>
              <ul className="references-list">
                {articleData.references.map((ref, index) => (
                  <li key={ref.id} className="reference-item">
                    <span className="reference-number">[{index + 1}]</span>
                    <span className="reference-content">
                      {ref.authors}. {ref.title}. {ref.journal}, {ref.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 相关文章推荐 */}
      <div className="related-articles">
        <h3>相关文章推荐</h3>
        <div className="related-articles-grid">
          {articleData.relatedArticles.map(article => (
            <div key={article.id} className="related-article-card">
              <h4>{article.title}</h4>
              <p className="authors">{article.authors.join(', ')}</p>
              <span className="citations">被引用 {article.citations} 次</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{color: 'red', marginBottom: '10px'}}>
        当前标签页: {activeTab}
      </div>
    </div>
  );
}

export default ArticleDetail; 