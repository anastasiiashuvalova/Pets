import { useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function CreateAnimalModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !description.trim() || !file) {
      setError("Заполни имя, описание и выбери фото.");
      return;
    }

    if (!supabase) {
      setError("Supabase не настроен.");
      return;
    }

    setSaving(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("animal-photos")
        .upload(path, file, { contentType: file.type });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicData } = supabase.storage
        .from("animal-photos")
        .getPublicUrl(path);

      const { error: insertError } = await supabase.from("animals").insert({
        name: name.trim(),
        description: description.trim(),
        image_url: publicData.publicUrl,
      });

      if (insertError) {
        throw insertError;
      }

      onCreated();
      onClose();
    } catch (err) {
      setError(err.message || "Не получилось сохранить карточку.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="overlay-enter fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="modal-enter w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-semibold">Новая карточка</h2>
        <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="text-sm font-medium">
            Имя
            <input
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-base font-normal outline-none focus:border-neutral-800"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label className="text-sm font-medium">
            Описание
            <textarea
              className="mt-1 min-h-24 w-full rounded-xl border border-neutral-300 px-3 py-2 text-base font-normal outline-none focus:border-neutral-800"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <label className="text-sm font-medium">
            Фото
            <input
              className="mt-1 w-full text-sm font-normal"
              type="file"
              accept="image/*"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-full border border-neutral-300 px-4 py-2.5 text-sm font-medium"
              onClick={onClose}
              disabled={saving}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
              disabled={saving}
            >
              {saving ? "Сохраняю…" : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
