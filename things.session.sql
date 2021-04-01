CREATE TABLE things(
  id serial PRIMARY KEY,
  body text not null check(body != ''),
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp
);
/*  */
INSERT INTO things ("body", "deadline", "createdAt", "updatedAt")
VALUES ();
/*  */