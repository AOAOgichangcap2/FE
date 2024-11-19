class MemoManager {
    constructor() {
        this.autoSaveTimeout = null;
    }

    initialize() {
        this.loadSavedMemo();
        this.setupEventListeners();
    }

    toggleMemo() {
        const memoContainer = document.getElementById('memoContainer');
        if (!memoContainer) return;  // 메모 컨테이너가 없으면 리턴
        
        // 현재 display 상태 확인
        const isVisible = window.getComputedStyle(memoContainer).display !== 'none';
        memoContainer.style.display = isVisible ? 'none' : 'block';
    }

    async saveMemo() {
        const memoText = document.getElementById('memoText').value;
        const questionId = this.getCurrentQuestionId();
        localStorage.setItem(`memo_${questionId}`, memoText);
    }

    clearMemo() {
        if (confirm('메모를 지우시겠습니까?')) {
            document.getElementById('memoText').value = '';
            const questionId = this.getCurrentQuestionId();
            localStorage.removeItem(`memo_${questionId}`);
        }
    }

    autoSaveMemo() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveMemo();
            console.log('메모 자동 저장됨');
        }, 1000);
    }

    loadSavedMemo() {
        const questionId = this.getCurrentQuestionId();
        const savedMemo = localStorage.getItem(`memo_${questionId}`);
        if (savedMemo) {
            document.getElementById('memoText').value = savedMemo;
        }
    }

    getCurrentQuestionId() {
        return sessionStorage.getItem('currentQuestionId') || 'default';
    }

    setupEventListeners() {
        const memoText = document.getElementById('memoText');
        if (memoText) {
            memoText.addEventListener('input', () => this.autoSaveMemo());
        }
    }
}

export default new MemoManager();