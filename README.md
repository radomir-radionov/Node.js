### task 1 (translate verse)

Делаем перевод нашего любимого стиха.

- Нужно считать стих Лермонтова построчно с помощью readline(как в предыдущем занятии)
- Перевести каждую строку на английский и китайские языки
- И записать с помощью Write stream в файлы en.translate.txt и cn.translate.txt соответственно.

Для перевода можете использовать пакет https://www.npmjs.com/package/free-translate (проверил, он работает на обоих языках).  
Также можете посмотреть на https://github.com/extensionsapp/translatte (не проверял работат ли)

```
npm run translate

```

### task 2 (converte to gzip)

Напишите программу которая принимает в себя два пути, первый путь к файлу(например видео или аудио).  
И второй путь, на папку куда нужно положить результат с постфиксом .zip.
Можете использоваться .env / process argv или  
синтаксис "INPUT_PATH=c:\\users\Valera\video.mp4 OUTPUT_PATH=\_PATH=c:\\users\Valera\ node index.js"
Программа создает zip архив.
Хотелось бы чтобы работало например следующим образом:  
"INPUT_PATH=/Users/va/videos/meme.mp4 OUTPUT_PATH=/Users/va/videos/ node index.js"
В папке /Users/va/videos/ должен создаться meme.zip, который должен быть упакованным зип архивом,  
распаковаться должен обратно в mp4 видео.
Убедитесь что meme.zip весит как минимум на 20% меньше чем оригинальный файл.
Некоторые файлы пакуются очень эффективно, некоторые менее. Зависит от формата хранения данных.

Подсказки:

- Почитайте документацию https://nodejs.org/dist/latest-v16.x/docs/api/zlib.html#zlib
- Почитайте https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#readablepipedestination-options

```
npm run convert

```

### task 3 (extract music from youtube video)

Задача: написать программу для извлечения музыки из ссылок на ютуб видео и сохранения музыки в желаемой директории
