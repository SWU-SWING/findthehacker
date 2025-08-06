// 캐릭터별 대사 데이터 (나중에 대사로 수정)
const characterDialogues = {
    bae: "배진열입니다.",
    jung: "정도민입니다.",
    nah: "나옥자입니다.",
    noh: "노문희입니다.",
    choi: "최윤의입니다.",
    yoon: "윤지강입니다."
};

// main 페이지 처음 진입 시 round1 종료 이후라고 간주
if (!localStorage.getItem('round')) {
    localStorage.setItem('round', '1');
}

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeCharacters();
    initializeNextButton();
    loadNote(); // 메모 로드
    setupNoteSave(); // 메모 저장
});

// hover 효과 구현
// 캐릭터 초기화
function initializeCharacters() {
    const characterWrappers = document.querySelectorAll('.main-character_wrapper');
    const mainContainer = document.querySelector('.main-container'); // 부모 컨테이너 선택
    
    characterWrappers.forEach(wrapper => {
        const character = wrapper.getAttribute('data-character');
        const speechText = wrapper.querySelector('.speech-text');
        
        // 대사 설정
        if (characterDialogues[character]) {
            speechText.textContent = characterDialogues[character];
        }
        
        // 클릭 이벤트 추가
        wrapper.addEventListener('click', function(event) {
            event.stopPropagation(); // 이벤트 버블링 방지
            
            // 현재 클릭된 캐릭터의 활성화 상태를 확인
            const isActive = wrapper.classList.contains('active');
            
            // 모든 캐릭터의 active 클래스 제거
            characterWrappers.forEach(otherWrapper => {
                otherWrapper.classList.remove('active');
            });
            
            // 현재 캐릭터의 active 클래스 토글
            if (!isActive) {
                wrapper.classList.add('active');
                mainContainer.classList.add('active'); // 컨테이너에 active 클래스 추가
            } else {
                mainContainer.classList.remove('active'); // 컨테이너의 active 클래스 제거
            }
            
            console.log(`${character} 캐릭터 클릭됨`);
        });
    });
    
    // 문서 클릭시 모든 말풍선 숨기기
    document.addEventListener('click', function() {
        characterWrappers.forEach(wrapper => {
            wrapper.classList.remove('active');
        });
        mainContainer.classList.remove('active'); // 컨테이너의 active 클래스 제거
    });
}

function loadNote() {
    const noteText = document.querySelector('.note-text');
    const savedText = localStorage.getItem('note');
    if (savedText) {
        noteText.value = savedText;
    }
}

function setupNoteSave() {
    const noteText = document.querySelector('.note-text');
    if (noteText) {
        noteText.addEventListener('input', function () {
            localStorage.setItem('note', noteText.value);
        });
    }
}

// Next 버튼 클릭 시 페이지 이동(round2,round3)
function initializeNextButton() {
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.addEventListener('click', function (event) {
            event.stopPropagation(); // 버블링 방지

            // 현재 라운드 가져오기 (round1 끝나고 main 들어오면 '1'부터 시작)
            let currentRound = localStorage.getItem('round');
            if (!currentRound) {
                currentRound = '1';  // round1 끝나고 들어온 첫 main이니까
            }

            let nextUrl = '';
            switch (currentRound) {
                case '1':
                    nextUrl = '/round2';
                    localStorage.setItem('round', '2');
                    break;
                case '2':
                    nextUrl = '/round3';
                    localStorage.setItem('round', '3');
                    break;
                case '3':
                    nextUrl = '/select-suspect';
                    localStorage.setItem('round', 'done');
                    break;
                default:
                    nextUrl = '/'; // 그 외에는 홈으로
            }

            window.location.href = nextUrl;
        });
    }
}
