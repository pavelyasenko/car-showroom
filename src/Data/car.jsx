import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

export function CarsJson() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/vehicle")
      .then((resp) => {
        if (!resp.ok) throw new Error("car not found");
        return resp.json();
      })
      .then((data) => {
        setCars(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(query.toLowerCase()) ||
      car.description.toLowerCase().includes(query.toLowerCase()),
  );

  if (loading) return <p>Loading...</p>;

  return (
  <>
    {query && (
      <div className="search-header">
        <h2 className="search-title">Результаты для: «{query}»</h2>
        <p className="search-count">Найдено машин: {filteredCars.length}</p>
      </div>
    )}
    <div className="cards--container">
      {filteredCars.length > 0 ? (
        filteredCars.map((car) => (
          <section key={car.id} className="card" data-qa="card">
            <div className="card__image">
              <img src={car.thumbnail} alt={car.title} className="card__photo" />
            </div>

            <h1 className="card__name">{car.title}</h1>
            <p className="card__code">{car.category}</p>
            <p className="card__code">{`cars in stock: ${car.stock}`}</p>
            <p className="card__grade">{`Car rating: ${car.rating}`}</p>
            <p className="card__text">{car.description}</p>

            <div className="card__reviews">
              <p className="card__reviews-count">💬 Отзывов: {car.reviews.length}</p>
              {car.reviews.length > 0 && (
                <div className="card__last-review">
                  <p className="review-text">
                    <em>{car.reviews[0].comment}</em> — <strong>{car.reviews[0].reviewerName}</strong>
                  </p>
                  <span className="review-stars">{"⭐".repeat(car.reviews[0].rating)}</span>
                </div>
              )}
            </div>

            <div className="card__prices">
              <p className="card__price">price: <strong>${car.price}</strong></p>
            </div>
            
            <Link to={`/car/${car.id}`} className="card__button">more info</Link>
          </section>
        ))
      ) : (
        <p className="no-results">По вашему запросу ничего не найдено</p>
      )}
    </div>
  </>
);
}
