class QuestionLoader {
  constructor() {
    this.questionCache = new Map();
  }

  // 특정 과목의 모든 문제 데이터 로드
  async loadQuestionsBySubject(subject) {
    if (this.questionCache.has(subject)) {
      return this.questionCache.get(subject);
    }

    try {
      const response = await fetch(`/data/${subject}/questions.json`);
      const data = await response.json();
      this.questionCache.set(subject, data);
      return data;
    } catch (error) {
      console.error(`Failed to load ${subject} questions:`, error);
      throw error;
    }
  }

  // 특정 문제 세트 가져오기
  async getQuestionSet(subject, questionId) {
    const questions = await this.loadQuestionsBySubject(subject);
    return questions.questions.find(q => q.id === questionId);
  }

  // 필터링된 문제 목록 가져오기
  async getFilteredQuestions(subject, filters) {
    const questions = await this.loadQuestionsBySubject(subject);
    
    return questions.questions.filter(question => {
      let matches = true;
      
      if (filters.year) {
        matches = matches && question.year === filters.year;
      }
      
      if (filters.month) {
        matches = matches && question.month === filters.month;
      }
      
      if (filters.difficulty) {
        matches = matches && question.metadata.difficulty === filters.difficulty;
      }
      
      if (filters.tags && filters.tags.length > 0) {
        matches = matches && filters.tags.some(tag => 
          question.metadata.tags.includes(tag)
        );
      }
      
      return matches;
    });
  }

  // 학습 진도 추적
  async trackProgress(userId, questionId, progress) {
    // 여기에 학습 진도 추적 로직 구현
    // 예: API 호출 또는 로컬 스토리지 저장
  }

  // 문제 풀이 기록 저장
  async saveAnswer(userId, questionId, subQuestionId, answer) {
    // 여기에 답안 저장 로직 구현
  }

  // 오답 노트 데이터 가져오기
  async getIncorrectAnswers(userId, subject) {
    // 여기에 오답 노트 관련 로직 구현
  }
}

export default new QuestionLoader();
