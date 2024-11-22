import React, { useState, useMemo } from 'react';
import './JournalArchive.css';
import { useTranslation } from '../contexts/LanguageContext';

const JournalArchive = () => {
  const { t } = useTranslation();
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date, title, citations
  const [filterYear, setFilterYear] = useState('all');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    author: '',
    keyword: '',
    dateRange: { start: '', end: '' }
  });

  // 添加分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; // 每页显示5篇文章

  // 示例数据结构增强
  const volumes = [
    {
      year: 2024,
      volumes: [
        { 
          id: 1, 
          number: 1, 
          month: '3月', 
          articleCount: 12,
          specialTopic: '人工智能专刊',
          publishDate: '2024-03-01'
        },
        { 
          id: 2, 
          number: 2, 
          month: '6月', 
          articleCount: 15,
          specialTopic: '区块链与金融科技专刊',
          publishDate: '2024-06-01'
        }
      ]
    }
  ];

  const articles = [
    // 第一期文章（人工智能专刊）
    {
      id: 1,
      volumeId: 1,
      title: '基于机器学习的数据分析方法研究',
      authors: ['张三', '李四', '王五'],
      category: '研究论文',
      keywords: ['机器学习', '数据分析', 'AI'],
      doi: '10.1234/xxxx.2024.01.001',
      pages: '1-15',
      publishDate: '2024-03-01',
      abstract: '本研究探讨了机器学习在数据分析中的应用，提出了一种新的数据处理方法，在实验中取得了显著效果...',
      funding: '国家自然科学基金(No.12345678)',
      correspondingAuthor: '张三',
      institution: '清华大学'
    },
    {
      id: 2,
      volumeId: 1,
      title: '深度学习在自然语言处理中的应用研究',
      authors: ['李明', '王芳', '张伟'],
      category: '综述',
      keywords: ['深度学习', 'NLP', '人工智能'],
      doi: '10.1234/xxxx.2024.01.002',
      pages: '16-35',
      publishDate: '2024-02-15',
      abstract: '本文综述了深度学习在自然语言处理领域的最新进展，包括预训练模型、文本生成、机器翻译等方向...',
      funding: '国家重点研发计划(No.2024YFB456789)',
      correspondingAuthor: '李明',
      institution: '北京理工大学'
    },
    {
      id: 3,
      volumeId: 1,
      title: '人工智能在医疗诊断中的应用进展',
      authors: ['刘强', '张丽', '王刚'],
      category: '综述',
      keywords: ['人工智能', '医疗诊断', '深度学习'],
      doi: '10.1234/xxxx.2024.01.003',
      pages: '36-55',
      publishDate: '2024-02-20',
      abstract: '本文综述了人工智能技术在医疗诊断领域的应用现状，分析了主要研究方向和关键技术...',
      funding: '国家自然科学基金(No.87654321)',
      correspondingAuthor: '刘强',
      institution: '复旦大学'
    },
    {
      id: 4,
      volumeId: 1,
      title: '强化学习在自动驾驶决策中的应用',
      authors: ['王明', '李华', '张勇'],
      category: '研究论文',
      keywords: ['强化学习', '自动驾驶', '决策系统'],
      doi: '10.1234/xxxx.2024.01.004',
      pages: '56-75',
      publishDate: '2024-02-25',
      abstract: '本研究提出了一种基于强化学习的自动驾驶决策系统，通过实车测试验证了系统的有效性...',
      funding: '国家重点研发计划(No.2024ABC123)',
      correspondingAuthor: '王明',
      institution: '上海交通大学'
    },

    // 第二期文章（区块链与金融科技专刊）
    {
      id: 5,
      volumeId: 2,
      title: '区块链技术在供应链金融中的创新应用',
      authors: ['陈明', '王丽', '张强'],
      category: '研究论文',
      keywords: ['区块链', '供应链金融', '创新应用'],
      doi: '10.1234/xxxx.2024.02.001',
      pages: '1-20',
      publishDate: '2024-03-15',
      abstract: '本研究探讨了区块链技术如何改善供应链金融的效率和透明度，提出了创新的应用模式...',
      funding: '企业联合研发项目(No.E202402001)',
      correspondingAuthor: '陈明',
      institution: '浙江大学'
    },
    {
      id: 6,
      volumeId: 2,
      title: '智能合约在数字货币交易中的应用研究',
      authors: ['王智', '李伟', '张芳'],
      category: '研究论文',
      keywords: ['智能合约', '数字货币', '区块链'],
      doi: '10.1234/xxxx.2024.02.002',
      pages: '21-40',
      publishDate: '2024-03-15',
      abstract: '本文研究了智能合约在数字货币交易中的应用机制，提出了安全性优化方案...',
      funding: '金融科技创新项目(No.F202402002)',
      correspondingAuthor: '王智',
      institution: '北京大学'
    },
    {
      id: 7,
      volumeId: 2,
      title: '金融科技监管的技术实现与挑战',
      authors: ['李杰', '王颖', '张鑫'],
      category: '综述',
      keywords: ['金融科技', '监管科技', 'RegTech'],
      doi: '10.1234/xxxx.2024.02.003',
      pages: '41-60',
      publishDate: '2024-03-20',
      abstract: '本文综述了金融科技监管的技术实现方案，分析了当前面临的挑战和未来发展趋势...',
      funding: '国家社会科学基金(No.S202402003)',
      correspondingAuthor: '李杰',
      institution: '中国人民大学'
    },
    {
      id: 8,
      volumeId: 2,
      title: '分布式账本技术在跨境支付中的应用',
      authors: ['张伟明', '李红', '王建'],
      category: '研究论文',
      keywords: ['分布式账本', '跨境支付', '区块链'],
      doi: '10.1234/xxxx.2024.02.004',
      pages: '61-80',
      publishDate: '2024-03-25',
      abstract: '本研究提出了基于分布式账本技术的跨境支付解决方案，并通过实证研究验证其可行性...',
      funding: '中国人民银行金融科技项目(No.P202402004)',
      correspondingAuthor: '张伟明',
      institution: '武汉大学'
    },

    // 添加更多第一期文章（人工智能专刊）
    {
      id: 9,
      volumeId: 1,
      title: '深度强化学习在机器人控制中的应用',
      authors: ['陈浩', '王晓', '李强'],
      category: '研究论文',
      keywords: ['深度强化学习', '机器人控制', 'AI'],
      doi: '10.1234/xxxx.2024.01.005',
      pages: '76-95',
      publishDate: '2024-02-28',
      abstract: '本文探讨了深度强化学习在机器人控制领域的创新应用，提出了一种新的控制算法...',
      funding: '机器人重点研发项目(No.R202401001)',
      correspondingAuthor: '陈浩',
      institution: '哈尔滨工业大学'
    },
    {
      id: 10,
      volumeId: 1,
      title: '图神经网络在社交网络分析中的应用',
      authors: ['张萍', '李阳', '王琳'],
      category: '研究论文',
      keywords: ['图神经网络', '社交网络', '数据挖掘'],
      doi: '10.1234/xxxx.2024.01.006',
      pages: '96-115',
      publishDate: '2024-02-26',
      abstract: '本研究将图神经网络应用于社交网络分析，提出了一种新的用户行为预测模型...',
      funding: '国家自然科学基金(No.GNN202401)',
      correspondingAuthor: '张萍',
      institution: '南京大学'
    },

    // 添加更多第二期文章（区块链与金融科技专刊）
    {
      id: 11,
      volumeId: 2,
      title: '基于区块链的供应链溯源系统研究',
      authors: ['刘明', '张华', '王强'],
      category: '研究论文',
      keywords: ['区块链', '供应链', '溯源系统'],
      doi: '10.1234/xxxx.2024.02.005',
      pages: '81-100',
      publishDate: '2024-03-22',
      abstract: '本文设计了一种基于区块链技术的供应链溯源系统，实现了全程可追溯...',
      funding: '区块链技术创新项目(No.B202402005)',
      correspondingAuthor: '刘明',
      institution: '西安交通大学'
    },
    {
      id: 12,
      volumeId: 2,
      title: '数字人民币支付系统的安全性分析',
      authors: ['王建国', '李明', '张伟'],
      category: '研究论文',
      keywords: ['数字人民币', '支付系统', '安全性'],
      doi: '10.1234/xxxx.2024.02.006',
      pages: '101-120',
      publishDate: '2024-03-20',
      abstract: '本研究对数字人民币支付系统进行了全面的安全性分析，提出了改进建议...',
      funding: '金融科技安全项目(No.S202402006)',
      correspondingAuthor: '王建国',
      institution: '中国人民银行研究所'
    },
    {
      id: 13,
      volumeId: 2,
      title: '智能合约在保险理赔中的应用研究',
      authors: ['李芳', '王玲', '张强'],
      category: '研究论文',
      keywords: ['智能合约', '保险理赔', '区块链'],
      doi: '10.1234/xxxx.2024.02.007',
      pages: '121-140',
      publishDate: '2024-03-18',
      abstract: '本文探讨了智能合约在保险理赔过程中的应用，提出了自动化理赔方案...',
      funding: '保险科技创新项目(No.I202402007)',
      correspondingAuthor: '李芳',
      institution: '对外经济贸易大学'
    },
    {
      id: 14,
      volumeId: 2,
      title: '区块链在绿色金融中的应用前景',
      authors: ['张明', '李华', '王芳'],
      category: '综述',
      keywords: ['区块链', '绿色金融', '可持续发展'],
      doi: '10.1234/xxxx.2024.02.008',
      pages: '141-160',
      publishDate: '2024-03-16',
      abstract: '本文综述了区块链技术在绿色金融领域的应用现状和发展前景...',
      funding: '绿色金融研究项目(No.G202402008)',
      correspondingAuthor: '张明',
      institution: '中央财经大学'
    }
  ];

  // 文章排序和筛选逻辑
  const filteredAndSortedArticles = useMemo(() => {
    return articles
      .filter(article => {
        // 期号筛选
        const volumeMatch = !selectedVolume || article.volumeId === selectedVolume;

        // 基础搜索
        const searchMatch = searchTerm === '' || 
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.authors.some(author => 
            author.toLowerCase().includes(searchTerm.toLowerCase())
          );

        // 分类筛选
        const categoryMatch = selectedCategory === 'all' || 
          article.category === selectedCategory;

        // 高级筛选
        const authorMatch = !advancedFilters.author || 
          article.authors.some(author => 
            author.toLowerCase().includes(advancedFilters.author.toLowerCase())
          );
        
        const keywordMatch = !advancedFilters.keyword ||
          article.keywords.some(keyword =>
            keyword.toLowerCase().includes(advancedFilters.keyword.toLowerCase())
          );

        return volumeMatch && searchMatch && categoryMatch && authorMatch && keywordMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          default: // date
            return new Date(b.publishDate) - new Date(a.publishDate);
        }
      });
  }, [articles, selectedVolume, searchTerm, selectedCategory, sortBy, advancedFilters]);

  // 计算分页数据
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredAndSortedArticles.slice(startIndex, endIndex);
  }, [filteredAndSortedArticles, currentPage]);

  // 计算总页数
  const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage);

  // 页码变化处理函数
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 渲染分页控件
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5; // 最多显示5个页码

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 添加首页
    if (startPage > 1) {
      pages.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="page-btn"
        >
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
          上一页
        </button>
        {pages}
        <button
          className="page-btn nav-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          下一页
        </button>
      </div>
    );
  };

  // 在文章列表头部添加当前期刊信息
  const getCurrentVolume = () => {
    if (!selectedVolume) return null;
    const allVolumes = volumes.flatMap(year => year.volumes);
    return allVolumes.find(v => v.id === selectedVolume);
  };

  return (
    <div className="archive-container">
      <div className="archive-header">
        <h2>{t('archive.title')}</h2>
        
        {/* 搜索和筛选区 */}
        <div className="search-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder={t('journalArchive.search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="advanced-search-toggle"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            >
              {t('journalArchive.search.advanced')}
            </button>
          </div>

          {showAdvancedSearch && (
            <div className="advanced-search-panel">
              <input
                type="text"
                placeholder="作者搜索"
                value={advancedFilters.author}
                onChange={(e) => setAdvancedFilters({
                  ...advancedFilters,
                  author: e.target.value
                })}
              />
              <input
                type="text"
                placeholder="关键词搜索"
                value={advancedFilters.keyword}
                onChange={(e) => setAdvancedFilters({
                  ...advancedFilters,
                  keyword: e.target.value
                })}
              />
              <div className="date-range">
                <input
                  type="date"
                  value={advancedFilters.dateRange.start}
                  onChange={(e) => setAdvancedFilters({
                    ...advancedFilters,
                    dateRange: { ...advancedFilters.dateRange, start: e.target.value }
                  })}
                />
                <span>至</span>
                <input
                  type="date"
                  value={advancedFilters.dateRange.end}
                  onChange={(e) => setAdvancedFilters({
                    ...advancedFilters,
                    dateRange: { ...advancedFilters.dateRange, end: e.target.value }
                  })}
                />
              </div>
            </div>
          )}

          <div className="filter-sort-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">按发表日期排序</option>
              <option value="citations">按引用次数排序</option>
              <option value="downloads">按下载次数���序</option>
              <option value="title">按标题排序</option>
            </select>

            <div className="category-tabs">
              {['全部', '研究论文', '综述', '快报', '评论'].map(category => (
                <button
                  key={category}
                  className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="archive-content">
        {/* 卷期列表 */}
        <div className="volumes-list">
          <select 
            value={filterYear} 
            onChange={(e) => setFilterYear(e.target.value)}
            className="year-select"
          >
            <option value="all">所有年份</option>
            {volumes.map(yearGroup => (
              <option key={yearGroup.year} value={yearGroup.year}>{yearGroup.year}年</option>
            ))}
          </select>

          {volumes.map(yearGroup => (
            <div key={yearGroup.year} className="year-group">
              <h3 className="year-title">{yearGroup.year}年</h3>
              <div className="volume-grid">
                {yearGroup.volumes.map(volume => (
                  <div
                    key={volume.id}
                    className={`volume-card ${selectedVolume === volume.id ? 'active' : ''}`}
                    onClick={() => setSelectedVolume(volume.id)}
                  >
                    <div className="volume-info">
                      <span className="volume-number">第 {volume.number} 期</span>
                      <span className="volume-month">{volume.month}</span>
                    </div>
                    {volume.specialTopic && (
                      <div className="special-topic">{volume.specialTopic}</div>
                    )}
                    <div className="volume-stats">
                      <span>{volume.articleCount} 篇文章</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 文章列表 */}
        <div className="articles-list">
          <div className="articles-header">
            {selectedVolume && getCurrentVolume() && (
              <div className="current-volume-info">
                <h3>{getCurrentVolume().specialTopic}</h3>
                <p>第 {getCurrentVolume().number} 期 ({getCurrentVolume().month})</p>
              </div>
            )}
            <div className="articles-summary">
              <h3>文章列表</h3>
              <span className="article-count">
                {t('journalArchive.articleList.total', { count: filteredAndSortedArticles.length })}
              </span>
            </div>
          </div>
          
          {/* 使用分页后的文章列表 */}
          {paginatedArticles.map(article => (
            <div key={article.id} className="article-item">
              <h4 className="article-title">
                {article.title}
              </h4>
              <div className="article-meta">
                <span className="article-type">{article.category}</span>
                <span className="article-authors">
                  作者: {article.authors.join(', ')}
                </span>
              </div>
              <p className="article-abstract">{article.abstract}</p>
              <div className="article-keywords">
                {article.keywords.map(keyword => (
                  <span key={keyword} className="keyword-tag">
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="article-info">
                <span>DOI: {article.doi}</span>
                <span>页码: {article.pages}</span>
                <span>发表日期: {article.publishDate}</span>
              </div>
            </div>
          ))}

          {/* 添加分页控件 */}
          {totalPages > 1 && (
            <div className="pagination-container">
              {renderPagination()}
              <div className="page-info">
                第 {currentPage} 页，共 {totalPages} 页，
                共 {filteredAndSortedArticles.length} 篇文章
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalArchive; 