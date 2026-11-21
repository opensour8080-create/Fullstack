# Backend (Аналог hh.ru)

## Как запустить локально
1. Установи зависимости: `npm install`
2. Создай файл `.env` с настройками своей PostgreSQL базы (`DB_USER`, `DB_HOST`, `DB_NAME`, `DB_PASSWORD`, `DB_PORT`, `PORT=3000`).
3. Накати таблицы в свою БД из файла `src/config/init.sql`.
4. Запусти сервер: `node server.js` (по умолчанию поднимется на `http://localhost:3000`).

---

## Важно для фронтенда (Авторизация)
Авторизация работает на сессиях (cookie `connect.sid`).
**Во всех `fetch`-запросах обязательно передавай `credentials: "include"`** (в `axios` — `withCredentials: true`), иначе сервер не увидит сессию и вернёт `401`.

### Готовая функция для запросов:
```js
const API = "http://localhost:3000";

async function api(url, method = "GET", body = null) {
  const opts = {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(API + url, opts);
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ошибка сервера");
  return data;
}
```

---

## Все эндпоинты API

### Юзеры и сессия
* `POST /register` — регистрация. Body: `{ "name": "Иван", "email": "a@b.ru", "password": "123456" }`
* `POST /login` — вход. Body: `{ "email": "a@b.ru", "password": "123456" }`
* `POST /logout` — выход.
* `GET /me` — проверка авторизации. Возвращает `{ "userId": 1 }` или `401`.
* `PUT /register/:id` — обновить профиль (нужна авторизация, только свой `id`).

### Вакансии
* `GET /vacancies` — получить все вакансии.
* `GET /vacancies/:id` — получить одну вакансию.
* `GET /vacancies/my` — мои созданные вакансии (нужна авторизация).
* `POST /vacancies` — создать вакансию (нужна авторизация). Body: `{ "title": "...", "description": "...", "company": "...", "salary": "100000" }`
* `PUT /vacancies/:id` — редактировать вакансию (только автор).
* `DELETE /vacancies/:id` — удалить вакансию (только автор).

### Отклики
* `POST /vacancies/:id/apply` — откликнуться на вакансию (нужна авторизация, нельзя на свою). Body: `{ "coverLetter": "Текст..." }`
* `GET /my-applications` — список вакансий, на которые я откликнулся (нужна авторизация).
* `GET /vacancies/:id/responses` — список кандидатов, откликнувшихся на мою вакансию (только автор).
