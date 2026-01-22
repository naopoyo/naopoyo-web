'use client'

import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const DEFAULT_BASE_PX = 16

export default function RemPxConverter() {
  const [basePx, setBasePx] = useState(DEFAULT_BASE_PX)
  const [pxValue, setPxValue] = useState('16')
  const [remValue, setRemValue] = useState('1')
  const [copiedField, setCopiedField] = useState<'px' | 'rem' | null>(null)

  const handleBasePxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value)
      if (isNaN(value) || value <= 0) {
        setBasePx(DEFAULT_BASE_PX)
        return
      }
      setBasePx(value)

      if (pxValue !== '') {
        const px = parseFloat(pxValue)
        if (!isNaN(px)) {
          setRemValue((px / value).toString())
        }
      }
    },
    [pxValue]
  )

  const handlePxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setPxValue(value)

      if (value === '') {
        setRemValue('')
        return
      }

      const px = parseFloat(value)
      if (!isNaN(px)) {
        setRemValue((px / basePx).toString())
      }
    },
    [basePx]
  )

  const handleRemChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setRemValue(value)

      if (value === '') {
        setPxValue('')
        return
      }

      const rem = parseFloat(value)
      if (!isNaN(rem)) {
        setPxValue((rem * basePx).toString())
      }
    },
    [basePx]
  )

  const copyToClipboard = useCallback((value: string, unit: 'px' | 'rem') => {
    if (value && navigator.clipboard) {
      navigator.clipboard.writeText(`${value}${unit}`)
      setCopiedField(unit)
      setTimeout(() => setCopiedField(null), 1500)
    }
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div
        className={`
          flex flex-col gap-8
          md:flex-row md:gap-16
        `}
      >
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="base-px" className="text-sm font-medium">
              ベース (px)
            </label>
            <Input
              id="base-px"
              type="number"
              value={basePx}
              onChange={handleBasePxChange}
              min={1}
              className="w-32"
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="px-value" className="text-sm font-medium">
              px
            </label>
            <div className="flex gap-2">
              <Input
                id="px-value"
                type="number"
                value={pxValue}
                onChange={handlePxChange}
                placeholder="16"
                className="w-48"
              />
              <TooltipProvider>
                <Tooltip open={copiedField === 'px'}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(pxValue, 'px')}
                      disabled={!pxValue}
                    >
                      Copy
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copied!</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="rem-value" className="text-sm font-medium">
              rem
            </label>
            <div className="flex gap-2">
              <Input
                id="rem-value"
                type="number"
                value={remValue}
                onChange={handleRemChange}
                placeholder="1"
                className="w-48"
              />
              <TooltipProvider>
                <Tooltip open={copiedField === 'rem'}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(remValue, 'rem')}
                      disabled={!remValue}
                    >
                      Copy
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copied!</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </section>
      </div>

      <section
        className={`
          mx-auto flex flex-col gap-4 text-muted-foreground
          md:w-96
        `}
      >
        <h2 className="text-2xl font-bold text-primary">使い方</h2>
        <p>
          px と rem の相互変換ができます。どちらかに値を入力すると、もう一方が自動的に計算されます。
        </p>
        <p>ベースのフォントサイズはデフォルトで 16px ですが、変更することもできます。</p>
        <p>Copy ボタンを押すと、単位付きの値がクリップボードにコピーされます。</p>
      </section>
    </div>
  )
}
