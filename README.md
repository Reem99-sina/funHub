# 🌐 FunSites - Explore Cool and Entertaining Websites

This project is a **React web app** that displays a collection of fun, creative, and interesting websites.  
The data is dynamically fetched from a **Google Sheets CSV file** using the **Papa Parse** library.

---

## 🚀 Features

- 🌍 **Multi-language support (Arabic & English)** using `react-i18next`
- 📱 **Fully responsive design**
- 🧭 **Dynamic routing** with `react-router-dom`
- 📊 **External data loading** from Google Sheets
- 🧩 Organized structure with reusable components (Header, Footer, Pages)
- 💫 Clean and modern UI using Tailwind CSS (optional if used)

---


## 🧰 Technologies Used

- ⚛️ **React 18**
- 🗺️ **React Router DOM**
- 🌐 **i18next** for translations
- 📄 **Papa Parse** for reading CSV data
- 💅 **Tailwind CSS** (if used)
- 🧱 **GoDaddy Hosting** (for deployment)

---

## 🔗 Data Source

The app fetches website data from a public **Google Sheets CSV link**:

```js
const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXG7jJEtrf5sNk3HN_-h06xnPAXqKnuTFK0t99VxQ-QKub2f06ImbwxLgqxsuEaHHQINbu2IWfsPKU/pub?gid=0&single=true&output=csv";
