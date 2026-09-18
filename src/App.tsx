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
import { Footer } from './components/Footer';

import { COUNTRIES } from './data/taxData';
import { DEFAULT_EXCHANGE_RATES, getExchangeRates } from './data/exchangeRates';
import { calculateCountryTax } from './engine/calculator';
import { ARTICLES } from './data/articlesData';

export const App: React.FC = () => {
  // Navigation Routing state
  const [activeView, setActiveView] = useState<string>('home'); // home | about | advertise | contact | country | guides | article
  const [viewParam, setViewParam] = useState<string>(''); // countryId or article slug

  // Calculator Parameters
  const [grossIncome, setGrossIncome] = useState<number>(100000);
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([
    'usa',
    'uk',
    'germany',
    'uae',
    'singapore',
    'portugal',
  ]);
  const [selectedSubRegions, setSelectedSubRegions] = useState<Record<string, string>>({
    usa: 'California',
    canada: 'Ontario',
  });
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(DEFAULT_EXCHANGE_RATES);

  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize from URL query params or hash
  useEffect(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('/tax-calculator/')) {
        const countryId = hash.replace('/tax-calculator/', '').replace('/', '');
        if (COUNTRIES.some((c) => c.id === countryId)) {
          setActiveView('country');
          setViewParam(countryId);
        }
      } else if (hash.startsWith('/compare/') || hash.startsWith('/tax-guides/')) {
        const slug = hash.split('/').filter(Boolean).pop();
        if (slug && ARTICLES.some((a) => a.slug === slug)) {
          setActiveView('article');
          setViewParam(slug);
        }
      } else if (hash === 'about') {
        setActiveView('about');
      } else if (hash === 'advertise') {
        setActiveView('advertise');
      } else if (hash === 'contact') {
        setActiveView('contact');
      } else if (hash === 'guides') {
        setActiveView('guides');
      }

      const params = new URLSearchParams(window.location.search);
      const inc = params.get('income');
      const curr = params.get('currency');
      const countries = params.get('countries');

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

      {/* Main Navbar with Dropdowns */}
      <Navbar
        selectedCurrency={baseCurrency}
        onSelectCurrency={setBaseCurrency}
        activeView={activeView}
        onNavigate={handleNavigate}
        onFocusCalculator={handleFocusCalculator}
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
                selectedSubRegions={selectedSubRegions}
                onSubRegionChange={handleSubRegionChange}
              />
            </div>

            <ArbitrageCard
              results={comparisonResults}
              baseCurrency={baseCurrency}
            />

            <ComparisonCards
              results={comparisonResults}
              baseCurrency={baseCurrency}
            />

            {/* Contextual Expat & Nomad Partners */}
            <AffiliateBanners />

            {/* Comprehensive Matrix of all 30+ Countries */}
            <GlobalExplorerTable
              countries={COUNTRIES}
              grossIncome={grossIncome}
              baseCurrency={baseCurrency}
              exchangeRates={exchangeRates}
              selectedCountryIds={selectedCountries}
              onAddCountry={handleAddCountry}
            />

            {/* Comprehensive FAQs with Schema.org format */}
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
              handleAddCountry(id);
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

      {/* Expanded Multi-Column Footer with Trust Badges */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
