import type { Car } from "../Model/type";

interface CarResponse {
  products: Car[];
}


export function getCars(query: string): Promise<Car[]> {
  return fetch("https://dummyjson.com/products/category/vehicle")
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка сервера")
      return response.json()
    })
    .then((data: CarResponse) => {
      return data.products.filter((car) =>
      car.title.toLowerCase().includes(query.toLowerCase())
      )
    })
    .catch(() => [])
}