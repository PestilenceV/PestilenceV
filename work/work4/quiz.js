// Массив с данными викторины: каждый объект содержит вопрос, варианты ответов (с флагом correct) и объяснение
const quizData = [
    {
        question: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        answers: [
            { text: "Пол деревни, за раз", correct: false },
            { text: "Полдеревни, зараз", correct: true },
            { text: "Пол-деревни, за раз", correct: false }
        ],
        explanation: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом."
    },
    {
        question: "А эти слова как пишутся?",
        answers: [
            { text: "Капуччино и эспрессо", correct: false },
            { text: "Каппуччино и экспресо", correct: false },
            { text: "Капучино и эспрессо", correct: true }
        ],
        explanation: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо»."
    },
    {
        question: "Как нужно писать?",
        answers: [
            { text: "Черезчур", correct: false },
            { text: "Черес-чур", correct: false },
            { text: "Чересчур", correct: true }
        ],
        explanation: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур»."
    },
    {
        question: "Где допущена ошибка?",
        answers: [
            { text: "Аккордеон", correct: false },
            { text: "Белиберда", correct: false },
            { text: "Эпелепсия", correct: true }
        ],
        explanation: "Верно! Это слово пишется так: «эпИлепсия»."
    }
];

// Состояние игры: массивы и переменные для отслеживания прогресса
let shuffledQuestions = []; // Перемешанные вопросы
let currentQuestionIndex = 0; // Индекс текущего вопроса
let correctAnswersCount = 0; // Счётчик правильных ответов
let answeredQuestions = []; // Массив отвеченных вопросов для ревью
let isAnswering = false; // Флаг, чтобы предотвратить множественные клики во время ответа
let allQuestionsAnswered = false; // Флаг завершения викторины

// Функция инициализации викторины: перемешиваем вопросы и отображаем первый
function initQuiz() {
    shuffledQuestions = shuffleArray([...quizData]); // Копируем и перемешиваем массив вопросов
    displayNextQuestion(); // Отображаем следующий вопрос
}

// Функция перемешивания массива (Fisher-Yates shuffle)
function shuffleArray(array) {
    const newArray = [...array]; // Копируем массив
    for (let i = newArray.length - 1; i > 0; i--) { // Проходим по массиву с конца
        const j = Math.floor(Math.random() * (i + 1)); // Генерируем случайный индекс
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Меняем местами элементы
    }
    return newArray; // Возвращаем перемешанный массив
}

// Функция отображения следующего вопроса
function displayNextQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) { // Если вопросы закончились
        showEndMessage(); // Показываем сообщение о завершении
        return;
    }

    const questionData = shuffledQuestions[currentQuestionIndex]; // Получаем данные текущего вопроса
    const shuffledAnswers = shuffleArray(questionData.answers); // Перемешиваем ответы

    const quizArea = document.getElementById('quiz-area'); // Получаем область для вопросов

    const questionBlock = document.createElement('div'); // Создаём блок вопроса
    questionBlock.className = 'question-block'; // Добавляем класс
    questionBlock.dataset.questionIndex = currentQuestionIndex; // Сохраняем индекс

    const questionHeader = document.createElement('div'); // Создаём заголовок
    questionHeader.className = 'question-header'; // Добавляем класс

    const questionNumber = document.createElement('div'); // Создаём номер вопроса
    questionNumber.className = 'question-number'; // Добавляем класс
    questionNumber.textContent = `Вопрос ${currentQuestionIndex + 1}`; // Устанавливаем текст

    const questionText = document.createElement('div'); // Создаём текст вопроса
    questionText.className = 'question-text'; // Добавляем класс
    questionText.textContent = questionData.question; // Устанавливаем текст

    questionHeader.appendChild(questionNumber); // Добавляем номер в заголовок
    questionHeader.appendChild(questionText); // Добавляем текст в заголовок
    questionBlock.appendChild(questionHeader); // Добавляем заголовок в блок

    const answersContainer = document.createElement('div'); // Создаём контейнер ответов
    answersContainer.className = 'answers-container'; // Добавляем класс

    shuffledAnswers.forEach((answer, index) => { // Для каждого ответа
        const answerBlock = document.createElement('div'); // Создаём блок ответа
        answerBlock.className = 'answer-block'; // Добавляем класс
        answerBlock.textContent = answer.text; // Устанавливаем текст
        answerBlock.dataset.correct = answer.correct; // Сохраняем флаг правильности
        answerBlock.dataset.answerIndex = index; // Сохраняем индекс

        // Добавляем обработчик клика на ответ
        answerBlock.addEventListener('click', () => handleAnswerClick(answerBlock, questionData, questionBlock, questionHeader));

        answersContainer.appendChild(answerBlock); // Добавляем блок в контейнер
    });

    questionBlock.appendChild(answersContainer); // Добавляем контейнер в блок вопроса
    quizArea.appendChild(questionBlock); // Добавляем блок в область викторины

    currentQuestionIndex++; // Увеличиваем индекс
}

