import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function Animal() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!supabase) {
        setError(
          "Нет ключей Supabase. Добавь VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY в .env или в Secrets на Replit.",
        );
        setLoading(false);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("animals")
        .select("id, name, description, image_url")
        .eq("id", id)
        .single();

      if (queryError) {
        setError(queryError.message);
      } else {
        setAnimal(data);
      }
      setLoading(false);
    }

    load();
  }, [id]);

  return (
    <div className="page-enter mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        to="/"
        className="inline-flex rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium transition hover:border-neutral-800"
      >
        Назад
      </Link>

      {loading ? <p className="mt-8 text-neutral-500">Загружаю…</p> : null}
      {error ? <p className="mt-8 text-red-600">{error}</p> : null}

      {animal ? (
        <article className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="aspect-[16/10] overflow-hidden bg-[#e8e8e4]">
            <img
              src={animal.image_url}
              alt={animal.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              {animal.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              {animal.description}
            </p>
          </div>
        </article>
      ) : null}
    </div>
  );
}
