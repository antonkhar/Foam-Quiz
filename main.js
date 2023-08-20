const questions = [
	{
		question: "Какой атрибут обязан быть у каждого уважающего себя любителя пива?",
		answers: ["Пивные ножки", "Пивные глазки", "Пивной животик", "Пивные ягодицы"],
		correct: 3,
	},
	{
		question: "Существующий сорт пива?",
		answers: [
			"Лагер", "Лагерь", "Зона", "Хата",],
		correct: 1,
	},
	{
		question: 'Особенность "живого" пива в том, что оно ...',
		answers: [
			"Варится из живой церковной воды", "Не подвергается пастеризации", "Имеет сильную газацию", "Имеет высокую крепость",],
		correct: 2,
	},
	{
		question: "Какой сорт пива существует?",
		answers: ["Бельгийский крик", "Шотландский визг", "Российский вой", "Румынский писк"],
		correct: 1,
	},
	{
		question: "Ключевое отличие фруктового сидра от пунша заключается в ...",
		answers: ["Добавлении фруктового сока в сидровый напиток", "Плотности экстрактивного сусла", "Крепости итогового напитка", "Производстве сидра на основе брожения фруктов"],
		correct: 4,
	},
	{
		question: "Нормальное давление в системе розлива пива составляет ...",
		answers: ["Около 1 атмосферы", "Около 2 атмосфер", "Около 4 атмосфер", "Около 5 атмосфер"],
		correct: 2,
	},
	{
		question: "Процесс пастеризации пива представляет собой ...",
		answers: ["Добавление солода", "Фильтрацию", "Нагревание до определённой температуры", "Охлаждение до определённой температуры"],
		correct: 3,
	},
	{
		question: "Сорт APA расшифровывается как ...",
		answers: ["Australian pale ale", "American pale ale", "Astrakhan pale ale", "Anton prefer ananas"],
		correct: 2,
	},
	{
		question: "Характеристика IBU в пиве отражает ...",
		answers: ["Крепость", "Сладость", "Плотность", "Горечь"],
		correct: 4,
	},
	{
		question: "Сорт IPA расшифровывается ...",
		answers: ["Indian pale ale", "Irish pale ale", "Iceland pale ale", "I prefer anal"],
		correct: 1,
	},
];

//Элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit')

// Переменные
let score = 0;
let questionIndex = 0;
const headerTemplate = `<h2 class="title">%title%</h2>`
const questionTemplate = `<li><label><input type="radio" value="%number%" class="answer" name="answer" /><span> %answer% </span></label></li>`
const resultsTemplate = `<h2 class="title">%title%</h2> <h3 class="summary">%message%</h3> <p class="result">%result%</p>`


showStartPage();
// clearPage();
// showQuestion();

function clearPage () {

	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion () {

	headerContainer.innerHTML = headerTemplate.replace('%title%', questions[questionIndex].question);

	for ([index, item] of questions[questionIndex].answers.entries()){
		const text = questionTemplate.replace('%number%', index + 1)
		listContainer.innerHTML += text.replace('%answer%', item)
	}
}

function chekAnswer () {

	activeButton = listContainer.querySelector('input:checked')

	if(activeButton == null) {
		return
	}
	else if (activeButton.value == questions[questionIndex].correct) {
		console.log('true');
		score++;
	}
	else {
		console.log('false');
	}

	if(!(questions.length == questionIndex + 1)) {
		questionIndex++;
		clearPage();
		showQuestion();
	}
	else {
		showResults();
	}
}

function showResults() {

	submitButton.innerText = 'Начать заново'
	submitButton.onclick = () => history.go();
	clearPage();
	const title = 'Викторина окончена!';
	const result = score / questions.length * 100 + '%'
	let message = '';

	if(score / questions.length * 100 == 100) {
		message = 'Ты абсолютно точно значешь ответы на все вопросы! Ты не списывал? 🙃';
	}
	else if (score / questions.length * 100 >= 70) {
		message = 'Ух ты! А ты хорошо разбираешься в вопросе! 👍';
	}
	else if (score / questions.length * 100 >= 50) {
		message = 'Неплохой результат, но в будущем нужно стараться лучше 💗';
	}
	else if (score / questions.length * 100 >= 25) {
		message = 'Ну, по крайней мере ты не худший! 🙉';
	}
	else if (score / questions.length * 100 >= 1) {
		message = 'Тебе точно стоит подучиться... 😥';
	}
	else {
		message = 'Ты же специально отвечал неправильно, да? 😓';
	}
	text = resultsTemplate.replace('%title%', title);
	text = text.replace('%message%', message);
	text = text.replace('%result%', result);
	headerContainer.innerHTML = text;

}

function showStartPage() {
	clearPage();
	submitButton.innerText = 'Начать викторину'
	submitButton.onclick = () => {
		clearPage();
		showQuestion();
		submitButton.onclick = () => chekAnswer();
		submitButton.innerText = 'Ответить'
		console.log('page')
	};
	const title = 'Пивная викторина! 🍺';
	const result = 'Удачи в прохождении!'
	const message = 'Считаете себя пивным экспертом? Проверим, действительно ли все вы знаете о пиве';
	text = resultsTemplate.replace('%title%', title);
	text = text.replace('%message%', message);
	text = text.replace('%result%', result);
	headerContainer.innerHTML = text;
}