import React, { useState } from 'react';
import './App.css';
import { useTranslation, LanguageProvider } from './contexts/LanguageContext';

// 将组件导入移到这里
const JournalArchive = React.lazy(() => import('./components/JournalArchive'));
const NewsAnnouncement = React.lazy(() => import('./components/NewsAnnouncement'));
const AboutUs = React.lazy(() => import('./components/AboutUs'));
const JournalIntroduction = React.lazy(() => import('./components/JournalIntroduction'));

function LanguageSwitch() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="language-switch">
      <button 
        className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
        onClick={() => setLanguage('zh')}
      >
        中文
      </button>
      <button 
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        English
      </button>
      <button 
        className={`lang-btn ${language === 'es' ? 'active' : ''}`}
        onClick={() => setLanguage('es')}
      >
        Español
      </button>
      <button 
        className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
        onClick={() => setLanguage('pt')}
      >
        Português
      </button>
    </div>
  );
}

function AppContent() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('archive');

  const renderContent = () => {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        {(() => {
          switch (activeSection) {
            case 'news':
              return <NewsAnnouncement />;
            case 'about':
              return <AboutUs />;
            case 'introduction':
              return <JournalIntroduction />;
            case 'contact':
              return (
                <div className="contact-section">
                  <h2>联系我们</h2>
                  <div className="contact-info">
                    <div className="info-item">
                      <h3>编辑部地址</h3>
                      <p>北京市海淀区××路××号</p>
                    </div>
                    <div className="info-item">
                      <h3>联系方式</h3>
                      <p>邮箱：journal@example.com</p>
                      <p>电话：010-12345678</p>
                    </div>
                    <div className="info-item submission-guide">
                      <h3>投稿指南</h3>
                      <pre>投稿须知：\n1. 稿件要求...\n2. 投稿流程...\n3. 审稿周期...</pre>
                    </div>
                  </div>
                </div>
              );
            default:
              return <JournalArchive />;
          }
        })()}
      </React.Suspense>
    );
  };

  return (
    <div className="journal-home">
      <div className="top-bar">
        <LanguageSwitch />
      </div>
      <header className="journal-header">
        <h1>Journal Title</h1>
        <nav className="nav-menu">
          <button 
            className={`nav-btn ${activeSection === 'archive' ? 'active' : ''}`}
            onClick={() => setActiveSection('archive')}
          >
            {t('nav.archive')}
          </button>
          <button 
            className={`nav-btn ${activeSection === 'news' ? 'active' : ''}`}
            onClick={() => setActiveSection('news')}
          >
            {t('nav.news')}
          </button>
          <button 
            className={`nav-btn ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => setActiveSection('about')}
          >
            {t('nav.about')}
          </button>
          <button 
            className={`nav-btn ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveSection('contact')}
          >
            {t('nav.contact')}
          </button>
          <button 
            className={`nav-btn ${activeSection === 'introduction' ? 'active' : ''}`}
            onClick={() => setActiveSection('introduction')}
          >
            {t('nav.introduction')}
          </button>
        </nav>
      </header>

      <main className="main-content">
        {renderContent()}
      </main>

      <footer className="journal-footer">
        <p>版权所有 © 2024 期刊导航</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
