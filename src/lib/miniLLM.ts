import { resumeData } from '../data/resume';
import answers from '../data/answers.json';

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getTokens = (text: string) => normalize(text).split(' ').filter(Boolean);

const overlapScore = (a: string, b: string) => {
  const tokensA = getTokens(a);
  const tokensB = new Set(getTokens(b));
  if (!tokensA.length || !tokensB.size) return 0;

  let overlap = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) overlap += 1;
  }

  return overlap / Math.max(tokensA.length, tokensB.size);
};

const suffixBoost = (a: string, b: string) => {
  const tokensA = getTokens(a);
  const tokensB = getTokens(b);
  if (!tokensA.length || !tokensB.length) return 0;

  const commonStopWords = new Set(['do', 'does', 'did', 'you', 'have', 'has', 'is', 'are', 'in', 'with', 'for', 'what', 'how', 'where', 'when', 'why', 'the', 'a', 'an', 'and', 'or', 'to']);
  const lastA = tokensA[tokensA.length - 1];
  const lastB = tokensB[tokensB.length - 1];
  let boost = 0;

  if (lastA && lastA === lastB && !commonStopWords.has(lastA)) {
    boost += 0.35;
  }

  const tailA = tokensA.slice(-2).join(' ');
  const tailB = tokensB.slice(-2).join(' ');
  if (tailA === tailB && tailA.length > 2 && !commonStopWords.has(tokensA[tokensA.length - 1])) {
    boost += 0.15;
  }

  return boost;
};

const findBestAnswer = (question: string) => {
  const scoreThreshold = 0.15;
  let bestMatch = null as null | { answer: string; score: number };

  for (const entry of answers) {
    const baseScore = overlapScore(question, entry.question);
    const score = Math.min(1, baseScore + suffixBoost(question, entry.question));
    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { answer: entry.answer, score };
    }
  }

  return bestMatch && bestMatch.score >= scoreThreshold ? bestMatch.answer : null;
};

const resumeText = `${resumeData.bio}\n\nSkills: ${Object.values(resumeData.skills)
  .flat()
  .join(', ')}\n\nExperience: ${resumeData.experience
  .map((item) => `${item.company} ${item.role} ${item.period}. ${item.highlights.join('. ')}`)
  .join(' ')}\n\nProjects: ${resumeData.projects
  .map((item) => `${item.name}: ${item.description}`)
  .join(' ')}\n\nEducation: ${resumeData.education.degree} from ${resumeData.education.school}.`;

const answerWithResume = (question: string) => {
  const normalized = normalize(question);

  if (normalized.includes('skill') || normalized.includes('technology') || normalized.includes('tech stack')) {
    return `Tahmeed excels in automation and AI testing with tools such as Playwright, Selenium, Cypress, Appium, WebdriverIO, and AI/ML frameworks like YOLOv8, PyTorch, and OpenCV.`;
  }

  if (normalized.includes('experience') || normalized.includes('years') || normalized.includes('background')) {
    return `Tahmeed has 7+ years of experience as a Software Engineer in Test, leading automation and AI testing efforts across enterprise and AI-focused teams.`;
  }

  if (normalized.includes('project') || normalized.includes('work') || normalized.includes('product')) {
    return `His recent work includes a YOLOv8 computer vision testing pipeline, a large-scale Playwright migration, and medical imaging automation projects.`;
  }

  if (normalized.includes('available') || normalized.includes('hire') || normalized.includes('open to')) {
    return `Tahmeed is open to new opportunities and can be reached via tahmeedhossain@gmail.com for hiring inquiries.`;
  }

  if (normalized.includes('salary')) {
    return `Salary expectations are typically discussed directly with hiring teams; please reach out to tahmeedhossain@gmail.com for details.`;
  }

  if (normalized.includes('canada') || normalized.includes('work authorization') || normalized.includes('visa') || normalized.includes('sponsor')) {
    return `Tahmeed is a Canadian citizen and does not require visa sponsorship.`;
  }

  if (normalized.includes('education') || normalized.includes('school') || normalized.includes('degree')) {
    return `He graduated from the University of British Columbia with a B.Sc. in Computer Science.`;
  }

  if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('linkedin')) {
    return `The best way to contact him is via email at tahmeedhossain@gmail.com or through his LinkedIn profile.`;
  }

  if (normalized.includes('automation') || normalized.includes('testing') || normalized.includes('qa')) {
    return `He builds scalable automation frameworks, validates AI systems, and integrates tests into CI/CD pipelines using tools like Playwright, Jenkins, and GitHub Actions.`;
  }

  return null;
};

export const answerQuestion = (message: string) => {
  const answerFromAnswers = findBestAnswer(message);
  if (answerFromAnswers) return answerFromAnswers;

  const answerFromResume = answerWithResume(message);
  if (answerFromResume) return answerFromResume;

  if (normalize(message).length < 8) {
    return `Ask anything specific about Tahmeed's experience, skills, or projects and I'll answer from the portfolio data.`;
  }

  return `I couldn't find an exact answer in the portfolio data, but Tahmeed is a Software Engineer in Test with strong automation, AI testing, and cloud experience. Please ask another question or reach out to tahmeedhossain@gmail.com.`;
};
