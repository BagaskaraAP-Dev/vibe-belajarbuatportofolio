document.addEventListener('DOMContentLoaded', () => {
  // Typing Effect for Hero Terminal
  const textArray = [
    "Initializing protocols...",
    "Bypassing security nodes...",
    "Welcome to the system, Bagaskara.",
    "Mastering AI, Security, and Full-Stack."
  ];
  const typingText = document.getElementById('typing-text');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    // Dynamic coloring based on keywords
    let innerHTML = typingText.textContent;
    innerHTML = innerHTML.replace('AI', '<span class="highlight-ai">AI</span>');
    innerHTML = innerHTML.replace('Security', '<span class="highlight-cyber">Security</span>');
    innerHTML = innerHTML.replace('Bagaskara', '<span class="highlight-cyber">Bagaskara</span>');
    typingText.innerHTML = innerHTML;

    let typeSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end of sentence
      isDeleting = true;
      if (textIndex === textArray.length - 1) {
        isDeleting = false; // Stop at the last sentence
        return;
      }
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex++;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start typing effect
  setTimeout(typeEffect, 1000);


  // Neural Lab (Prompt Generator) Logic
  const opType = document.getElementById('operation-type');
  const sysEnv = document.getElementById('system-environment');
  const secLevel = document.getElementById('security-level');
  const btnGenerate = document.getElementById('btn-generate');
  const promptResult = document.getElementById('prompt-result');
  const btnCopy = document.getElementById('btn-copy');
  const copyToast = document.getElementById('copy-toast');

  function generateNeuralPrompt() {
    const operation = opType.value;
    const environment = sysEnv.value;
    const constraints = secLevel.value || 'Standard Security Protocols';

    const prompt = `Role: Senior Full-Stack Developer & Security Analyst

Task: ${operation}
Tech Stack: ${environment}
Constraints: ${constraints}

Instructions:
1. Provide a clear, high-level architectural overview.
2. Write production-ready, modular code for the core components.
3. Highlight potential vulnerabilities (e.g., SQLi, XSS, CSRF) and implement mitigations.
4. Keep explanations concise and focus strictly on best practices.`;

    // Type out the prompt result for that hacker feel
    promptResult.textContent = '';
    let pIndex = 0;
    function typePrompt() {
      if (pIndex < prompt.length) {
        promptResult.textContent += prompt.charAt(pIndex);
        pIndex++;
        promptResult.scrollTop = promptResult.scrollHeight;
        setTimeout(typePrompt, 5); // Fast typing
      }
    }
    typePrompt();
  }

  btnGenerate.addEventListener('click', generateNeuralPrompt);
  generateNeuralPrompt(); // Initial generate without typing effect

  btnCopy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(promptResult.textContent);
      showToast();
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = promptResult.textContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast();
    }
  });

  function showToast() {
    copyToast.classList.add('show');
    setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2500);
  }
});
