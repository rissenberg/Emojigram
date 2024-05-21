## Логическая База Данных

Схематиченое представление БД в виде связей реляционных таблиц

> https://dbdiagram.io/d/Emojigram-DB-6647a507f84ecd1d227be3a6

![image](https://github.com/rissenberg/Emojigram/assets/114286666/082c5069-4fe4-4109-9c39-8e29ce26e0e8)

## Физическая База Данных

От таблицы сессий пришлось отказаться, т.к. авторизация в проекте была переделана на JWT  надобности в хранении токенов больше нет

Так как в проекте предусматривается использование MongoDB, в которой данные хранятся в виде коллекций ключ-значение, а не в виде реляционных таблиц, БД будет иметь следующий вид:

### Users Collection
```ts
{
    "_id": string,
    "username": string,
    "email": string,
    "password": string,
    "created": Date,
    "avatar_url": string,
    "deleted": boolean,
    "chat_ids": string[]
}
```
### Chats Collection
```ts
{
    "_id": string,
    "name": string,
    "created": Date,
    "avatar_url": string,
    "deleted": boolean,
    "users": {
      "username": string,
      "role": "default" | "admin",
      "joined_at": Date,
      "removed": boolean
    }[]
}
```
### Messages Collection
```ts
{
    "_id": string,
    "sender_id": string,
    "receiver_id": string,
    "sent_at": Date,
    "content": string,
    "deleted": boolean
}
```