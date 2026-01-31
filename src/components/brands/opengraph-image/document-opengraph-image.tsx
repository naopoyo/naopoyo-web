import { ImageResponse } from 'next/og'

const boldFont = fetch(new URL('https://naopoyo.com/NotoSansJP-Bold.otf')).then((res) =>
  res.arrayBuffer()
)

/**
 * DocumentOpengraphImage - OpenGraph 用の画像を生成する関数
 *
 * @param size - 生成する画像の幅と高さ
 * @param emoji - 画像に表示する絵文字
 * @param title - 画像に表示するタイトル文字列
 * @returns next/og の ImageResponse
 */
export default async function DocumentOpengraphImage(
  size: { width: number; height: number },
  emoji: string,
  title: string
) {
  const [boldFontData] = await Promise.all([boldFont])

  return new ImageResponse(
    <div tw="bg-[#FBB161] h-full w-full flex flex-col p-10">
      <div tw="bg-white h-full w-full flex flex-col p-8 rounded-3xl">
        <div tw="flex-auto text-6xl font-body font-bold flex flex-col justify-start items-start text-left text-black">
          <div tw="w-24 h-24 text-[96px] mb-8 leading-none">{emoji}</div>
          <div>{title}</div>
        </div>
        <div tw="flex items-center justify-end text-xl font-bold text-black py-4">
          <div
            style={{
              background: 'url(https://naopoyo.com/naopoyo2.png)',
              backgroundSize: '100% 100%',
            }}
            tw="w-12 h-12 mr-3"
          ></div>
          <div>naopoyo.com</div>
        </div>
      </div>
    </div>,
    {
      ...size,
      emoji: 'noto',
      fonts: [
        {
          name: 'NotoSansJP',
          data: boldFontData,
          weight: 700,
        },
      ],
    }
  )
}
