# 📚 german-vocab-app (German Vocabulary Memorization Assistant)

A lightweight and customizable **German vocabulary web application** to help you or your friends efficiently memorize German words, including their gender, plural forms, Chinese meanings, and example sentences.

**This software can be easily adapted into a vocabulary memorization tool for other languages by simply replacing the vocabulary files!**

## 🌐 Project Links

- Demo: [https://Oscarffffff.github.io/german-vocab-app/](https://Oscarffffff.github.io/german-vocab-app/)
- Repository: [https://github.com/Oscarffffff/german-vocab-app](https://github.com/Oscarffffff/german-vocab-app)

## 🚀 Features

- **Word Testing**:  
  - Provides Chinese meanings, and the user must input the correct German word (including hints for diacritics).  
  - Supports displaying additional information such as plural forms and third-person singular variations.

- **Random and Sequential Modes**:  
  - Switch between **random mode** and **sequential mode** to meet different practice needs.

- **Custom Vocabulary with JSON Files**:  
  - Store custom word lists (`.json` files) in the `vocab` folder.  
  - Each vocabulary file can be selected and loaded via a dropdown menu.

- **Feedback on Incorrect Attempts**:  
  - After 3 incorrect inputs, the correct answer and example sentence are automatically displayed.

## 🗂️ File Structure

```plaintext
📂 german-vocab-app
│
├── 📁 vocab/              # Vocabulary folder containing JSON files
│   ├── Einheit 5.json     # Example word list file
│   └── Einheit 6.json     # Additional word list files
│
├── index.html             # Main HTML file
├── style.css              # Stylesheet file
├── script.js              # Logic and functionality implementation
└── README.md              # Project documentation file
```

## 🔧 Running Locally

1. **Download the Project Code**:

   ```bash
   git clone https://github.com/Oscarffffff/german-vocab-app.git
   cd german-vocab-app
   ```

2. **Run the Project**:

   - Use the **Live Server** extension in VSCode to open `index.html`.  
   - Or simply open `index.html` in your browser.

3. **Add Custom Vocabulary**:

   - Place your custom JSON files into the `vocab` folder.

   - Modify the `jsonFiles` variable in `script.js` to include the names of your custom JSON files.  
     JSON file format example:

     ```json
     [
        {
          "word": "Apfel",
          "gender": "der",
          "meaning": "apple",
          "sentence": "Der Apfel ist rot.",
          "variant": "Äpfel"
        },
        {
          "word": "schauen",
          "gender": null,
          "meaning": "to watch",
          "sentence": "Ich schaue den Film.",
          "variant": "schaut"
        }
      ]
     ```
  - **Field Descriptions**:  
    - `word`: Base form of the word  
    - `gender`: Word gender (`null` if not applicable)  
    - `meaning`: Chinese meaning  
    - `sentence`: Example sentence  
    - `variant`: Plural form or verb conjugation

## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---

# 📚 德语单词助手

一个轻量级、可自定义的 **德语单词背诵 Web 应用**，帮助您或朋友高效记忆德语单词，包括单词的阴阳性、复数、中文释义及示例句子。

 - **本软件可以轻松改写成其他语言的单词记忆工具，仅需替换词库文件！**
 - **示例json内的单词来自《新编大学德语》第一册的第五、六、七章内容，希望能帮助到各位正在修读德语课的同学~**

## 🌐 项目链接

- Demo: https://Oscarffffff.github.io/german-vocab-app/
- Repo: https://github.com/Oscarffffff/german-vocab-app

## 🚀 功能简介

- **单词测试**：
  - 提供中文释义，用户需输入正确的德语单词（包含变音符号提示）。
  - 支持复数形式、第三人称单数等扩展信息的展示。

- **随机与顺序模式**：
  - 可切换 **随机模式** 和 **顺序模式**，满足不同的练习需求。

- **JSON 文件自定义词库**：
  - 在 `vocab` 文件夹中存放自定义的单词列表（`.json` 文件）。
  - 每个词库文件可通过下拉菜单选择加载。

- **错误次数反馈**：
  - 错误输入次数达到 3 次时，自动显示正确答案和示例句子。

## 🗂️ 文件结构

```plaintext
📂 german-vocab-app
│
├── 📁 vocab/              # 词库文件夹，存放 JSON 文件
│   ├── Einheit 5.json     # 示例单词列表文件
│   └── Einheit 6.json     # 更多单词列表文件
│
├── index.html             # 主页面文件
├── style.css              # 页面样式文件
├── script.js              # 页面逻辑与功能实现
└── README.md              # 项目说明文件
```

## 🔧 本地运行

1. **下载项目代码**：

   ```bash
   git clone https://github.com/Oscarffffff/german-vocab-app.git
   cd german-vocab-app
   ```

2. **运行项目**：

   - 使用 VSCode 的 **Live Server** 插件运行 `index.html`。
   - 或直接用浏览器打开 `index.html`。

3. **添加自定义词库**：

   - 将自定义的 JSON 文件放入 `vocab` 文件夹。

   - 修改 `script.js` 的 `jsonFiles` 变量，增加自定义的 `json` 文件名。 `json` 文件格式：

     ```json
     [
        {
          "word": "Apfel",
          "gender": "der",
          "meaning": "苹果",
          "sentence": "Der Apfel ist rot.",
          "variant": "Äpfel"
        },
        {
          "word": "schauen",
          "gender": null,
          "meaning": "看",
          "sentence": "Ich schaue den Film.",
          "variant": "schaut"
        }
      ]
     ```
  - `word`: 单词原形
  - `gender`: 单词的阴阳性（若无，设为 `null`）
  - `meaning`: 中文释义
  - `sentence`: 示例句子
  - `variant`: 复数形式或动词变位
    
## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.
