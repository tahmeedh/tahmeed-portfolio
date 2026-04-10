export const resumeData = {
  name: "Tahmeed Hossain",
  title: "Software Engineer in Test",
  tagline: "AI Testing · Automation · Security",
  location: "Vancouver, BC, Canada",
  email: "tahmeedhossain@gmail.com",
  phone: "+1 604-818-5738",
  links: {
    linkedin: "https://linkedin.com/in/tahmeedhossain",
    github: "https://github.com/tahmeedh",
    portfolio: "https://tahmeedhossain.com",
  },
  bio: "SDET & AI Test Engineer with 7+ years building scalable automation frameworks and AI-powered quality systems. I bridge the gap between cutting-edge ML models and production-grade testing pipelines.",
  skills: {
    testing: ["Playwright", "Selenium", "Cypress", "Appium", "WebdriverIO", "Jest", "Pytest", "JUnit"],
    languages: ["TypeScript", "Python", "JavaScript", "Node.js", "SQL", "Java"],
    devops: ["Docker", "GitHub Actions", "Jenkins", "Kubernetes", "Git", "Jira", "TestRail"],
    cloud: ["AWS", "GCP", "GraphQL", "REST Assured", "Postman", "Grafana", "Ansible"],
    ai: ["YOLOv8", "PyTorch", "TensorFlow", "OpenCV", "Flask", "Ultralytics", "SageMaker"],
  },
  experience: [
    {
      company: "Encorp",
      role: "Lead Automation Engineer (AI Testing)",
      period: "Jan 2024 – Jun 2025",
      highlights: [
        "Built and validated a YOLOv8 Computer Vision model achieving 90%+ accuracy across 4,000 containers in 3 months",
        "Designed automated image capture, annotation, and filtration pipelines replacing expensive third-party tools",
        "Evaluated AWS SageMaker, RunPod, and GCP Compute Engine on performance, cost, and scalability",
        "Implemented OCR-based regression testing on Nvidia Jetson Nano / RTX 3900",
        "Created real-time quality metrics dashboards using Allure Test Reporter",
      ],
    },
    {
      company: "Global Relay",
      role: "Intermediate Software Engineer in Test",
      period: "Jan 2022 – Oct 2024",
      highlights: [
        "Automated E2E and integration tests with WebdriverIO, Selenium, TypeScript — increased coverage by 15%",
        "Migrated legacy Selenium suite to Playwright, delivering 300+ robust automated tests",
        "Designed scalable Page Object Models and mock API endpoints for distributed teams",
        "Configured Jenkins CI jobs, reducing QA runtime by 75%",
        "Executed regression and smoke tests for releases impacting 100K+ users",
      ],
    },
    {
      company: "Onevest",
      role: "Software Engineer / QA",
      period: "Jun 2021 – Nov 2021",
      highlights: [
        "Migrated test reporting from AWS to GitHub Actions with Slack notifications",
        "Implemented GraphQL queries and mutations for role-based permissions",
        "Built whitelist IP security feature for enterprise API access",
      ],
    },
    {
      company: "OMMATY",
      role: "Backend Software Engineer / QA Intern",
      period: "Jan 2020 – Sep 2020",
      highlights: [
        "Developed iOS/Android app using Flutter, Node.js, and TypeScript",
        "Built RESTful APIs, CRUD operations, and dynamic search endpoints",
        "Created unit tests and validation scripts using Jest",
      ],
    },
  ],
  projects: [
    {
      name: "AI Vision Testing Pipeline",
      description: "YOLOv8 computer vision model validation system for automated container inspection. Achieved 90%+ accuracy across 4,000 items using PyTorch and Ultralytics on Nvidia hardware.",
      tags: ["YOLOv8", "PyTorch", "Python", "Flask", "AWS SageMaker"],
      year: "2024",
    },
    {
      name: "Playwright Test Migration Framework",
      description: "Migrated 300+ legacy Selenium tests to Playwright at Global Relay, reducing CI runtime by 75% and improving reliability for 100K+ user production releases.",
      tags: ["Playwright", "TypeScript", "Jenkins", "CI/CD"],
      year: "2023",
    },
    {
      name: "BC Cancer Research – Medical Imaging",
      description: "Analyzed CT, MRI, and Mammogram datasets using SciPy, NumPy, OpenCV. Automated ROI detection and data filtration with Scikit-Image and Gaussian Filters.",
      tags: ["Python", "OpenCV", "SciPy", "Medical Imaging"],
      year: "2020",
    },
    {
      name: "Wall Street Data Scraper",
      description: "Python scraper using Reddit and Yahoo Finance APIs with heapMax algorithm to rank top stocks with O(n log n) efficiency.",
      tags: ["Python", "Reddit API", "Yahoo Finance", "Algorithms"],
      year: "2021",
    },
    {
      name: "NLP Chatbot",
      description: "Neural network chatbot using TensorFlow/TFlearn with tokenization, training pipeline, and dynamic JavaScript UI.",
      tags: ["TensorFlow", "Python", "NLP", "JavaScript"],
      year: "2020",
    },
  ],
  education: {
    school: "University of British Columbia",
    degree: "B.Sc. Computer Science",
    gpa: "3.9",
    year: "2020",
    courses: ["Data Structures & Algorithms", "Machine Learning", "Networking", "Operating Systems", "Medical Imaging Informatics"],
  },
  certifications: [
    "ISTQB Agile Tester",
    "Google Cybersecurity",
    "AWS Cloud Practitioner",
    "CompTIA Cybersecurity",
    "DeepLearning.ai",
  ],
  awards: [
    { title: "New Ventures BC", position: "5th of 300", year: "2024" },
    { title: "Dean's List Designation", position: "Top Academic", year: "2020–2021" },
    { title: "UBC Hackathon", position: "3rd Place", year: "2020" },
  ],
};

