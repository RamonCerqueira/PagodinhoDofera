import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

export type EventItem = {
  id: string;
  titulo: string;
  data: string;
  hora: string;
  cidade: string;
  local: string;
  destaque: boolean;
  imagem?: string;
};

export async function getEvents(): Promise<EventItem[]> {
  const q = query(collection(db, 'eventos'), orderBy('data', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<EventItem, 'id'>) }));
}
