# Dashboard Kit
- репозиторий является копией приватного, в который были запушены ключи к Firebase
***
- видеообзор (в процессе разработки)
- деплой (в процессе разработки)
- [макет](https://www.figma.com/file/mK4nf7Y0sBpQ9EpNOsBjHL/Figma-Admin-Dashboard-UI-Kit-(Free)-(Copy)?node-id=0%3A1)
- [задание 1](https://disk.yandex.ru/i/cZXOoG1fUWSdqw)
- [задание 2](https://disk.yandex.ru/i/Ehe_U5OPnJfaCw)

## Описание
- приложение для работы с тикетами

## Скриншоты
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/01.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/02.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/03.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/04.jpg)
![](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/05.jpg)

## Технологии
  - React
  - Redux Toolkit (createSlice, createAsyncThunk)
  - Typescript
  - MUI
  - Firebase

## Функциональность
- google авторизация 
- операции с тикетами:
  - создание, чтение, обновление, удаление
  - построение диаграммы (nivo)
  - пагинация, сортировка, поиск, вид:
    - список
    - карточки
- валидация форм
- навигация страниц
- debounce
- сохранение настроек в store
- уведомления о событиях, ошибках
- выбор тем
- лоадер
- адаптивная верстка

## Планы
- переработать сложную логику условий по принципу FSM
- сохранение данных в localStorage
- добавить: 
  - Redux Saga
  - инструменты мемоизации
  - HOC-компоненты
  - кастомные хуки
  - порталы
  - предохранители
  - react-helmet
  - доступность с клавиатуры
  - Skeleton
  - мобильная версия
  - деплой