export const resumeContext = `
You are an AI assistant representing Tahmeed Hossain's professional portfolio. Answer questions about Tahmeed based on the following information. Be concise, professional, and enthusiastic. Speak in third person about Tahmeed.

PROFILE:
Name: Tahmeed Hossain
Title: Software Engineer in Test / SDET / Lead QA Automation Engineer
Location: Vancouver, BC, Canada
Email: tahmeedhossain@gmail.com
LinkedIn: https://linkedin.com/in/tahmeedhossain
GitHub: https://github.com/tahmeedh

SUMMARY:
${resumeData.bio}
7+ years of experience. Canadian citizen, no visa sponsorship needed. UBC Computer Science graduate with 3.9 GPA.

CORE SKILLS:
- Testing: Playwright, Selenium, Cypress, Appium, WebdriverIO, Jest, Pytest, JUnit
- Languages: TypeScript, Python, JavaScript, Node.js, SQL, Java
- DevOps/CI: Docker, GitHub Actions, Jenkins, Kubernetes
- Cloud: AWS (Cloud Practitioner certified), GCP
- AI/ML: YOLOv8, PyTorch, TensorFlow, OpenCV, Flask

EXPERIENCE:
1. Encorp - Lead Automation Engineer (AI Testing) | Jan 2024 – Jun 2025
   - Built YOLOv8 CV model with 90%+ accuracy for 4,000 containers in 3 months
   - Designed automated annotation pipelines, evaluated AWS/GCP/RunPod
   - OCR regression testing on Nvidia Jetson Nano / RTX 3900

2. Global Relay - Intermediate SDET | Jan 2022 – Oct 2024
   - Migrated 300+ Selenium tests to Playwright; cut CI runtime 75%
   - Served 100K+ user production platform
   - WebdriverIO, TypeScript, Jenkins, Page Object Models

3. Onevest - Software Engineer/QA | Jun 2021 – Nov 2021
   - GraphQL, GitHub Actions CI, Allure reporting, Zephyr

4. OMMATY - Backend/QA Intern | Jan 2020 – Sep 2020
   - Flutter iOS/Android app, Node.js APIs, Jest tests

PROJECTS:
- AI Vision Pipeline: YOLOv8 container inspection (90%+ accuracy)
- Playwright Migration: 300+ tests, 75% faster CI
- BC Cancer Research: Medical imaging analysis with OpenCV/SciPy
- WSB Scraper: Reddit/Yahoo Finance stock ranker
- NLP Chatbot: TensorFlow neural network with JS UI

AWARDS: New Ventures BC 5th/300 (2024), Dean's List, UBC Hackathon 3rd Place

CERTIFICATIONS: ISTQB Agile Tester, Google Cybersecurity, AWS Cloud Practitioner, CompTIA Cybersecurity, DeepLearning.ai

If asked about availability, salary, or contact: Direct them to reach out via tahmeedhossain@gmail.com or LinkedIn.
Keep answers under 3 sentences unless a detailed breakdown is requested.
`;
