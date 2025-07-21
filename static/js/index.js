document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  const overlay = document.getElementById('glassOverlay');

  startButton.addEventListener('click', () => {
    // 버튼 커지기 효과
    startButton.classList.add('clicked');

    // 유리창 효과 보이기
    overlay.style.opacity = '1';

    // 효과 끝난 후 다음 페이지로 이동
    setTimeout(() => {
      window.location.href = "/desc";
    }, 800);
  });

  // 캐릭터 점프 애니메이션
  const characters = document.querySelectorAll('.character');
  let current = 0;
  const interval = 400;

  function bounceNext() {
    characters[current].classList.add('jump');

    setTimeout(() => {
      characters[current].classList.remove('jump');
      current = (current + 1) % characters.length;
    }, 600);

    setTimeout(bounceNext, interval);
  }

  bounceNext();
});