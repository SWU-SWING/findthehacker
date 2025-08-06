//1:30 타이머 동작
let timeLeft = 90;

function formatTime(seconds) {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

function startTimer() {
    const timerText = document.getElementById('round2_timer-text');
    timerText.textContent = formatTime(timeLeft);

    const timerInterval = setInterval(() => {
        timeLeft--;
        timerText.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerText.textContent = "00:00";
            // 여기에 타이머 종료 시 동작 추가 가능
            window.location.href = "/main";
            // 예: alert("타임아웃!");
        }
    }, 1000);
}

// 페이지 로딩 시 바로 실행
window.onload = startTimer;