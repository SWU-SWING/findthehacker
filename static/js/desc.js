document.addEventListener('DOMContentLoaded', () => {
  const scenarioImage = document.getElementById('scenarioImage');
  const defaultSrc = scenarioImage.getAttribute('data-default') || scenarioImage.src;
  const characters = document.querySelectorAll('.character');

  characters.forEach(char => {
    char.addEventListener('mouseenter', () => {
      const introSrc = char.getAttribute('data-intro');
      scenarioImage.src = introSrc;
    });

    char.addEventListener('mouseleave', () => {
      scenarioImage.src = defaultSrc;
    });
  });

  // GameStart 버튼 클릭 시 round1으로 이동
  document.getElementById("btn-start").addEventListener("click", () => {
    localStorage.clear(); // 모든 저장값 삭제 (round, note 등)
    window.location.href = '/round1'; 
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

