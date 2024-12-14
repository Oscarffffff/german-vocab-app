let wordList = []; // 单词列表
let currentWordIndex = 0; // 当前单词索引
let random = false; // 是否随机抽取单词
let true_idx = []; // 映射当前的访问顺序

// 模拟 JSON 文件名列表
const jsonFiles = [
    'Einheit 5.json',
    'Einheit 6.json',
];

// 添加 JSON 文件名到下拉菜单
function populateFileSelector(files) {
    const fileSelector = document.getElementById('jsonFileSelect');
    files.forEach(file => {
        if (file.endsWith('.json')) { // 检查文件是否以 .json 结尾
            const option = document.createElement('option');
            option.value = file; // 保留完整文件名作为 value
            option.textContent = file.replace('.json', ''); // 去掉 .json 后缀
            fileSelector.appendChild(option);
        }
    });
}

// 获得真正的索引
function getTrueIndex() {
    return true_idx[currentWordIndex];
}

// Fisher-Yates 洗牌算法
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交换元素
    }
}

// 切换 Random 模式
function toggleRandom() {
    random = !random;
    const randomSwitch = document.getElementById('randomSwitch');
    randomSwitch.innerText = random ? 'Ein' : 'Aus';
    randomSwitch.classList.toggle('active', random);

    if (random) {
        // 随机模式：打乱索引数组
        shuffle(true_idx);
        console.log('Word list shuffled.');
    } else {
        // 非随机模式：恢复索引数组为顺序
        true_idx = [...Array(wordList.length).keys()];
        currentWordIndex = 0; // 重置到第一个单词
        console.log('Word list restored to original order.');
    }

    // 重置到第一个单词
    currentWordIndex = 0;
    showWord();
    updateProgressBar();
}

// 使用 async/await 动态加载指定的 JSON 文件
async function loadWordList(file = 'Einheit 5.json') { // 默认加载 Einheit 5.json 文件
    const filePath = `vocab/${file}`; // 拼接文件路径
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const wordList = await response.json(); // 动态解析 JSON 文件内容
        console.log(`Loaded ${filePath} successfully!`);
        return wordList; // 返回加载的内容
    } catch (error) {
        console.error(`Failed to load ${filePath}:`, error);
        return null; // 返回 null 表示加载失败
    }
}


// 在用户选择文件时调用
function loadSelectedFile(event) {
    const selectedFile = event.target.value; // 获取选中的文件名
    console.log('Selected file:', selectedFile);
    if (!selectedFile) return; // 如果未选择有效选项，直接返回

    console.log(`Loading file from vocab folder: ${selectedFile}`);
    loadWordList(selectedFile) // 加载选中的 JSON 文件
        .then(newWordList => {
            if (newWordList) {
                wordList = newWordList; // 更新单词列表

                // 重置相关应用状态
                currentWordIndex = 0; // 重置为第一个单词
                true_idx = [...Array(wordList.length).keys()]; // 更新映射索引为顺序

                // 更新界面显示
                showWord(); // 显示第一个单词
                updateProgressBar(); // 重置进度条
                console.log('Word list and application state updated.');
            } else {
                console.error('Failed to load file.');
            }
        })
        .catch(error => {
            console.error('Error loading file:', error);
        });
}


// 获取词库总单词数
function getTotalWords() {
    return wordList.length;
}

// 变音符号处理函数
function normalizeWord(input) {
    return input
        .toLowerCase()
        .trim()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss');
}

// 状态变量：是否已检查当前答案
let hasCheckedAnswer = false;
let attemptCount = 0; // 记录用户尝试次数

// 高亮句子中的当前单词
function highlightWord(sentence, word) {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi'); // 匹配单词边界
    return sentence.replace(regex, '<span class="highlight">$1</span>');
}

class WordChecker {
    constructor(feedbackElement, sentenceElement) {
        this.feedbackElement = feedbackElement; // 用于显示反馈的 DOM 元素
        this.sentenceElement = sentenceElement; // 用于显示句子的 DOM 元素
        this.attemptCount = 0; // 用户尝试次数
    }

    // 获取当前单词
    getCurrentWord() {
        const trueIndex = getTrueIndex();
        return wordList[trueIndex];
    }

