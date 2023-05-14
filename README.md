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
