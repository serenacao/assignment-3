/**
 * Generator Test Cases
 * 
 * Demonstrates text generation and feedback using GeminiLLM
 */

import { Generator, File } from './generator';
import { GeminiLLM, Config } from './gemini-llm';

/**
 * Load configuration from config.json
 */
function loadConfig(): Config {
    try {
        const config = require('../config.json');
        return config;
    } catch (error) {
        console.error('❌ Error loading config.json. Please ensure it exists with your API key.');
        console.error('Error details:', (error as Error).message);
        process.exit(1);
    }
}

const resume1 = `
Alice Smith

Software Engineer — 3 years experience at TechCorp
alice.smith@email.com
 · (555) 012-3456 · San Francisco, CA · linkedin.com/in/alice-smith

Professional Summary

Practical and results-driven Software Engineer with 3 years building scalable front-end and full-stack features at TechCorp. Comfortable owning features end-to-end: design, implementation, testing, and deployment. Passionate about product-driven development, readable code, and mentoring junior engineers.

Technical Skills

Languages: JavaScript (ES6+), TypeScript, Python, SQL

Frameworks & Tools: React, Node.js, Express, Next.js, REST APIs, GraphQL

Testing & CI: Jest, React Testing Library, GitHub Actions

Cloud & Datastores: AWS (S3, Lambda), Docker, PostgreSQL

Others: Agile/Scrum, design systems, performance optimization, code review

Professional Experience

TechCorp — Software Engineer
June 2022 - Present (3 years)

Led development of a reusable React component library used across 6 product teams, reducing UI duplication and accelerating feature delivery by ~30%.

Owned the end-to-end implementation of a customer-facing dashboard: designed API contracts, implemented React front-end and Node.js backend endpoints, and added analytics instrumentation; contributed to a 12% increase in feature adoption.

Improved page load performance by optimizing bundle splitting and lazy-loading critical routes — decreased Time to Interactive (TTI) by 40% on key flows.

Implemented automated testing and CI pipelines (Jest + GitHub Actions), raising test coverage on core modules from 28% to 78%.

Mentored 2 junior engineers, ran weekly code review sessions, and helped establish team best practices for component documentation and accessibility.

Early Projects / Contract Work
Freelance & internal initiatives

Built a small ETL tool in Python to normalize client CSVs into a canonical format and load into Postgres — reduced manual preprocessing time by 90%.

Created a prototype A/B experiment runner to validate UX changes on landing pages, instrumented with lightweight analytics events.

Selected Projects

Feature Flagging System (internal) — Designed a lightweight feature-flag service and client library that enabled safe rollouts and instant rollbacks across environments.
Mobile-first Checkout Flow — Rebuilt checkout UI with accessibility and mobile performance priorities; conversion improved in low-bandwidth tests.

Education

B.S., Computer Science  — MIT
Graduation: 2021 

Interests

Technical writing, open-source contributions, mentoring, cycling.
`;

const resume2 = `
Data Scientist — 5 years experience at DataWorks
bob.lee@email.com
 · (555) 987-6543 · New York, NY · linkedin.com/in/bob-lee

Professional Summary

Analytical and product-minded Data Scientist with 5 years at DataWorks building ML models and data products that drive business decisions. Experienced in end-to-end model lifecycle: problem framing, feature engineering, model development, deployment, monitoring, and cross-functional communication. Strong background in experimentation, causal inference, and production ML systems.

Technical Skills

Languages: Python, SQL, R

ML & Libraries: scikit-learn, XGBoost, LightGBM, TensorFlow, PyTorch

Data Engineering: Spark, Airflow, ETL pipelines, data warehousing (BigQuery / Redshift)

MLOps & Deployment: Docker, Kubernetes, MLflow, AWS (S3, SageMaker)

Statistics & Methods: A/B testing, causal inference, time series forecasting, survival analysis

Tools: Jupyter, Git, Looker/Metabase, Tableau

Professional Experience

DataWorks — Data Scientist
May 2020 - Present (5 years)

Led development and deployment of a customer churn prediction model using gradient-boosted trees and engineered temporal features, reducing churn by an estimated 8% through targeted retention campaigns.

Designed and executed randomized experiments (A/B tests) for pricing and onboarding flows; translated results into actionable product changes that increased trial-to-paid conversion by 6%.

Built a scalable feature store and automated pipelines (Airflow + Spark) to enable reproducible model training and reduce feature extraction time by ~60%.

Partnered with product and engineering teams to productionize demand-forecasting models for supply allocation; improved forecast accuracy (MAPE) by 18% year-over-year.

Implemented model monitoring and drift detection (MLflow + custom alerts), enabling quicker retraining and reducing degraded-model incidents.

Mentored junior data scientists and hosted monthly brown-bag sessions on interpretable ML and model evaluation.

DataWorks — Analytics Contractor (earlier projects)

Created interactive dashboards and KPI tracking for business stakeholders, leading to faster decision cycles for marketing and ops teams.

Performed cohort analysis and lifetime value (LTV) modeling to support strategic prioritization of customer segments.

Selected Projects

Real-time Recommendation Service — Prototyped and helped deploy a lightweight recommendation microservice using embeddings and approximate nearest neighbors to increase engagement on personalized pages.
Marketing Mix Modeling — Led a Bayesian regression analysis to quantify channel ROI and reallocate budget to higher-performing channels, improving efficiency.

Education

M.S., Data Science — University of Washington
B.S., Statistics / Computer Science — Harvard
Graduation years: 2024
`;

