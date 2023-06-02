## task

Доработать пред идеи но исп REST Api подход

### часть 1

добавить новый REST ресурс "/user"  
- GET /user/:id - получение юзера по idи всех его питомцев, это должен быть массив pets  
- GET /user - получение всех юзеров  
- POST /user - создание нового юзера  
- PUT /user - изменение данных юзера  
- DELETE /user - удаление зера и отвязка от всех его питомцев от одного человека, ownerid котиков должен выстывлен null когда удалили владельца  

### часть 2

добавить возможность методами POST & PUT у котиков устанавливать после ownerid ждя связи с человеком. Прежде чем связать, убедитесь что человек с таким id существует

совет разбивайте код на зоны ответственности и  описывайте  всё по шагам например:  
1 получение  юзеров и ищем гужного по id  
2 если не нашли кидаем 404 ошибку  
3 получение всех котиков и фильтруем котиков по условию cats.filter(cat => cat.ownerid === user.id)  
4 отфилитрованный котиков добавляем в user.pets  
5 возвращаем юзера с питомцами

### my example

GET => Cats => http://127.0.0.1:3000/cat  
GET => CatById => http://127.0.0.1:3000/cat/13a9c017-5ee2-4a2e-84d2-b75ffeddfd39  
POST => POST Cat => http://127.0.0.1:3000/cat  
{  
"name": "1",  
"image": "1"  
}

PUT => PUT Cat => http://127.0.0.1:3000/cat/2bf89aa5-07e3-477c-b4f2-d07fb379f5ec

{  
"image": "1",  
"name": "2"
}

PUT => Cat addOwner => http://127.0.0.1:3000/cat/13a9c017-5ee2-4a2e-84d2-b75ffeddfd39/addOwner

{ "id": "98e0ca72-0c72-48e1-ac67-b45e931e340a" }

DELETE => DELETE Cat => http://127.0.0.1:3000/cat/9b9bb3d2-7eb0-4e16-81a3-da76453000c7

GET => GET USERS => http://127.0.0.1:3000/user  
GET => GET UserById => http://127.0.0.1:3000/user/13a9c017-5ee2-4a2e-84d2-b75ffeddfd3911211  
POST => POST USER => http://127.0.0.1:3000/user

{
"name": "1",
"image": "12"
}

PUT => PUT User => http://127.0.0.1:3000/user/13a9c017-5ee2-4a2e-84d2-b75ffeddfd3911211

{
"image": "3",
"name": "4"
}

DELETE => DELETE User =>
