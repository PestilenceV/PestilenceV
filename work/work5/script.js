/**
 * Ассоциативный массив для хранения данных после разбора строки
 * Ключи: a1, a2, ... (слова со строчной буквы), b1, b2, ... (слова с заглавной буквы), n1, n2, ... (числа)
 * Значения: соответствующие слова или числа
 */
let dataMap = {};

/**
 * Массив для хранения значений нажатых элементов в синей зоне
 * При клике на элемент в синей зоне его значение добавляется в этот массив
 */
let clickedValues = [];

/**
 * Переменная для хранения единого цвета всех элементов в синей зоне
 * Первый перетащенный элемент определяет цвет для всех последующих
 */
let dropColor = null;

/**
 * Получаем ссылки на основные DOM-элементы для работы с ними
 */
const inputField = document.getElementById('inputField');
const parseBtn = document.getElementById('parseBtn');
const elementsContainer = document.getElementById('elementsContainer');
const dropZone = document.getElementById('dropZone');
const displayArea = document.getElementById('displayArea');

/**
 * Переменные для отслеживания перетаскивания
 * draggedElement - элемент, который сейчас перетаскивается
 * dragSource - контейнер, из которого начали перетаскивание (block2 или dropZone)
 */
let draggedElement = null;
let dragSource = null;

/**
 * Функция для генерации случайного цвета в формате HEX
 * @returns {string} Случайный цвет в формате #RRGGBB
 */
function getRandomColor() {
    // Генерируем случайное число от 0 до 16777215 (FFFFFF в десятичной системе)
    // Преобразуем в шестнадцатеричную систему и дополняем нулями слева до 6 символов
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * Компаратор для сортировки ключей в порядке: сначала 'a', потом 'b', потом 'n'
 * Внутри каждой группы сортировка по числовой части
 * @param {string} a - Первый ключ для сравнения (например, "a1")
 * @param {string} b - Второй ключ для сравнения (например, "b2")
 * @returns {number} Отрицательное число, если a < b, положительное если a > b, 0 если равны
 */
function keyComparator(a, b) {
    // Извлекаем тип ключа (первый символ: 'a', 'b' или 'n')
    const typeA = a[0];
    const typeB = b[0];
    
    // Извлекаем числовую часть ключа
    const numA = parseInt(a.slice(1));
    const numB = parseInt(b.slice(1));
    
    // Если типы разные, сравниваем по типу
    if (typeA !== typeB) {
        return typeA.localeCompare(typeB);
    } else {
        // Если типы одинаковые, сравниваем по числовой части
        return numA - numB;
    }
}

/**
 * Добавляем обработчик события нажатия на кнопку "Разобрать"
 * При клике вызывается функция parseString
 */
parseBtn.addEventListener('click', parseString);

/**
 * Основная функция для разбора введенной строки
 * Разделяет строку на части, классифицирует их и создает ассоциативный массив
 */
function parseString() {
    // Получаем значение из поля ввода и удаляем лишние пробелы
    const inputValue = inputField.value.trim();

    // Проверяем, не пустая ли строка
    if (!inputValue) {
        alert('Введите строку для разбора!');
        return;
    }

    /**
     * Разделяем строку по тире (обычное и длинное) и очищаем от пробелов
     * Используем регулярное выражение /[-–]/ для обработки обоих типов тире
     */
    const parts = inputValue.split(/[-–]/).map(item => item.trim()).filter(item => item !== '');

    /**
     * Массивы для хранения разных типов данных:
     * wordsLowercase - слова, начинающиеся со строчной буквы (ключи "a")
     * wordsUppercase - слова, начинающиеся с заглавной буквы (ключи "b")
     * numbers - числа (ключи "n")
     */
    const wordsLowercase = [];
    const wordsUppercase = [];
    const numbers = [];

    /**
     * Проходим по всем частям строки и классифицируем их
     */
    parts.forEach(part => {
        // Проверяем, является ли часть числом
        if (!isNaN(part) && part !== '') {
            // Это число - преобразуем к числовому типу и добавляем в массив
            numbers.push(parseInt(part));
        } else {
            // Это слово - проверяем первую букву
            if (part.length > 0) {
                // Если первая буква заглавная (в верхнем регистре)
                if (part[0] === part[0].toUpperCase()) {
                    // Слово с заглавной буквы -> ключ "b"
                    wordsUppercase.push(part);
                } else {
                    // Слово со строчной буквы -> ключ "a"
                    wordsLowercase.push(part);
                }
            }
        }
    });

    /**
     * Сортируем слова со строчной буквой по алфавиту
     * Используем localeCompare для правильной сортировки русских букв
     */
    wordsLowercase.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase(), 'ru'));

    /**
     * Сортируем слова с заглавной буквой по алфавиту
     */
    wordsUppercase.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase(), 'ru'));

    /**
     * Сортируем числа по возрастанию
     */
    numbers.sort((a, b) => a - b);

    /**
     * Создаем или очищаем ассоциативный массив
     */
    dataMap = {};

    /**
     * Заполняем ключи a1, a2, a3... для слов со строчной буквы
     * Используем forEach для итерации по массиву с доступом к индексу
     */
    wordsLowercase.forEach((word, index) => {
        const key = 'a' + (index + 1);  // Создаем ключ вида "a1", "a2" и т.д.
        dataMap[key] = word;            // Сохраняем слово по этому ключу
    });

    /**
     * Заполняем ключи b1, b2, b3... для слов с заглавной буквы
     */
    wordsUppercase.forEach((word, index) => {
        const key = 'b' + (index + 1);  // Создаем ключ вида "b1", "b2" и т.д.
        dataMap[key] = word;            // Сохраняем слово по этому ключу
    });

    /**
     * Заполняем ключи n1, n2, n3... для чисел
     */
    numbers.forEach((num, index) => {
        const key = 'n' + (index + 1);  // Создаем ключ вида "n1", "n2" и т.д.
        dataMap[key] = num;             // Сохраняем число по этому ключу
    });

    // Выводим получившийся массив в консоль для отладки
    console.log('Data Map:', dataMap);

    /**
     * Очищаем зоны для нового набора данных
     */
    dropZone.innerHTML = '';           // Очищаем синюю зону
    dropColor = null;                  // Сбрасываем единый цвет для синей зоны
    clickedValues = [];                // Очищаем массив нажатых значений
    // Восстанавливаем подсказку в красной области
    displayArea.innerHTML = '<span class="hint">Нажмите на элемент<br>в синем блоке</span>';

    /**
     * Отображаем элементы в левой панели (блок 2)
     */
    displayElements();
}

