import { ImageResponse } from 'next/server'

export const createOgImage = async (
  size: { width: number; height: number },
  emoji: string,
  title: string
) => {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 12,
            background: '#1D2127',
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
              width: '64px',
              height: '64px',
              fontSize: '64px',
            }}
          >
            {emoji}
          </div>
          <p
            style={{
              fontSize: '64px',
              color: '#CCCCCC',
              textAlign: 'center',
            }}
          >
            {title}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
