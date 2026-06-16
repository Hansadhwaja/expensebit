"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function useQueryParam() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key)
    },
    [searchParams]
  )

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set(key, value)

      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const setMultipleParams = useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      })

      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const removeParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.delete(key)

      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const clearParams = useCallback(() => {
    router.replace(pathname)
  }, [router, pathname])

  return {
    getParam,
    setParam,
    setMultipleParams,
    removeParam,
    clearParams,
  }
}
