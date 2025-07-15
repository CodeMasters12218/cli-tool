# cli-tool

## Table of Contents
+ [About](#about)
+ [Getting Started](#getting_started)
+ [Usage](#usage)

## About <a name = "about"></a>
A simple command line tool built using node.js that is capable of doing scraping, filtering JSON files, exporting them to CSV, table or Markdown and running external scripts.

## Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites

You need to have the following installed on your machine:

```
- Node.js (https://nodejs.org/) (v14 or higher)
- npm (bundled with Node.js)
- For development, it's recommended to have Git (https://git-scm.com/) and an IDE like VSCode (https://code.visualstudio.com/)
```

The tool also depends on several Node packages including 'ajv', 'arg', 'chalk', 'puppeteer' and others. These will be installed via npm.

### Installing

Follow these steps to get the development environment set up and run the CLI tool locally:

### 1. Clone the repository

```
git clone https://github.com/CodeMasters12218/cli-tool.git
```

### 2. Navigate into the project directory:

```
cd <repo-folder>
```

### 3. Install dependencies:

```
npm install
```
### 4. (Optional) Link the CLI tool globally on your machine:

```
npm link
```

### 5. Run the CLI tool:

```
tool
```

### Usage Example

Run an external script using the CLI tool:

```
tool script run myscript.js
```

This command runs the specified external script ('myscript.js').

## Usage <a name = "usage"></a>

The CLI tool supports the following commands:

### 1. Fetch

Scrape elements from a webpage using a CSS selector.

```
tool fetch <url> --selector <css> [--attr <attribute>] [--output <file>]
```

- ```<url>```: The URL to scrape data from.
- ```<--selector>```: CSS selector for elements to fetch (required).
- ```<--attr>```: Optional attribute(s) to extract from each element. Can be repeated.
- ```<--output>```: Optional output JSON file to save the result.

### Example:

```
tool fetch https://example.com --selector "div.article" --attr href --attr title --output articles.json
```
This fetches all  ```div.article``` elements from the page, extracting their  ```href``` and  ```title``` attributes, then saves the results to ```articles.json```.

### 2. Transform

Filter and pick fields from a JSON file.

```
tool transform <input.json> [--filter <filter>] [--pick <fields>]
```

- ```<input.json>```: Path to the JSON file to transform (required).
- ```--filter```: A filter expression, e.g. ``` age>30 ```.
- ```--pick```: Comma-separated list of fields to keep, e.g. ```name,email```.

### Example:

```
tool transform data.json --filter "age>30" --pick "name,email"
```

This filters ```data.json``` to include only records where ```age``` is greater than 30, then picks only the name and email fields from each.

### 3. Export

Export JSON data into different formats.

```
tool export <input.json> --format <format>
```

- ```<input.json>```: Path to the JSON file to export (required).
- ```--format```: Output format, one of ```csv```, ```markdown``` or ```table``` (required).

### Example:

```
tool export data.json --format csv
```

This exports the JSON data into CSV format and prints it to the console.

### 4. Script

Run an external JavaScript file using Node.js.

```
tool script run <script.js>
```

- ```<script.js>```: Path to the JavaScript file to run (required).

### Example:

```
tool script run myscript.js
```

Runs the ````myscript.js``` file with Node.js.

