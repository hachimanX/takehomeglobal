import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TopAnnouncementBar } from './components/TopAnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ComparisonCards } from './components/ComparisonCards';
import { ArbitrageCard } from './components/ArbitrageCard';
import { GlobalExplorerTable } from './components/GlobalExplorerTable';
import { AffiliateBanners } from './components/AffiliateBanners';
import { FaqSection } from './components/FaqSection';
import { AboutPage } from './components/AboutPage';
import { AdvertisePage } from './components/AdvertisePage';
import { ContactPage } from './components/ContactPage';
import { CountryHubPage } from './components/CountryHubPage';
import { GuidesIndexPage } from './components/GuidesIndexPage';
import { ArticleView } from './components/ArticleView';
import { EmbedModal } from './components/EmbedModal';
import { Footer } from './components/Footer';

import { COUNTRIES } from './data/taxData';
import { DEFAULT_EXCHANGE_RATES, getExchangeRates } from './data/exchangeRates';
import { calculateCountryTax } from './engine/calculator';
import { ARTICLES } from './data/articlesData';
import { SITE_CONFIG } from './config';
import type { LanguageCode } from './types';
import { BookOpen, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation Routing state
  const [activeView, setActiveView] = useState<string>('home'); // home | about | advertise | contact | country | guides | article
  const [viewParam, setViewParam] = useState<string>(''); // countryId or article slug
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isEmbedOpen, setIsEmbedOpen] = useState<boolean>(false);

  // Calculator Parameters
  const [grossIncome, setGrossIncome] = useState<number>(100000);
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['usa']);
  const [selectedSubRegions, setSelectedSubRegions] = useState<Record<string, string>>({
    usa: 'California',
    canada: 'Ontario',
  });
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(DEFAULT_EXCHANGE_RATES);

  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize from URL query params or hash
  useEffect(() => {
    try {
      // Check for affiliate cloaked redirects
      const searchParams = new URLSearchParams(window.location.search);
      const cloakedTarget = searchParams.get('go') || window.location.hash.replace('#/go/', '').replace('#go/', '');

      if (cloakedTarget === 'wise') {
        window.location.href = SITE_CONFIG.affiliates.wise.destinationUrl;
        return;
      }

      const rawTarget = window.location.hash.replace('#', '') || window.location.pathname;
      const normalized = rawTarget.startsWith('/') ? rawTarget : `/${rawTarget}`;

      if (normalized.startsWith('/tax-calculator/')) {
        const countryId = normalized.replace('/tax-calculator/', '').replace(/\//g, '');
        if (COUNTRIES.some((c) => c.id === countryId)) {
          setActiveView('country');
          setViewParam(countryId);
        }
      } else if (normalized.startsWith('/compare/') || normalized.startsWith('/tax-guides/')) {
        const slug = normalized.split('/').filter(Boolean).pop();
        if (slug && ARTICLES.some((a) => a.slug === slug)) {
          setActiveView('article');
          setViewParam(slug);
        }
      } else if (normalized === '/about' || normalized === 'about') {
        setActiveView('about');
      } else if (normalized === '/advertise' || normalized === 'advertise') {
        setActiveView('advertise');
      } else if (normalized === '/contact' || normalized === 'contact') {
        setActiveView('contact');
      } else if (normalized === '/guides' || normalized === 'guides' || normalized === '/guides-index') {
        setActiveView('guides');
      }

      const inc = searchParams.get('income');
      const curr = searchParams.get('currency');
      const countries = searchParams.get('countries');

      if (inc) setGrossIncome(Math.max(0, parseInt(inc, 10)));
      if (curr) setBaseCurrency(curr);
      if (countries) {
        const parsed = countries.split(',').filter(Boolean);
        if (parsed.length > 0) setSelectedCountries(parsed);
      }
    } catch {
      // ignore
    }

    // Fetch live ECB currency rates
    getExchangeRates().then((rates) => {
      setExchangeRates(rates);
    });
  }, []);

  // Update URL state when on home calculator
  useEffect(() => {
    if (activeView === 'home') {
      try {
        const params = new URLSearchParams();
        params.set('income', grossIncome.toString());
        params.set('currency', baseCurrency);
        params.set('countries', selectedCountries.join(','));
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
      } catch {
        // ignore
      }
    }
  }, [grossIncome, baseCurrency, selectedCountries, activeView]);

  const handleNavigate = (view: string, param?: string) => {
    setActiveView(view);
    setViewParam(param || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash for bookmarking
    if (view === 'country' && param) {
      window.location.hash = `/tax-calculator/${param}/`;
    } else if (view === 'article' && param) {
      window.location.hash = `/tax-guides/${param}/`;
    } else if (view === 'guide' && param) {
      setActiveView('article');
      setViewParam(param);
      window.location.hash = `/tax-guides/${param}/`;
    } else if (view === 'guides-index') {
      setActiveView('guides');
      window.location.hash = 'guides';
    } else if (view !== 'home') {
      window.location.hash = view;
    } else {
      window.location.hash = '';
    }
  };

  const handleFocusCalculator = () => {
    if (activeView !== 'home') {
      setActiveView('home');
    }
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddCountry = (id: string) => {
    if (!selectedCountries.includes(id)) {
      setSelectedCountries([...selectedCountries, id]);
    }
  };

  const handleSetPrimaryCountry = (id: string) => {
    setSelectedCountries((prev) => {
      if (prev.length <= 1) {
        return [id];
      }
      return [id, ...prev.filter((c) => c !== id)];
    });
  };

  const handleRemoveCountry = (id: string) => {
    if (selectedCountries.length > 1) {
      setSelectedCountries(selectedCountries.filter((c) => c !== id));
    }
  };

  const handleSubRegionChange = (countryId: string, subRegion: string) => {
    setSelectedSubRegions((prev) => ({
      ...prev,
      [countryId]: subRegion,
    }));
  };

  // Compute results for selected countries
  const comparisonResults = useMemo(() => {
    return selectedCountries
      .map((id) => {
        const country = COUNTRIES.find((c) => c.id === id);
        if (!country) return null;
        const subRegion =
          selectedSubRegions[id] || (country.subRegions ? Object.keys(country.subRegions)[0] : undefined);
        return calculateCountryTax(country, grossIncome, baseCurrency, exchangeRates, subRegion);
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
  }, [selectedCountries, grossIncome, baseCurrency, exchangeRates, selectedSubRegions]);

  // Current country for CountryHubPage
  const currentCountryObj = useMemo(() => {
    return COUNTRIES.find((c) => c.id === viewParam) || COUNTRIES[0];
  }, [viewParam]);

  // Current article for ArticleView
  const currentArticleObj = useMemo(() => {
    return ARTICLES.find((a) => a.slug === viewParam) || ARTICLES[0];
  }, [viewParam]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Floating Newsletter Bar */}
      <TopAnnouncementBar />

      {/* Main Navbar with Dropdowns & Language Switcher */}
      <Navbar
        selectedCurrency={baseCurrency}
        onSelectCurrency={setBaseCurrency}
        activeView={activeView}
        onNavigate={handleNavigate}
        onFocusCalculator={handleFocusCalculator}
        language={language}
        onLanguageChange={setLanguage}
        onOpenEmbed={() => setIsEmbedOpen(true)}
      />

      <main className="flex-grow">
        {/* VIEW: HOME CALCULATOR */}
        {activeView === 'home' && (
          <>
            <div ref={heroRef}>
              <HeroSection
                grossIncome={grossIncome}
                onIncomeChange={setGrossIncome}
                baseCurrency={baseCurrency}
                onCurrencyChange={setBaseCurrency}
                selectedCountries={selectedCountries}
                onAddCountry={handleAddCountry}
                onRemoveCountry={handleRemoveCountry}
                onSetPrimaryCountry={handleSetPrimaryCountry}
                selectedSubRegions={selectedSubRegions}
                onSubRegionChange={handleSubRegionChange}
                onOpenEmbed={() => setIsEmbedOpen(true)}
                language={language}
              />
            </div>

            {/* Direct Relocation Arbitrage Card (Strictly primary vs destination) */}
            <ArbitrageCard
              results={comparisonResults}
              baseCurrency={baseCurrency}
            />

            {/* Side-by-Side Ranked Comparison Cards */}
            <ComparisonCards
              results={comparisonResults}
              baseCurrency={baseCurrency}
              onRemoveCountry={handleRemoveCountry}
              onNavigateCountry={(id) => handleNavigate('country', id)}
            />

            {/* Homepage Deep-Link Navigation Grid (Click Depth < 3) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Popular Tax Guides & Country Studies
                    </h3>
                  </div>
                  <button
                    onClick={() => handleNavigate('guides-index')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all guides</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {ARTICLES.slice(0, 4).map((art) => (
                    <button
                      key={art.slug}
                      onClick={() => handleNavigate('article', art.slug)}
                      className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-left transition-all group cursor-pointer"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                        {art.category}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                        {art.title}
                      </h4>
                      <span className="text-[11px] text-slate-500 mt-2 block">
                        {art.readTime}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Contextual Expat & Nomad Partners */}
            <AffiliateBanners />

            {/* Comprehensive Matrix of all 35+ Countries */}
            <GlobalExplorerTable
              countries={COUNTRIES}
              grossIncome={grossIncome}
              baseCurrency={baseCurrency}
              exchangeRates={exchangeRates}
              selectedCountryIds={selectedCountries}
              onAddCountry={handleAddCountry}
              onNavigateCountry={(id) => handleNavigate('country', id)}
            />

            {/* Comprehensive FAQs */}
            <FaqSection />
          </>
        )}

        {/* VIEW: DEDICATED COUNTRY HUB */}
        {activeView === 'country' && (
          <CountryHubPage
            country={currentCountryObj}
            exchangeRates={exchangeRates}
            baseCurrency={baseCurrency}
            onNavigateHome={() => handleNavigate('home')}
            onSelectCountryToCompare={(id) => {
              setSelectedCountries([currentCountryObj.id, id]);
              handleNavigate('home');
            }}
          />
        )}

        {/* VIEW: GUIDES INDEX */}
        {activeView === 'guides' && (
          <GuidesIndexPage
            onSelectArticle={(slug) => handleNavigate('article', slug)}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* VIEW: SINGLE ARTICLE / COMPARISON GUIDE */}
        {activeView === 'article' && (
          <ArticleView
            article={currentArticleObj}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateArticles={() => handleNavigate('guides')}
            onNavigateCountry={(id) => handleNavigate('country', id)}
            onSelectArticle={(slug) => handleNavigate('article', slug)}
          />
        )}

        {/* VIEW: ABOUT PAGE */}
        {activeView === 'about' && (
          <AboutPage onNavigateHome={() => handleNavigate('home')} />
        )}

        {/* VIEW: ADVERTISE PAGE */}
        {activeView === 'advertise' && (
          <AdvertisePage onNavigateHome={() => handleNavigate('home')} />
        )}

        {/* VIEW: CONTACT PAGE */}
        {activeView === 'contact' && (
          <ContactPage onNavigateHome={() => handleNavigate('home')} />
        )}
      </main>

      {/* Embed Modal for Webmasters & Bloggers */}
      <EmbedModal
        isOpen={isEmbedOpen}
        onClose={() => setIsEmbedOpen(false)}
        defaultCountry={selectedCountries[0]}
        defaultCurrency={baseCurrency}
      />

      {/* Expanded Multi-Column Footer with Trust Badges */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
