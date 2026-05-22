const site_project = 'https://api.github.com/repos/Venicck/venicck.github.io';
let footer_base = "";

const article_baseHTML = `<a href="{url}" class="item" target="_blank" rel="noopener noreferrer">
                <img src="{thumbnail}" alt="" class="cover">
                <div class="title">{title}</div>
            </a>`

function to(link) {
    window.open(link, '_blank');
}

function genArticles() {
    const container = document.querySelector(".post-container");
    articles.forEach(article => {
        const html = article_baseHTML
            .replace("{url}", article.url)
            .replace("{thumbnail}", article.thumbnail)
            .replace("{title}", article.title);
        container.insertAdjacentHTML("beforeend", html);
    });
}

// GASで発行されたウェブアプリのURL
const GAS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbz8UpnRhltAMzcIJPpGKy0mSQhSzH6me9255qDlmzrTVi5Q2QfpS7lk1i9GTSIyZLUtCQ/exec";
let articles = [];

document.addEventListener("DOMContentLoaded", () => {
    const elem = document.querySelector(".footer-content > p");
    fetch(site_project).then(
        data => data.json()
    ).then (
        json => {
            footer_base = '&copy; ' + json.updated_at.split('T')[0] + ' Polythos ';
            if (document.location.hostname == "127.0.0.1" || document.location.hostname == "localhost") elem.innerHTML = footer_base + " | Localhost";
        }
    );
    if (document.location.hostname == "127.0.0.1" || document.location.hostname == "localhost") return;
    fetch(GAS_WEBAPP_URL)
        .then(response => {
            if (!response.ok) throw new Error("ネットワークエラー");
            return response.json();
        })
        .then(data => {
            let daily = data.dailyCount || 0;
            let total = data.totalCount || 0;
            elem.innerHTML = footer_base + " | Today: " + daily + " views | Total: " + total + " views";
        })
        .catch(error => {
            console.error('取得失敗:', error);
            elem.innerHTML = footer_base + " | Today: N/A views | Total: N/A views";
        });
});