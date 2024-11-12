class PhraseGenerator {
  constructor() {
      this.phrases = null;
      this.lastPhrase = null;
  }

  async loadPhrases() {
      try {
          const response = await fetch('/data/handwriting-phrases.json');
          const data = await response.json();
          this.phrases = data.phrases;
          console.log('Phrases loaded:', this.phrases.length, 'items');
      } catch (error) {
          console.error('Failed to load phrases:', error);
          this.phrases = [{
              text: "사람은 나이로 늙는 것이 아니라 기분으로 늙는다",
              source: "2024.수능"
          }];
      }
  }

  getRandomPhrase() {
      if (!this.phrases || !this.phrases.length) {
          throw new Error('No phrases available');
      }

      // 랜덤 인덱스 생성
      const randomIndex = Math.floor(Math.random() * this.phrases.length);
      const selectedPhrase = this.phrases[randomIndex];
      
      console.log('Random selection:', {
          totalPhrases: this.phrases.length,
          selectedIndex: randomIndex,
          selectedPhrase: selectedPhrase
      });

      return selectedPhrase;
  }

  getSessionPhrase() {
      // 세션 스토리지 키를 타임스탬프와 함께 만들어서 매번 새로운 문구가 선택되도록 함
      const sessionKey = `handwritingPhrase_${new Date().getTime()}`;
      const sessionPhrase = sessionStorage.getItem(sessionKey);
      
      if (sessionPhrase) {
          return JSON.parse(sessionPhrase);
      }

      const newPhrase = this.getRandomPhrase();
      sessionStorage.setItem(sessionKey, JSON.stringify(newPhrase));
      return newPhrase;
  }
}

export default new PhraseGenerator();