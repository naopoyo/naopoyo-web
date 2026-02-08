'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export type UseCreateQueryStringArgs = {
  withPathname?: boolean
}

type QueryStringItems = Record<string, string | string[] | undefined>

export function useCreateQueryString(args?: UseCreateQueryStringArgs) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const withPathname = args?.withPathname ?? false

  return useCallback(
    (items: QueryStringItems) => {
      const params = new URLSearchParams(searchParams)

      Object.entries(items).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          params.delete(name)
          value.forEach((v) => params.append(name, v))
        } else if (typeof value === 'string') {
          params.set(name, value)
        } else {
          params.delete(name)
        }
      })

      const queryString = params.toString()
      return withPathname ? `${pathname}?${queryString}` : queryString
    },
    [searchParams, pathname, withPathname]
  )
}
