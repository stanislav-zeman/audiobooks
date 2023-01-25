-- Add migration script here
CREATE TABLE user (
    id VARCHAR(32) NOT NULL,
    name TEXT NOT NULL,
    studio_access BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE author (
    id VARCHAR(32) NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE book (
    id VARCHAR(32) NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    published_at DATE NOT NULL,
    length INT NOT NULL,
    file_url TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    price INT NOT NULL,
    isbn TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_book (
   user_id VARCHAR(32) REFERENCES user(id),
   book_id VARCHAR(32) REFERENCES book(id),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   PRIMARY KEY (user_id, book_id)
);

CREATE TABLE author_book (
   author_id VARCHAR(32) REFERENCES author(id),
   book_id VARCHAR(32) REFERENCES book(id),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   PRIMARY KEY (author_id, book_id)
);

CREATE TABLE chapter (
    id VARCHAR(32) NOT NULL,
    book_id VARCHAR(32) NOT NULL REFERENCES book(id),
    name TEXT NOT NULL,
    start INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE book_tag (
    book_id VARCHAR(32) REFERENCES book(id),
    tag VARCHAR(32) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (book_id, tag)
)