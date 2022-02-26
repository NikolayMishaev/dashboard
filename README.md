# Приложение «Dashboard Kit»
***
- [видеообзор](https://youtu.be/jy3fUkklad0)
- [приложение](https://dashboard-kit-2022.herokuapp.com)
- [макет](https://www.figma.com/file/mK4nf7Y0sBpQ9EpNOsBjHL/Figma-Admin-Dashboard-UI-Kit-(Free)-(Copy)?node-id=0%3A1)
- [задание 1](https://disk.yandex.ru/i/cZXOoG1fUWSdqw)
- [задание 2](https://disk.yandex.ru/i/Ehe_U5OPnJfaCw)

## Описание
- приложение для работы с тикетами
- данный репозиторий является копией [приватного](https://disk.yandex.ru/i/KlEoDlWg1hACtw), в котором были запушены ключи к Firebase

## Скриншоты
![диаграмма тикетов](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/04.jpg)
![отображение тикетов в виде списка](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/03.jpg)
![отображение тикетов в виде карточек](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/01.jpg)
![создание тикета](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/02.jpg)
![редактирование тикета](https://github.com/NikolayMishaev/dashboard_kit/raw/master/src/images/readme/05.jpg)

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
- уведомления о событиях, ошибках
- выбор тем
- лоадер
- адаптивная верстка

## Планы по доработке
- переписать сложную логику условий по принципу FSM
- добавить: 
  - localStorage
  - Redux Saga
  - инструменты мемоизации
  - HOCs
  - кастомные хуки
  - порталы
  - предохранители
  - react-helmet
  - доступность с клавиатуры
  - Skeleton
  - мобильную версию
  - деплой
