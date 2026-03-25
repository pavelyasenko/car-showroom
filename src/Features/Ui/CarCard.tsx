import { Link } from "react-router-dom"
import type { Car } from "../Cars/Model/type"
import { useState } from "react";


export const CarCard = ({ car }: {car:Car}) => {

  return (
    <>
      <div key={car.id} className="card">
            <div className="card__image">
                <img src={car.thumbnail} alt=""/>
            </div>
            
            <h1 className="card__name">{car.title}</h1>
            <p className="card__code">{car.category}</p>
            <p className="card__code">{`car in stock: ${car.stock}`}</p>
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

            <Link to={`/car/${car.id}`} className="card-button">more info</Link>
        </div>
    </>
  )
}