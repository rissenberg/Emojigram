# Emojigram web-app ver. 1.0.3

## Описание приложения
*Emojigram* - это приложение для общения в интернете, особенностью которого является возможность пользоваться лишь эмодзи - все диалоги наполнены иконками желтых человечков без единой буквы.

Данный проект был создан как поле для практики и освоения новых технологий и методологий 

## Версии проекта
Текущая версия проекта - 1.0.4

Выпуск версии 1.1.0 будет MVP проекта, включающий следующий функционал:

- [x] Интерфейс, обновляемый на изменение хранилища
- [x] Рабочий Backend сервер с хранением данных в ~~оперативной памяти~~ базе данных
- [x] Авторизация на ~~cookie~~ JSON Web Token 
- [ ] Создание групповых чатов, добавление в них пользователей, отправка сообщений
- [ ] Обмен сообщениями по WebSocket

## Как запустить приложение

### Frontend
Для запуска необходимо перейти в каталог `./frontend`, скачать все зависимости и запустить сервер следующими командами:

```npm install```

```npm run start```

После чего сайт будет доступен по ссылке http://localhost:3000

### Backend
Для работы сервиса необходимо иметь MongoDB. В файле конфигурации можно поменять адрес базы данных, по умолчанию стоит на localhost.

При первом запуске необходимо настроить базу данных - для этого достаточно запустить сервис mongod на компьютере и выполнить скрипт, находящийся по пути:

```./backend/server/db/createDB.sh```

Для запуска необходимо перейти в каталог `./backend`, скачать все зависимости, собрать проект и запустить сервер следующими командами:

```npm install```

```npm run start```

После чего сервис будет доступен по урлу http://localhost:8080

API доступно по пути `/api/v1`

**(В БУДУЩЕМ)**
Swagger доступен по пути `/api-doc`

## Стек технологий
### Frontend
- React + TypeScript
- React Router DOM
- Архитектура Feature-Sliced Design
- Redux Toolkit
- TanStack Query
- CSS Modules

### Backend
- Node.js + TypeScript
- Express Framework
- REST API
- JWT Auth
- MongoDB 

## Структура проекта

### Frontend

Проект реализует принципы FSD имеет следующую структуру:
```
.
├── public/
│   └── index.html
└── src/
    ├── app/
    │   └── Здесь лежит компонент приложения и глобальное хранилище
    ├── entities/
    │   └── Здесь лежат компоненты бизнес сущностей 
    ├── pages/
    │   └── Здесь лежат компоненты страниц
    ├── widgets/
    │   └── Здесь лежат компоненты отдельных виджетов
    ├── features/
    │   └── Здесь лежат компоненты бизнес логики
    ├── shared/
    │   └── Здесь лежат компоненты, используемые по всему проекту
    │
    └── index.tsx - точка старта приложения
```

Структура компонента имеет в себе:
```
.
└── Component/
    ├── lib/
    │   └── function.ts - некоторая вынесенная бизнес логика
    ├── model/
    │   ├── selectors - селекторы глобального хранилища
    │   └── types - типы и интерфейсы ts
    ├── ui/
    │   ├── Component.tsx - интерфейс компонента, хуки, обработчики
    │   └── style.module.scss - стили css modules
    │
    └── index.ts - публичный API компонента
```

### Backend

Backend проекта имеет архитектуру REST API и следующую структуру:
```
.
├── api/
│   └── Здесь лежт обработчики запросов 
├── config/
│   └── Здесь лежат конфиги приложения
├── db/
│   └── Здесь лежит логика работы с БД
├── model/
│   └── Здесь лежат интерфейсы для типов запросов и сущностей БД 
├── repository/
│   └── Здесь лежит логика обращения к БД
├── services/
│   └── Здесь лежит бизнес логика работы с хранимыми данными
│
└── index.tsx - точка старта приложения - API Gateway
```