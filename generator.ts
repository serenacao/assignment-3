import { GeminiLLM } from './gemini-llm';

export interface File {
    name: string;
    content: string;
}

export interface Question {
    draft: string;
    accepted: boolean;
}

export class Generator {
    private question: string = "";
    private draft: string = "";
    private accepted: boolean = false;
    private feedbackHistory: string[] = [];


    async generate(question: string, llm: GeminiLLM, files: File[]): Promise<string> {
        if (!await this.isQuestion(question, llm)) {
            console.log('❌ The input is not a valid question.');
            return this.draft;
        }
        this.question = question;
        console.log('🤖 Requesting response from Gemini AI...');
        const prompt = this.createPrompt(files);
        const text = await llm.executeLLM(prompt);
        this.draft = text;
        return text;
    }

    edit(llm: GeminiLLM, newDraft: string): void {
        const oldDraft = this.draft;
        this.updateFeedback(llm, oldDraft, newDraft);
        this.draft = newDraft;
    }

    accept(): void {
        this.accepted = true;
    }

    async feedback(llm: GeminiLLM, comment: string): Promise<string> {
        if (!this.isFeedback(comment, llm)) { 
            console.error('❌ Please submit valid actionable feedback.'); 
            return this.draft; 
        }
        this.feedbackHistory.push(comment);
        const revised = await this.regenerateWithFeedback(llm);
        this.draft = revised;
        return this.draft
    }

    async isItem(prompt: string, llm: GeminiLLM): Promise<boolean> {
        const response = await llm.executeLLM(prompt);
        return response.trim().toLowerCase() === 'yes';
    }

    async isQuestion(input: string, llm: GeminiLLM): Promise<boolean> {
        const prompt = `You are a strict text classifier.

        Determine if the input is a message asking for help writing or improving materials related to a job, internship, or professional application.

        Classify as "Yes" if the message:

        Asks for writing or editing help with any professional application or profile content, such as:

        cover letters

        answers to “why fit” or other application questions

        personal statements

        LinkedIn summaries, professional bios, or resumes

        other materials for jobs, internships, or professional profiles

        Mentions a company, position, or platform (e.g., LinkedIn) OR clearly refers to professional writing (e.g., “Draft a LinkedIn summary,” “Write my bio for work”)

        Classify as "No" if the message:

        Is unrelated to job or professional applications

        Asks a general question, performs math, or contains only numbers, greetings, or casual conversation

        Respond with exactly one word: Yes or No
        Do not include any explanations or reasoning.

        Input: "${input}"
        Answer:`;
        return this.isItem(prompt, llm);
    }

    async isFeedback(input: string, llm: GeminiLLM): Promise<boolean> {
        const prompt = `You are a strict text classifier.

        Determine if the input is a message giving feedback or instructions about how to improve a piece of writing.

        Classify as "Yes" if the message:
        - Gives revision feedback, writing advice, or improvement instructions (e.g., "Make it more concise", "Improve the tone", "Add more detail about leadership").
        - Contains editing-related language such as revise, improve, clarify, shorten, reword, or adjust.
        - Could reasonably be interpreted as feedback on writing style, structure, or content.

        Classify as "No" if the message:
        - Is unrelated to writing feedback.
        - Asks a question, gives general information, or includes no feedback intent.

        Examples of "Yes":
        - "Make it more concise."
        - "Focus on leadership and impact."
        - "Revise the tone to sound more professional."
        - "Add a stronger conclusion."

        Examples of "No":
        - "Write me a cover letter."
        - "What is 1+1?"
        - "Hi there."
        - "Explain recursion."

        Respond with exactly one word: Yes or No.  
        Do not include any explanations or reasoning.

        Input: "${input}"

        Answer:`;
        return this.isItem(
            prompt, 
            llm);
    }

    async regenerateWithFeedback(llm: GeminiLLM): Promise<string> {
        const prompt = this.createFeedbackPrompt() + "\n\nCurrent draft:\n" + this.draft;
        const revised = await llm.executeLLM(prompt);
        return revised;
    }

    async updateFeedback(llm: GeminiLLM, oldDraft: string, newDraft: string): Promise<void> {
        if (oldDraft === newDraft) {
            return;
        }
        const prompt = `You are an assistant that analyzes revisions to writing.  
        You will be given two drafts of text: Draft A (original) and Draft B (revised).  

        Your task:
        1. Compare Draft A and Draft B.  
        2. Identify what types of changes were made (e.g., tone, clarity, structure, word choice, level of detail, formatting, conciseness).  
        3. Infer the possible feedback or instruction that caused those changes.  
        4. Return the feedback as a Python list of short, actionable strings.
        5. Output only the Python list—no explanations, no extra text.

        Example:  
        - If Draft A is casual and Draft B is more formal, the feedback might be: ["Write with a more professional tone."] 
        - If Draft A rambles and Draft B is shorter, the feedback might be: ["Be more concise and remove unnecessary detail."]

        ---

        Draft A:  
        ${oldDraft}

        Draft B:  
        ${newDraft}

        Output:`;

        const text = await llm.executeLLM(prompt);

        try {
            const feedback: string[] = JSON.parse(text);
            if (Array.isArray(feedback)){
                this.feedbackHistory.push(...feedback);
            } else {
                console.error('❌ Parsed feedback is not an array:', feedback);
            }
        } catch (error) {
            console.error('❌ Error parsing feedback from LLM:', (error as Error).message);
        }
        
    }

    private createFeedbackPrompt(): string {
        let prompt = `The user has provided the following feedback on the draft:\n`;
        this.feedbackHistory.forEach((fb, index) => {
            prompt += `${index + 1}. ${fb}\n`;
        });
        prompt += `Please revise the draft accordingly.
        Rules:
            - Do NOT include greetings, explanations, or meta-commentary.
            - Output only the revised text.
            - Maintain the tone and style suitable for a professional job application.`;
        return prompt;
    }

    private createPrompt(files: File[]): string {
        return `You are an expert job application writer. Use the following files as context:\n` +
            files.map(f => `File: ${f.name}\nContent: ${f.content}\n`).join('') +
            `\nUser question: "${this.question}".
            Instructions: Respond directly and only with the answer to the question. Do NOT include greetings, explanations, or extra commentary. Output only the requested text.
            `;
    }
}