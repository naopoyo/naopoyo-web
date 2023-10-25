import { ImageResponse } from 'next/server'

export default async function DocumentOpengraphImage(
  size: { width: number; height: number },
  emoji: string,
  title: string
) {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: '#10151c',
            width: '90%',
            height: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            borderRadius: 64,
            padding: 64,
            gap: '24px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              fontSize: '72px',
              lineHeight: '1.0',
            }}
          >
            {emoji}
          </div>
          <p
            style={{
              fontSize: '40px',
              color: '#CCCCCC',
              textAlign: 'center',
              flex: 'auto',
            }}
          >
            {title}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '24px',
              color: '#CCCCCC',
              textAlign: 'center',
            }}
          >
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
