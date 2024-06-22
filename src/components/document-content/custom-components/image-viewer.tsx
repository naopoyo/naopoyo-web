'use client'

import { PropsWithChildren } from 'react'

import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export interface ImageDialogProps extends PropsWithChildren {}

export default function ImageViewer({ children }: ImageDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-zoom-in">{children}</span>
      </DialogTrigger>
      <DialogClose asChild>
        <DialogContent className="flex size-full max-h-full max-w-full items-center justify-center border-0 bg-transparent p-0 sm:rounded-none">
          <span className="cursor-zoom-out">{children}</span>
        </DialogContent>
      </DialogClose>
    </Dialog>
  )
}