// Функция обработки клика на ответ
function handleAnswerClick(answerBlock, questionData, questionBlock, questionHeader) {
    if (isAnswering || questionBlock.classList.contains('answered')) { // Если уже отвечаем или вопрос отвечен
        return; // Выходим
    }

    isAnswering = true; // Устанавливаем флаг ответа
    questionBlock.classList.add('clicked'); // Добавляем класс кликнутого

    const isCorrect = answerBlock.dataset.correct === 'true'; // Проверяем правильность
    const allAnswers = questionBlock.querySelectorAll('.answer-block'); // Получаем все ответы

    // Создаём маркер ответа (зелёная галочка или красный крестик)
    const marker = document.createElement('span');
    marker.className = `marker ${isCorrect ? 'correct' : 'incorrect'}`;
    marker.textContent = isCorrect ? '✓' : '✗';
    questionHeader.appendChild(marker); // Добавляем маркер в заголовок

    if (isCorrect) { // Если ответ правильный
        correctAnswersCount++; // Увеличиваем счётчик
        answerBlock.classList.add('correct-selected'); // Добавляем класс правильного

        // Создаём объяснение
        const explanation = document.createElement('div');
        explanation.className = 'explanation show';
        explanation.textContent = questionData.explanation;
        answerBlock.appendChild(explanation); // Добавляем в блок ответа

        // Анимация неправильных ответов: уезжают вниз (соответствует варианту 3)
        setTimeout(() => {
            allAnswers.forEach((answer, index) => {
                if (answer !== answerBlock) {
                    // Добавляем задержку для поочерёдного ухода
                    setTimeout(() => {
                        answer.classList.add('move-down');
                    }, index * 300); // 300ms задержка между блоками
                }
            });
        }, 2000); // Ждём 2 секунды перед анимацией

        // Затухание правильного ответа
        setTimeout(() => {
            answerBlock.classList.add('fade-out');
        }, 2000 + (allAnswers.length - 1) * 300); // После анимации неправильных

        // Удаление ответов и отметка как отвеченного
        setTimeout(() => {
            allAnswers.forEach(answer => answer.remove());
            questionBlock.classList.add('answered');
            answeredQuestions.push({
                questionBlock: questionBlock,
                correctAnswer: answerBlock.textContent.replace(questionData.explanation, '').trim()
            });
            isAnswering = false;
            displayNextQuestion();
        }, 3000 + (allAnswers.length - 1) * 300); // Общая задержка

    } else { // Если ответ неправильный
        // Анимация всех ответов: уезжают вниз по очереди (соответствует варианту 3)
        allAnswers.forEach((answer, index) => {
            setTimeout(() => {
                answer.classList.add('move-down');
            }, index * 300); // Поочерёдно с задержкой 300ms
        });

        // Удаление ответов после анимации
        setTimeout(() => {
            allAnswers.forEach(answer => answer.remove());
            questionBlock.classList.add('answered');
            answeredQuestions.push({
                questionBlock: questionBlock,
                correctAnswer: questionData.answers.find(a => a.correct).text
            });
            isAnswering = false;
            displayNextQuestion();
        }, 1500 + (allAnswers.length - 1) * 300); // Общая задержка
    }
}

// Функция показа сообщения о завершении и статистики
function showEndMessage() {
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = 'Вопросы закончились'; // Выводим сообщение

    const statistics = document.getElementById('statistics'); // Получаем блок статистики
    statistics.innerHTML = `
        <h2>Результаты викторины</h2>
        <p>Правильных ответов: ${correctAnswersCount} из ${shuffledQuestions.length}</p>
        <p>Процент правильных ответов: ${Math.round((correctAnswersCount / shuffledQuestions.length) * 100)}%</p>
    `;
    statistics.classList.add('show'); // Показываем статистику

    allQuestionsAnswered = true; // Устанавливаем флаг завершения
    enableQuestionReview(); // Включаем ревью вопросов
}

// Функция включения ревью: клик на вопрос показывает правильный ответ
function enableQuestionReview() {
    answeredQuestions.forEach(item => { // Для каждого отвеченного вопроса
        const questionBlock = item.questionBlock; // Получаем блок
        const correctAnswer = item.correctAnswer; // Получаем правильный ответ

        questionBlock.style.cursor = 'pointer'; // Делаем курсор указателем
        questionBlock.classList.remove('clicked'); // Убираем класс кликнутого

        let finalAnswerDiv = questionBlock.querySelector('.final-answer-display'); // Ищем блок с ответом

        // Добавляем обработчик клика
        questionBlock.addEventListener('click', () => {
            // Скрываем ответы у других вопросов (чтобы показывался только один)
            answeredQuestions.forEach(otherItem => {
                const otherDiv = otherItem.questionBlock.querySelector('.final-answer-display');
                if (otherDiv && otherDiv !== finalAnswerDiv) {
                    otherDiv.classList.remove('show');
                }
            });

            // Создаём или переключаем видимость текущего ответа
            if (!finalAnswerDiv) {
                finalAnswerDiv = document.createElement('div');
                finalAnswerDiv.className = 'final-answer-display';
                finalAnswerDiv.textContent = `Правильный ответ: ${correctAnswer}`;
                questionBlock.appendChild(finalAnswerDiv);
            }

            if (finalAnswerDiv.classList.contains('show')) {
                finalAnswerDiv.classList.remove('show');
            } else {
                finalAnswerDiv.classList.add('show');
            }
        });
    });
}

// Запуск викторины при загрузке страницы
window.addEventListener('DOMContentLoaded', initQuiz);