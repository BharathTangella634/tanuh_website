### Overview
To make your consent form and questionnaire available in multiple languages, you’ll want to separate translatable content from code, adopt an internationalization (i18n) library, structure your content for easy translation, and implement a translation workflow with QA. Below is a practical, end-to-end approach tailored to a React app like yours (with assets such as `consent_form.json` and `questionnaire.json`), plus legal and UX considerations specific to consent.

### Goals
- Decouple text from components so translators/localizers don’t touch code.
- Provide a scalable content structure for any number of languages.
- Ensure accurate, legally sound consent across locales.
- Handle right-to-left (RTL) scripts, fonts, pluralization, dates/numbers, and accessibility.

### Content Strategy
1. Centralize text keys
   - Replace hard-coded strings with keys that map to translations.
   - Keep canonical English (or another source) in one place. Use keys consistently across consent and questionnaire.

2. Split per-feature or per-domain
   - Example namespaces: `consent`, `questionnaire`, `common` (buttons, labels, validation).
   - This makes loading only what you need easy and reduces bundle size.

3. Use message formatting
   - Prefer ICU MessageFormat (supported by `i18next` via `i18next-icu`) for plurals, gender, and variable interpolation.

### File/Key Structure Examples
- Option A: Per-language, per-namespace files (recommended)
  - `src/locales/en/consent.json`
  - `src/locales/hi/consent.json`
  - `src/locales/en/questionnaire.json`
  - `src/locales/hi/questionnaire.json`

- Option B: Single file with language branches (OK for small projects, harder to scale)
  - `consent_form.json` containing `{ en: {...}, hi: {...} }`

Example consent (English):
```json
{
  "title": "Participant Consent",
  "intro": "Please read the following information carefully before proceeding.",
  "sections": {
    "purpose": {
      "heading": "Purpose of the Study",
      "body": "We are conducting a survey to understand ..."
    },
    "data": {
      "heading": "Data Usage",
      "body": "Your responses will be stored securely and used for ..."
    }
  },
  "actions": {
    "agree": "I agree",
    "decline": "I do not agree"
  },
  "legal": {
    "contact": "For questions, contact {email}",
    "withdraw": "You may withdraw at any time without penalty."
  }
}
```

Example consent (Hindi):
```json
{
  "title": "प्रतिभागी सहमति",
  "intro": "आगे बढ़ने से पहले कृपया निम्न जानकारी ध्यान से पढ़ें।",
  "sections": {
    "purpose": {
      "heading": "अध्ययन का उद्देश्य",
      "body": "हम एक सर्वेक्षण कर रहे हैं ताकि ..."
    },
    "data": {
      "heading": "डेटा का उपयोग",
      "body": "आपके उत्तर सुरक्षित रूप से संग्रहीत किए जाएंगे और ... के लिए उपयोग होंगे"
    }
  },
  "actions": {
    "agree": "मैं सहमत हूँ",
    "decline": "मैं सहमत नहीं हूँ"
  },
  "legal": {
    "contact": "प्रश्नों के लिए, {email} पर संपर्क करें",
    "withdraw": "आप किसी भी समय बिना किसी दंड के वापस ले सकते हैं।"
  }
}
```

Questionnaire example keys (English):
```json
{
  "Q1": {
    "question": "What is your age?",
    "answers": ["Under 18", "18–24", "25–34", "35–44", "45–54", "55–64", "65+"]
  },
  "Q2": {
    "question": "What is your gender?",
    "answers": ["Male", "Female", "Other", "Prefer not to say"]
  },
  "buttons": {
    "next": "Next",
    "back": "Back",
    "submit": "Submit"
  }
}
```

### React Integration (with i18next)
1. Install
```bash
npm install i18next react-i18next i18next-browser-languagedetector i18next-http-backend i18next-icu
```

2. Initialize i18n (e.g., `src/i18n.js`)
```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import ICU from 'i18next-icu';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(ICU)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa'],
    ns: ['common', 'consent', 'questionnaire'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;
```

3. Wrap your app
```jsx
import './i18n';
import { I18nextProvider } from 'react-i18next';

<I18nextProvider i18n={i18n}>
  <App />
</I18nextProvider>
```

4. Use translations in components (e.g., `Consent.jsx`)
```jsx
import { useTranslation } from 'react-i18next';

export default function Consent({ onAgree, onDecline }) {
  const { t } = useTranslation('consent');
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>

      <h2>{t('sections.purpose.heading')}</h2>
      <p>{t('sections.purpose.body')}</p>

      <h2>{t('sections.data.heading')}</h2>
      <p>{t('sections.data.body')}</p>

      <button onClick={onDecline}>{t('actions.decline')}</button>
      <button onClick={onAgree}>{t('actions.agree')}</button>

      <small>
        {t('legal.contact', { email: 'research@example.org' })}
      </small>
    </div>
  );
}
```

