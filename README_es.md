# 📦 CLI Tool

## 📖 Índice

* [Acerca de](#acerca-de)
* [Comenzando](#comenzando)
* [Uso](#uso)
* [Licencia](#licencia)

---

## 🔹 Acerca de <a name="acerca-de"></a>

Una herramienta de línea de comandos desarrollada en **Node.js**, capaz de:

* Extraer (scraping) elementos de páginas web
* Filtrar archivos JSON
* Exportar datos a **CSV**, **Markdown** o **tabla**
* Ejecutar scripts externos en JavaScript

---

## ⚙️ Comenzando <a name="comenzando"></a>

Estas instrucciones permiten tener una copia del proyecto lista para desarrollo y pruebas.

### Requisitos previos

Debes tener instalado en tu máquina:

```
- Node.js (https://nodejs.org/) (v14 o superior)
- npm (incluido con Node.js)
- Para desarrollo se recomienda: Git (https://git-scm.com/) y VSCode (https://code.visualstudio.com/)
```

La herramienta depende de varios paquetes de Node.js como `ajv`, `arg`, `chalk`, `puppeteer`, entre otros. Estos se instalan automáticamente con npm.

### Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/CodeMasters12218/cli-tool.git
   ```
2. Entrar en el directorio del proyecto:

   ```bash
   cd <repo-folder>
   ```
3. Instalar dependencias:

   ```bash
   npm install
   ```
4. (Opcional) Enlazar la herramienta CLI de forma global:

   ```bash
   npm link
   ```
5. Ejecutar la herramienta:

   ```bash
   tool
   ```

---

## 🖥️ Uso <a name="uso"></a>

La herramienta soporta los siguientes comandos:

### 1. Fetch

Extraer elementos de una página web.

```bash
tool fetch <url> --selector <css> [--attr <atributo>] [--output <archivo>]
```

**Ejemplo:**

```bash
tool fetch https://example.com --selector "div.article" --attr href --attr title --output articulos.json
```

Esto obtiene todos los elementos `div.article` de la página, extrayendo sus atributos `href` y `title`, y guardándolos en `articulos.json`.

---

### 2. Transform

Filtrar y seleccionar campos de un archivo JSON.

```bash
tool transform <entrada.json> [--filter <filtro>] [--pick <campos>]
```

**Ejemplo:**

```bash
tool transform datos.json --filter "edad>30" --pick "nombre,email"
```

Esto filtra `datos.json` para incluir solo los registros donde `edad` es mayor que 30, y luego selecciona únicamente los campos `nombre` y `email`.

---

### 3. Export

Exportar un JSON a distintos formatos.

```bash
tool export <entrada.json> --format <formato>
```

* Formatos soportados: `csv`, `markdown`, `table`.

**Ejemplo:**

```bash
tool export datos.json --format csv
```

Esto exporta los datos de `datos.json` a formato CSV y los imprime en la consola.

---

### 4. Script

Ejecutar un archivo JavaScript externo con Node.js.

```bash
tool script run <script.js>
```

**Ejemplo:**

```bash
tool script run miScript.js
```

Esto ejecuta el archivo `miScript.js` usando Node.js.

---

## 📄 Licencia <a name="licencia"></a>

Este proyecto se distribuye bajo la **Licencia MIT** – consulta el archivo [LICENSE](./LICENSE) para más información.

---