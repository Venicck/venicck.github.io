const site_project = 'https://api.github.com/repos/Venicck/venicck.github.io';
const zenn_articles = "https://api.rss2json.com/v1/api.json?rss_url=https://zenn.dev/polythos/feed";
const note_articles = "https://api.rss2json.com/v1/api.json?rss_url=https://note.com/polythos/rss";
const qiita_articles = null;
let loaded_article_sites = 0;
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
    fetch(zenn_articles).then(
        data => data.json()
    ).then (
        json => {
            json.items.forEach(article => {
                articles.push({
                    title: article.title,
                    thumbnail: article.enclosure.link,
                    url: article.link,
                    date: article.pubDate.split('T')[0]
                });
            });
            loaded_article_sites++;
            if (loaded_article_sites === 2) {
                genArticles();
            }
        }
    ).catch(error => {
        console.error('Zennの記事の取得に失敗:', error);
        loaded_article_sites++;
        if (loaded_article_sites === 2) {
            genArticles();
        }
    });

    fetch(note_articles).then(
        data => data.json()
    ).then (
        json => {
            console.log(json);
            json.items.forEach(content => {
                articles.push({
                    title: content.title,
                    thumbnail: content.thumbnail,
                    url: content.link,
                    date: content.pubDate.split('T')[0]
                });
            });
            loaded_article_sites++;
            if (loaded_article_sites === 2) {
                genArticles();
            }
        }
    ).catch(error => {
        console.error('Noteの記事の取得に失敗:', error);
        loaded_article_sites++;
        if (loaded_article_sites === 2) {
            genArticles();
        }
    });
    fetch(site_project).then(
        data => data.json()
    ).then (
        json => {
            footer_base = '&copy; ' + json.updated_at.split('T')[0] + ' Polythos ';
        }
    );
    fetch(GAS_WEBAPP_URL)
        .then(response => {
            if (!response.ok) throw new Error("ネットワークエラー");
            return response.json();
        })
        .then(data => {
            let daily = data.dailyCount || 0;
            let total = data.totalCount || 0;
            console.log(daily);
            console.log(total);
            elem.innerHTML = footer_base + " | Today: " + daily + " views | Total: " + total + " views";
        })
        .catch(error => {
            console.error('取得失敗:', error);
            elem.innerHTML = footer_base + " | Failed to get view counts";
        });
});