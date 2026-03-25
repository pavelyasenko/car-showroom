import { UseCars } from "../Cars/Model/useCars";
import { CarCard } from "./CarCard";
import type { Car } from "../Cars/Model/type";

interface CarListProps {
  query: string;
}

export const CarList = ({ query }: CarListProps) => {
  const { cars, loading } = UseCars(query);

  return (
    <>
          {loading ? (
        <div>Loading...</div>
      ) : cars.length > 0 ? (
        cars.map((car: Car) => <CarCard key={car.id} car={car} />)
      ) : (
        <div>Ничего не найдено</div>
      )}
    </>
  );
};