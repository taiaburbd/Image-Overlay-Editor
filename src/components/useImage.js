import { useEffect, useState } from 'react'

const useImage = (url) => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (!url) return

    const img = new window.Image()
    img.onload = () => {
      setImage(img)
    }
    img.crossOrigin = 'anonymous'
    img.src = url

    return () => {
      img.src = ''
    }
  }, [url])

  return image
}

export default useImage
