// 타이머 관련 변수
let timeLeft = 90; // 1분 30초 = 90초
let timerInterval;

// 시간을 MM:SS 형태로 포맷
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// 타이머 업데이트 함수
function updateTimer() {
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        // 1분 31초가 되면 main.html로 이동
        window.location.href = '/main.html';
        return;
    }

    timeLeft--;
}

// 타이머 시작 함수
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

// JSON 로그 데이터를 원본 로그 형태로 변환하는 함수
function formatLogEntry(logEntry) {
    return `${logEntry.ip} - - [${logEntry.timestamp}] "${logEntry.method} ${logEntry.url} HTTP/1.1" ${logEntry.status} ${logEntry.size} "${logEntry.referer}" "${logEntry.user_agent}"`;
}

// JSON 로그 데이터를 처리하여 모니터에 표시
function updateLogs(jsonLogData) {
    const logDisplay = document.getElementById('logDisplay');
    logDisplay.innerHTML = '';
    
    jsonLogData.forEach(logEntry => {
        const logLine = document.createElement('div');
        logLine.className = 'log-line';
        logLine.textContent = formatLogEntry(logEntry);
        logDisplay.appendChild(logLine);
    });
    
    // 자동 스크롤 (최신 로그가 보이도록)
    logDisplay.scrollTop = logDisplay.scrollHeight;
}

// evidence1.json 파일 로드 및 표시
async function loadEvidence() {
    try {
        const response = await fetch('/static/data/evidence1.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        updateLogs(jsonData);
    } catch (error) {
        console.error('로그 파일 로드 실패:', error);
        const logDisplay = document.getElementById('logDisplay');
        logDisplay.innerHTML = '<div class="log-line">로그 파일을 불러올 수 없습니다.</div>';
    }
}

// 페이지 로드시 evidence1.json 파일 자동 로드 및 타이머 시작
window.addEventListener('load', () => {
    loadEvidence();
    startTimer();
});