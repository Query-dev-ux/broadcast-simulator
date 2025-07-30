export interface URLParams {
  sub1?: string
  sub2?: string
  sub3?: string
  [key: string]: string | undefined
}

export function parseURLParams(): URLParams {
  const urlParams = new URLSearchParams(window.location.search)
  const params: URLParams = {}
  
  // Парсим все параметры из URL
  for (const [key, value] of urlParams.entries()) {
    params[key] = value
  }
  
  return params
}

export function buildAffomelodyURL(sub1?: string, sub2?: string, sub3?: string): string {
  const baseURL = 'https://tone.affomelody.com/click'
  const url = new URL(baseURL)
  
  // Базовые параметры
  url.searchParams.set('pid', '118305')
  url.searchParams.set('offer_id', '55')
  
  // Динамические параметры
  if (sub1) url.searchParams.set('sub1', sub1)
  if (sub2) url.searchParams.set('sub2', sub2)
  if (sub3) url.searchParams.set('sub3', sub3)
  
  return url.toString()
}

export function getParamValue(key: string): string | undefined {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(key) || undefined
}

export function updateURLParams(params: Partial<URLParams>) {
  const url = new URL(window.location.href)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value.toString())
    } else {
      url.searchParams.delete(key)
    }
  })
  
  // Обновляем URL без перезагрузки страницы
  window.history.replaceState({}, '', url.toString())
} 