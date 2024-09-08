import { createContext, useCallback, useContext } from "react"

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

export function createIntl<Trans extends Record<string, string>>(data: {[K in string]?: Trans}) {
  type TransId = keyof Trans
  
  type TInfo = {
    description?: string
  }

  type TParams<Id extends TransId> = Trans[Id] extends string
    ? { params?: Record<string, TranValue>} 
    : { params: Params<Trans[Id]> }

  type TOptions<Id extends TransId> = TInfo & TParams<Id>
  
  type TProps<Id extends TransId> = { id: Id } & TOptions<Id>

  type TArgs<Id extends TransId> = ParamKey<Trans[Id]> extends never 
    ? [Id, TOptions<Id>?]
    : [Id, TOptions<Id>]

  function useT() {
    const locale = useLocale()
    const t = useCallback(<Id extends TransId>(...args: TArgs<Id>) => {
      const [id, opts] = args
      const msg = data[locale]?.[id]
      
      if (msg && opts && 'params' in opts) {
        return msg.replace(/\{(\w+)\}/g, (_, key: ParamKey<Trans[Id]>) => `${opts.params?.[key]}`)
      }
      
      return msg
    }, [locale]) 
    return t
  }

  function T<Id extends TransId>(props: TProps<Id>) {
    const t =  useT()
    return t(props.id, props)
  }

  return { useT, T }
}

type ParamKey<X extends string> = X extends `${string}{${infer P}}${infer R}` 
  ? P | ParamKey<R>
  : never

type Params<X extends string> = Record<ParamKey<X>, TranValue>

type TranValue = string | number