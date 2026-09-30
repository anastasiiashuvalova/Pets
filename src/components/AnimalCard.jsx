import { Link } from "react-router-dom";

export default function AnimalCard({ animal }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/animals/${animal.id}`} className="block">
        <div className="aspect-[16/10] overflow-hidden bg-[#e8e8e4]">
          <img
            src={animal.image_url}
            alt={animal.name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-semibold tracking-tight">{animal.name}</h2>
        <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-neutral-600">
          {animal.description}
        </p>
        <Link
          to={`/animals/${animal.id}`}
          className="mt-5 block rounded-full border border-neutral-300 px-4 py-2.5 text-center text-sm font-medium transition hover:border-neutral-800 hover:bg-neutral-50"
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}