/**
 * Функция для отображения элементов в блоке 2
 * Создает элементы на основе данных из ассоциативного массива
 */
function displayElements() {
    // Очищаем контейнер перед добавлением новых элементов
    elementsContainer.innerHTML = '';

    // Получаем ключи из ассоциативного массива и сортируем их
    const sortedKeys = Object.keys(dataMap).sort(keyComparator);

    /**
     * Для каждого ключа создаем перетаскиваемый элемент
     */
    sortedKeys.forEach(key => {
        // Создаем элемент с ключом и значением
        const element = createDraggableElement(key, dataMap[key], 'block2');
        
        // Генерируем и сохраняем уникальный цвет для элемента
        element.dataset.originalColor = getRandomColor();
        element.style.background = element.dataset.originalColor;
        
        // Добавляем элемент в контейнер
        elementsContainer.appendChild(element);
    });
}

/**
 * Функция для создания перетаскиваемого элемента
 * @param {string} key - Ключ элемента (например, "a1")
 * @param {string|number} value - Значение элемента
 * @param {string} source - Источник элемента ('block2' или 'dropZone')
 * @returns {HTMLElement} Созданный DOM-элемент
 */
function createDraggableElement(key, value, source = 'block2') {
    // Создаем новый div-элемент
    const div = document.createElement('div');
    
    // Добавляем CSS-классы
    div.className = 'element';
    
    // Делаем элемент перетаскиваемым
    div.draggable = true;
    
    // Устанавливаем текст элемента в формате "ключ значение"
    div.textContent = `${key} ${value}`;
    
    // Сохраняем данные в атрибутах dataset для последующего использования
    div.dataset.key = key;
    div.dataset.value = value;
    div.dataset.source = source; // Отслеживаем, откуда элемент
    
    // Добавляем обработчики событий для drag and drop
    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragend', handleDragEnd);
    
    return div;
}

/**
 * Обработчик начала перетаскивания элемента
 * @param {DragEvent} e - Событие перетаскивания
 */
function handleDragStart(e) {
    // Сохраняем ссылку на перетаскиваемый элемент
    draggedElement = e.target;
    
    // Сохраняем источник элемента (контейнер, из которого перетаскиваем)
    dragSource = e.target.parentElement;
    
    // Устанавливаем разрешенный эффект перетаскивания
    e.dataTransfer.effectAllowed = 'move';
    
    // Сохраняем данные элемента для передачи при перетаскивании
    e.dataTransfer.setData('key', e.target.dataset.key);
    e.dataTransfer.setData('value', e.target.dataset.value);
    e.dataTransfer.setData('originalColor', e.target.dataset.originalColor);
    
    // Добавляем визуальный эффект при перетаскивании
    e.target.classList.add('dragging');
    
    // Обновляем источник элемента в dataset
    e.target.dataset.source = dragSource === elementsContainer ? 'block2' : 'dropZone';
}

/**
 * Обработчик завершения перетаскивания элемента
 * @param {DragEvent} e - Событие перетаскивания
 */
function handleDragEnd(e) {
    // Убираем визуальный эффект перетаскивания
    e.target.classList.remove('dragging');
}

/**
 * Настройка обработчиков событий для синей зоны перетаскивания (dropZone)
 */

// Разрешаем перетаскивание над зоной
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение браузера
    e.dataTransfer.dropEffect = 'move'; // Устанавливаем тип операции
    dropZone.classList.add('drag-over'); // Добавляем визуальный эффект
});

// Убираем визуальный эффект при уходе из зоны
dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

