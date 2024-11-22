import React, { useState } from 'react';
import './JournalIntroduction.css';
import { useTranslation } from '../contexts/LanguageContext';

const JournalIntroduction = () => {
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const journalsPerPage = 4;
  const { t } = useTranslation();

  // 期刊数据
  const journalData = [
    {
      id: 1,
      title: "人工智能专刊",
      shortDesc: "聚焦人工智能领域的最新研究成果和技术进展",
      fullDesc: `本专刊致力于展现人工智能领域的前沿研究成果和创新应用。主要涵盖：

• 机器学习与深度学习
• 自然语言处理
• 计算机视觉
• 智能机器人
• 知识图谱与语义计算
• AI安全与伦理

我们欢迎相关领域的原创性研究论文、综述文章以及具有重要应用价值的技术报告。`,
      scope: [
        "深度学习算法创新与应用",
        "大规模语言模型研究",
        "智能决策与控制系统",
        "人工智能安全与隐私保护",
        "人工智能伦理与社会影响"
      ],
      metrics: {
        impactFactor: "3.756",
        citescore: "4.2",
        acceptanceRate: "25%"
      },
      imageUrl: "/ai-cover.jpg"
    },
    {
      id: 2,
      title: "区块链与金融科技专刊",
      shortDesc: "探索区块链技术在金融领域的创新应用",
      fullDesc: `本专刊关注区块链技术与金融创新的融合发展，重点研究：

• 区块链核心技术
• 智能合约与DeFi
• 数字货币与支付系统
• 金融科技监管
• 供应链金融
• 跨境支付创新

我们期待收到相关领域的高质量研究成果。`,
      scope: [
        "区块链底层技术研究",
        "加密货币与数字资产",
        "去中心化金融应用",
        "监管科技解决方案",
        "金融安全与风险控制"
      ],
      metrics: {
        impactFactor: "3.245",
        citescore: "3.8",
        acceptanceRate: "30%"
      },
      imageUrl: "/blockchain-cover.jpg"
    },
    {
      id: 3,
      title: "物联网技术专刊",
      shortDesc: "探讨物联网技术的最新发展与应用",
      fullDesc: `本专刊关注物联网技术的创新发展，主要涵盖：

• 物联网架构设计
• 传感器网络
• 边缘计算
• 物联网安全
• 智能家居应用
• 工业物联网

我们欢迎相关领域的创新研究成果。`,
      scope: [
        "物联网架构与协议",
        "智能传感器技术",
        "边缘计算应用",
        "物联网安全防护",
        "智能家居系统"
      ],
      metrics: {
        impactFactor: "2.987",
        citescore: "3.5",
        acceptanceRate: "28%"
      },
      imageUrl: "/iot-cover.jpg"
    },
    {
      id: 4,
      title: "大数据分析专刊",
      shortDesc: "关注大数据处理与分析的创新方法",
      fullDesc: `本专刊专注于大数据领域的前沿研究，包括：

• 大数据处理框架
• 数据挖掘算法
• 数据可视化
• 实时数据分析
• 大数据安全与隐私

欢迎投稿相关研究成果。`,
      scope: [
        "大数据处理技术",
        "数据挖掘与分析",
        "数据可视化方法",
        "大数据安全技术",
        "实时数据处理"
      ],
      metrics: {
        impactFactor: "3.123",
        citescore: "3.9",
        acceptanceRate: "27%"
      },
      imageUrl: "/bigdata-cover.jpg"
    },
    {
      id: 5,
      title: "云计算技术专刊",
      shortDesc: "探索云计算技术的创新与应用",
      fullDesc: `本专刊关注云计算技术的发展与应用，主要包括：

• 云架构设计
• 容器技术
• 微服务架构
• 云安全
• 云原生应用

期待您的投稿。`,
      scope: [
        "云计算架构",
        "容器化技术",
        "微服务设计",
        "云安全防护",
        "云原生应用开发"
      ],
      metrics: {
        impactFactor: "3.234",
        citescore: "3.7",
        acceptanceRate: "29%"
      },
      imageUrl: "/cloud-cover.jpg"
    }
  ];

  // 计算分页数据
  const indexOfLastJournal = currentPage * journalsPerPage;
  const indexOfFirstJournal = indexOfLastJournal - journalsPerPage;
  const currentJournals = journalData.slice(indexOfFirstJournal, indexOfLastJournal);
  const totalPages = Math.ceil(journalData.length / journalsPerPage);

  // 页码变化处理函数
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 渲染分页控件
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 添加首页
    if (startPage > 1) {
      pages.push(
        <button key="1" onClick={() => handlePageChange(1)} className="page-btn">
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="page-ellipsis">...</span>);
      }
    }

    // 添加页码按钮
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // 添加末页
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="page-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="page-btn"
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="page-btn nav-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t('journalIntro.pagination.prev')}
        </button>
        {pages}
        <button
          className="page-btn nav-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t('journalIntro.pagination.next')}
        </button>
      </div>
    );
  };

  return (
    <div className="journal-intro-container">
      {selectedJournal ? (
        // 期刊详情视图
        <div className="journal-detail">
          <button className="back-button" onClick={() => setSelectedJournal(null)}>
            <span>←</span> {t('journalIntro.backToList')}
          </button>
          
          <div className="journal-detail-content">
            <div className="journal-header">
              <div className="journal-cover">
                <img src={selectedJournal.imageUrl} alt={selectedJournal.title} />
              </div>
              <div className="journal-info">
                <h2>{selectedJournal.title}</h2>
                <div className="journal-metrics">
                  <div className="metric">
                    <span className="metric-value">{selectedJournal.metrics.impactFactor}</span>
                    <span className="metric-label">{t('journalIntro.metrics.impactFactor')}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{selectedJournal.metrics.citescore}</span>
                    <span className="metric-label">{t('journalIntro.metrics.citescore')}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{selectedJournal.metrics.acceptanceRate}</span>
                    <span className="metric-label">{t('journalIntro.metrics.acceptanceRate')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="journal-description">
              <h3>{t('journalIntro.description')}</h3>
              <p>{selectedJournal.fullDesc}</p>
            </div>

            <div className="journal-scope">
              <h3>{t('journalIntro.scope')}</h3>
              <ul className="scope-list">
                {selectedJournal.scope.map((item, index) => (
                  <li key={index} className="scope-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2>{t('journalIntro.title')}</h2>
          <div className="journals-grid">
            {currentJournals.map(journal => (
              <div 
                key={journal.id} 
                className="journal-card"
                onClick={() => setSelectedJournal(journal)}
              >
                <div className="journal-card-cover">
                  <img src={journal.imageUrl} alt={journal.title} />
                </div>
                <div className="journal-card-content">
                  <h3>{journal.title}</h3>
                  <p className="journal-short-desc">{journal.shortDesc}</p>
                  <div className="journal-metrics-preview">
                    <span>{t('journalIntro.metrics.impactFactor')}: {journal.metrics.impactFactor}</span>
                  </div>
                  <button className="view-details-btn">
                    {t('journalIntro.viewDetails')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 添加分页控件 */}
          {totalPages > 1 && (
            <div className="pagination-container">
              {renderPagination()}
              <div className="page-info">
                {t('journalIntro.pagination.page', { 
                  current: currentPage, 
                  total: totalPages 
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JournalIntroduction; 