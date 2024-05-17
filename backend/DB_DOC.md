## Логическая База Данных

Схематиченое представление БД в виде связей реляционных таблиц

> https://dbdiagram.io/d/Emojigram-DB-6647a507f84ecd1d227be3a6

![img.png](img.png)

## Физическая База Данных

Так как в проекте предусматривается использование MongoDB, в которой данные хранятся в виде коллекций ключ-значение, а не в виде реляционных таблиц, БД будет иметь следующий вид:

### Users Collection
```json
{
    "_id": string,
    "email": string,
    "password": string,
    "created": Date,
    "avatar_url": string,
    "deleted": boolean,
    "chat_ids": number[]
}
```
### Sessions Collection
```json
{
    "_id": number,
    "token": string,
    "user_id": string
}
```
### Chats Collection
```json
{
    "_id": number,
    "name": string,
    "created": Date,
    "avatar_url": string,
    "deleted": boolean,
    "users": {
      "id": number,
      "role": "default" | "admin",
      "joined_at": Date,
      "removed": boolean
    }[]
}
```
### Messages Collection
```json
{
    "_id": number,
    "sender_id": string,
    "receiver_id": string | number,
    "sent_at": Date,
    "content": string,
    "deleted": boolean
}
```