---
tags:
  - status/done
  - project/short
  - priority/c
aliases: []
status: 🟩
priority: 🇨
category:
meta:
problem:
creator:
production:
url:
cover:
start: 2026-01-24T21:11:00+03:00
end:
created: 2026-01-24T21:11:00+03:00
updated: 2026-01-24T22:57:59+03:00
---

# Код формы

## Html
```html
<body>
    <form id="comments-form" autocomplete="off">
        <input type="text" name="name" placeholder="Введите ваше имя">
        <textarea name="comment" placeholder="Введите сообщение"></textarea>
        <div id="error"></div>
        <button type="button">Отправить</button>
    </form>

    <section class="comments">
        <h3>Комментарии (<span class="count-comm">0</span>) </h3>
        <div id="comments">
            Пока комментариев нет
        </div>
    </section>
    <script src="js/check.js"></script>
</body>
```

## CSS
```css
 * {
	 margin: 0;
	 padding: 0;
	 outline: none;
 }
 
 body {background: #fafafa}
 
 #comments-form,
 .comments {
	 width: 400px;
	 margin: 50px auto;
 }
 
#comments-form input,
#comments-form textarea {
	width: 100%;
	margin-bottom: 10px;
	padding: 15px 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 14px;
}

#comments-form textarea {
	resize: none;
	height: 100px;
}

#comments-form button {
	border-radius: 5px;
	border: 0;
	background: #e06149;
	padding: 10px 20px;
	font-size: 14px;
	color: #fff;
	cursor: pointer;
	transition: background .6s ease;
}

#comments-form button:hover {
	background: #333;
}

#error:not(:empty) {
    margin-bottom: 10px;
    font-size: 17px;
    font-weight: bold;
    color: #e06149;
}

.comments h3 {
	margin-bottom: 10px;
	color: #5d5d5d;
	
}

.comments h3 span {
	color: #e06149;
}

.comments .comment {
	width: 400px;
	background: #eee;
	border: 1px solid silver;
	border-radius: 5px;
	padding: 15px 20px;
	margin-bottom: 20px;
}

.comments .comment .delete {
	float: right;
	cursor: pointer;
	color: #e06149;
	font-weight: bold;
}

.comments .comment .delete:hover { color: #333}
.comments .comment .name {font-weight: bold}
.comments .comment .mess {margin-top: 10px;}
```

## JS
```js
let btnForm = document.querySelector("#comments-form button");
let countComments = 0;
let idComment = 0;

btnForm.onclick = function() {
	let form = document.querySelector("#comments-form");
	if (form.name.value.length < 4) {
		document.querySelector("#error").innerHTML = "Длина имени не менее 4 символов";
		return false;
	} else if (form.comment.value.length < 10) {
		document.querySelector("#error").innerHTML = "Длина сообщения не менее 10 символов";
		return false;
	}
	idComment++;
	
	document.querySelector("#error").innerHTML = "";
	if (countComments == 0) {
		document.querySelector("#comments").innerHTML = "";
	}
	countComments++;
	document.querySelector(".count-comm").innerHTML = countComments;
	
	let newComment = "<div class='comment' id='block-" + idComment + "'>" +
	"<span class='delete' onclick='delComm(" + idComment + ")'>&times;</span>" +
	 "<p class='name'>" + form.name.value + "</p>" +
	 "<p class='mess'>" + form.comment.value + "</p>" +
	  "</div>";
	  
	  document.querySelector("#comments")
	  .insertAdjacentHTML('afterbegin', newComment);
	  
	  
	  //Очистка формы
	  form.comment.value = "";
};

function delComm(id) {
	document.querySelector("#block-" + id).remove();
	
	countComments--;
	document.querySelector(".count-comm").innerHTML = countComments;
	
	if (countComments == 0) {
		document.querySelector("#comments").innerHTML = "Пока комментариев нет";
	}
}
```

# insertAdjacentHTML
```js
insertAdjacentHTML('afterbegin', newComment)
```
## Afterbegin
Вставляет текст в начало тега

## Beforeend
Вставляет текст в конец тега

# &times;
Делает крестик

# Удаление элемента
```js
document.querySelector(".class").remove();
```
