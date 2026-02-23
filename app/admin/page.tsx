'use client';

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { FormEvent, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';

type EventForm = {
  id?: string;
  titulo: string;
  data: string;
  hora: string;
  cidade: string;
  local: string;
  destaque: boolean;
  imagem?: string;
};

const empty: EventForm = { titulo: '', data: '', hora: '', cidade: '', local: '', destaque: false, imagem: '' };

export default function AdminPage() {
  const [items, setItems] = useState<EventForm[]>([]);
  const [form, setForm] = useState<EventForm>(empty);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  async function load() {
    const snap = await getDocs(collection(db, 'eventos'));
    setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as EventForm) })));
  }

  useEffect(() => {
    if (!auth) return;

    const unsub = onAuthStateChanged(auth, (current) => {
      setUser(current);
      if (current) load();
    });

    return () => unsub();
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    if (!auth) {
      setAuthError('Firebase Auth indisponível neste ambiente.');
      return;
    }

    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setAuthError('Login inválido. Confira email e senha.');
    }
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!user) return;

    if (form.id) {
      await updateDoc(doc(db, 'eventos', form.id), form);
    } else {
      await addDoc(collection(db, 'eventos'), form);
    }

    setForm(empty);
    await load();
  }

  async function remove(id?: string) {
    if (!id || !user) return;
    await deleteDoc(doc(db, 'eventos', id));
    await load();
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-6 py-10">
        <h1 className="mb-6 text-3xl font-bold">Admin de Agenda</h1>
        <form onSubmit={login} className="grid gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <input
            type="email"
            required
            className="rounded bg-zinc-900 p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="rounded bg-zinc-900 p-2"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {authError && <p className="text-sm text-red-400">{authError}</p>}
          <button className="rounded bg-neon p-2 font-bold text-black">Entrar</button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin de Agenda</h1>
        <button className="rounded bg-zinc-800 px-4 py-2" onClick={() => auth && signOut(auth)}>Sair</button>
      </div>

      <form onSubmit={save} className="grid gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-6 md:grid-cols-2">
        {['titulo', 'data', 'hora', 'cidade', 'local', 'imagem'].map((f) => (
          <input
            key={f}
            required={f !== 'imagem'}
            className="rounded bg-zinc-900 p-2"
            placeholder={f}
            value={((form as Record<string, string | boolean | undefined>)[f] as string | undefined) ?? ''}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          />
        ))}
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.destaque} onChange={(e) => setForm({ ...form, destaque: e.target.checked })} />
          Destaque
        </label>
        <button className="rounded bg-neon p-2 font-bold text-black">Salvar Evento</button>
      </form>

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded border border-zinc-800 p-3">
            <span>{item.titulo} • {item.data} {item.hora}</span>
            <div className="flex gap-2">
              <button className="rounded bg-zinc-800 px-3 py-1" onClick={() => setForm(item)}>Editar</button>
              <button className="rounded bg-red-600 px-3 py-1" onClick={() => remove(item.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
