import { ImageResponse } from 'next/og'

export default async function DocumentOpengraphImage(
  size: { width: number; height: number },
  emoji: string,
  title: string
) {
  return new ImageResponse(
    (
      <div tw="bg-[#020817] h-full w-full flex flex-col p-12">
        <div tw="flex justify-center">
          <div tw="w-[96px] h-[96px] text-[96px] leading-none">{emoji}</div>
        </div>
        <p tw="flex-auto text-7xl font-black flex justify-center items-center text-center text-[#FFF]">
          {title}
        </p>
        <div tw="flex items-center justify-end text-4xl text-[#FFF]">
          <div
            style={{
              background: 'url(https://naopoyo.com/naopoyo2.png)',
              backgroundSize: '100% 100%',
            }}
            tw="w-[36px] h-[36px] mr-2"
          ></div>
          <div>naopoyo.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      emoji: 'noto',
    }
  )
}