5. Use translations in the questionnaire (e.g., `Questionnaire.jsx`)
```jsx
import { useTranslation } from 'react-i18next';

export default function Questionnaire({ currentQ }) {
  const { t } = useTranslation('questionnaire');
  const qKey = `Q${currentQ}`;
  const question = t(`${qKey}.question`);
  const answers = t(`${qKey}.answers`, { returnObjects: true });

  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {answers.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Language Switcher UX
- Add a persistent language selector (header/footer or before consent) with language autodection + manual override.
- Save choice in `localStorage`; respect browser locale.
- If the user changes language, keep state but reload translations.

Example switcher:
```jsx
import i18n from '../i18n';

function LanguageSwitcher() {
  const change = (lng) => i18n.changeLanguage(lng);
  return (
    <select value={i18n.resolvedLanguage} onChange={(e) => change(e.target.value)}>
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="ta">தமிழ்</option>
      <!-- add more -->
    </select>
  );
}
```

### RTL, Fonts, and Layout
- Add `dir` attribute based on language: `dir="rtl"` for Arabic/Urdu/Hebrew.
- Switch fonts per script for readability. Example:
```js
const rtlLangs = ['ar', 'he', 'ur', 'fa'];
const dir = rtlLangs.includes(i18n.language) ? 'rtl' : 'ltr';
```
- Ensure components and CSS are RTL-friendly (use logical properties like `margin-inline-start`).

### Dates, Numbers, Currency
- Use `Intl` APIs or `i18next-icu` to format numbers and dates per locale.
- Avoid hard-coding currency symbols (your questionnaire uses ₹; consider locale-aware rendering or keep as-is if the audience is India-focused).

### Validation and Error Messages
- Put validation strings in `common.json` (e.g., `required`, `invalidEmail`).
- For dynamic validation (e.g., age ranges), use ICU messages with variables.

### Consent-Specific Legal Considerations
- Plain-language review for each locale. Translation alone isn’t enough; ensure cultural and legal appropriateness.
- Jurisdictional variants: if the app can be accessed internationally, consider locale-specific consent versions (GDPR, HIPAA, etc.). You can:
  - Add `consent_version` per locale and store a signed copy of the language used.
  - Log `language`, `consent_version`, `timestamp` when the user agrees.
- Accessibility: ensure screen-reader friendly structure and language tags.
  - Set `<html lang="hi">` dynamically.

### Data Model and Backend Notes
- Store the user’s selected language with their responses.
- Save consent metadata: `user_id`, `language`, `consent_version`, `agreed_at`.
- If using a backend API, expose locale in requests (header `Accept-Language` or query `?lng=`) to serve server-rendered text or to log language.

### Translation Workflow
1. Extract source keys from English JSON.
2. Provide translators with per-namespace JSON or a spreadsheet.
3. Include context notes for tricky items (e.g., medical terminology in consent).
4. Use a TMS (optional): Locize, Phrase, Crowdin, POEditor with `i18next` integration.
5. Enforce linting for missing keys/fallbacks in CI.
6. QA: linguistic review in-app screenshots; test with RTL snapshot.

### Fallbacks and Missing Keys
- Configure `fallbackLng: 'en'`.
- During development, log missing keys and show a visible marker to catch gaps.

### Versioning and Change Management
- Keep `version` fields in each consent file, e.g., `"version": "2025-10-01"`.
- Increment version when text changes materially. Prompt re-consent if required.

### Performance Considerations
- Lazy-load namespaces (`useTranslation(['consent'])`) only when the component mounts.
- Cache translations in `localStorage` or the service worker for offline use.

### Accessibility and Usability
- Provide a language choice before showing consent; do not force reading in a foreign language.
- Maintain simple sentences and adequate contrast for translated scripts.
- Ensure focus order and screen reader labels are translated.

### Migration Plan from Current JSON Assets
- Move `src/assets/consent_form.json` to `src/locales/en/consent.json` as the source.
- Duplicate to other locales (`hi`, etc.) and translate values only; keys remain identical.
- For `questionnaire.json`, convert to the same key-based structure or split into per-locale files. If your current `questionnaire.json` already lists questions/answers, keep the shape and translate values per locale.
- Update `Consent.jsx` and `Questionnaire.jsx` to read via `react-i18next` instead of importing static JSON directly.

### Quick Checklist
- [ ] Introduce `react-i18next` with ICU
- [ ] Create `src/locales/{lng}/{ns}.json`
- [ ] Replace literals in components with `t('...')`
- [ ] Add language detector + manual switcher
- [ ] Handle RTL and fonts
- [ ] Add consent versioning and logging of `language`
- [ ] Set `lang` and `dir` attributes
- [ ] QA with real translators and screen readers

If you share a snippet of your current `consent_form.json` and `Questionnaire.jsx` usage, I can provide a concrete diff showing exactly how to plug in `react-i18next` while preserving your current component API.