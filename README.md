# 🌐 TakeHomeGlobal — Global Income Tax & Take-Home Pay Calculator

An exceptionally fast, beautiful, privacy-first web application to compare take-home pay, social security, real living costs, and tax freedom days across 35+ major economies and all 50 US states.

Live at: **[takehomeglobal.com](https://takehomeglobal.com)**

---

## ✨ Features

- **Progressive Tax Engine**: Accurate calculation of federal/national brackets, standard deductions, personal allowance phase-outs (e.g. UK £100k taper), and surcharges.
- **US 50 States & Canadian Provinces**: Includes California, New York, Texas, Florida, Ontario, BC, Quebec, and more.
- **Social Security & Healthcare**: Calculates employee contributions with accurate caps and floors (US FICA, UK NI, German Sozialversicherung, etc.).
- **Real Purchasing Power**: Calculates real disposable spending money after subtracting benchmarked living expenses (Numbeo city data).
- **Tax Arbitrage & Relocation Savings**: Side-by-side comparison showing annual and 10-year wealth gains when moving between jurisdictions.
- **Tax Freedom Day**: Interactive day-of-year indicator showing when earnings shift from taxes to personal income.
- **Visual Analytics**: Interactive Chart.js donut charts and color-coded progress bars.
- **Global Explorer Index**: Filterable and sortable master table evaluating all 30+ countries at your exact salary.
- **100% Client-Side & Private**: Runs entirely in the browser. Zero financial data is ever collected or sent to a server.
- **100% Free Hosting**: No backend, no database, no server costs.

---

## 🚀 Local Development

```bash
# Navigate to project directory
cd country-tax-calculator

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 How to Host on GitHub Pages (100% Free)

### Step 1: Initialize Git and Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (e.g., `tax-calculator`).
2. Run the following commands in the `country-tax-calculator` folder:

```bash
git init
git add .
git commit -m "feat: initial TaxAtlas release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Open your repository on GitHub.
2. Go to **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. GitHub will automatically trigger the included workflow (`.github/workflows/deploy.yml`).
5. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/` in ~1 minute!

---

## 🏷️ How to Attach Your Custom Domain

Once you purchase your domain (e.g. from Namecheap, Porkbun, Cloudflare, or GoDaddy):

### 1. Add Custom Domain in GitHub
In your GitHub repo:
- Go to **Settings** → **Pages**.
- In the **Custom domain** box, enter your domain (e.g., `www.yourtaxcalc.com` or `yourtaxcalc.com`).
- Click **Save**. (This creates a `CNAME` file in your repository).

### 2. Configure DNS Records at your Domain Registrar

#### Option A: If using `www.yourdomain.com`:
Add a **CNAME** record:
- **Type**: `CNAME`
- **Host / Name**: `www`
- **Target / Value**: `YOUR_USERNAME.github.io`

#### Option B: If using apex domain (`yourdomain.com`):
Add **A** records pointing to GitHub Pages IP addresses:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

### 3. Enable HTTPS
In **Settings** → **Pages**, check the box for **Enforce HTTPS** (GitHub provisions a free SSL certificate automatically via Let's Encrypt).

---

## 🔄 Daily Automated Currency Sync

This repository includes a scheduled GitHub Action (`.github/workflows/update-rates.yml`) that automatically fetches fresh European Central Bank (ECB) exchange rates once a day via the free Frankfurter API and commits updates without any manual work.

---

## 💡 Monetization Strategies (When Ready)

1. **Display Advertising**: Apply for Google AdSense or Raptive once your traffic grows.
2. **Affiliate Partnerships**: Expat banking (Wise, Revolut), global health insurance (SafetyWing, Cigna Global), or relocation services.
3. **Newsletter / Email Capture**: Offer bi-weekly international tax updates or PDF country comparison reports.

---

## ⚖️ License & Disclaimer

- **License**: MIT (Free for commercial and personal use).
- **Disclaimer**: For educational and informational purposes only. Always consult a certified CPA or tax professional.
