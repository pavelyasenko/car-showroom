import { useEffect, useState } from "react";

interface Review {
  name: string;
  email: string;
  review: string;
  rating: number;
}

export const HandleReview = () => {
  const [form, setForm] = useState<Review>({
    name: "",
    email: "",
    review: "",
    rating: 0,
  });

  const [reviews, setReviews] = useState<Review[]>([]);

  // загрузка из localStorage
  useEffect(() => {
    const data = localStorage.getItem("reviews");
    if (data) {
      setReviews(JSON.parse(data));
    }
  }, []);

  // универсальный handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // отправка формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.review || form.rating === 0) {
      alert("Заполни все поля и поставь рейтинг");
      return;
    }

    const newReviews = [form, ...reviews]; // новые сверху

    localStorage.setItem("reviews", JSON.stringify(newReviews));
    setReviews(newReviews);

    setForm({
      name: "",
      email: "",
      review: "",
      rating: 0,
    });
  };

  return (
    <div>
      <form className="handle__review" onSubmit={handleSubmit}>
        <h2>Добавить отзыв</h2>

        <input
          className="handle__review-name"
          name="name"
          type="text"
          placeholder="Name..."
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="handle__review-email"
          name="email"
          type="email"
          placeholder="youremail@gmail.com"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          className="handle__review-comment"
          name="review"
          placeholder="Ваш отзыв..."
          value={form.review}
          onChange={handleChange}
        />

        {/* ⭐ Рейтинг */}
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() =>
                setForm((prev) => ({ ...prev, rating: star }))
              }
              style={{
                cursor: "pointer",
                color: star <= form.rating ? "gold" : "gray",
                fontSize: "22px",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit" className="handle__review-button">Отправить</button>
      </form>

      {/* 📄 Список отзывов */}
      <div style={{ marginTop: "20px" }}>
        {reviews.length === 0 && <p>Пока нет отзывов</p>}

        {reviews.map((r, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{r.name}</h4>
            <p>{r.review}</p>
            <div>{"★".repeat(r.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};