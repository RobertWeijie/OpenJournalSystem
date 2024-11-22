import React, { createContext, useState, useContext } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('zh'); // 默认中文

  const t = (key) => {
    try {
      const keys = key.split('.');
      let value = translations[language];
      
      // 处理大小写敏感的键值
      for (const k of keys) {
        // 首先尝试直接匹配
        if (value?.[k] !== undefined) {
          value = value[k];
        } else {
          // 如果直接匹配失败，尝试查找大小写不敏感的匹配
          const caseInsensitiveKey = Object.keys(value || {})
            .find(key => key.toLowerCase() === k.toLowerCase());
          
          if (caseInsensitiveKey) {
            value = value[caseInsensitiveKey];
          } else {
            // 如果找不到匹配，返回键值本身
            return key;
          }
        }
      }
      
      return value || key;
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error);
      return key;
    }
  };

  // 添加语言切换前的验证
  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLanguage(newLang);
    } else {
      console.warn(`Language ${newLang} is not supported`);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: changeLanguage,
      t,
      // 添加支持的语言列表
      supportedLanguages: Object.keys(translations),
      // 添加获取当前语言的翻译对象
      getCurrentTranslations: () => translations[language]
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
} 