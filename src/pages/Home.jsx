import { useEffect, useState } from "react";
import AnimalCard from "../components/AnimalCard.jsx";
import CreateAnimalModal from "../components/CreateAnimalModal.jsx";
import { isSupabaseConfigured, supabase } from "../lib/supabase.js";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1600&q=80";

export default function Home() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  async function loadAnimals() {
    if (!supabase) {
      setError(
        "Нет ключей Supabase. Добавь VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY в .env или в Secrets на Replit.",
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: queryError } = await supabase
      .from("animals")
      .select("id, name, description, image_url, created_at")
      .order("created_at", { ascending: false });

    if (queryError) {
      setError(queryError.message);
      setAnimals([]);
    } else {
      setError("");
      setAnimals(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadAnimals();
  }, []);

  return (
    <div className="page-enter mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="aspect-[21/9] min-h-48 w-full overflow-hidden bg-[#e8e8e4] sm:min-h-64">
          <img
            src={HERO_IMAGE}
            alt="Животные из приюта"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Найди своего питомца
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Витрина животных из приюта. Выбери карточку, узнай о питомце подробнее
            и забери его домой.
          </p>
          <button
            type="button"
            className="mt-6 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
            onClick={() => setModalOpen(true)}
          >
            Создать карточку
          </button>
        </div>
      </section>

      <section className="mt-10">
        {!isSupabaseConfigured || error ? (
          <p className="rounded-2xl bg-white p-5 text-neutral-700 ring-1 ring-black/5">
            {error || "Supabase не настроен."}
          </p>
        ) : null}

        {loading ? (
          <p className="mt-4 text-neutral-500">Загружаю витрину…</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>

      {modalOpen ? (
        <CreateAnimalModal
          onClose={() => setModalOpen(false)}
          onCreated={loadAnimals}
        />
      ) : null}
    </div>
  );
}
