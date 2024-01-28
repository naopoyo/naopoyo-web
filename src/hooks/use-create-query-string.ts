'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export interface UseCreateQueryStringProps {
  withPathname?: boolean
}

export const useCreateQueryString = (props: UseCreateQueryStringProps | undefined) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const withPathname = props?.withPathname || false

  return useCallback(
    (items: { [key: string]: string | string[] | undefined }) => {
      const params = new URLSearchParams(searchParams)
      Object.keys(items).forEach((name) => {
        const value = items[name]
        if (Array.isArray(value)) {
          params.delete(name)
          value.forEach((v) => params.append(name, v))
        } else if (typeof value === 'string') {
          params.set(name, value)
        } else if (value === undefined) {
          params.delete(name)
        }
      })

      return withPathname ? pathname + '?' + params.toString() : params.toString()
    },
    [searchParams, pathname, withPathname]
  )
}
