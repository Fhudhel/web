function fetchM3U(url) {
        return fetch(url)
            .then(response => response.text())
            .then(data => parseM3U(data));
    }

    function parseM3U(m3uContent) {
        const channels = [];
        const lines = m3uContent.split('\n');

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('#EXTINF:')) {
                const nameMatch = /tvg-logo="([^"]+)"/.exec(lines[i]);
                const logo = nameMatch ? nameMatch[1] : '';
                const name = lines[i].split(',')[1]?.trim() || '';
                const url = lines[i + 1]?.trim() || '';

                channels.push({ name, logo, url });
            }
        }

        return channels;
    }

    function displayChannels(channels) {
        const channelList = document.getElementById('channelList');

        channels.forEach(channel => {
            const channelElement = document.createElement('div');
            channelElement.className = 'channel';
            channelElement.innerHTML = `
                <img src="${channel.logo}" alt="${channel.name}">
                <p>${channel.name}</p>
            `;
            channelElement.onclick = function () {
                openVideoPlayer(channel.url, channel.name);
            };

            channelList.appendChild(channelElement);
        });
    }

    function openVideoPlayer(videoUrl, videoTitle) {
        const modal = document.getElementById('videoModal');
        const videoPlayer = document.getElementById('videoPlayer');
        const modalTitle = document.querySelector('.modal-content h2');

        videoPlayer.src = videoUrl;
        modalTitle.textContent = videoTitle;
        modal.style.display = 'block';
    }

    function closeVideoPlayer() {
        const modal = document.getElementById('videoModal');
        const videoPlayer = document.getElementById('videoPlayer');

        modal.style.display = 'none';
        videoPlayer.pause();
        videoPlayer.src = '';
    }

    window.onclick = function (event) {
        const modal = document.getElementById('videoModal');
        if (event.target === modal) {
            closeVideoPlayer();
        }
    };

    // URL M3U
    const m3uUrl = 'https://fhudhel.github.io/web/campur.txt';

    // Fetch M3U content and display channels
    fetchM3U(m3uUrl)
        .then(channels => displayChannels(channels))
        .catch(error => console.error('Error fetching M3U:', error));