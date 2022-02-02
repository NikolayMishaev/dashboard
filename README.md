# Kanban
***
<!-- [ссылка на gh-pages](https://nikolaymishaev.github.io/Kanban-test-task/) -->

## Описание
- Выполнение тестового задания по созданию доски задач с запросами к Firestore.
- Используется стейт-менеджер redux, redux/toolkit
- Сайд-эффекты выполняются чз createAsyncThunk в Redux
- Проект создавался в несколько этапов, на последнем был переписан на Typescript
- Разработка велась в приватном репозитории, т.к. были запушены ключи к Firestore. А в данном репозитории последняя версия приложения.
- В проекте подключены и используются:
- firebase
- react-hook-form
- react-router-dom
- MUI
- styled-components
- emotion/styled
- nivo/bar
- react-hot-toast
- date-fns
- debounce

## Скриншоты
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/01.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/02.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/03.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/04.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/05.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/06.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/07.jpg)

## Функциональность
- авторизация через Google firebase
- выбор темы в приложении
- навигация по страницам
- добавление, удаление, изменение тикетов
- валидация данных форм
- пагинация, сортировка, поиск тикетов
- выбор отображения тикетов: список или карточки
- минимальная адаптивная верстка, основная задача функциональность
- обработка ошибок при асинхронных запросах
- логика создания объекта с данными для отображения на их основе графика доски задач с помощью библиотеки nivo

## Планы по доработке проекта

добавить сохранение данных пользователя в localStorage
