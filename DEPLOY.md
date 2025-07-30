# Деплой в Cloudflare Pages

## Подготовка проекта

1. Убедитесь, что все изменения сохранены
2. Выполните сборку проекта:
   ```bash
   npm run build
   ```

## Деплой через Cloudflare Dashboard

1. Загрузите проект в GitHub репозиторий
2. Войдите в [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Перейдите в **Pages** → **Create a project**
4. Выберите **Connect to Git**
5. Выберите ваш репозиторий
6. Настройте параметры сборки:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (если проект в корне репозитория)

## Деплой через Wrangler CLI

1. Установите Wrangler:
   ```bash
   npm install -g wrangler
   ```

2. Войдите в аккаунт:
   ```bash
   wrangler login
   ```

3. Деплой:
   ```bash
   wrangler pages deploy dist
   ```

## Использование URL параметров

Сайт поддерживает следующие URL параметры:

- `sub1` - пользовательский параметр 1
- `sub2` - пользовательский параметр 2  
- `sub3` - пользовательский параметр 3

### Примеры URL:

```
https://your-site.pages.dev/?sub1=user123&sub2=cam&sub3=18-001
https://your-site.pages.dev/?sub1=test&sub2=dating&sub3=25-002
```

Эти параметры автоматически передаются в ссылку регистрации:
```
https://tone.affomelody.com/click?pid=118305&offer_id=55&sub1=user123&sub2=cam&sub3=18-001
```

## Структура файлов для деплоя

```
model-chat-game/
├── dist/                    # Папка сборки (создается автоматически)
├── public/
│   ├── _redirects          # Правила редиректа для SPA
│   └── videos/             # Видео файлы
├── src/
│   ├── components/         # React компоненты
│   ├── stores/            # Zustand store
│   ├── utils/             # Утилиты (включая urlParser)
│   └── ...
├── package.json
├── vite.config.ts
└── README.md
``` 