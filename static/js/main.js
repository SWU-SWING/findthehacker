// 캐릭터별 대사 데이터 (나중에 대사로 수정)
const characterDialogues = {
    bae: "배진열입니다.",
    jung: "정도민입니다.",
    nah: "나옥자입니다.",
    noh: "노문희입니다.",
    choi: "최윤의입니다.",
    yoon: "윤지강입니다."
};


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
//노트, 메모 불러오기
function loadNote() {
    const noteText = document.querySelector('.note-text');
    const savedText = localStorage.getItem('note');
    if (savedText) {
        noteText.value = savedText;
    }
}
//노트 메모 내용 저장
function setupNoteSave() {
    const noteText = document.querySelector('.note-text');
    if (noteText) {
        noteText.addEventListener('input', function () {
            localStorage.setItem('note', noteText.value);
        });
    }
}


// Next 버튼 클릭 시 라운드에 따라 페이지 이동
function initializeNextButton() {
    const nextButton = document.getElementById('nextButton');
    if (!nextButton) return;

    nextButton.addEventListener('click', function (event) {
        event.stopPropagation();

        let currentRound = localStorage.getItem('round');

        // round 값이 없으면 초기값은 2
        if (!currentRound) {
            currentRound = '2';
            localStorage.setItem('round', '2');
        }

        let nextUrl = '';

        if (currentRound === '2') {
            // round2 시작
            nextUrl = '/round2';
            localStorage.setItem('round', '3'); // 타이머 끝나면 main으로 돌아옴 → 그 후 버튼 클릭 시 round3로 가도록
        } else if (currentRound === '3') {
            // round3 시작
            nextUrl = '/round3';
            localStorage.setItem('round', 'done'); // 이후는 용의자 선택 페이지
        } else {
            // round 다 끝나면
            nextUrl = '/select-suspect';
        }

        window.location.href = nextUrl;
    });
}