const resume3 =  `
Carol Chen

Product Manager — 4 years experience at InnovateX
carol.chen@email.com
 · (555) 456-7890 · Seattle, WA · linkedin.com/in/carol-chen 

Professional Summary

Strategic and user-focused Product Manager with 4 years at InnovateX leading cross-functional teams to deliver impactful SaaS and mobile products. Experienced in product discovery, data-driven prioritization, and iterative delivery. Skilled at translating complex business goals into actionable product roadmaps that align user needs with company strategy.

Core Skills

Product Strategy & Roadmapping

Agile / Scrum, Sprint Planning

User Research, A/B Testing, Analytics (Amplitude, Mixpanel)

Stakeholder Management & Cross-functional Leadership

UX Collaboration & Design Thinking

Metrics Definition & KPI Tracking

Tools: Jira, Figma, Confluence, SQL, Notion, Tableau

Professional Experience

InnovateX — Product Manager
July 2021 - Present (4 years)

Owned the end-to-end lifecycle of a B2B analytics dashboard that scaled to 10k+ active enterprise users; improved retention by 15% through iterative design improvements.

Defined and prioritized quarterly product roadmaps based on user feedback, data insights, and stakeholder input, balancing short-term delivery with long-term vision.

Partnered with engineering and design teams to launch 12+ product features, including workflow automation tools that reduced customer setup time by 40%.

Led rollout of an AI-powered recommendation feature by defining success metrics, coordinating across data science and engineering, and presenting results to leadership.

Introduced a structured feedback loop using NPS and user interviews, leading to a 25% increase in customer satisfaction scores within one year.

Collaborated with marketing and sales on go-to-market strategies, creating product briefs and demo scripts that supported successful launches.

InnovateX — Associate Product Manager
July 2020 - July 2021

Conducted market research and competitor analysis to inform roadmap decisions for the company's new integrations platform.

Managed backlog grooming and sprint planning for a team of 6 engineers, ensuring alignment on delivery timelines and dependencies.

Analyzed feature adoption data and recommended refinements that improved onboarding flow completion rates by 18%.

Selected Projects

Automation Builder — Spearheaded MVP design and launch of a drag-and-drop workflow builder that became a key differentiator for enterprise clients.
Customer Insights Dashboard — Collaborated with design and analytics to build a unified reporting experience, enabling customers to visualize ROI metrics in real time.

Education

B.S., Business Administration (Product Management Track) — UIUC
Graduation: 2020
`;

/**
 * Test case 1: Basic generation
 * Demonstrates generating a draft from files and a question
 * User enters a question, uploads files, and the LLM generates a draft
 * Prompt variants:
 * 
 * question = 'Explain in 250 words or less why ZipRecruiter interests you.'
 * question = 'Explain in 250 words or less why you would be a good fit for this role. Google, software dev.'
 * 
 */
export async function testBasicGeneration(): Promise<void> {
    console.log('\n🧪 TEST CASE 1: Basic Generation');
    console.log('=================================');

    const files: File[] = [
        { name: 'resume.txt', content: resume1 },
        { name: 'coverletter.txt', content: 'Dear Hiring Manager,\nI am excited to apply for ' }
    ];
    const question = 'Write a cover letter for Microsoft software dev.';
    const generator = new Generator();
    const config = loadConfig();
    const llm = new GeminiLLM(config);

    const draft = await generator.generate(question, llm, files);
    console.log('\n📝 Generated Draft:\n', draft);
}

