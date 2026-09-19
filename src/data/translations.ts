// TakeHomeGlobal - Multi-Language Translation Dictionary
import type { LanguageCode } from '../types';

export interface Translations {
  tagline: string;
  badgeIndependent: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroSubtitle: string;
  badge100Free: string;
  badgeNoSignup: string;
  badgePrivate: string;
  cardTitle: string;
  cardLiveBadge: string;
  annualIncomeLabel: string;
  currencyLabel: string;
  countryToCalculateLabel: string;
  stateLabel: string;
  calculateBtn: string;
  addCountryBtn: string;
  clearAllBtn: string;
  disclaimerMicro: string;
  effectiveTaxRate: string;
  takeHomePay: string;
  monthlyTakeHome: string;
  incomeTax: string;
  socialSecurity: string;
  netIncomeAnnual: string;
  embedBtn: string;
  detailedBreakdownTitle: string;
  detailedBreakdownSubtitle: string;
  searchCountryPlaceholder: string;
  filterLowestTax: string;
  filterHighestTax: string;
  filterHighestNet: string;
  filterAlphabetical: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    tagline: 'Global Take-Home Pay & Income Tax Calculator (2026)',
    badgeIndependent: 'INDEPENDENT TAX CALCULATOR · UPDATED 2026',
    heroHeadline: 'Global Take-Home Calculator — how much do you',
    heroHeadlineHighlight: 'actually keep?',
    heroSubtitle:
      'Free international tax and take-home pay calculator for 35+ countries and all 50 US states. Compare income tax rates, net take-home pay, and social contributions — updated for 2026.',
    badge100Free: '100% FREE',
    badgeNoSignup: 'NO SIGNUP',
    badgePrivate: 'CLIENT-SIDE PRIVATE',
    cardTitle: 'TAX & TAKE-HOME ESTIMATOR',
    cardLiveBadge: 'Live 2026 rates',
    annualIncomeLabel: 'Annual Gross Income',
    currencyLabel: 'Income Currency',
    countryToCalculateLabel: 'Country to Calculate',
    stateLabel: 'State / Province',
    calculateBtn: 'Calculate Estimate',
    addCountryBtn: '+ Add Country to Compare',
    clearAllBtn: 'Clear All',
    disclaimerMicro:
      'Estimates for informational purposes only. All calculations run 100% locally in your browser.',
    effectiveTaxRate: 'Effective Tax Rate',
    takeHomePay: 'Take-Home Pay',
    monthlyTakeHome: 'Monthly Take-Home',
    incomeTax: 'Income Tax',
    socialSecurity: 'Social Security / NI',
    netIncomeAnnual: 'Net Income (Annual)',
    embedBtn: 'Embed Calculator',
    detailedBreakdownTitle: 'Detailed Country Matrix',
    detailedBreakdownSubtitle: 'Compare statutory brackets, take-home pay, and real spending power globally.',
    searchCountryPlaceholder: 'Search by country name or code...',
    filterLowestTax: 'Lowest Tax First',
    filterHighestTax: 'Highest Tax First',
    filterHighestNet: 'Highest Net Pay',
    filterAlphabetical: 'Alphabetical (A-Z)',
  },
  zh: {
    tagline: '全球税后到手收入与所得税计算器 (2026)',
    badgeIndependent: '独立税务计算器 · 2026最新税率',
    heroHeadline: '全球税后到手收入计算器 — 您究竟能',
    heroHeadlineHighlight: '拿到多少？',
    heroSubtitle:
      '涵盖全球35+主要经济体及美国50个州的免费税收与到手收入计算工具。对比所得税、社保与实际可支配收入。',
    badge100Free: '完全免费',
    badgeNoSignup: '无需注册',
    badgePrivate: '本地隐私保护',
    cardTitle: '税收与到手收入测算',
    cardLiveBadge: '2026实时汇率',
    annualIncomeLabel: '税前年总收入',
    currencyLabel: '收入计价货币',
    countryToCalculateLabel: '选择计算国家',
    stateLabel: '州 / 省份',
    calculateBtn: '立即计算',
    addCountryBtn: '+ 添加对比国家',
    clearAllBtn: '全部清空',
    disclaimerMicro: '测算结果仅供参考，所有数据均在您的浏览器本地执行运算。',
    effectiveTaxRate: '实际有效税率',
    takeHomePay: '税后到手收入',
    monthlyTakeHome: '月均到手薪水',
    incomeTax: '个人所得税',
    socialSecurity: '社保公积金 (五险一金)',
    netIncomeAnnual: '年度净收入 (税后)',
    embedBtn: '嵌入本计算器',
    detailedBreakdownTitle: '全球各国详细税率矩阵',
    detailedBreakdownSubtitle: '一览全球法定税阶、税后薪资及实际购买力。',
    searchCountryPlaceholder: '搜索国家名称...',
    filterLowestTax: '低税率优先',
    filterHighestTax: '高税率优先',
    filterHighestNet: '最高到手优先',
    filterAlphabetical: '按首字母排序',
  },
  ja: {
    tagline: '世界の手取り給与・所得税シミュレーター (2026)',
    badgeIndependent: '独立系税務シミュレーター · 2026年最新税制対応',
    heroHeadline: '世界の手取り額計算ツール — 実際に手元に残る金額は',
    heroHeadlineHighlight: 'いくら？',
    heroSubtitle:
      '世界35カ国以上および米国全50州に対応した無料の所得税・手取りシミュレーター。社会保険料や実効税率を瞬時に比較。',
    badge100Free: '完全無料',
    badgeNoSignup: '登録不要',
    badgePrivate: 'ブラウザ完結・完全非公開',
    cardTitle: '手取りシミュレーター',
    cardLiveBadge: '2026年最新レート',
    annualIncomeLabel: '年収（額面総支給額）',
    currencyLabel: '通貨選択',
    countryToCalculateLabel: '計算対象国',
    stateLabel: '州 / 地域',
    calculateBtn: '手取りを計算',
    addCountryBtn: '+ 国を追加して比較',
    clearAllBtn: 'リセット',
    disclaimerMicro: '試算結果は情報提供のみを目的としており、計算はブラウザ内でローカルに実行されます。',
    effectiveTaxRate: '実効税率',
    takeHomePay: '手取り額',
    monthlyTakeHome: '月額手取り額',
    incomeTax: '所得税・住民税',
    socialSecurity: '社会保険料 (厚生年金・健康保険)',
    netIncomeAnnual: '年間手取り総額',
    embedBtn: '計算機を埋め込む',
    detailedBreakdownTitle: '国別税制・手取り詳細一覧',
    detailedBreakdownSubtitle: '各国の税率、手取り額、生活費控除後の購買力を比較。',
    searchCountryPlaceholder: '国名で検索...',
    filterLowestTax: '税率が低い順',
    filterHighestTax: '税率が高い順',
    filterHighestNet: '手取りが多い順',
    filterAlphabetical: '五十音・アルファベット順',
  },
  ko: {
    tagline: '글로벌 실수령액 및 소득세 계산기 (2026)',
    badgeIndependent: '독립형 세금 계산기 · 2026년 최신 세율 반영',
    heroHeadline: '글로벌 실수령액 계산기 — 실제로 내 손에 들어오는 돈은',
    heroHeadlineHighlight: '얼마일까?',
    heroSubtitle:
      '전 세계 35개국 이상 및 미국 50개 주를 지원하는 무료 소득세 및 실수령액 계산기입니다. 소득세, 4대 보험, 실수령액을 즉시 비교하세요.',
    badge100Free: '100% 무료',
    badgeNoSignup: '회원가입 없음',
    badgePrivate: '브라우저 로컬 연산 (개인정보 보호)',
    cardTitle: '세금 및 실수령액 예측기',
    cardLiveBadge: '2026 실시간 환율',
    annualIncomeLabel: '연간 총소득 (세전)',
    currencyLabel: '통화 선택',
    countryToCalculateLabel: '계산 대상 국가',
    stateLabel: '주 / 지역',
    calculateBtn: '실수령액 계산하기',
    addCountryBtn: '+ 비교할 국가 추가',
    clearAllBtn: '전체 초기화',
    disclaimerMicro: '본 시뮬레이션 결과는 정보 제공 목적이며, 모든 계산은 브라우저에서 안전하게 실행됩니다.',
    effectiveTaxRate: '실효세율',
    takeHomePay: '실수령액',
    monthlyTakeHome: '월 실수령액',
    incomeTax: '소득세 / 지방소득세',
    socialSecurity: '사회보험료 (국민연금·건강보험)',
    netIncomeAnnual: '연간 실수령 총액',
    embedBtn: '계산기 퍼가기',
    detailedBreakdownTitle: '국가별 상세 세금 및 수령액 매트릭스',
    detailedBreakdownSubtitle: '전 세계 국가의 세법, 실수령액, 물가 반영 실질 구매력을 비교합니다.',
    searchCountryPlaceholder: '국가명 검색...',
    filterLowestTax: '낮은 세율순',
    filterHighestTax: '높은 세율순',
    filterHighestNet: '실수령액 높은순',
    filterAlphabetical: '가나다순',
  },
  ur: {
    tagline: 'عالمی ٹیکس اور نیٹ تنخواہ کیلکولیٹر (2026)',
    badgeIndependent: 'آزاد ٹیکس کیلکولیٹر · 2026 اپڈیٹ شدہ',
    heroHeadline: 'عالمی ٹیکس ہوم کیلکولیٹر — اصل میں آپ کو',
    heroHeadlineHighlight: 'کتنی بچت ہوتی ہے؟',
    heroSubtitle:
      'پاکستان، امریکہ، برطانیہ، دبئی سمیت 35 سے زائد ممالک کے لیے مفت انکم ٹیکس اور نیٹ تنخواہ کا موازنہ۔ ایف بی آر سلیبس کے مطابق درست معلومات۔',
    badge100Free: '100% مفت',
    badgeNoSignup: 'کوئی سائن اپ درکار نہیں',
    badgePrivate: 'پرائیویٹ اور محفوظ',
    cardTitle: 'ٹیکس اور تنخواہ کا تخمینہ',
    cardLiveBadge: '2026 شرحیں',
    annualIncomeLabel: 'سالانہ مجموعی آمدنی',
    currencyLabel: 'کرنسی',
    countryToCalculateLabel: 'ملک منتخب کریں',
    stateLabel: 'صوبہ / ریاست',
    calculateBtn: 'ٹیکس معلوم کریں',
    addCountryBtn: '+ موازنہ کے لیے ملک شامل کریں',
    clearAllBtn: 'سب صاف کریں',
    disclaimerMicro: 'یہ تخمینہ صرف معلوماتی مقصد کے لیے ہے۔ تمام حساب کتاب آپ کے براؤزر میں نجی طور پر ہوتا ہے۔',
    effectiveTaxRate: 'مؤثر ٹیکس کی شرح',
    takeHomePay: 'نیٹ تنخواہ (ٹیک ہوم)',
    monthlyTakeHome: 'ماہانہ نیٹ آمدنی',
    incomeTax: 'انکم ٹیکس',
    socialSecurity: 'ای او بی آئی / سوشل انشورنس',
    netIncomeAnnual: 'سالانہ نیٹ آمدنی',
    embedBtn: 'کیلکولیٹر ایمبیڈ کریں',
    detailedBreakdownTitle: 'ممالک کی تفصیلی ٹیکس فہرست',
    detailedBreakdownSubtitle: 'مختلف ممالک کے ٹیکس سلیبس اور قوت خرید کا موازنہ کریں۔',
    searchCountryPlaceholder: 'ملک کا نام تلاش کریں...',
    filterLowestTax: 'کم ترین ٹیکس پہلے',
    filterHighestTax: 'زیادہ ترین ٹیکس پہلے',
    filterHighestNet: 'زیادہ ترین نیٹ تنخواہ',
    filterAlphabetical: 'حروف تہجی کے لحاظ سے',
  },
};
