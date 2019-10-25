importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
    "assets/main.js",
    "images/bag-icon.svg",
    "images/computer-icon-x.svg",
    "images/computer-icon.svg",
    "images/end-turn-icon.svg",
    "images/exchange-icon.svg",
    "images/human-icon.svg",
    "images/reset-turn-icon.svg",
    "favicon.ico",
    "index.html",
    "images/orange-plus-large.png",
    "images/orange-plus.png",
]);
