const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const skillsData = [
  // Programming & Foundations
  {
    name: "Python",
    category: "Programming",
    description: "High-level programming language essential for data science, AI, web backends, and scripting.",
    whyItMatters: "Python is the undisputed lingua franca of AI, Machine Learning, and Data Science, boasting the richest ecosystem of analytical libraries.",
    prerequisites: JSON.stringify(["Basic Logic & Flowcharts"]),
    whatToLearn: JSON.stringify([
      "Syntax, Data Types, Collections (Lists, Dicts, Tuples, Sets)",
      "Control Flow, Functions, Lambdas, and List Comprehensions",
      "Object-Oriented Programming (OOP) & Error Handling",
      "Virtual Environments, Modules, and Package Management",
      "File I/O, JSON processing, and REST API integration"
    ]),
    recommendedProject: "Build an Automated Web Data Scraper & Analysis Pipeline",
    estimatedHours: 25,
    difficulty: "Beginner",
  },
  {
    name: "SQL",
    category: "Data Engineering",
    description: "Standard language for storing, manipulating, and querying relational database systems.",
    whyItMatters: "90%+ of corporate data lives in relational databases or data warehouses; SQL is mandatory for raw data extraction and aggregation.",
    prerequisites: JSON.stringify(["Basic Relational Concepts"]),
    whatToLearn: JSON.stringify([
      "SELECT, WHERE, ORDER BY, GROUP BY, HAVING aggregations",
      "INNER, LEFT, RIGHT, and FULL OUTER JOINs",
      "Window Functions (ROW_NUMBER, RANK, LEAD, LAG, PARTITION BY)",
      "Common Table Expressions (CTEs) & Subqueries",
      "Indexing, Query Optimization, and Execution Plans"
    ]),
    recommendedProject: "E-Commerce Customer Retention & Cohort Analytics Database",
    estimatedHours: 20,
    difficulty: "Beginner",
  },
  {
    name: "Statistics & Probability",
    category: "Math & Stats",
    description: "Mathematical foundation for hypothesis testing, distributions, confidence intervals, and inference.",
    whyItMatters: "Without statistical rigor, machine learning models risk overfitting, misleading interpretations, and faulty A/B test conclusions.",
    prerequisites: JSON.stringify(["High School Algebra"]),
    whatToLearn: JSON.stringify([
      "Descriptive Statistics (Mean, Median, Variance, Skewness)",
      "Probability Distributions (Normal, Binomial, Poisson, Uniform)",
      "Central Limit Theorem & Standard Error",
      "Hypothesis Testing (t-tests, Z-tests, ANOVA, Chi-Square)",
      "Bayesian Inference & Confidence Intervals"
    ]),
    recommendedProject: "A/B Testing Simulator for User Conversion Optimization",
    estimatedHours: 30,
    difficulty: "Intermediate",
  },
  {
    name: "Git & GitHub",
    category: "Tools & DevOps",
    description: "Distributed version control system and collaborative code hosting platform.",
    whyItMatters: "Enables code versioning, team collaboration, continuous integration, and showcases your portfolio to employers.",
    prerequisites: JSON.stringify(["Command Line Basics"]),
    whatToLearn: JSON.stringify([
      "git init, clone, add, commit, push, pull",
      "Branching strategies, merging, and merge conflict resolution",
      "Pull requests, code reviews, and issue tracking",
      "Interactive rebase, stash, reset, and git cherry-pick",
      "GitHub Actions CI/CD workflows"
    ]),
    recommendedProject: "Open Source Contribution & Automated CI/CD Portfolio Repository",
    estimatedHours: 10,
    difficulty: "Beginner",
  },
  {
    name: "NumPy & Pandas",
    category: "Data Engineering",
    description: "Core Python libraries for multidimensional numerical arrays and dataframe manipulation.",
    whyItMatters: "High-performance vector operations and structured data manipulation are required before any machine learning modeling.",
    prerequisites: JSON.stringify(["Python"]),
    whatToLearn: JSON.stringify([
      "NumPy N-dimensional array creation, slicing, broadcasting, and vectorization",
      "Pandas Series, DataFrames, Indexing with loc and iloc",
      "Grouping, Aggregating, Merging, Joining, and Pivoting Data",
      "Handling Missing Values, Duplicates, and Type Casting",
      "Time-Series analysis and datetime conversions"
    ]),
    recommendedProject: "Financial Stock Market Analyzer & Multi-Asset Portfolio Tracker",
    estimatedHours: 20,
    difficulty: "Beginner",
  },
  {
    name: "Exploratory Data Analysis (EDA) & Data Cleaning",
    category: "Data Engineering",
    description: "Techniques for discovering patterns, spotting anomalies, and cleaning messy data.",
    whyItMatters: "80% of a data scientist's time is spent finding insights, cleaning nulls/outliers, and preparing data for models.",
    prerequisites: JSON.stringify(["Python", "NumPy & Pandas", "Statistics & Probability"]),
    whatToLearn: JSON.stringify([
      "Univariate, Bivariate, and Multivariate Analysis",
      "Outlier Detection (IQR, Z-Score, Isolation Forests)",
      "Imputation Strategies (Mean, Median, KNN, MICE)",
      "Correlation Analysis (Pearson, Spearman) & Multicollinearity (VIF)",
      "Automated EDA tools (Sweetviz, YData Profiling)"
    ]),
    recommendedProject: "Real Estate Housing Price Exploratory Dashboard & Anomaly Detector",
    estimatedHours: 20,
    difficulty: "Intermediate",
  },
  {
    name: "Data Visualization (Matplotlib, Seaborn, Plotly)",
    category: "Data Engineering",
    description: "Visual storytelling tools to communicate complex analytical insights to technical and non-technical audiences.",
    whyItMatters: "Actionable business decisions depend on clear, intuitive, and interactive graphical presentations of data.",
    prerequisites: JSON.stringify(["Python", "NumPy & Pandas"]),
    whatToLearn: JSON.stringify([
      "Matplotlib figure hierarchy, subplots, and custom formatting",
      "Seaborn statistical plots (heatmaps, violin, pairplots, boxplots)",
      "Plotly interactive web charts, maps, and 3D graphs",
      "Visual storytelling principles, color accessibility, and chart ergonomics",
      "Dashboard assembly with Streamlit"
    ]),
    recommendedProject: "Interactive COVID-19 / Healthcare Global Trend Visualizer",
    estimatedHours: 15,
    difficulty: "Beginner",
  },
  {
    name: "Machine Learning (Supervised & Unsupervised)",
    category: "ML & AI",
    description: "Algorithms that learn patterns from historical data to make predictions or uncover latent structures.",
    whyItMatters: "Core engine for predictive analytics, recommendation systems, fraud detection, and automated decisions.",
    prerequisites: JSON.stringify(["Python", "Statistics & Probability", "NumPy & Pandas", "EDA & Data Cleaning"]),
    whatToLearn: JSON.stringify([
      "Regression (Linear, Ridge, Lasso, Polynomial)",
      "Classification (Logistic Regression, Decision Trees, Random Forests, XGBoost, LightGBM)",
      "Clustering (K-Means, DBSCAN, Hierarchical)",
      "Dimensionality Reduction (PCA, t-SNE, UMAP)",
      "Model Evaluation Metrics (RMSE, ROC-AUC, F1-Score, Confusion Matrix, Precision/Recall tradeoff)"
    ]),
    recommendedProject: "Student Dropout Risk & Academic Performance Prediction System",
    estimatedHours: 40,
    difficulty: "Intermediate",
  },
  {
    name: "Feature Engineering & Preprocessing",
    category: "ML & AI",
    description: "Transforming raw data into engineered features that amplify machine learning model performance.",
    whyItMatters: "Better features beat better algorithms. Domain-specific features drastically improve model predictive accuracy.",
    prerequisites: JSON.stringify(["Python", "NumPy & Pandas", "Statistics & Probability"]),
    whatToLearn: JSON.stringify([
      "Encoding Categorical Variables (One-Hot, Target, Binary, Frequency)",
      "Feature Scaling (StandardScaler, MinMaxScaler, RobustScaler)",
      "Feature Creation (Polynomials, Interaction terms, Binning, Aggregations)",
      "Feature Selection (VarianceThreshold, SelectKBest, RFE, SHAP Importance)",
      "Building Scikit-Learn Pipelines & ColumnTransformers"
    ]),
    recommendedProject: "Credit Card Fraud Detection Pipeline with Imbalanced Data Handling (SMOTE)",
    estimatedHours: 20,
    difficulty: "Intermediate",
  },
  {
    name: "Deep Learning & Neural Networks",
    category: "ML & AI",
    description: "Multi-layered neural architectures capable of learning hierarchical feature representations.",
    whyItMatters: "Powers state-of-the-art breakthroughs in computer vision, speech recognition, and complex pattern recognition.",
    prerequisites: JSON.stringify(["Machine Learning (Supervised & Unsupervised)", "Linear Algebra & Calculus"]),
    whatToLearn: JSON.stringify([
      "Perceptrons, Forward & Backpropagation, Loss Functions, Gradient Descent (Adam, RMSprop)",
      "Activation Functions (ReLU, GELU, Sigmoid, Softmax)",
      "Convolutional Neural Networks (CNNs) for Image Processing",
      "Recurrent Neural Networks (RNNs, LSTMs, GRUs) for Sequences",
      "Regularization: Dropout, Batch Normalization, Early Stopping"
    ]),
    recommendedProject: "Medical X-Ray Pneumonia Classifier using PyTorch & Transfer Learning",
    estimatedHours: 45,
    difficulty: "Advanced",
  },
  {
    name: "Natural Language Processing (NLP)",
    category: "ML & AI",
    description: "Methods for enabling computers to understand, interpret, and generate human languages.",
    whyItMatters: "Unlocks value from unstructured textual data such as customer reviews, support tickets, and legal documents.",
    prerequisites: JSON.stringify(["Python", "Machine Learning (Supervised & Unsupervised)", "Deep Learning & Neural Networks"]),
    whatToLearn: JSON.stringify([
      "Tokenization, Stemming, Lemmatization, Stopwords (NLTK, SpaCy)",
      "TF-IDF, Bag-of-Words, Word2Vec, GloVe embeddings",
      "Transformer Architecture (Self-Attention, Encoder-Decoder, Multi-Head Attention)",
      "BERT, RoBERTa, Hugging Face Transformers library",
      "Sentiment Analysis, Named Entity Recognition (NER), Text Classification"
    ]),
    recommendedProject: "Customer Sentiment & Aspect-Based Opinion Mining System",
    estimatedHours: 35,
    difficulty: "Advanced",
  },
  {
    name: "Model Deployment & MLOps",
    category: "Tools & DevOps",
    description: "Packaging, deploying, monitoring, and scaling machine learning models into production systems.",
    whyItMatters: "A model stuck in a Jupyter Notebook provides zero business value; MLOps turns algorithms into live production services.",
    prerequisites: JSON.stringify(["Python", "Machine Learning (Supervised & Unsupervised)", "Git & GitHub"]),
    whatToLearn: JSON.stringify([
      "Building REST APIs with FastAPI / Flask for model inference",
      "Containerization with Docker",
      "Model tracking & Registry with MLflow / Weights & Biases",
      "Continuous Integration & Continuous Deployment (CI/CD) for ML",
      "Data Drift, Concept Drift detection, and Prometheus/Grafana monitoring"
    ]),
    recommendedProject: "Production-Grade Dockerized ML Microservice on Cloud with Automated Testing",
    estimatedHours: 30,
    difficulty: "Advanced",
  },
  {
    name: "Generative AI & LLMs",
    category: "ML & AI",
    description: "Building systems with Large Language Models, Retrieval-Augmented Generation (RAG), and AI Agents.",
    whyItMatters: "The modern frontier of software, enabling conversational intelligence, intelligent search, and autonomous workflows.",
    prerequisites: JSON.stringify(["Python", "NLP", "Git & GitHub"]),
    whatToLearn: JSON.stringify([
      "Prompt Engineering, Few-Shot Prompting, Chain-of-Thought (CoT)",
      "LangChain, LlamaIndex frameworks",
      "Vector Embeddings & Vector Databases (Pinecone, ChromaDB, FAISS, pgvector)",
      "Retrieval-Augmented Generation (RAG) Architecture & Chunking Strategies",
      "Autonomous Multi-Agent Orchestration (Tools, Function Calling, Memory)"
    ]),
    recommendedProject: "Enterprise Document QA Copilot with Hybrid Search & Citations",
    estimatedHours: 40,
    difficulty: "Advanced",
  },
  {
    name: "Linear Algebra & Calculus",
    category: "Math & Stats",
    description: "Mathematical underpinnings of high-dimensional matrix transformations, gradients, and optimization.",
    whyItMatters: "Essential for understanding how loss functions optimize weights and how embeddings operate in hyperspace.",
    prerequisites: JSON.stringify(["High School Math"]),
    whatToLearn: JSON.stringify([
      "Vectors, Matrices, Dot Products, Matrix Multiplication",
      "Eigenvalues, Eigenvectors, and Matrix Decompositions (SVD)",
      "Partial Derivatives, Gradients, Jacobians, and Hessians",
      "Chain Rule in High Dimensions (Backpropagation engine)",
      "Convex Optimization and Constrained Optimization"
    ]),
    recommendedProject: "Building a Matrix Operations & Gradient Descent Engine from Scratch in Pure Python",
    estimatedHours: 25,
    difficulty: "Intermediate",
  },
  {
    name: "TypeScript & React",
    category: "Programming",
    description: "Modern typed frontend framework for building robust, scalable user interfaces.",
    whyItMatters: "Industry standard for web application interfaces, dashboards, and enterprise portals.",
    prerequisites: JSON.stringify(["HTML/CSS", "JavaScript"]),
    whatToLearn: JSON.stringify([
      "TypeScript Types, Interfaces, Generics, and Union types",
      "React Hooks (useState, useEffect, useMemo, useCallback, useRef)",
      "State Management (Zustand, Redux Toolkit, Context)",
      "Component Composition, Props, Custom Hooks",
      "Next.js App Router, Server Components, and SSR"
    ]),
    recommendedProject: "Full-Stack Collaborative Project Workspace with Real-time Sync",
    estimatedHours: 35,
    difficulty: "Intermediate",
  },
  {
    name: "Docker & Kubernetes",
    category: "Tools & DevOps",
    description: "Containerization and container orchestration for resilient cloud applications.",
    whyItMatters: "Ensures reproducible environments across development, staging, and multi-cloud production clusters.",
    prerequisites: JSON.stringify(["Linux Basics"]),
    whatToLearn: JSON.stringify([
      "Dockerfiles, Images, Containers, Port Mapping, Volume Mounts",
      "Docker Compose multi-service architecture",
      "Kubernetes Pods, Deployments, Services, Ingress, and ConfigMaps",
      "Helm Charts for package management",
      "Cluster scaling, health checks, and rolling deployments"
    ]),
    recommendedProject: "Containerized Microservices Cluster with Ingress Controller & Auto-scaling",
    estimatedHours: 30,
    difficulty: "Advanced",
  }
];

