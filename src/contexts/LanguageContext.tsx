
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'th' | 'ja' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    masterData: 'Master Data',
    fieldManagement: 'Field Management',
    users: 'Users',
    settings: 'Settings',
    logout: 'Logout',
    
    // Authentication
    login: 'Login',
    email: 'Email',
    password: 'Password',
    welcomeBack: 'Welcome Back',
    pleaseSignIn: 'Please sign in to your account',
    
    // CRUD Operations
    create: 'Create',
    read: 'Read',
    update: 'Update',
    delete: 'Delete',
    search: 'Search',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    
    // Common
    name: 'Name',
    description: 'Description',
    status: 'Status',
    actions: 'Actions',
    active: 'Active',
    inactive: 'Inactive',
    
    // Messages
    createSuccess: 'Created successfully',
    updateSuccess: 'Updated successfully',
    deleteSuccess: 'Deleted successfully',
    deleteConfirm: 'Are you sure you want to delete this item?',
  },
  th: {
    // Navigation
    dashboard: 'แดชบอร์ด',
    masterData: 'ข้อมูลหลัก',
    fieldManagement: 'การจัดการฟิลด์',
    users: 'ผู้ใช้',
    settings: 'การตั้งค่า',
    logout: 'ออกจากระบบ',
    
    // Authentication
    login: 'เข้าสู่ระบบ',
    email: 'อีเมล',
    password: 'รหัสผ่าน',
    welcomeBack: 'ยินดีต้อนรับกลับ',
    pleaseSignIn: 'กรุณาเข้าสู่ระบบ',
    
    // CRUD Operations
    create: 'สร้าง',
    read: 'อ่าน',
    update: 'อัปเดต',
    delete: 'ลบ',
    search: 'ค้นหา',
    edit: 'แก้ไข',
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    confirm: 'ยืนยัน',
    
    // Common
    name: 'ชื่อ',
    description: 'คำอธิบาย',
    status: 'สถานะ',
    actions: 'การดำเนินการ',
    active: 'ใช้งาน',
    inactive: 'ไม่ใช้งาน',
    
    // Messages
    createSuccess: 'สร้างสำเร็จ',
    updateSuccess: 'อัปเดตสำเร็จ',
    deleteSuccess: 'ลบสำเร็จ',
    deleteConfirm: 'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?',
  },
  ja: {
    // Navigation
    dashboard: 'ダッシュボード',
    masterData: 'マスターデータ',
    fieldManagement: 'フィールド管理',
    users: 'ユーザー',
    settings: '設定',
    logout: 'ログアウト',
    
    // Authentication
    login: 'ログイン',
    email: 'メール',
    password: 'パスワード',
    welcomeBack: 'おかえりなさい',
    pleaseSignIn: 'アカウントにサインインしてください',
    
    // CRUD Operations
    create: '作成',
    read: '読み取り',
    update: '更新',
    delete: '削除',
    search: '検索',
    edit: '編集',
    save: '保存',
    cancel: 'キャンセル',
    confirm: '確認',
    
    // Common
    name: '名前',
    description: '説明',
    status: 'ステータス',
    actions: 'アクション',
    active: 'アクティブ',
    inactive: '非アクティブ',
    
    // Messages
    createSuccess: '正常に作成されました',
    updateSuccess: '正常に更新されました',
    deleteSuccess: '正常に削除されました',
    deleteConfirm: 'この項目を削除してもよろしいですか？',
  },
  zh: {
    // Navigation
    dashboard: '仪表板',
    masterData: '主数据',
    fieldManagement: '字段管理',
    users: '用户',
    settings: '设置',
    logout: '登出',
    
    // Authentication
    login: '登录',
    email: '邮箱',
    password: '密码',
    welcomeBack: '欢迎回来',
    pleaseSignIn: '请登录您的账户',
    
    // CRUD Operations
    create: '创建',
    read: '读取',
    update: '更新',
    delete: '删除',
    search: '搜索',
    edit: '编辑',
    save: '保存',
    cancel: '取消',
    confirm: '确认',
    
    // Common
    name: '名称',
    description: '描述',
    status: '状态',
    actions: '操作',
    active: '活跃',
    inactive: '非活跃',
    
    // Messages
    createSuccess: '创建成功',
    updateSuccess: '更新成功',
    deleteSuccess: '删除成功',
    deleteConfirm: '您确定要删除此项吗？',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
