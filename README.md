# Pagodinho do Fera

Landing page de alta conversão para contratação via WhatsApp com admin de agenda em Firebase, integração com Instagram oficial, Reel em destaque e polimento premium final 100% (loading musical com equalizer, agenda semanal real e hero de alta autoridade).

## Stack
- Next.js 14 + TypeScript
- Tailwind CSS
- Framer Motion
- Firebase Firestore/Auth

## Setup
1. `npm install`
2. Copie `.env.example` para `.env.local` e ajuste se necessário:
   - `cp .env.example .env.local`
   - Já preenchido com os dados do projeto Firebase enviado (incluindo `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`).
3. No Firebase Console, habilite **Authentication > Email/Senha** e crie o usuário admin.
4. No Firestore, use/crie a coleção `eventos` com campos: `titulo`, `data`, `hora`, `cidade`, `local`, `destaque`, `imagem`.
5. `npm run dev`

## Rotas
- `/` site principal
- `/admin` painel CRUD de eventos com login


## Conteúdo visual
- Logomarca usada em `public/logo-pagodinho.svg`
- Reel destacado: `https://www.instagram.com/pagodinhodofera/reel/DQvKG0-EeIX/`

- Canal YouTube oficial: `https://www.youtube.com/@VALFERA`
