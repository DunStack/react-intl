import { createContext, useContext } from "react"

const LocaleContext = createContext<string | undefined>(undefined)

export function useLocale() {
  const locale = useContext(LocaleContext)
  if (!locale) throw 'Locale not found'
  return locale
}

type LocaleProviderProps = React.PropsWithChildren<{
  locale?: string
}>

export function LocaleProvider({ 
  locale = navigator.language, 
  children 
}: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={locale}>
      {children}
    </LocaleContext.Provider>
  )
}

export function createIntl<Trans>(data: Record<string, Trans | undefined>) {
  type Id = keyof Trans
  
  interface TProps {
    id: Id
  }

  function useT(id: Id) {
    const locale = useLocale()
    return data[locale]?.[id]
  }

  function T({ id }: TProps) {
    return useT(id)
  }

  return { useT, T }
}