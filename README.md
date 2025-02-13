# Backend для TaskFlow

Этот проект представляет собой серверную часть для управления проектами и задачами в системе TaskFlow. Он построен с использованием **Express.js**, что делает его легким и быстрым для обработки запросов. С помощью этого сервера вы можете легко контролировать проекты, задачи и их статусы.

## Описание

Сервер управляет базовыми операциями для работы с проектами и задачами в рамках системы **TaskFlow**. Он предоставляет API для выполнения CRUD операций (создание, чтение, обновление, удаление) с задачами и проектами.

Основные возможности сервера:
- Создание, редактирование и удаление проектов
- Создание, редактирование и удаление задач в рамках проектов
- Получение информации о текущих проектах и задачах

## Технологии

### 1. **Express.js**
   - **Описание**: Express — это минималистичный и гибкий веб-фреймворк для Node.js, который используется для создания серверных приложений и API. Express позволяет легко настраивать маршруты и обработку запросов, делая разработку бэкенда быстрой и удобной.

### 2. **Node.js**
   - **Описание**: Node.js — это серверная платформа для выполнения JavaScript кода. Он позволяет строить масштабируемые серверные приложения, особенно для приложений с высоким уровнем параллельных соединений.

### 3. **MongoDB** (или другая база данных, если используется)
   - **Описание**: MongoDB — это документо-ориентированная база данных NoSQL, используемая для хранения данных приложений. В данном проекте MongoDB используется для хранения данных о задачах и проектах.

## Доступ к серверу

Сервер доступен по следующему URL:

[TaskFlow Backend](https://taskflow-back-end.onrender.com/)

Это публичный сервер, который позволяет тестировать основные функции API.

База данных использовалась MongoDB
