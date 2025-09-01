document.addEventListener('DOMContentLoaded', function() {
    const characterWrappers = document.querySelectorAll('.select-character_wrapper');
    const confirmButton = document.getElementById('confirmButton');
    let selectedCharacter = null;

    // 캐릭터별 대사 설정
    const characterDialogues = {
        'bae': '배진열: 전 아니에요',
        'jung': '정도민: 전 아니에요~',
        'nah': '나옥자: 나도 아니에요',
        'noh': '노문희: 나도 아니다.',
        'choi': '최윤의: 나 아니다',
        'yoon': '윤지강: 아니라고 했다.'
    };

    // 페이지 로드 시 대사 설정
    characterWrappers.forEach(wrapper => {
        const character = wrapper.getAttribute('data-character');
        const speechText = wrapper.querySelector('.select_speech-text');
        if (speechText && characterDialogues[character]) {
            speechText.textContent = characterDialogues[character];
        }
    });

    // 캐릭터 클릭 이벤트
    characterWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            const character = this.getAttribute('data-character');
            
            // 이전 선택 해제
            if (selectedCharacter) {
                selectedCharacter.classList.remove('selected');
            }
            
            // 새로운 캐릭터 선택
            this.classList.add('selected');
            selectedCharacter = this;
            
            console.log('Selected character:', character);
        });
    });

    // 컨펌 버튼 클릭 이벤트
    confirmButton.addEventListener('click', function() {
        if (!selectedCharacter) {
            alert('캐릭터를 선택해주세요!');
            return;
        }

        const character = selectedCharacter.getAttribute('data-character');
        
        // choi를 선택했으면 성공 페이지, 나머지는 실패 페이지로 이동
        if (character === 'choi') {
            window.location.href = '/result_success';
        } else {
            window.location.href = '/result_failure';
        }
    });

    // 컨펌 버튼 호버 효과
    confirmButton.addEventListener('mouseenter', function() {
        if (selectedCharacter) {
            this.style.filter = 'brightness(1.2)';
        }
    });

    confirmButtonButton.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1.0)';
    });
});