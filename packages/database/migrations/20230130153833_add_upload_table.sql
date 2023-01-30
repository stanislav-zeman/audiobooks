CREATE TABLE upload (
   user_id VARCHAR(32) REFERENCES user(id),
   book_id VARCHAR(32) REFERENCES book(id),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   PRIMARY KEY (user_id, book_id)
);

