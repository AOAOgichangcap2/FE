<script type="module">
  import phraseGenerator from '/utils/phraseGenerator.js';

  async function initializeHandwritingPhrase() {
    await phraseGenerator.loadPhrases();
    const phraseBox = document.querySelector('.highlight-box');
    
    try {
      const { text, source } = phraseGenerator.getSessionPhrase();
      phraseBox.innerHTML = text;
      
      // 출처가 있는 경우 작은 글씨로 표시
      if (source && source !== 'unknown') {
        const sourceElement = document.createElement('div');
        sourceElement.className = 'phrase-source';
        sourceElement.textContent = `- ${source}`;
        phraseBox.appendChild(sourceElement);
      }
    } catch (error) {
      console.error('Failed to set handwriting phrase:', error);
    }
  }

  // 페이지 로드 시 초기화
  document.addEventListener('DOMContentLoaded', initializeHandwritingPhrase);
</script>

<style>
  .phrase-source {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
    text-align: right;
  }
</style>
