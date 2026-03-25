
import { useEffect, useState } from "react"
import { getCars } from "../api/getCars"
import type { Car } from "./type"

export const UseCars = (query: string) => {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    getCars(query).then((data) => {
      setCars(data)
      setLoading(false)
    })
  }, [query])

  return { cars, loading }
}