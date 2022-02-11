# Dashboard Kit
***
- ссылка на приложение (находится в процессе разработки)
- [ссылка на макет](https://www.figma.com/file/mK4nf7Y0sBpQ9EpNOsBjHL/Figma-Admin-Dashboard-UI-Kit-(Free)-(Copy)?node-id=0%3A1)
- [ссылка на задание № 1](https://disk.yandex.ru/i/cZXOoG1fUWSdqw)
- [ссылка на задание № 2](https://disk.yandex.ru/i/Ehe_U5OPnJfaCw)

## Описание
- Приложение для работы с тикетами

Репозиторий является копией приватного, где случайно были запушены ключи к Firebase. В ближайшее время проект будет задеплоен.

## Скриншоты
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/01.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/02.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/03.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/04.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/05.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/06.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/07.jpg)

## Технологии
  - Typescript
  - Redux Toolkit (createSlice, createAsyncThunk)
  - Firebase
  - MUI

## Функциональность
- авторизация через Firebase/Google
- работа с данными через Firebase/Firestore
- создание, чтение, обновление и удаление тикетов
- для тикетов работают: пагинация, сортировка, поиск, а также выбор режима отображения тикетов в виде списка или карточек
- в поле поиска тикетов, а также в поле ввода кол-ва строк для пагинации используется debounce
- данные настройки отображения тикетов сохраняются в Redux(планирую добавить сохранение в localStorage)
- навигация по страницам
- валидация данных форм
- обработка данных для вывода в виде диаграммы с помощью библиотеки nivo
- вывод уведомлений об ошибках для пользователя при асинхронных запросах
- выбор темы в приложении
- адаптивная верстка (планшетный и десктопный варианты)
- отображение лоадера при запросах

## Планы по доработке проекта
- добавить сохранение данных в localStorage
- добавить: 
  - HOC-компоненты
  - кастомные хуки
  - порталы
  - мемоизацию
  - предохранители
- переработать сложную логику условий по принципу FSM
- подключить react-helmet для семантики
- потестить доступность с клавиатуры
- применить Skeleton
- переписать сайд-эффекты на Redux Saga
- добавить мобильную версию приложения
- деплой проекта