const careersData = [
  {
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Data & AI",
    description: "Extract actionable insights, build predictive statistical models, and guide executive decisions using data and machine learning.",
    averageSalary: "$125,000 - $165,000",
    demandLevel: "Very High",
    difficulty: "Challenging",
    icon: "BrainCircuit",
    skills: [
      { name: "Python", requiredLevel: "Advanced", priority: "Critical", phase: 1, phaseName: "Foundations", order: 1 },
      { name: "SQL", requiredLevel: "Advanced", priority: "Critical", phase: 1, phaseName: "Foundations", order: 2 },
      { name: "Statistics & Probability", requiredLevel: "Advanced", priority: "Critical", phase: 1, phaseName: "Foundations", order: 3 },
      { name: "Git & GitHub", requiredLevel: "Intermediate", priority: "High", phase: 1, phaseName: "Foundations", order: 4 },
      { name: "NumPy & Pandas", requiredLevel: "Advanced", priority: "Critical", phase: 2, phaseName: "Data Science Core", order: 1 },
      { name: "Exploratory Data Analysis (EDA) & Data Cleaning", requiredLevel: "Advanced", priority: "Critical", phase: 2, phaseName: "Data Science Core", order: 2 },
      { name: "Data Visualization (Matplotlib, Seaborn, Plotly)", requiredLevel: "Intermediate", priority: "High", phase: 2, phaseName: "Data Science Core", order: 3 },
      { name: "Machine Learning (Supervised & Unsupervised)", requiredLevel: "Advanced", priority: "Critical", phase: 3, phaseName: "Machine Learning", order: 1 },
      { name: "Feature Engineering & Preprocessing", requiredLevel: "Advanced", priority: "High", phase: 3, phaseName: "Machine Learning", order: 2 },
      { name: "Linear Algebra & Calculus", requiredLevel: "Intermediate", priority: "Medium", phase: 3, phaseName: "Machine Learning", order: 3 },
      { name: "Deep Learning & Neural Networks", requiredLevel: "Intermediate", priority: "High", phase: 4, phaseName: "Advanced AI", order: 1 },
      { name: "Natural Language Processing (NLP)", requiredLevel: "Intermediate", priority: "Medium", phase: 4, phaseName: "Advanced AI", order: 2 },
      { name: "Generative AI & LLMs", requiredLevel: "Intermediate", priority: "Medium", phase: 4, phaseName: "Advanced AI", order: 3 },
      { name: "Model Deployment & MLOps", requiredLevel: "Intermediate", priority: "High", phase: 5, phaseName: "Career Ready", order: 1 }
    ]
  },
  {
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Data & AI",
    description: "Design, optimize, and deploy scalable machine learning architectures, automated training pipelines, and high-throughput inference engines.",
    averageSalary: "$135,000 - $180,000",
    demandLevel: "Extremely High",
    difficulty: "Challenging",
    icon: "Cpu",
    skills: [
      { name: "Python", requiredLevel: "Advanced", priority: "Critical", phase: 1, phaseName: "Foundations", order: 1 },
      { name: "Linear Algebra & Calculus", requiredLevel: "Advanced", priority: "Critical", phase: 1, phaseName: "Foundations", order: 2 },
      { name: "Git & GitHub", requiredLevel: "Advanced", priority: "High", phase: 1, phaseName: "Foundations", order: 3 },
      { name: "NumPy & Pandas", requiredLevel: "Advanced", priority: "High", phase: 2, phaseName: "Core Data", order: 1 },
      { name: "Machine Learning (Supervised & Unsupervised)", requiredLevel: "Advanced", priority: "Critical", phase: 2, phaseName: "Core Data", order: 2 },
      { name: "Feature Engineering & Preprocessing", requiredLevel: "Advanced", priority: "High", phase: 2, phaseName: "Core Data", order: 3 },
      { name: "Deep Learning & Neural Networks", requiredLevel: "Advanced", priority: "Critical", phase: 3, phaseName: "Deep Learning & Scalability", order: 1 },
      { name: "Model Deployment & MLOps", requiredLevel: "Advanced", priority: "Critical", phase: 4, phaseName: "MLOps & Production", order: 1 },
      { name: "Docker & Kubernetes", requiredLevel: "Advanced", priority: "Critical", phase: 4, phaseName: "MLOps & Production", order: 2 },
      { name: "Generative AI & LLMs", requiredLevel: "Intermediate", priority: "High", phase: 5, phaseName: "Career Ready", order: 1 }
    ]
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer (Generative AI & LLMs)",
    category: "Data & AI",
    description: "Build production applications leveraging state-of-the-art Foundation Models, RAG pipelines, autonomous agent swarms, and vector retrieval.",
    averageSalary: "$140,000 - $190,000",
    demandLevel: "Extremely High",
    difficulty: "Challenging",
    icon: "Sparkles",
    skills: [
      { name: "Python", requiredLevel: "Advanced", priority: "Critical", phase: 1, phaseName: "Foundations", order: 1 },
      { name: "Git & GitHub", requiredLevel: "Advanced", priority: "High", phase: 1, phaseName: "Foundations", order: 2 },
      { name: "TypeScript & React", requiredLevel: "Intermediate", priority: "Medium", phase: 1, phaseName: "Foundations", order: 3 },
      { name: "Natural Language Processing (NLP)", requiredLevel: "Advanced", priority: "Critical", phase: 2, phaseName: "NLP & Embeddings", order: 1 },
      { name: "Deep Learning & Neural Networks", requiredLevel: "Intermediate", priority: "High", phase: 2, phaseName: "NLP & Embeddings", order: 2 },
      { name: "Generative AI & LLMs", requiredLevel: "Advanced", priority: "Critical", phase: 3, phaseName: "RAG & Agents", order: 1 },
      { name: "Model Deployment & MLOps", requiredLevel: "Intermediate", priority: "High", phase: 4, phaseName: "Deployment & Scale", order: 1 },
      { name: "Docker & Kubernetes", requiredLevel: "Intermediate", priority: "Medium", phase: 4, phaseName: "Deployment & Scale", order: 2 }
    ]
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Software Engineering",
    description: "Build end-to-end web applications, resilient backend architectures, intuitive responsive frontend UIs, and robust database layers.",
    averageSalary: "$110,000 - $155,000",
    demandLevel: "Very High",
    difficulty: "Intermediate",
    icon: "Layers",
    skills: [
      { name: "TypeScript & React", requiredLevel: "Advanced", priority: "Critical", phase: 1, phaseName: "Frontend Core", order: 1 },
      { name: "Git & GitHub", requiredLevel: "Advanced", priority: "Critical", phase: 1, phaseName: "Frontend Core", order: 2 },
      { name: "Python", requiredLevel: "Intermediate", priority: "High", phase: 2, phaseName: "Backend & APIs", order: 1 },
      { name: "SQL", requiredLevel: "Advanced", priority: "Critical", phase: 2, phaseName: "Backend & APIs", order: 2 },
      { name: "Docker & Kubernetes", requiredLevel: "Intermediate", priority: "High", phase: 3, phaseName: "DevOps & Containers", order: 1 },
      { name: "Model Deployment & MLOps", requiredLevel: "Beginner", priority: "Low", phase: 4, phaseName: "Cloud & Launch", order: 1 }
    ]
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    category: "Data & AI",
    description: "Transform raw data into meaningful business intelligence dashboards, KPI monitoring, and executive summaries.",
    averageSalary: "$85,000 - $120,000",
    demandLevel: "High",
    difficulty: "Intermediate",
    icon: "BarChart3",
    skills: [
      { name: "SQL", requiredLevel: "Advanced", priority: "Critical", phase: 1, phaseName: "Data Extraction", order: 1 },
      { name: "Statistics & Probability", requiredLevel: "Intermediate", priority: "Critical", phase: 1, phaseName: "Data Extraction", order: 2 },
      { name: "Python", requiredLevel: "Intermediate", priority: "High", phase: 2, phaseName: "Data Manipulation", order: 1 },
      { name: "NumPy & Pandas", requiredLevel: "Intermediate", priority: "High", phase: 2, phaseName: "Data Manipulation", order: 2 },
      { name: "Exploratory Data Analysis (EDA) & Data Cleaning", requiredLevel: "Advanced", priority: "Critical", phase: 2, phaseName: "Data Manipulation", order: 3 },
      { name: "Data Visualization (Matplotlib, Seaborn, Plotly)", requiredLevel: "Advanced", priority: "Critical", phase: 3, phaseName: "Storytelling & Dashboards", order: 1 },
      { name: "Git & GitHub", requiredLevel: "Beginner", priority: "Medium", phase: 3, phaseName: "Storytelling & Dashboards", order: 2 }
    ]
  },
  {
    slug: "cloud-devops-engineer",
    title: "Cloud & DevOps Engineer",
    category: "Cloud & Infrastructure",
    description: "Automate continuous integration and continuous deployment, infrastructure as code, cloud security, and cluster orchestration.",
    averageSalary: "$120,000 - $165,000",
    demandLevel: "Very High",
    difficulty: "Challenging",
    icon: "Cloud",
    skills: [
      { name: "Git & GitHub", requiredLevel: "Advanced", priority: "Critical", phase: 1, phaseName: "Foundations", order: 1 },
      { name: "Python", requiredLevel: "Intermediate", priority: "High", phase: 1, phaseName: "Foundations", order: 2 },
      { name: "Docker & Kubernetes", requiredLevel: "Advanced", priority: "Critical", phase: 2, phaseName: "Containerization", order: 1 },
      { name: "Model Deployment & MLOps", requiredLevel: "Intermediate", priority: "High", phase: 3, phaseName: "CI/CD & Automation", order: 1 },
      { name: "SQL", requiredLevel: "Intermediate", priority: "Medium", phase: 3, phaseName: "CI/CD & Automation", order: 2 }
    ]
  }
];

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clean existing records in correct order
  await prisma.recommendation.deleteMany();
  await prisma.learningProgress.deleteMany();
  await prisma.roadmapItem.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.skillGap.deleteMany();
  await prisma.studentSkill.deleteMany();
  await prisma.careerSkill.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.career.deleteMany();
  await prisma.skill.deleteMany();

  console.log("Creating Skills...");
  const createdSkills = {};
  for (const s of skillsData) {
    const skill = await prisma.skill.create({
      data: s,
    });
    createdSkills[skill.name] = skill;
  }

  console.log("Creating Careers & Career Skills...");
  const createdCareers = {};
  for (const c of careersData) {
    const { skills, ...careerFields } = c;
    const career = await prisma.career.create({
      data: careerFields,
    });
    createdCareers[career.slug] = career;

    for (const cs of skills) {
      const skillRecord = createdSkills[cs.name];
      if (skillRecord) {
        await prisma.careerSkill.create({
          data: {
            careerId: career.id,
            skillId: skillRecord.id,
            requiredLevel: cs.requiredLevel,
            priority: cs.priority,
            phase: cs.phase,
            phaseName: cs.phaseName,
            order: cs.order,
          },
        });
      }
    }
  }

  console.log("Creating Demo Student User: Vi...");
  const user = await prisma.user.create({
    data: {
      name: "Vi",
      email: "vi.student@skillpath.ai",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
  });

  const dsCareer = createdCareers["data-scientist"];

  const profile = await prisma.studentProfile.create({
    data: {
      userId: user.id,
      education: "2nd Year B.Tech",
      degree: "AI & Data Science",
      targetCareerId: dsCareer.id,
      experienceLevel: "Intermediate",
      weeklyStudyHours: 10,
      careerReadiness: 68.0,
      initialReadiness: 42.0,
      targetReadiness: 90.0,
    },
  });

  // Student's initial skills
  const studentSkillsData = [
    { name: "Python", level: "Intermediate" },
    { name: "SQL", level: "Beginner" },
    { name: "Statistics & Probability", level: "Beginner" },
    { name: "Git & GitHub", level: "Beginner" },
  ];

  for (const ss of studentSkillsData) {
    const skillRecord = createdSkills[ss.name];
    if (skillRecord) {
      await prisma.studentSkill.create({
        data: {
          profileId: profile.id,
          skillId: skillRecord.id,
          level: ss.level,
        },
      });
    }
  }

  // Calculate & insert Skill Gaps for Data Scientist target
  const dsCareerSkills = await prisma.careerSkill.findMany({
    where: { careerId: dsCareer.id },
    include: { skill: true },
  });

  const studentSkillMap = {
    Python: "Intermediate",
    SQL: "Beginner",
    "Statistics & Probability": "Beginner",
    "Git & GitHub": "Beginner",
  };

  const levelWeights = { None: 0, Beginner: 1, Intermediate: 2, Advanced: 3 };

  for (const cs of dsCareerSkills) {
    const current = studentSkillMap[cs.skill.name] || "None";
    const curVal = levelWeights[current];
    const reqVal = levelWeights[cs.requiredLevel];
    const gapDiff = reqVal - curVal;

    let status = "Missing";
    let gapLevel = "High";

    if (gapDiff <= 0) {
      status = "Strong";
      gapLevel = "None";
    } else if (gapDiff === 1 && curVal > 0) {
      status = "Developing";
      gapLevel = "Low";
    } else if (gapDiff === 1 && curVal === 0) {
      status = "Missing";
      gapLevel = "Moderate";
    } else if (gapDiff >= 2) {
      status = curVal > 0 ? "Developing" : "Missing";
      gapLevel = curVal > 0 ? "Moderate" : "Critical";
    }

    await prisma.skillGap.create({
      data: {
        profileId: profile.id,
        skillId: cs.skill.id,
        currentLevel: current,
        requiredLevel: cs.requiredLevel,
        gapLevel: gapLevel,
        status: status,
        priority: cs.priority,
        prerequisitesMet: true,
      },
    });
  }

  console.log("Creating Personalized Roadmap for Vi...");
  const roadmap = await prisma.roadmap.create({
    data: {
      profileId: profile.id,
      careerId: dsCareer.id,
      title: "Data Scientist Accelerated Learning Roadmap",
      totalHours: 140,
      completedHours: 45,
      status: "Active",
    },
  });

  for (const cs of dsCareerSkills) {
    let status = "Not Started";
    if (cs.skill.name === "Python") status = "Completed";
    else if (cs.skill.name === "Git & GitHub") status = "Completed";
    else if (cs.skill.name === "SQL") status = "Learning";
    else if (cs.skill.name === "Statistics & Probability") status = "Learning";
    else if (cs.skill.name === "NumPy & Pandas") status = "Learning";

    await prisma.roadmapItem.create({
      data: {
        roadmapId: roadmap.id,
        skillId: cs.skill.id,
        phase: cs.phase,
        phaseName: cs.phaseName,
        order: cs.order,
        status: status,
        estimatedHours: cs.skill.estimatedHours,
        priority: cs.priority,
        completedAt: status === "Completed" ? new Date() : null,
      },
    });
  }

  console.log("Creating Progress logs...");
  const progressEntries = [
    { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), readinessScore: 42.0, completed: 1, inProgress: 1, remaining: 12, hours: 10 },
    { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), readinessScore: 48.0, completed: 1, inProgress: 2, remaining: 11, hours: 22 },
    { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), readinessScore: 56.0, completed: 2, inProgress: 2, remaining: 10, hours: 34 },
    { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), readinessScore: 68.0, completed: 2, inProgress: 3, remaining: 9, hours: 45 },
  ];

  for (const p of progressEntries) {
    await prisma.learningProgress.create({
      data: {
        profileId: profile.id,
        date: p.date,
        readinessScore: p.readinessScore,
        skillsCompleted: p.completed,
        skillsInProgress: p.inProgress,
        skillsRemaining: p.remaining,
        hoursSpent: p.hours,
        notes: `Weekly milestone check. Maintained ${profile.weeklyStudyHours} hrs/week pace.`,
      },
    });
  }

  console.log("Creating AI Recommendations for Vi...");
  await prisma.recommendation.create({
    data: {
      profileId: profile.id,
      type: "NextSkill",
      title: "Machine Learning – Supervised Learning",
      description: "Master regression, classification, and validation pipelines using Scikit-Learn.",
      reason: "You have completed Python fundamentals and possess enough statistics knowledge to begin supervised machine learning.",
      estimatedTime: "6 hours",
      priority: "Critical",
      actionUrl: "/roadmap",
    },
  });

  await prisma.recommendation.create({
    data: {
      profileId: profile.id,
      type: "WeeklyGoal",
      title: "This Week's Focus Sprint",
      description: "Complete SQL Window Functions & Exploratory Data Analysis project.",
      reason: "Bridging your SQL gap will push your Career Readiness from 68% to 75%.",
      estimatedTime: "10 hours",
      priority: "High",
      actionUrl: "/dashboard",
    },
  });

  await prisma.recommendation.create({
    data: {
      profileId: profile.id,
      type: "Project",
      title: "Recommended Project: Student Performance Predictor",
      description: "Build an end-to-end regression model with Streamlit UI and GitHub CI/CD.",
      reason: "Demonstrates full-cycle data preparation, modeling, and storytelling to hiring managers.",
      estimatedTime: "12 hours",
      priority: "High",
      actionUrl: "/skills/machine-learning",
    },
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
