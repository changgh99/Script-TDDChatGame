// ==UserScript==
// @name          TDDChatGame (User Edition)
// @namespace     http://tampermonkey.net/
// @version       4.3
// @description   เพิ่มปุ่มซ่อน/แสดง Sidebar
// @author        MObyEX
// @match         https://www.torrentdd.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=torrentdd.com
// @grant         none
// ==/UserScript==

(function() {
    'use strict';

    const TARGET_PATH = "/chat.php";
    const VERCEL_URL = "https://tdd-chat-game.vercel.app/";
    const SIDEBAR_WIDTH = "400px"; // เปลี่ยนขนาดช่องแชท

    if (window.location.pathname.indexOf(TARGET_PATH) === -1) return;

    const getCleanUsername = () => {
        const userEl = document.querySelector('.profile-name.h5');
        if (!userEl) return "Guest_" + Math.floor(Math.random() * 100);
        return encodeURIComponent(userEl.innerText.split('\n')[0].trim());
    };

    const myName = getCleanUsername();
    const finalChatUrl = `${VERCEL_URL}?user=${myName}`;

    const style = document.createElement('style');
    style.innerHTML = `
        body { transition: margin-right 0.3s; margin-right: ${SIDEBAR_WIDTH} !important; }
        body.chat-hidden { margin-right: 0 !important; }

        #tdd-chat-container {
            position: fixed; top: 0; right: 0; width: ${SIDEBAR_WIDTH}; height: 100vh;
            background: white; border-left: 1px solid #ccc; z-index: 999999;
            box-shadow: -2px 0 5px rgba(0,0,0,0.1); transition: transform 0.3s;
        }
        #tdd-chat-container.hidden { transform: translateX(100%); }

        #chat-toggle-btn {
            position: absolute; left: -25px; top: 50%; transform: translateY(-50%);
            width: 25px; height: 50px; background: #333; color: white;
            border: 1px solid #ccc; border-right: none; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            border-radius: 8px 0 0 8px; font-size: 16px;
        }
        #chat-frame { width: 100%; height: 100%; border: none; }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'tdd-chat-container';
    container.innerHTML = `
        <div id="chat-toggle-btn">❯</div>
        <iframe id="chat-frame" src="${finalChatUrl}"></iframe>
    `;

    document.body.appendChild(container);

    const toggleBtn = document.getElementById('chat-toggle-btn');
    toggleBtn.onclick = () => {
        const isHidden = container.classList.toggle('hidden');
        document.body.classList.toggle('chat-hidden');
        toggleBtn.innerText = isHidden ? '❮' : '❯';
    };

    console.log("TDD Chat Admin Mode Connected");
})();
