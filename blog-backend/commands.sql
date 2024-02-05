CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Lance Fortnow', 'https://blog.computationalcomplexity.org/2024/01/favorite-theorems-2024.html', 'Favorite Theorems 2015-2024');
insert into blogs (author, url, title) values ('Daniel Lemire', 'https://lemire.me/blog/2024/02/04/how-fast-is-rolling-karp-rabin-hashing/', 'How fast is rolling Karp-Rabin hashing?');