/**
 * Обработчик события "бросания" элемента в синюю зону
 * @param {DragEvent} e - Событие перетаскивания
 */
dropZone.addEventListener('drop', (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение браузера
    dropZone.classList.remove('drag-over'); // Убираем визуальный эффект

    // Извлекаем данные из перетаскиваемого элемента
    const key = e.dataTransfer.getData('key');
    const value = e.dataTransfer.getData('value');
    const originalColor = e.dataTransfer.getData('originalColor');

    // Удаляем элемент из источника (если он был видимым элементом DOM)
    if (draggedElement) {
        draggedElement.remove();
    }

    /**
     * Устанавливаем единый цвет для всех элементов в синей зоне
     * Если это первый элемент в зоне, генерируем случайный цвет
     * Все последующие элементы получат этот же цвет
     */
    if (dropColor === null) {
        dropColor = getRandomColor();
    }

    /**
     * Создаем новый элемент в синей зоне
     * Используем источник 'dropZone' для отслеживания
     */
    const newElement = createDraggableElement(key, value, 'dropZone');
    newElement.dataset.originalColor = originalColor; // Сохраняем исходный цвет
    newElement.style.background = dropColor; // Устанавливаем единый цвет зоны

    /**
     * Позиционируем элемент в точке, где его "бросили"
     * Получаем координаты зоны относительно окна браузера
     */
    const rect = dropZone.getBoundingClientRect();
    
    // Вычисляем координаты относительно зоны
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    /**
     * Устанавливаем позицию элемента с учетом его размера
     * Центрируем элемент относительно точки, где его бросили
     * Math.max(0, ...) предотвращает отрицательные координаты
     */
    newElement.style.left = Math.max(0, x - newElement.offsetWidth / 2) + 'px';
    newElement.style.top = Math.max(0, y - newElement.offsetHeight / 2) + 'px';

    // Добавляем элемент в синюю зону
    dropZone.appendChild(newElement);

    /**
     * Обновляем цвет всех элементов в синей зоне до единого цвета
     * Это гарантирует, что все элементы в зоне будут одного цвета
     */
    Array.from(dropZone.children).forEach(child => {
        if (child.classList.contains('element')) {
            child.style.background = dropColor;
        }
    });

    // Добавляем обработчик клика на новый элемент
    newElement.addEventListener('click', handleDropZoneElementClick);
});

/**
 * Настройка обработчиков событий для контейнера элементов (блок 2)
 * Чтобы можно было возвращать элементы из синей зоны обратно
 */

// Разрешаем перетаскивание над контейнером
elementsContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
});

/**
 * Обработчик события "бросания" элемента обратно в блок 2
 * @param {DragEvent} e - Событие перетаскивания
 */
elementsContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    // Извлекаем данные из перетаскиваемого элемента
    const key = e.dataTransfer.getData('key');
    const value = e.dataTransfer.getData('value');
    const originalColor = e.dataTransfer.getData('originalColor');

    // Удаляем элемент из синей зоны, если он оттуда
    if (draggedElement && draggedElement.parentElement === dropZone) {
        draggedElement.remove();
    }   

    /**
     * Создаем новый элемент для блока 2
     * Возвращаем ему исходный цвет
     */
    const newElement = createDraggableElement(key, value, 'block2');
    newElement.dataset.originalColor = originalColor;
    newElement.style.background = originalColor;

    /**
     * Собираем все элементы из контейнера, добавляем новый
     * и сортируем по ключам в правильном порядке
     */
    const elements = Array.from(elementsContainer.children);
    elements.push(newElement);
    
    // Сортируем элементы по ключам
    const sorted = elements.sort((elA, elB) => 
        keyComparator(elA.dataset.key, elB.dataset.key)
    );

    // Очищаем контейнер и добавляем отсортированные элементы
    elementsContainer.innerHTML = '';
    sorted.forEach(el => elementsContainer.appendChild(el));

    /**
     * Если в синей зоне не осталось элементов:
     * - Очищаем массив нажатых значений
     * - Восстанавливаем подсказку в красной области
     */
    if (dropZone.children.length === 0) {
        clickedValues = [];
        displayArea.innerHTML = '<span class="hint">Нажмите на элемент<br>в синем блоке</span>';
    }
});

/**
 * Обработчик клика на элемент в синей зоне
 * Добавляет значение элемента в массив и отображает все накопленные значения
 * @param {MouseEvent} e - Событие клика мыши
 */
function handleDropZoneElementClick(e) {
    // Предотвращаем всплытие события, чтобы не срабатывали другие обработчики
    e.stopPropagation();
    
    // Получаем значение из dataset элемента
    const value = e.currentTarget.dataset.value;

    // Добавляем значение в массив нажатых значений
    clickedValues.push(value);

    // Отображаем все накопленные значения через пробел
    displayArea.innerHTML = `<span class="display-text">${clickedValues.join(' ')}</span>`;
}

/**
 * Инициализация при загрузке страницы
 * Устанавливаем значение по умолчанию в поле ввода
 */
window.addEventListener('load', () => {
    inputField.value = 'лес - бочка - 20 – бык - крик - 3 -Бок';
});