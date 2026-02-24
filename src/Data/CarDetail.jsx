import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Автомобиль не найден");
        return res.json();
      })
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setLoading(false);
      });
  }, [id]);

  // Логика слайдера
  const nextSlide = () => {
    if (!car?.images) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (!car?.images) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <div className="loader">Загрузка данных...</div>;
  
  if (!car) return (
    <div className="error-page">
      <h2>Упс! Машина не найдена</h2>
      <Link to="/">Вернуться в каталог</Link>
    </div>
  );

  return (
    <div className="car-detail-wrapper">
      <div className="container">
        <Link to="/" className="back-link">← Назад к поиску</Link>

        <div className="car-detail__container">
          <div className="custom-slider">
            <button className="slider-btn prev" onClick={prevSlide}>‹</button>
            <div className="slider-track">
              {car.images && car.images.length > 0 && (
                <img 
                  src={car.images[currentIndex]} 
                  alt={`${car.title} - фото ${currentIndex + 1}`} 
                  className="slider-img"
                />
              )}
            </div>
            <button className="slider-btn next" onClick={nextSlide}>›</button>
            
            <div className="slider-dots">
              {car.images?.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="car-detail__info">
            <div className="info-header">
              <span className="brand-badge">{car.brand}</span>
              <h1 className="car-title">{car.title}</h1>
              <p className="sku">Код товара: {car.sku}</p>
            </div>

            <div className="price-block">
              <span className="current-price">${car.price}</span>
              {car.discountPercentage > 0 && (
                <span className="discount">-{car.discountPercentage}% сегодня</span>
              )}
            </div>

            <div className="specs-grid">
              <div className="spec-item">
                <strong>Наличие:</strong> 
                <span className={car.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                  {car.availabilityStatus} ({car.stock} шт.)
                </span>
              </div>
              <div className="spec-item">
                <strong>Гарантия:</strong> {car.warrantyInformation}
              </div>
              <div className="spec-item">
                <strong>Доставка:</strong> {car.shippingInformation}
              </div>
              <div className="spec-item">
                <strong>Возврат:</strong> {car.returnPolicy}
              </div>
            </div>

            <div className="description-box">
              <h3>Описание модели</h3>
              <p>{car.description}</p>
            </div>

            <div className="tags">
              {car.tags?.map((tag) => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>

            <button className="buy-button">Забронировать {car.title}</button>
          </div>
        </div>

        <div className="car-detail__extra">
          <div className="reviews-section">
            <h3>Отзывы покупателей ({car.reviews?.length || 0})</h3>
            <div className="reviews-list">
              {car.reviews?.map((rev, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <strong>{rev.reviewerName}</strong>
                    <span className="review-date">
                      {new Date(rev.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="review-rating">
                    {"⭐".repeat(rev.rating)}
                  </div>
                  <p className="review-comment">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="qr-section">
            <p>Информация о товаре (QR):</p>
            {car.meta?.qrCode && (
              <img src={car.meta.qrCode} alt="QR Code" className="qr-image" />
            )}
            <p className="update-date">
              Обновлено: {car.meta?.updatedAt ? new Date(car.meta.updatedAt).toLocaleDateString() : '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}