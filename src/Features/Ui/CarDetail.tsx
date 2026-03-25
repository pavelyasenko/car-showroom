import {Link } from "react-router-dom";
import type { Car } from "../Cars/Model/type";
import { HandleReview } from "../../Shared/Ui/Handele__review";
import { useState } from "react";

export const CarDetail = ({ car }: {car:Car}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (car.images) {
      setCurrentIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevSlide = () => {
    if (car.images) {
      setCurrentIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };
    
  if (!car) {
        return <div className="loading">Загрузка данных о машине...</div>;
      }

  const [isReserved, setIsReserved] = useState(false);

  const handleToggle = () => {
    setIsReserved(!isReserved);
  }

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

            <button 
              className={`buy-button${isReserved ? '-reserved' :''}`} 
              onClick={handleToggle}
            >
              {isReserved ? 'Забронировано' : `Забронировать ${car.title}`}
            </button>
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
            <HandleReview />
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