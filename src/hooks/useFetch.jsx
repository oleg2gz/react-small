import {useState, useEffect, useRef} from 'react'

export const useFetch = (url) => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const effectRan = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    if (effectRan.current || process.env.NODE_ENV !== 'development') {
      setIsPending(true)

      const fetchData = async () => {
        try {
          const response = await fetch(url, {signal})

          if (!response.ok) throw Error('Something went wrong!')

          const result = await response.json()
          setData(result)
          setError(null)
          setIsPending(false)
        } catch (error) {
          if (error.name !== 'AbortError') {
            setError(error.message)
            setIsPending(false)
          }
        }
      }

      fetchData()
    }

    return () => {
      effectRan.current = true
      controller.abort()
    }
  }, [url])

  return {
    data,
    error,
    isPending,
  }
}
