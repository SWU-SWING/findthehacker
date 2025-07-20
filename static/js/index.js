document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  const overlay = document.getElementById('glassOverlay');

  startButton.addEventListener('click', () => {
    // 버튼 커지기 효과
    startButton.classList.add('clicked');

    // 유리창 효과 보이기
    overlay.style.opacity = '1';

    // 효과 끝난 후 다음 페이지로 이동 (예: desc.html)
    setTimeout(() => {
      window.location.href = "/desc";
    }, 800); // 0.8초 후 이동
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const characters = document.querySelectorAll('.character');

  let current = 0;
  const interval = 300; // 한 캐릭터당 300ms 간격

  function bounceNext() {
    characters[current].classList.add('jump');

    // 애니메이션 끝나면 클래스 제거해서 반복 가능하게
    setTimeout(() => {
      characters[current].classList.remove('jump');
      current = (current + 1) % characters.length;
    }, 600); // 점프 애니메이션 시간과 일치

    // 다음 캐릭터로 점프 실행
    setTimeout(bounceNext, interval);
  }

  bounceNext(); // 점프 시작!
});
