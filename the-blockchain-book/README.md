# The Blockchain Book

## Portfolio Project

This project hosts a curriculm with content including but not limited to vocabulary, videos, slide decks, paragraphs, flashcards, quizes, tutorials, and excercises realting to blockchain token research. The project includes code from the Admin side as well as the User side. The admin is allowed to update and change course progress for users. Users are students and have certain requirements like video watch time and quiz completion that they must complete in order to access the next objective.

The stack uses Vite/Node.js, React, Typescript, ExpressJS, and PostgreSQL. The main libraries include react-hook-form, zod, and many others which you can find a full list of in the package.json files.

You can run this on your own computer if you have a Postgres server to host it on. Instrcutions on how to install and connect your server to the project after download will be provided.

I will be learning how to utlize GitHub to create my first portoflio project to share with other developers and future employers or clients. I will also be applying my token research framework to this project which can be referenced at the live url here - _insert hosting URL_. This code is not intitally desgined to be forked and used for your own custom content, it is simply a portfolio project for now.

If you have questions about the project you can email me directly at krbestcreatives@gmail.com.

Key Learning During Project

- When error handling via coreFetch it is very importat to send the proper cotext to the front-end so the developer can fix the exact issue. I was just sending status codes with no context and didn't read the message in the server response so I was chasing problems on the front-end with out knowing it was just how I was handling a response from the database. This made me thing my authFetch.get() was wrong but in reality I just needed to pass the message properly to the front-end and display it there.