/**
 * Test case 2: Feedback and revision
 * User is providing feedback and the LLM is updating the draft
 */
export async function testFeedbackRevision(): Promise<void> {
    console.log('\n🧪 TEST CASE 2: Feedback and Revision');
    console.log('======================================');

    const files: File[] = [
        { name: 'resume.txt', content: resume2 }
    ];
    const question = 'Draft a LinkedIn summary.';
    const generator = new Generator();
    const config = loadConfig();
    const llm = new GeminiLLM(config);

    let draft = await generator.generate(question, llm, files);
    console.log('\n📝 Initial Draft:\n', draft);

    // Simulate user feedback and revision
    const feedback = 'Make it more concise and highlight leadership.';
    draft = await generator.feedback(llm, feedback);
    console.log('\n📝 Revised Draft after Feedback:\n', draft);
}

/**
 * Test case 3: User edits LLM output and LLM reflects on the edit
 * Demonstrates the LLM analyzing user edits and providing feedback
 */
export async function testUserEditReflection(): Promise<void> {
    console.log('\n🧪 TEST CASE 3: User Edit Reflection');
    console.log('======================================');

    const files: File[] = [
        { name: 'resume.txt', content: resume3 }
    ];
    const question = 'Write in 250 words or less why you would be a good fit for software engineer at Microsoft.';
    const generator = new Generator();
    const config = loadConfig();
    const llm = new GeminiLLM(config);

    let draft = await generator.generate(question, llm, files);
    console.log('\n📝 Initial Draft:\n', draft);

    // Simulate user editing the draft directly
    const userEdit = draft + '\nI am passionate about user experience and cross-functional teamwork.';
    console.log('\n✏️ User Edited Draft:\n', userEdit);

    // LLM reflects on the user edit
    await generator.updateFeedback(llm, draft, userEdit);
}

/**
 * Test case 4: Bad question prompt
 * Checks how the system handles a confusing/unspecific prompt
 */
export async function testBadQuestionPrompt(): Promise<void> {
    console.log('\n🧪 TEST CASE 4: Bad Question Prompt');
    console.log('======================================');

    const files: File[] = [
        { name: 'resume.txt', content: resume1 }
    ];
    // Create an unspecific question
    const question = 'Explain in detail: why you want this job, and how your experience fits.';
    const generator = new Generator();
    const config = loadConfig();
    const llm = new GeminiLLM(config);

    try {
        const draft = await generator.generate(question, llm, files);
        console.log('\n📝 Generated Draft (truncated):\n', draft.slice(0, 500) + (draft.length > 500 ? '... [truncated]' : ''));
    } catch (error) {
        console.error('❌ Error with long question prompt:', (error as Error).message);
    }
}

/**
 * Test case 5: Faulty feedback
 * Checks how the LLM handles empty or invalid feedback
 */
export async function testFaultyFeedback(): Promise<void> {
    console.log('\n🧪 TEST CASE 5: Faulty Feedback and Revision');
    console.log('======================================');

    const files: File[] = [
        { name: 'resume.txt', content: resume2 }
    ];
    const question = 'Draft a LinkedIn summary.';
    const generator = new Generator();
    const config = loadConfig();
    const llm = new GeminiLLM(config);

    let draft = await generator.generate(question, llm, files);
    console.log('\n📝 Initial Draft:\n', draft);

    // Simulate user feedback and revision
    try {
        const feedback = '32.';
        draft = await generator.feedback(llm, feedback);
        console.log('\n📝 Revised Draft after Feedback:\n', draft);
    } catch (error) {
        console.error('❌ Error with faulty feedback:', (error as Error).message);
    }
    
}

/**
 * Main function to run all test cases
 */
async function main(): Promise<void> {
    console.log('📝 Generator Test Suite');
    console.log('========================\n');

    try {
        await testBasicGeneration();
        await testFeedbackRevision();
        await testUserEditReflection();
        await testBadQuestionPrompt();
        await testFaultyFeedback();
        console.log('\n🎉 All generator test cases completed successfully!');
    } catch (error) {
        console.error('❌ Test error:', (error as Error).message);
        process.exit(1);
    }
}

// Run the tests if this file is executed directly
if (require.main === module) {
    main();
}
