import { ImageResponse } from 'next/og'

export default async function DocumentOpengraphImage(
  size: { width: number; height: number },
  emoji: string,
  title: string
) {
  return new ImageResponse(
    (
      <div tw="bg-[#FBB161] h-full w-full flex flex-col p-10">
        <div tw="bg-white h-full w-full flex flex-col p-8 rounded-3xl">
          <div tw="flex-auto text-6xl font-body font-bold flex flex-col justify-start items-start text-left text-black">
            <div tw="w-[96px] h-[96px] text-[96px] mb-8 leading-none">{emoji}</div>
            <div>{title}</div>
          </div>
          <div tw="flex items-center justify-end text-xl font-bold text-black py-4">
            <div
              style={{
                background: 'url(https://naopoyo.com/naopoyo2.png)',
                backgroundSize: '100% 100%',
              }}
              tw="w-[48px] h-[48px] mr-3"
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
