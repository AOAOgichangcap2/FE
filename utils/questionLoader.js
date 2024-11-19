class QuestionLoader {
  async loadQuestionsBySubject(subject) {
      try {
          const response = await fetch(`/data/question-${subject}.json`);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          
          // 데이터 구조 변환
          return {
              metadata: {
                  timeExpected: data.questions[0].metadata.timeExpected,
                  subject: data.subject
              },
              passage: data.questions[0].passage,
              questionSet: data.questions[0].questionSet.map(q => ({
                  id: q.questionId,
                  points: q.points,
                  content: q.content,
                  options: q.options
              }))
          };
      } catch (error) {
          console.error('Load error:', error);
          throw error;
      }
  }

  async saveAnswer(userId, questionId, answers) {
      console.log('Saving answers:', {userId, questionId, answers});
      localStorage.setItem(`answers_${questionId}`, JSON.stringify({
          userId,
          answers: Array.from(answers.entries())
      }));
  }
}

export default new QuestionLoader();