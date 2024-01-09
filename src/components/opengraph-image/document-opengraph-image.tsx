import { ImageResponse } from 'next/og'

export default async function DocumentOpengraphImage(
  size: { width: number; height: number },
  emoji: string,
  title: string
) {
  return new ImageResponse(
    (
      <div tw="bg-[#020817] h-full w-full flex items-center justify-center py-8 px-16">
        <div tw="flex items-center justify-center flex-col w-full h-full gap-6">
          <div tw="w-24 h-24 text-[92px] leading-none">{emoji}</div>
          <p tw="flex-auto text-7xl font-black text-center text-[#FFF]">{title}</p>
          <div tw="flex items-center text-4xl text-center text-[#FFF]">
            <div
              style={{
                background: 'url(https://naopoyo.com/naopoyo2.png)',
                backgroundSize: '100% 100%',
                width: '36px',
                height: '36px',
                marginRight: 14,
              }}
            ></div>
            <div>naopoyo.com</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      emoji: 'noto',
    }
  )
}
