import { CarList } from "../../Features/Ui/CarList"

interface HomePageProps {
  query: string;
}

export const HomePage = ({ query }: HomePageProps) => {
  return (
    <section className="cards--container">
      <CarList query={query} />
    </section>
  );
};
