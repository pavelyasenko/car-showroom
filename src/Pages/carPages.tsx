import { useParams } from "react-router-dom";
import { CarDetail } from "../Features/Ui/CarDetail";
import { UseCars } from "../Features/Cars/Model/useCars";

export const CarPage = () => {
  const { id } = useParams<{ id: string }>();
  const { cars, loading } = UseCars(""); 

  // Находим нужную машину по ID из URL
  const currentCar = cars.find((c) => String(c.id) === id);

  if (loading) return <div>Загрузка...</div>;
  if (!currentCar) return <div>Машина не найдена</div>;

  // Вот здесь мы передаем обязательный пропс car
  return <CarDetail car={currentCar} />;
};