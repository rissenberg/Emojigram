mongosh <<EOF

use Emojigram

db.createCollection("users")
db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })

db.createCollection("chats")

db.createCollection("messages")
db.messages.createIndex({ sender_id: 1 })
db.messages.createIndex({ receiver_id: 1 })

show collections

exit
EOF