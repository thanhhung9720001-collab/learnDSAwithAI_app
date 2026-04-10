import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'vi' | 'en';

interface Dictionary {
  [key: string]: string;
}

const translations: Record<Language, Dictionary> = {
  vi: {
    // App Sidebar & Footer
    "subtitle": "Sorting Master",
    "algorithmGroup": "Thuật toán sắp xếp",
    "sourceCode": "Mã nguồn dự án",
    "aboutTab": "Về AlgoViz",
    "aboutText": "AlgoViz là một công cụ trực quan hóa giúp bạn hiểu rõ cách thức hoạt động của các thuật toán sắp xếp phổ biến thông qua việc mô phỏng từng bước thực thi.",
    "usageTab": "Cách sử dụng",
    "usageStep1": "Chọn thuật toán từ thanh điều hướng.",
    "usageStep2": "Nhấn \"Phát\" để xem toàn bộ quá trình.",
    "usageStep3": "Sử dụng \"Bước tiếp\" để học kỹ từng dòng code.",
    "complexityTab": "Độ phức tạp",
    "avgTime": "Trung bình:",
    "memory": "Bộ nhớ:",

    // Visualizer Controls & Info
    "simSubtitle": "Trình mô phỏng thuật toán tương tác",
    "btnPlay": "Phát",
    "btnPause": "Tạm dừng",
    "btnNext": "Bước tiếp",
    "btnReset": "Làm mới",
    "speed": "Tốc độ",
    "visualChart": "BIỂU ĐỒ TRỰC QUAN",
    "step": "Bước",
    "legendUnsorted": "Chưa xét",
    "legendPivot": "Con trỏ/Pivot",
    "legendComparing": "Đang so sánh",
    "legendSwapping": "Đang hoán đổi",
    "legendSorted": "Đã sắp xếp",
    "countArray": "Mảng đếm (Count Array)",
    "explanation": "GIẢI THÍCH",
    "preparing": "Đang chuẩn bị...",
    "pythonCode": "PYTHON CODE"
  },
  en: {
    // App Sidebar & Footer
    "subtitle": "Sorting Master",
    "algorithmGroup": "Sorting Algorithms",
    "sourceCode": "View Source Code",
    "aboutTab": "About AlgoViz",
    "aboutText": "AlgoViz is a visualizer tool that helps you understand how common sorting algorithms work by simulating step-by-step execution.",
    "usageTab": "How to use",
    "usageStep1": "Select an algorithm from the navigation bar.",
    "usageStep2": "Click \"Play\" to watch the entire process.",
    "usageStep3": "Use \"Next Step\" to study each line of code.",
    "complexityTab": "Complexity",
    "avgTime": "Average Time:",
    "memory": "Memory space:",

    // Visualizer Controls & Info
    "simSubtitle": "Interactive Algorithm Simulator",
    "btnPlay": "Play",
    "btnPause": "Pause",
    "btnNext": "Next Step",
    "btnReset": "Reset",
    "speed": "Speed",
    "visualChart": "VISUAL CHART",
    "step": "Step",
    "legendUnsorted": "Unsorted",
    "legendPivot": "Pivot",
    "legendComparing": "Comparing",
    "legendSwapping": "Swapping",
    "legendSorted": "Sorted",
    "countArray": "Count Array",
    "explanation": "EXPLANATION",
    "preparing": "Preparing...",
    "pythonCode": "PYTHON CODE"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
