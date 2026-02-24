'use client';

import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming this exists or I'll use standard input
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, LogOut, Star, Calendar, MapPin, Clock } from 'lucide-react';
import { EventItem } from '@/lib/getEvents';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    titulo: '',
    data: '',
    hora: '',
    cidade: '',
    local: '',
    destaque: false
  });

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'eventos'), orderBy('data', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventItem));
      setEvents(items);
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!auth) {
        setError('Erro na configuração do Firebase');
        return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  const handleLogout = () => {
    if (auth) signOut(auth);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateDoc(doc(db, 'eventos', isEditing), formData);
        setIsEditing(null);
      } else {
        await addDoc(collection(db, 'eventos'), formData);
      }
      setFormData({
        titulo: '',
        data: '',
        hora: '',
        cidade: '',
        local: '',
        destaque: false
      });
    } catch (err) {
      alert('Erro ao salvar evento');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      await deleteDoc(doc(db, 'eventos', id));
    }
  };

  const handleEdit = (event: EventItem) => {
    setFormData({
      titulo: event.titulo,
      data: event.data,
      hora: event.hora,
      cidade: event.cidade,
      local: event.local,
      destaque: event.destaque
    });
    setIsEditing(event.id);
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">Carregando...</div>;

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-zinc-900 p-8 border border-zinc-800 shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Admin Pagodinho</h2>
            <p className="mt-2 text-zinc-400">Entre para gerenciar a agenda</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400">Email</label>
              <input 
                type="email" 
                required 
                className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400">Senha</label>
              <input 
                type="password" 
                required 
                className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white p-3 focus:ring-amber-500 focus:border-amber-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-white">Painel de Controle</h1>
          <Button variant="destructive" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          {/* Form */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 h-fit sticky top-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              {isEditing ? <Edit className="h-5 w-5 text-amber-500" /> : <Plus className="h-5 w-5 text-emerald-500" />}
              {isEditing ? 'Editar Evento' : 'Novo Evento'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400">Título do Evento</label>
                <input 
                  type="text" 
                  required 
                  className="w-full rounded bg-zinc-800 border-zinc-700 p-2 text-white"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Ex: Pagode no Bar"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-400">Data (YYYY-MM-DD)</label>
                  <input 
                    type="date" 
                    required 
                    className="w-full rounded bg-zinc-800 border-zinc-700 p-2 text-white"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Hora</label>
                  <input 
                    type="time" 
                    required 
                    className="w-full rounded bg-zinc-800 border-zinc-700 p-2 text-white"
                    value={formData.hora}
                    onChange={(e) => setFormData({...formData, hora: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-400">Cidade</label>
                <input 
                  type="text" 
                  required 
                  className="w-full rounded bg-zinc-800 border-zinc-700 p-2 text-white"
                  value={formData.cidade}
                  onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                  placeholder="Ex: Salvador - BA"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">Local</label>
                <input 
                  type="text" 
                  required 
                  className="w-full rounded bg-zinc-800 border-zinc-700 p-2 text-white"
                  value={formData.local}
                  onChange={(e) => setFormData({...formData, local: e.target.value})}
                  placeholder="Ex: Casa de Show X"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="destaque"
                  className="h-5 w-5 rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-amber-500"
                  checked={formData.destaque}
                  onChange={(e) => setFormData({...formData, destaque: e.target.checked})}
                />
                <label htmlFor="destaque" className="text-sm font-medium cursor-pointer">
                  Marcar como Destaque (Próximo Show)
                </label>
              </div>

              <div className="pt-4 flex gap-2">
                <Button type="submit" className="flex-1 bg-white text-black hover:bg-zinc-200 font-bold">
                  {isEditing ? 'Atualizar' : 'Adicionar'}
                </Button>
                {isEditing && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(null);
                      setFormData({
                        titulo: '',
                        data: '',
                        hora: '',
                        cidade: '',
                        local: '',
                        destaque: false
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-zinc-400" />
              Eventos Agendados ({events.length})
            </h2>

            {events.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl text-zinc-500">
                Nenhum evento cadastrado. Adicione o primeiro!
              </div>
            ) : (
              <div className="grid gap-4">
                {events.map((event) => (
                  <div 
                    key={event.id} 
                    className={`
                      relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 
                      rounded-xl border p-6 transition-all
                      ${event.destaque ? 'border-amber-500/50 bg-amber-500/5' : 'border-zinc-800 bg-zinc-900/50'}
                    `}
                  >
                    {event.destaque && (
                      <div className="absolute -top-3 left-6">
                        <Badge className="bg-amber-500 text-black hover:bg-amber-600">Destaque</Badge>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{event.titulo}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-zinc-400">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(event.data).toLocaleDateString('pt-BR')}</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {event.hora}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {event.local}, {event.cidade}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(event)} className="hover:text-amber-500">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(event.id)} className="hover:text-red-500 text-red-500/50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
