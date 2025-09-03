# 📦 CLI Tool

## 📖 Table of Contents

* [About](#about)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [License](#license)

---

## 🔹 About <a name="about"></a>

A command-line tool built with **Node.js**, capable of:

* Scraping elements from web pages
* Filtering JSON files
* Exporting data to **CSV**, **Markdown**, or **table**
* Running external JavaScript scripts

---

## ⚙️ Getting Started <a name="getting-started"></a>

These instructions will help you get a copy of the project up and running for development and testing.

### Prerequisites

Make sure you have the following installed:

```
- Node.js (https://nodejs.org/) (v14 or higher)
- npm (bundled with Node.js)
- For development: Git (https://git-scm.com/) and VSCode (https://code.visualstudio.com/) are recommended
```

The tool depends on several Node.js packages such as `ajv`, `arg`, `chalk`, `puppeteer`, and others. These are installed automatically via npm.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CodeMasters12218/cli-tool.git
   ```
2. Enter the project directory:

   ```bash
   cd <repo-folder>
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. (Optional) Link the CLI tool globally:

   ```bash
   npm link
   ```
5. Run the tool:

   ```bash
   tool
   ```

---

## 🖥️ Usage <a name="usage"></a>

The CLI tool supports the following commands:

### 1. Fetch

Scrape elements from a web page.

```bash
tool fetch <url> --selector <css> [--attr <attribute>] [--output <file>]
```

**Example:**

```bash
tool fetch https://example.com --selector "div.article" --attr href --attr title --output articles.json
```

This command extracts all `div.article` elements from the page, retrieves their `href` and `title` attributes, and saves them to `articles.json`.

---

### 2. Transform

Filter and select fields from a JSON file.

```bash
tool transform <input.json> [--filter <filter>] [--pick <fields>]
```

**Example:**

```bash
tool transform data.json --filter "age>30" --pick "name,email"
```

This filters `data.json` to include only records where `age` is greater than 30, and then selects the `name` and `email` fields.

---

### 3. Export

Export JSON data to various formats.

```bash
tool export <input.json> --format <format>
```

* Supported formats: `csv`, `markdown`, `table`

**Example:**

```bash
tool export data.json --format csv
```

This exports the data in `data.json` to CSV format and prints it to the console.

---

### 4. Script

Run an external JavaScript file using Node.js.

```bash
tool script run <script.js>
```

**Example:**

```bash
tool script run myScript.js
```

This runs the `myScript.js` file using Node.js.

---

## 📄 License <a name="license"></a>

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.