    // 格式化单词输入
    normalizeWord(word) {
        return word
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/ä/g, 'ae')
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss');
    }

    // 获取正确答案
    getCorrectAnswer(word) {
        const correctWord = this.normalizeWord(word.word);
        if (word.gender === null) {
            return correctWord; // 无性别的单词
        }
        return `${word.gender} ${correctWord}`; // 有性别的单词
    }

    // 检查用户输入是否正确
    isCorrect(userInput, correctAnswer) {
        const formattedUserInput = this.normalizeWord(userInput);
        const formattedCorrectAnswer = this.normalizeWord(correctAnswer);
        return formattedUserInput === formattedCorrectAnswer;
    }

    // 显示句子并高亮单词
    showSentence(word) {
        const highlightedSentence = highlightWord(word.sentence, word.word);
        this.sentenceElement.innerHTML = `${highlightedSentence}`;
    }

    // 提供反馈信息
    provideFeedback(message, color) {
        this.feedbackElement.innerText = message;
        this.feedbackElement.style.color = color;
    }

    // 显示扩展信息（如复数或第三人称形式）
    showVariantInfo(word) {
        if (word.variant) {
            const variantFeedback = word.variant;
            const prefix = word.gender ? '📚' : '🔗';
            this.feedbackElement.innerText += `\n${prefix} ${variantFeedback}`;
        }
    }

    // 检查答案逻辑
    checkAnswer(userInput) {
        const currentWord = this.getCurrentWord();
        const correctAnswer = this.getCorrectAnswer(currentWord);

        if (this.isCorrect(userInput, correctAnswer)) {
            this.provideFeedback('Richtig! 🎉', 'green');
            this.showVariantInfo(currentWord);
            this.showSentence(currentWord);
            this.attemptCount = 0; // 重置尝试次数
            hasCheckedAnswer = true; // 设置状态
        } else {
            this.attemptCount += 1;
            if (this.attemptCount >= 3) {
                let feedback_message = `Falsch! Richtiges Wort: `;
                feedback_message += currentWord.gender ? `${currentWord.gender} ` : '';
                feedback_message += currentWord.word;
                this.provideFeedback(
                    feedback_message,
                    'red'
                );
                this.showVariantInfo(currentWord);
                this.showSentence(currentWord);
                this.attemptCount = 0; // 重置尝试次数
                hasCheckedAnswer = true; // 设置状态
            } else {
                this.provideFeedback(
                    `Falsch! Bitte erneut versuchen. (${this.attemptCount}/3)`,
                    'orange'
                );
                this.sentenceElement.innerText = ''; // 清空句子显示
            }
        }
    }
}

// 初始化 WordChecker
const wordChecker = new WordChecker(
    document.getElementById('feedback'),
    document.getElementById('sentence')
);

// 绑定检查逻辑
function checkAnswer() {
    const userInput = document.getElementById('userInput').value;
    wordChecker.checkAnswer(userInput);
}


// 更新进度条
function updateProgressBar() {
    const totalWords = getTotalWords();
    if (totalWords > 0) {
        const progress = ((currentWordIndex + 1) / totalWords) * 100; // 计算百分比
        document.getElementById('progress-bar').style.width = `${progress}%`;

        // 更新 progress-text 显示 current/total
        document.getElementById('progress-text').innerText = `${currentWordIndex + 1}/${totalWords}`;

        // console.log(`Progress updated to: ${progress}%`);
    } else {
        console.error("Cannot update progress bar: totalWords is 0.");
    }
}

// 显示下一个单词
function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % wordList.length;
    showWord();
    updateProgressBar();
    hasCheckedAnswer = false; // 重置状态
    attemptCount = 0; // 重置尝试次数
}

// 切换到上一个单词
function prevWord() {
    currentWordIndex = (currentWordIndex - 1 + wordList.length) % wordList.length; // 循环切换
    showWord(); // 显示当前单词
    updateProgressBar(); // 更新进度条
    hasCheckedAnswer = false; // 重置状态
    attemptCount = 0; // 重置尝试次数
}

// 显示当前单词
function showWord() {
    const word = wordList[getTrueIndex()]; // 获取当前单词
    document.getElementById('meaning').innerText = `中文释义: ${word.meaning}`; // 显示中文释义
    document.getElementById('userInput').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('sentence').innerText = ''; // 清空句子显示
}

// 绑定事件监听器
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('nextBtn').addEventListener('click', nextWord);

    // 监听输入框的回车事件
    document.getElementById('userInput').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (hasCheckedAnswer) {
                nextWord(); // 如果答案已检查，跳转到下一个单词
            } else {
                checkAnswer(); // 如果尚未检查，执行检查
            }
        }
    });

    // 显示第一个单词
    showWord();
});

// 初始化页面
document.addEventListener('DOMContentLoaded', async () => {
    const defaultWordList = await loadWordList(); // 加载默认文件
    wordList = defaultWordList; // 更新单词列表
    if (defaultWordList) {
        if (wordList.length > 0) {
            true_idx = [...Array(wordList.length).keys()]; // 初始化索引数组
            showWord(); // 显示第一个单词
            updateProgressBar(); // 初始化进度条和文本
        } else {
            console.error("Word list is empty!");
        }
    }

    // 添加随机模式切换按钮 
    document.getElementById('randomSwitch').addEventListener('click', toggleRandom);

    // 绑定按钮事件
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('nextBtn').addEventListener('click', nextWord);
    document.getElementById('prevBtn').addEventListener('click', prevWord);

    // 初始化 JSON 文件选择器
    populateFileSelector(jsonFiles);
    document.getElementById('jsonFileSelect').addEventListener('change', loadSelectedFile);
});
