import { createIntl, LocaleProvider } from "../lib/main";
import tsLogo from './typescript.svg'
import './App.css'
import { useState } from "react";

enum Locale {
  enUS = 'en-US',
  viVN = 'vi-VN'
}

const intl = createIntl({
  [Locale.enUS]: {
    action: 'Select locale',
    docs: 'Click on the Vite and TypeScript logos to learn more'
  },
  [Locale.viVN]: {
    action: 'Chọn ngôn ngữ',
    docs: 'Bấm vào logo Vite và TypeScript để tìm hiểu thêm'
  }
})

export default function App() {
  const [locale, setLocale] = useState<Locale>(Locale.enUS)

  return (
    <LocaleProvider locale={locale}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src={tsLogo} className="logo vanilla" alt="TypeScript logo" />
        </a>
        <h1>Vite + TypeScript</h1>
        <div className="card">
          <label>
            <intl.T id='action' />
          </label>
          <button  type="button" onClick={() => setLocale(Locale.enUS)}>
            {Locale.enUS}
          </button>
          <button  type="button" onClick={() => setLocale(Locale.viVN)}> 
            {Locale.viVN}
          </button>
        </div>
        <p className="read-the-docs">
          <intl.T id='docs' />
        </p>
      </div>
    </LocaleProvider>
  )
}