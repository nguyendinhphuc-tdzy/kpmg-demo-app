export const CURRENT_USER_ID = 'user_123';
export const ALL_DEPARTMENTS = ["All Departments", "Partner", "Tax & Legal", "Finance", "Consulting", "Audit", "Deal", "Shared Services"];
export const ALL_TASKS = ["All Tasks", "Analysis", "Data Extraction", "Write Email", "Compare", "Content Creation", "Job Description"];

export const MOCK_PROMPTS = [
     // Prompts KHÔNG THUỘC Partner (đã giữ lại)
     {
         id: 1,
         status: 'public', // 'public', 'private', 'pending'
         ownerId: 'kpmg_admin', // ID của người tạo
         tags: { department: 'Tax & Legal', task: 'Analysis' },
         stats: { use_count: 152, rating: 4.3, rating_count: 120, userRating: 4, reviews: [] },
         isSaved: true,
         title: "Contract Review and Analysis",
         description: "Automatically identify languages, check grammar, and verify legal references in contracts.",
         details: {
             value: "Reduces initial contract review time by 40% and ensures no critical Vietnamese regulatory references are missed.",
             benefit: "Increases accuracy in multilingual contracts and standardizes initial legal triage.",
             whenToUse: "Use when receiving new vendor contracts, NDAs, or bilingual service agreements."
         },
         exampleResult: "## Language Detection\n- Detected: English (Primary), Vietnamese (Secondary)\n\n## Legal Verification\n| Law Cited | Status | Notes |\n|---|---|---|\n| Commercial Law No. 36/2005/QH11 | Active | Applicable to Art. 4 |\n| Civil Code No. 91/2015/QH13 | Active | Foundation for liability section |",
         template: "You are an advanced multilingual legal AI.\nAnalyze document: [Document Name]\n1. Detect languages.\n2. Proofread [Target Language] sections for grammar.\n3. Verify status of these Vietnamese laws: [List of Laws]\nProvide output in a structured table."
     },
     {
         id: 2,
         status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'Finance', task: 'Data Extraction' },
         stats: { use_count: 210, rating: 4.8, rating_count: 185, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Invoice Data Extraction",
         description: "Extract invoice number, date, total amount, and vendor details from images or PDFs.",
         details: {
             value: "Automates manual data entry for AP teams, reducing errors by 95%.",
             benefit: "Faster month-end close and real-time spend visibility.",
             whenToUse: "Use for processing high volumes of non-standard vendor invoices."
         },
         exampleResult: "{\n  \"invoice_code\": \"INV-2024-001\",\n  \"date\": \"2024-01-15\",\n  \"total_amount\": 1500.00,\n  \"currency\": \"USD\",\n  \"vendor\": \"Acme Corp\"\n}",
         template: "Extract the following fields from the invoice text below:\n- Invoice Code\n- Invoice Date (YYYY-MM-DD)\n- Total Amount (numeric)\n- Vendor Name\n\nInvoice Text:\n[Paste Invoice Text Here]\n\nOutput as JSON only."
     },
     {
         id: 3, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'All Departments', task: 'Analysis' },
         stats: { use_count: 95, rating: 3.5, rating_count: 20, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Advanced Document Translation",
         description: "Translate the content in the document into the target language with high accuracy, preserving formatting...",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an expert AI translator specializing in technical and business documents. You are fluent in both the source language and [Target Language (e.g., English)].\n\n INPUT \n- Document: [Document/Image Link]\n- Target Language: [Target Language (e.g., English)]\n- Tone: [Tone of voice (e.g., Formal, Professional)]\n- Target Audience: [Target Audience (e.g., Internal Team, External Clients, Legal Dept)]\n\nTASK \nTranslate the content from the document into the target language.\n\n REQUIREMENTS \n1.  High-Fidelity Translation: The translation must be accurate, fluent, and preserve the original meaning and nuance.\n2.  Formatting Preservation: Maintain *all* original formatting, including headers, sub-headers, bullet points, numbered lists, tables, and text styling (bold, italics).\n3.  Terminology Handling: Correctly handle and translate technical terminology, industry jargon, and multi-language content within the document.\n4.  Untranslatable Terms: Do not translate brand names, proper nouns, or specific legal codes unless explicitly requested. Keep them in their original form.\n\n OUTPUT \nProvide *only* the full, translated text below, ready for use."
     },
     {
         id: 4, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'All Departments', task: 'Analysis' },
         stats: { use_count: 180, rating: 4.5, rating_count: 150, userRating: 5, reviews: [] },
         isSaved: true,
         title: "Report Summary and Analysis",
         description: "Summarize the main points of the report and analyze any highlighted...",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are a senior AI data analyst assistant. Your task is to read, understand, and provide a structured analysis of complex reports.\n\n INPUT \n- Report: [Document/Report Link]\n- Focus Area: [Highlighted Section]\n- Tone: [Tone of voice (e.g., Analytical, Concise)]\n\n TASK \nRead the provided report and generate a structured summary and analysis. The output must be presented in the specified tone.\n\n OUTPUT STRUCTURE \n\n1. Executive Summary\n- Provide 3-5 key bullet points that summarize the entire report's findings.\n\n2. Detailed Analysis: [Highlighted Section]\n- Provide a detailed breakdown and analysis of the specified focus area.\n- What are the main findings or issues in this section?\n\n3. Key Data & Trends\n- List any significant data points, statistics, or trends you identified from the report.\n\n4. Actionable Recommendations\n- Based on the report's findings, suggest 1-3 actionable recommendations.\n\n*(Self-Correction: Do not generate charts. Instead, describe the data and trends in text.)*"
     },
     {
         id: 5, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'All Departments', task: 'Write Email' },
         stats: { use_count: 115, rating: 3.8, rating_count: 90, userRating: 0, reviews: [] },
         isSaved: false,
         title: "B2B Cold Call Script",
         description: "Draft a cold call script for a salesperson to introduce a service/product...",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are a master B2B sales scriptwriter, expert in creating engaging, persuasive, and natural-sounding cold call scripts.\n\n INPUT \n- Target Customer Profile: [Target Customer]\n- Service/Product: [Service/Product]\n- Key Benefit: [Single most important benefit]\n- Common Objection 1: [Objection 1 (e.g., I'm busy)]\n- Common Objection 2: [Objection 2 (e.g., It's too expensive)]\n- Call Objective: [Objective (e.g., Secure a 15-min demo appointment)]\n\n TASK \nDraft a complete cold call script, including transitions. The script should be concise and easy to deliver.\n\n SCRIPT OUTPUT \n\n1. Opener (Attention-Grabbing & Pattern Interrupt)\n- [Draft opener that breaks from the typical \"Hi, my name is...\" and mentions the Target Customer's context]\n\n2. Value Proposition (Concise & Benefit-Driven)\n- [Draft 1-2 sentences clearly stating the value of the [Service/Product] specifically for the [Target Customer]]\n\n3. Handling Objections (Acknowledge, Pivot, Re-close)\n- Objection 1: [Objection 1]\n  - Response: [Draft response]\n- Objection 2: [Objection 2]\n  - Response: [Draft response]\n\n4. Call to Action (Clear & Low-Friction)\n- [Draft the closing question to achieve the [Objective]]\n\n5. Follow-up Email Template (If VM or No Answer)\n- Subject: [Draft subject line]\n- Body: [Draft concise email body referencing the call attempt and value prop]"
     },
     {
         id: 6, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'Tax & Legal', task: 'Compare' },
         stats: { use_count: 80, rating: 4.1, rating_count: 65, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Regulation Comparison",
         description: "Compare the regulations in the document with current Vietnamese laws and highlight changes...",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an AI legal-tech specialist with expertise in Vietnamese regulatory comparison.\n\n INPUT \n- Document 1: [Old Regulation/Document 1]\n- Document 2: [New Regulation/Current Vietnamese Law]\n- Translation (if needed): [Target Language]\n- Tone: [Tone of voice (e.g., Legal, Clear)]\n\n TASK \nPerform a detailed, section-by-section comparison of the two documents. The output must be in the specified tone.\n\n OUTPUT STRUCTURE \n\n1. Executive Summary of Key Changes\n- Provide a high-level overview (3-5 bullet points) of the most critical differences or new provisions found in Document 2.\n\n2. Detailed Comparative Analysis\n- Present the comparison in a structured table format for clarity.\n\n| Section / Topic | [Old Regulation/Document 1] | [New Regulation/Current Vietnamese Law] | Analysis of Change |\n|---|---|---|---|\n| [Section 1 Title] | [Summary of content] | [Summary of content] | [e.g., 'New requirement added', 'Threshold changed from X to Y', 'Section removed'] |\n| [Section 2 Title] | ... | ... | ... |\n\n3. Translation of Critical Sections (if requested)\n- If a [Target Language] was specified, provide the translation for any sections identified as critical in the analysis.\n"
     },
     {
         id: 7, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'All Departments', task: 'Compare' },
         stats: { use_count: 50, rating: 4.0, rating_count: 10, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Scan Data Comparison",
         description: "Read & Extract information from Scanned Documents. Compare extracted data with form data to detect discrepancies.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are a high-precision AI data auditor. Your task is to find discrepancies between a scanned document and a data source.\n\n INPUT \n- Source 1 (Scanned): [Scanned Document Link]\n- Source 2 (Data): [Form Data Link/Source]\n\n TASK \n1.  Read and extract all relevant information from Source 1.\n2.  Compare the extracted data field-by-field against Source 2.\n3.  Identify and list all discrepancies, missing information, or mismatches found.\n\n OUTPUT REPORT \n\nData Reconciliation Report\n--------------------------------\nSummary: [e.g., 3 discrepancies found.]\n\nDiscrepancy List:\n\n- Field: [Field Name 1]\n  - Value in [Scanned Document Link]: [Value]\n  - Value in [Form Data Link/Source]: [Value]\n\n- Field: [Field Name 2]\n  - Value in [Scanned Document Link]: [Value]\n  - Value in [Form Data Link/Source]: [Value]\n\n- Field: [Field Name 3]\n  - Value in [Scanned Document Link]: [Value] (e.g., Not Found)\n  - Value in [Form Data Link/Source]: [Value]\n\n(If no discrepancies are found, state \"No discrepancies found.\")"
     },
     {
         id: 8, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'Consulting', task: 'Analysis' },
         stats: { use_count: 35, rating: 4.2, rating_count: 8, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Company Screening and Analysis",
         description: "Extract data from documents, standardize it, apply scoring algorithms, and rank companies based on criteria.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an expert AI business and M&A analyst. Your task is to screen and rank companies based on specific criteria.\n\n INPUT \n- Data Source: [Document/Data Source]\n- Screening Criteria: [List Criteria (e.g., scale, industry, financial status, location)]\n- Weighting (Optional): [e.g., financial status (40%), scale (30%)]\n\n TASK \nPerform a screening of companies from the data source against the criteria.\n\n OUTPUT STRUCTURE \n\n1. Scoring Methodology\n- Explain the scoring logic applied (e.g., \"Companies were scored 1-5 for each criterion. Weighting was applied as specified.\")\n\n2. Ranked List of Companies\n- Present a table of all screened companies, ranked by their total score.\n| Rank | Company Name | Score | Key Finding |\n|---|---|---|---|\n| 1 | ... | ... | ... |\n| 2 | ... | ... | ... |\n\n3. Qualitative Report (Top 3)\n- Provide a brief qualitative summary for the top 3 ranked companies, explaining why they scored highly based on the [List Criteria].\n\n4. Visuals (Text-based)\n- Generate a simple text-based bar chart or summary graphic representing the score distribution."
     },
     {
         id: 9, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'All Departments', task: 'Analysis' },
         stats: { use_count: 70, rating: 4.6, rating_count: 22, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Team Budget Planning & Analysis",
         description: "Consolidate data from multiple sources (ERP, Excel), forecast costs, and detect spending anomalies.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an expert AI Financial Planning & Analysis (FP&A) assistant.\n\n INPUT \n- Data Source: [Budget Data Source (e.g., ERP export, Excel sheet)]\n- Team/Department: [Team/Department Name]\n- Time Period for Forecast: [Time Period]\n\n TASK \nAnalyze the provided budget data, forecast costs, and identify anomalies.\n\n OUTPUT REPORT \n\n1. Data Consolidation Summary\n- [State that data from [Budget Data Source] has been consolidated.]\n\n2. Predictive Cost Forecast\n- Provide a cost forecast for the [Time Period] based on historical data and trends.\n- [e.g., \"Forecasted spend for [Time Period] is $X, a Y% increase/decrease driven by...\"].\n\n3. Anomaly Detection (Top 5)\n- Identify the top 5 most significant anomalies, non-compliant costs, or budget deviations. Provide a brief explanation for each.\n  1. [Anomaly 1: e.g., $500 spend on 'Uncategorized' - Explanation: Lacks proper coding.]\n  2. ...\n\n4. Dashboard Recommendations (Text-based)\n- Describe 3 key charts that should be on a dashboard for this data:\n  1. Budget vs. Actual by Cost Category: [Description]\n  2. Monthly Cost Trend (Last 6 Months): [Description]\n  3. Top 5 Expense Categories by Variance: [Description]"
     },
     {
         id: 10, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'All Departments', task: 'Write Email' },
         stats: { use_count: 120, rating: 4.7, rating_count: 45, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Smart Email Drafting",
         description: "Automatically draft emails using templates and dynamic data, understanding context and customizing tone.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an expert AI business communication assistant. You write clear, concise, and effective emails.\n\n INPUT \n- Context: [Provide communication context (e.g., Resignation notice, Confirmation of meeting, Reminder for overdue task)]\n- Recipient: [Recipient Name/Role (e.g., My Manager, Client, Project Team)]\n- Key Information: [List all key data points, names, deadlines, task details to include]\n- Tone: [Tone of voice (e.g., Formal, Professional, Friendly, Persuasive)]\n- Desired Outcome: [What should the recipient do or know after reading this? (e.g., Confirm the time, Approve the request, Be aware of the change)]\n\n TASK \nDraft a complete email based on the inputs. Provide 2-3 subject line options.\n\n OUTPUT \n\nSubject Options:\n1. [Subject 1]\n2. [Subject 2]\n\nEmail Body:\n\n[Drafted email body, formatted professionally]"
     },
     {
         id: 11, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'All Departments', task: 'Write Email' },
         stats: { use_count: 85, rating: 4.3, rating_count: 15, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Email Reminder Sequence Drafting",
         description: "Set up an automated email reminder and send a follow-up if no response is received after the deadline.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an AI assistant skilled in creating effective and automated communication workflows.\n\n INPUT \n- Context: We need to remind [Recipient Role (e.g., All Employees, Project Team)] about [Task/Deadline (e.g., completing the compliance training)].\n- Deadline: [Date/Time of deadline]\n\n- Initial Reminder (to be sent [Time before deadline, e.g., 3 days before])\n  - Tone: [e.g., Friendly, Professional]\n  - Key Info: [Details of the task, link to training, time required]\n\n- Follow-up Reminder (to be sent [Time after deadline, e.g., 1 day after] if no response/completion)\n  - Tone: [e.g., Firm, Urgent, Final Notice]\n  - Key Info: [Reiterate deadline has passed, importance of completion, consequences if any]\n\n TASK \nGenerate the subject line and body text for both emails in the sequence.\n\n OUTPUT \n\n EMAIL 1: INITIAL REMINDER \n\nSubject: [Drafted subject line]\n\nBody:\n[Drafted body text for the initial reminder]\n\n EMAIL 2: FOLLOW-UP (NO RESPONSE) \n\nSubject: [Drafted subject line for follow-up]\n\nBody:\n[Drafted body text for the follow-up reminder]"
     },
     {
         id: 12, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'Audit', task: 'Analysis' },
         stats: { use_count: 45, rating: 4.1, rating_count: 10, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Key Risk Identification from Financials",
         description: "Analyze a provided trial balance or financial statement to identify key risk areas for the audit plan.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an AI Audit Analyst. Your expertise is in financial statement analysis and risk assessment based on ISA (International Standards on Auditing).\n\n INPUT \n- Data: [Link to Trial Balance / Financial Statements]\n- Client Industry: [Client Industry (e.g., Manufacturing, Retail)]\n- Prior Year Issues (Optional): [List any known issues from prior year audit]\n\n TASK \nAnalyze the provided financial data in the context of the client's industry. Identify the top 5 key risk areas for the upcoming audit.\n\n OUTPUT STRUCTURE \n\nAudit Risk Assessment Report\n--------------------------------\nBased on the analysis of [Link to Trial Balance / Financial Statements], the following top 5 risks are identified:\n\n1.  Risk: [e.g., Revenue Recognition]\n    Indicator: [e.g., Significant increase in sales (25%) in Q4, above industry average.]\n    Why it's a Risk: [e.g., Potential for management override to meet year-end targets. Risk of cutoff errors.]\n\n2.  Risk: [e.g., Inventory Valuation]\n    Indicator: [e.g., Inventory turnover days increased from 60 to 90 days.]\n    Why it's a Risk: [e.g., Indicates slow-moving stock. High risk of obsolescence and overvaluation.]\n\n3.  Risk: ...\n4.  Risk: ...\n5.  Risk: ..."
     },
     {
         id: 13, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'Audit', task: 'Write Email' },
         stats: { use_count: 60, rating: 4.3, rating_count: 15, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Audit Procedure Explanation (Client Email)",
         description: "Draft a clear, non-technical explanation of a specific audit procedure (e.g., sample testing) for a client.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are a Senior Audit Manager. You are skilled at communicating complex audit concepts to clients in simple, clear, and professional language.\n\n INPUT \n- Audit Procedure: [Name of procedure (e.g., Accounts Receivable Confirmation)]\n- Client Contact Name: [Client Name]\n- Reason for Email: [e.g., To request their help in the process]\n- Tone: [Professional, Friendly]\n\n TASK \nDraft an email to the client explaining what the [Name of procedure] is, why we perform it, and what (if anything) we need from them.\n\n OUTPUT \n\nSubject: Audit Update: Our [Name of procedure] Process\n\nEmail Body:\n\nDear [Client Name],\n\nI hope this email finds you well.\n\nAs part of our ongoing audit, we will be performing a procedure called [Name of procedure]. I wanted to take a moment to briefly explain what this is and why we do it.\n\nWhat is [Name of procedure]?\n[Provide a 1-2 sentence, non-technical explanation. e.g., For AR Confirmation: 'This is a standard procedure where we independently verify the account balances your customers owe you as of the year-end.']\n\nWhy do we do this?\n[Provide a 1-sentence benefit-driven reason. e.g., 'This helps us confirm the accuracy of your financial statements in the Accounts Receivable area.']\n\nWhat we need from you:\n[Clearly list any action items. e.g., 'To do this, we will shortly provide a list of customers we've selected. We would appreciate your team's assistance in providing contact information for these customers.']\n\nThank you for your cooperation. Please let me know if you have any questions.\n\nBest regards,\n\n[Your Name]\nSenior Audit Manager"
     },
     {
         id: 14, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'Deal', task: 'Analysis' },
         stats: { use_count: 55, rating: 4.7, rating_count: 18, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Due Diligence Red Flag Summary",
         description: "Review a data room index or set of documents to summarize potential 'red flag' issues for a due diligence report.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are a Senior M&A Due Diligence Analyst. You have a sharp eye for identifying critical risks, deal-breakers, and 'red flags' from limited information.\n\n INPUT \n- Data Source: [Link to Data Room Index / List of Documents]\n- Transaction Type: [e.g., Acquisition of Target by Client]\n- Target Industry: [Target Industry]\n\n TASK \nReview the provided data source and identify potential 'red flags' or critical areas of concern that require immediate investigation. Categorize these flags.\n\n OUTPUT STRUCTURE \n\nPreliminary Due Diligence Red Flag Report\n--------------------------------------------\nBased on a review of [Data Source], the following high-priority areas ('red flags') have been identified for further investigation:\n\n1. Financial Red Flags:\n [e.g., Missing audited financial statements for the last 2 years.]\n [e.g., Heavy reliance on a single customer (Customer X) noted in folder 4.5.]\n\n2. Legal & Compliance Red Flags:\n [e.g., Folder 6.2 'Litigation' contains 5 active cases, but no summary file.]\n [e.g., Key intellectual property (IP) appears to be registered in the founder's name, not the company's (Folder 8.1).]\n\n3. Operational Red Flags:\n [e.g., High employee turnover rates mentioned in HR reports (Folder 5.3).]\n [e.g., No formal contracts in place for key suppliers (Folder 3.1).]\n\n4. Missing Information:\n [e.g., No documents found relating to cybersecurity policies or breach reports.]\n [e.g., Tax filings for 2023 are not yet uploaded.]"
     },
     {
         id: 15, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'Deal', task: 'Content Creation' },
         stats: { use_count: 30, rating: 4.4, rating_count: 9, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Investment Teaser Drafting",
         description: "Draft a compelling, anonymous investment teaser for a sell-side engagement.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an expert Investment Banking Analyst. You specialize in creating compelling, anonymous 'teaser' documents for sell-side M&A mandates.\n\n INPUT \n- Project Name: [e.g., Project Phoenix]\n- Target Industry: [e.g., Niche SaaS for Logistics]\n- Target Description (Anonymized): [e.g., 'A leading B2B SaaS provider in Southeast Asia']\n- Key Investment Highlights (3-5 bullets): [e.g., 'CAGR of 40% over 3 years', 'Blue-chip client base', 'Proprietary IP']\n- Anonymized Financials (Table): [e.g., Year | Revenue | EBITDA\n2022A | $10M | $3M\n2023A | $14M | $4.5M\n2024E | $20M | $7M]\n\n TASK \nDraft a professional, one-page investment teaser based on the inputs. The teaser MUST be anonymous (no company name) and persuasive.\n\n OUTPUT \n\n(Header) Confidential: For Discussion Purposes Only\n\nProject [Project Name]\nOpportunity to Acquire [Target Description]\n\nCompany Overview:\n[Draft a 2-3 sentence anonymous overview of the company's business model and market position based on the inputs.]\n\nKey Investment Highlights:\n [Drafted Highlight 1, e.g., 'Market Leader in a High-Growth Niche']\n [Drafted Highlight 2, e.g., 'Strong, Double-Digit Revenue Growth']\n [Drafted Highlight 3, e.g., 'Proprietary & Scalable Technology Platform']\n [Drafted Highlight 4, e.g., 'Long-term Contracts with Blue-Chip Clients']\n\nSummary Financials (USD M):\n| | 2022A | 2023A | 2024E |\n|---|---|---|---|\n| Revenue | $10.0 | $14.0 | $20.0 |\n| EBITDA | $3.0 | $4.5 | $7.0 |\n\n(Note: Provide a text-based bar chart for Revenue growth if possible)\n\nTransaction Process:\n[Your Firm Name] is acting as the exclusive financial advisor to [Target Description] in relation to a potential strategic transaction. Interested parties will be required to sign a Non-Disclosure Agreement (NDA) to receive further information."
     },
     {
         id: 16, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'Shared Services', task: 'Write Email' },
         stats: { use_count: 75, rating: 4.0, rating_count: 20, userRating: 0, reviews: [] },
         isSaved: false,
         title: "New IT Policy Communication",
         description: "Draft a firm-wide email communicating a new IT policy (e.g., password updates, new software rollout).",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an IT Communications Specialist. You write emails that are clear, concise, and drive action from all staff.\n\n INPUT \n- Policy Name: [e.g., Mandatory Multi-Factor Authentication (MFA) Rollout]\n- Effective Date: [Date]\n- Action Required by Staff: [e.g., 'Register your mobile device for MFA before the deadline']\n- Deadline for Action: [Date]\n- What happens if not done? [e.g., 'You will lose access to all firm applications']\n- Link for Help/Instructions: [Link]\n\n TASK \nDraft a firm-wide email communicating this new IT policy. The tone should be professional, clear, and slightly urgent.\n\n OUTPUT \n\nSubject Options:\n1.  Action Required: New IT Security Policy - [Policy Name] by [Deadline for Action]\n2.  Important: Mandatory Update to Your Account Security ([Policy Name])\n\nEmail Body:\n\nDear Colleagues,\n\nTo enhance the security of our firm's data and client information, we are implementing a new IT policy: [Policy Name].\n\nThis will be effective from [Effective Date].\n\nWhat This Means for You:\n[Brief 1-2 sentence explanation of the policy, e.g., 'MFA adds an extra layer of security by requiring you to approve login attempts from your mobile device.']\n\nAction Required by [Deadline for Action]:\nAll staff are required to [Action Required by Staff].\n\nDeadline: [Deadline for Action]\nInstructions: [Link for Help/Instructions]\n\nImportant: Failure to complete this action by the deadline will result in [What happens if not done?].\n\nWe appreciate your cooperation in keeping our firm secure.\n\nIf you have any issues, please contact the IT Helpdesk.\n\nThank you,\nIT Department"
     },
     {
         id: 17, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'Shared Services', task: 'Job Description' },
         stats: { use_count: 65, rating: 4.5, rating_count: 12, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Job Description Creation",
         description: "Create a comprehensive job description for a new role within the firm.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an expert HR Talent Acquisition Specialist. You write job descriptions that are clear, inclusive, and attract top-tier candidates.\n\n INPUT \n- Job Title: [Job Title]\n- Department: [Department (e.g., Audit, Tax, Shared Services)]\n- Reports to: [Manager Title]\n- Key Responsibilities (3-5 bullets): [e.g., 'Manage client audit engagements', 'Lead junior team members', 'Review financial statements']\n- Required Qualifications (3-5 bullets): [e.g., 'CPA or equivalent', '5+ years experience in public accounting', 'Strong knowledge of IFRS']\n- Company Intro (Optional): [Short blurb about KPMG]\n\n TASK \nGenerate a full, professional job description based on the inputs.\n\n OUTPUT STRUCTURE \n\nJob Title: [Job Title]\nDepartment: [Department]\nLocation: [e.g., Ho Chi Minh City / Hanoi]\n\nAbout KPMG:\n[Insert Company Intro or a generic placeholder, e.g., 'Join a global network of professionals dedicated to providing Audit, Tax, and Advisory services.']\n\nRole Overview:\n[Draft 2-3 sentence summary of the role's purpose, based on inputs.]\n\nKey Responsibilities:\n [Drafted Responsibility 1 from input]\n [Drafted Responsibility 2 from input]\n [Drafted Responsibility 3 from input]\n [Drafted Responsibility 4 from input]\n [Drafted Responsibility 5 from input]\n\nQualifications and Skills:\n [Drafted Qualification 1 from input]\n [Drafted Qualification 2 from input]\n [Drafted Qualification 3 from input]\n [Drafted Qualification 4 from input]\n [Drafted Qualification 5 from input]\n Excellent communication and interpersonal skills.\n Strong analytical and problem-solving abilities.\n Ability to work effectively in a fast-paced, team-oriented environment.\n\nWhat We Offer:\n A competitive salary and benefits package.\n A culture of learning and professional development.\n Opportunities to work with a diverse range of clients."
     },
     {
         id: 18, status: 'public', ownerId: 'kpmg_admin',
         tags: { department: 'Consulting', task: 'Content Creation' },
         stats: { use_count: 40, rating: 4.6, rating_count: 11, userRating: 0, reviews: [] },
         isSaved: false,
         title: "Project Proposal Slide Content",
         description: "Generate content for a client project proposal slide (e.g., 'Our Understanding of the Problem', 'Our Approach').",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "// No example result available for this prompt yet.",
         template: " ROLE \nYou are an expert Management Consultant. You create clear, persuasive, and client-centric content for project proposals.\n\n INPUT \n- Slide Title: [Slide Title (e.g., 'Our Understanding of Your Challenge', 'Our Proposed Approach', 'Key Project Deliverables')]\n- Client's Problem (in brief): [e.g., 'Client is facing declining market share due to new digital competitors.']\n- Our Proposed Solution (in brief): [e.g., 'A 3-phase digital transformation strategy focused on customer experience, data analytics, and operational efficiency.']\n- Tone: [e.g., Confident, Empathetic, Expert]\n\n TASK \nDraft the content (key messages and bullet points) for the specified proposal slide, based on the problem and solution.\n\n OUTPUT \n\nContent for Slide: [Slide Title]\n\nKey Message (Headline): [Draft a 1-sentence headline for the slide that summarizes the main point. e.g., 'A strategic approach to reclaim market leadership and build a digital-first enterprise.']\n\nBullet Points:\n[For 'Our Approach' slide]:\n    Phase 1: Diagnostic & Benchmarking: We will analyze your current digital capabilities against market leaders to identify critical gaps and opportunities.\n    Phase 2: Strategy & Roadmap Design: We will co-develop a 3-year digital transformation roadmap, prioritizing initiatives with the highest ROI.\n    Phase 3: Implementation Support & Governance: We will establish a Project Management Office (PMO) to ensure the strategy is executed on time and on budget, driving measurable results.\n\n[For 'Our Understanding' slide]:\n    [e.g., 'Rapidly shifting consumer expectations are creating new pressures on your traditional business model.']\n    [e.g., 'New, agile competitors are leveraging data to capture market share and disrupt pricing.']\n    [e.g., 'Internal systems and processes are not currently optimized to support a seamless digital customer experience.']\n\n[For 'Deliverables' slide]:\n    [e.g., 'A comprehensive market and competitor analysis report.']\n    [e.g., 'A detailed 3-year digital transformation roadmap with clear financial-case and KPIs.']\n    [e.g., 'A governance framework for managing the transformation portfolio.']"
     },
     
     // Prompts cá nhân (My Library) cho CURRENT_USER_ID
     {
         id: 101,
         status: 'private', // Trạng thái "Riêng tư"
         ownerId: CURRENT_USER_ID, // Thuộc về user hiện tại
         tags: { department: 'Finance', task: 'Analysis' },
         stats: { use_count: 0, rating: 4.0, rating_count: 5, userRating: 0, reviews: [] },
         isSaved: false,
         title: "My Private: Weekly Budget Variance Check",
         description: "A custom prompt I built to check weekly budget vs actuals from pasted data.",
         details: {
             value: "Saves me 1 hour a week.",
             benefit: "Finds errors faster.",
             whenToUse: "Every Monday AM."
         },
         exampleResult: "| Category | Budget | Actual | Variance |\n|---|---|---|---|\n| T&E | 1000 | 1200 | (200) |\n| Software | 500 | 500 | 0 |",
         template: "Analyze the following pasted data... [My custom instructions]"
     },
     {
         id: 102,
         status: 'private',
         ownerId: CURRENT_USER_ID, // Thuộc về user hiện tại
         tags: { department: 'Consulting', task: 'Content Creation' },
         stats: { use_count: 1, rating: 3.8, rating_count: 3, userRating: 0, reviews: [] },
         isSaved: false,
         title: "My Pending: Client Workshop Slide Generator",
         description: "Generates 5 key slides for a client workshop based on inputs.",
         details: {
             value: "Standardizes workshop prep.",
             benefit: "Faster turnaround for client meetings.",
             whenToUse: "When prepping a new workshop."
         },
         exampleResult: "## Slide 1: Agenda\n- ...\n\n## Slide 2: Key Challenges\n- ...",
         template: "Generate 5 slides for [Topic]..."
     },
     {
         id: 103,
         status: 'private',
         ownerId: CURRENT_USER_ID, // Thuộc về user hiện tại
         tags: { department: 'All Departments', task: 'Write Email' },
         stats: { use_count: 12, rating: 4.0, rating_count: 2, userRating: 0, reviews: [] },
         isSaved: false,
         title: "My Approved: Quick Follow-up Email",
         description: "My personal template for sending a post-meeting follow-up.",
         details: { value: "N/A", benefit: "N/A", whenToUse: "N/A" },
         exampleResult: "Dear [Name],\n\nThank you for the meeting. Key takeaways...",
         template: "Draft follow up for [Context]..."
     },
     
     //  CÁC PROMPT PARTNER
     {
         "id": 200, 
         "status": "public",
         "ownerId": "kpmg_admin",
         "tags": {
             "department": "Partner",
             "task": "Content Creation"
         },
         "stats": {
             "use_count": 98,
             "rating": 4.2,
             "rating_count": 45,
             "userRating": 0,
             "reviews": []
         },
         "isSaved": false,
         "title": "Create Power Brief for First Client Meeting",
         "description": "Create concise one-page executive briefing for Partners before client meetings with strategic insights.",
         "details": {
             "value": "Create a one-page executive briefing for Partners before client meetings. Focus on key impacts, strategic questions, and KPMG’s perspective.",
             "benefit": " - Saves time and ensures strategic focus\n - Provides clear, actionable insights\n - Standardizes meeting preparation\n - Improves meeting quality and client trust",
             "whenToUse": "When:\n - Before first client meeting\n - When industry trends + client highlights are needed in one page\n - To drive strategic conversations\nHow: Just copy the prompt and skip Copilot's follow-up questions (if any)"
         },
         "exampleResult": "EXECUTIVE BRIEFING: Vinamilk – F&B Industry\nSource: Vinamilk 2024 Annual Report (https://www.vinamilk.com.vn/bao-cao-thuong-nien/bao-cao/2024/doc/en/vinamilk-ar-eng-full-layout-interactive.pdf) | Investor Relations (https://www.vinamilk.com.vn/en/investor)\n\n1. Executive Summary – What Matters Most\n• Industry Trend: Vietnam’s dairy market remains resilient amid inflation and shifting consumer preferences toward premium nutrition and sustainability. Export markets expanded to 63 countries.\n• Financial Highlights (2024):\n   - Revenue: VND 61,824 billion (+2.2% YoY)\n   - Profit After Tax: VND 9,453 billion (+4.8% YoY)\n   - State Contribution: VND 4,569 billion (+11.3% YoY)\n• Strategic Moves: New technologies (6 HMOs in infant formula, Swedish ultrafiltration) and sustainability initiatives (recycling program, carbon-neutral farms).\n\n2. Key Impacts\n• Opportunities:\n   - Rising health-conscious demand supports premium dairy and functional products.\n   - Export diversification reduces reliance on domestic market volatility.\n• Risks:\n   - Raw material price volatility and global supply chain disruptions could pressure margins.\n   - Intensifying competition from regional players and plant-based alternatives.\n\n3. Strategic Questions\n1. How will Vinamilk leverage technology and sustainability to differentiate in premium segments?\n2. What is the roadmap for international expansion, and which markets offer the highest ROI?\n3. How can Vinamilk mitigate commodity price risks while maintaining profitability?\n\n4. KPMG’s Angle\nKPMG helps F&B leaders navigate growth and resilience through supply chain optimization, ESG strategy, and digital transformation to sustain competitive advantage.",
         "template": "ROLE: You are a senior KPMG Strategic Analyst with deep expertise in [Topic/Industry/Regulation].\n\nTASK: Generate a concise, one-page executive briefing tailored for a Partner preparing for a client meeting.\n\nBefore creating the briefing, ask the Partner for:\n- Client Name\n- Client Industry\nThen, find that Client's Anual Report on trusted sources for more materials and provide citation. If the information is not available, ask the user if they have Client's Anual Report.\n\nSOURCE CONSTRAINTS\n- Use official and authoritative sources only, including:\nClient’s official website (Investor Relations section)\nStock Exchange portals (e.g., HOSE, HNX for Vietnam; SEC for U.S.)\nGovernment or regulatory portals for filings\nReputable financial databases (Bloomberg, Reuters, S&P Global)\n- For Vietnamese regulations or legal context, use:\nvbpl.vn – National Database of Legal Documents\nvanban.chinhphu.vn – Government Document Portal\ncongbao.chinhphu.vn – Official Gazette\nquochoi.vn – National Assembly documents\nluatvietnam.vn – Quick reference (not official)\n- Do not use blogs, forums, or unofficial interpretations.\n- Always provide source name, publication date, and hyperlink for transparency.\n\nFORMAT:\nUse clear, authoritative, and simple business language. The output must include:\n1. Executive Summary: 3 bullet points on what matters most right now (include industry trends + key financial highlights from the client's annual report).\n2. Key Impacts: How this trend and the client's financial position affect their industry (risks, opportunities).\n3. Strategic Questions: 3 insightful questions to spark a strategic discussion with the client.\n4. KPMG's Angle: A single sentence on how KPMG typically helps clients with this.\n\nCONSTRAINTS:\n- No long reports or technical jargon\n- Focus on relevance to the client’s business and financial context\n- Assume the Partner has limited time and needs actionable insight\n\nDELIVERABLE:\nOne-page briefing only. No additional commentary or appendices."
     },
     {
         "id": 201, // <-- PROMPT ĐÃ ĐƯỢC CẬP NHẬT
         "status": "public",
         "ownerId": "kpmg_admin",
         "tags": {
             "department": "Partner",
             "task": "Email Assistant"
         },
         "stats": {
             "use_count": 40,
             "rating": 3.8,
             "rating_count": 17,
             "userRating": 0,
             "reviews": []
         },
         "isSaved": false,
         "title": "Weekly Email Risk & Opportunity Analysis",
         "description": "Analyze client emails weekly to identify risks and opportunities for timely action.",
         "details": {
             "value": "Provide Partners with a summarized dashboard of critical risks, priority issues, and potential opportunities extracted from client email communications.",
             "benefit": " - Automates email review to save time\n - Highlights critical compliance risks and deadlines\n - Detects potential business opportunities early\n -Improves decision-making and client engagement",
             "whenToUse": "When:\n - At the end of each week after collecting client emails\n - Before preparing Partner briefing or risk review\n - When identifying compliance deadlines or new opportunities early\nHow: Just copy the prompt and skip Copilot's follow-up questions (if any)"
         },
         "exampleResult": "Partner Review\nPeriod: 01 Nov 2025 – 07 Nov 2025\nTotal Emails Analyzed: 128\nAnalysis Generated: 08 Nov 2025 09:00 AM\nFocus Area: Tax & Advisory Clients\n\n### PART 1: EXECUTIVE SUMMARY TABLE\n| SECTION | Client | Issue Category | Days Pending | Action Due | Est. Impact | Financial Exposure | Confidence |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| 🔴 RISK | Acme Corp | Compliance Warning | 2 | 10 Nov 2025 | Compliance | $50,000 (Potential Penalty) | HIGH |\n| 🔴 RISK | Beta LLC | Timeline Concern | 1 | 09 Nov 2025 | Project Delivery | $120,000 (Fee at Risk) | MEDIUM |\n| 🟢 OPP | Zenith Inc. | New Service Inquiry | 3 | N/A | Revenue Growth | $75,000+ (Est. New Work) | MEDIUM |\n\n**Summary Metrics:**\n- **Total Risks:** 2 (Compliance: 1, Project Delivery: 1)\n- **Total Opportunities:** 1 (Revenue Growth: 1)\n- **Key Metrics:** 1 Compliance Incident, 1 Retention Risk, $170,000 Revenue at Risk, $75,000 Opportunity\n\n### PART 2: DETAILED ITEMS\n\n**1. ITEM #1: 🔴 Compliance Warning**\n- **Client:** Acme Corp\n- **Engagement:** Tax Filing Services\n- **Date:** 06 Nov 2025 (2 days ago)\n- **Confidence:** HIGH\n- **Impact Category:**\n  PRIMARY: Compliance ([Failure to meet new data submission guideline])\n  SECONDARY: Reputation ([Risk of public filing error])\n\n**2. Summary:**\nClient's finance team is confused about the new 'Circular 123' data format for their upcoming VAT submission. They are at high risk of missing the 10 Nov deadline, which could incur an estimated $50,000 penalty.\n\n**3. Key Evidence:**\n> \"...we are escalating this. We do not have the data in the format you requested for Circular 123. The deadline is Monday, we need an immediate solution or we will miss the filing.\"\n\nBased on: \"escalating\", \"do not have the data\", \"miss the filing\", \"Circular 123\"\n\n**4. SUGGESTED ACTIONS:**\n1️⃣ **IMMEDIATE TRIAGE**\n  [Tax Manager] to call [Client Contact] immediately to provide a temp data template. [Partner] to email client sponsor acknowledging the issue and confirming a solution is in progress.\n2️⃣ **LONG-TERM FIX**\n  [Advisory Team] to propose a follow-up engagement to automate 'Circular 123' data extraction from their ERP.",
         "template": "ROLE & CONTEXT\nYou are an AI analyst supporting a KPMG Partner across all service lines (Audit, Tax, Advisory, Deal Advisory, Risk Consulting) in monitoring engagement health, compliance risks, client satisfaction, and business opportunities through weekly email analysis.\n\nThis analysis supports KPMG's commitment to delivering quality service and maintaining trusted relationships with clients while upholding professional standards.\n \nTASK\nAnalyze all emails from the past 7 days where user is direct recipient or CC'd and create a summary report with two sections:\nSECTION 1: RISKS\n- Identify and flag emails containing:\n- Urgent requests or deadline warnings\n- Client concerns or complaints\n- Compliance or regulatory mentions\n- Budget overruns or resource issues\n- Project delays or blockers\n- Conflicting information or miscommunications\n\nSECTION 2: OPPORTUNITIES\n- Identify and flag emails containing:\n- New business inquiries or proposals\n- Expansion of existing client work\n- Positive client feedback or wins\n- Strategic partnership discussions\n- Cross-selling possibilities\n- Innovation or efficiency improvement ideas\n\n(Place this before the summary table)\nPartner Review  \nPeriod: [Start Date] – [End Date]  \nTotal Emails Analyzed: [Number]  \nAnalysis Generated: [Date & Time]  \nFocus Area: [Specific Service Line or Topic]\n \nFORMAT\nPART 1: EXECUTIVE SUMMARY TABLE\n\nCreate a summary table with these columns:\n- SECTION  (🔴 RISK/ 🟢 OPPORTUNITY)\n- Client (Client name)\n- Issue Category (Brief description)\n- Days Pending (Days since email received)\n- Action Due (Deadline or timeframe)\n- Est. Impact (Primary impact category - see categories below)\n- Financial Exposure (Amount at risk, opportunity value, or fee impact)\n- Confidence (Confidence Rating Framework: RatingCriteriaExampleHIGHExplicit keywords + clear context + direct statement\"\"We need to escalate this compliance issue immediately\"\"MEDIUMRelevant keywords + some contextual indicators\"\"Can we discuss the timeline concerns?\"\"LOWIndirect references or ambiguous language\"\"Looking forward to exploring options\"\")\n\nInclude summary metrics:\n- Risk counts by impact category\n- Key metrics (compliance incidents, quality issues, retention risk, revenue at risk, opportunities)\n \nPART 2: DETAILED ITEMS\nFor each item, use this structure:\n\n 1. ITEM #[X]: [Brief Title]\n- Client:[Client Name]\n- Engagement: [Engagement Code or Service Type]\n- Date: [Email Date] ([X days ago])\n- Confidence\n- Impact Category:\nPRIMARY:[Impact Category] ([brief explanation])\nSECONDARY:[Impact Category] ([brief explanation])\nTERTIARY: [Impact Category] ([brief explanation - if applicable])\n\n 2. Summary:\n[2-3 sentence summary: What is the situation? What are the key facts, amounts, deadlines? What is the context or history?]\n\n 3. Key Evidence:\n[1-2 direct quotes from emails that demonstrate the issue clearly]\nBased on: [Keywords/patterns/signals that led to this classification]\n\n 4. SUGGESTED ACTIONS:\n\n1️⃣ [APPROACH NAME] \n[1-2 sentences: Who does what]\n\n2️⃣ [APPROACH NAME] [Recommended if applicable]\n[1-2 sentences: Who does what]\n\n3️⃣ [APPROACH NAME]\n[1-2 sentences: Who does what]"
     },
     {
         "id": 202, // <-- PROMPT ĐÃ ĐƯỢC CẬP NHẬT
         "status": "public",
         "ownerId": "kpmg_admin",
         "tags": {
             "department": "Partner",
             "task": "Analysis"
         },
         "stats": {
             "use_count": 96,
             "rating": 4.4,
             "rating_count": 36,
             "userRating": 0,
             "reviews": []
         },
         "isSaved": false,
         "title": "New Regulation Impact on Service Opportunities",
         "description": "Analyze new regulations or industry articles to identify compliance risks and service opportunities for your service line",
         "details": {
             "value": "Provide Partners with actionable insights on regulatory or industry changes to ensure compliance and uncover new advisory opportunities",
             "benefit": " - Keeps clients compliant with latest regulations\n - Detects new service and advisory opportunities early\n - Enhances client trust and proactive engagement\n - Positions KPMG as a strategic advisor",
             "whenToUse": "When:\n - After new regulation or article is published\n - Before client strategy or compliance meetings\n - When planning new service offerings\nHow: Just copy the prompt and skip Copilot's follow-up questions (if any)"
         },
         "exampleResult": "Here’s a **comprehensive executive insight** tailored for **Tax Compliance** based on the most recent Vietnamese regulation:\n\n***\n\n## **1. Regulation Snapshot**\n\n**Name:** Nghị định 174/2025/NĐ-CP – Policy on VAT Reduction  \n**Effective Date:** 01 July 2025 – 31 December 2026  \n**Key Provisions:**\n\n* Implements **2% VAT rate reduction** (from 10% to 8%) for most goods and services under the VAT Law, except for excluded sectors (telecom, finance, insurance, real estate, metals, mining, and special excise goods).\n* Applies uniformly across import, production, and commercial stages.\n* Businesses using percentage-based VAT calculation receive **20% reduction in VAT calculation rate** on eligible goods/services.\n* Requires **accurate classification and compliance reporting** to avoid penalties.  \n    \\[Official Source: vbpl.vn & mof.gov.vn]citeturn2search9\n\n***\n\n## **2. Strategic Framework – SWOT Analysis for Tax Compliance Services**\n\n### **Strengths**\n\n* KPMG’s **deep tax advisory expertise** and global VAT compliance methodologies.\n* Established relationships with multinationals and large corporates in Vietnam.\n* Proven frameworks for **transaction compliance and indirect tax audits**.\n\n### **Weaknesses**\n\n* Limited automation in VAT compliance for SMEs.\n* Heavy reliance on manual processes for classification and reporting.\n* Current service model lacks **real-time compliance monitoring tools**.\n\n### **Opportunities**\n\n* Advisory on **VAT reduction compliance** and eligibility assessments.\n* Development of **digital VAT compliance platforms** integrated with ERP systems.\n* Launch **Managed VAT Compliance Services** for SMEs and large enterprises.\n* Cross-service collaboration: **Tax + Technology Advisory** for automation and analytics.\n* Revenue growth from **training programs** and **industry-specific compliance packages**.\n\n### **Threats**\n\n* Competitors offering **tech-enabled compliance solutions** faster.\n* Increased regulatory scrutiny and penalties for misclassification.\n* Client dissatisfaction if KPMG does not provide **integrated tech solutions**.\n\n***\n\n## **3. Department-Specific Opportunities (Tax Compliance)**\n\n**New Service Offerings:**\n\n* **VAT Impact Assessment** for clients across sectors.\n* Advisory on **classification and documentation** for eligible goods/services.\n* **Compliance Health Checks** for VAT reporting accuracy.\n\n**Technology Enablement:**\n\n* Develop **KPMG VAT Compliance Dashboard** with real-time alerts.\n* API-based integration with ERP for automated VAT calculations.\n* Partner with tech vendors for **plug-and-play compliance modules**.\n\n**Managed Services:**\n\n* End-to-end **Managed VAT Compliance Service**: monitoring, filing, and reporting.\n* Subscription-based compliance monitoring with dashboards and alerts.\n\n**Cross-Service Collaboration:**\n\n* Tax + Risk Consulting: **fraud prevention and data integrity**.\n* Tax + Audit: **assurance on VAT compliance and system controls**.\n* Tax + Digital Transformation: **automation and analytics for compliance**.\n\n**Revenue Growth Areas:**\n\n* **Training & Certification Programs** for CFOs and tax managers.\n* Industry-specific compliance packages (Retail, Manufacturing, E-commerce).\n* Data analytics services leveraging VAT data for **business insights**.\n\n**Urgency:** High – Regulation effective July 2025; businesses need immediate compliance solutions.  \n**Potential Impact:** Multi-million USD revenue from advisory, tech enablement, and managed services.\n\n***\n\n## **4. Partner Talking Points**\n\n* **How can we position KPMG as the go-to advisor for VAT compliance under Nghị định 174?**\n* **What alliances or in-house capabilities do we need for tech-enabled VAT compliance?**\n* **How do we scale managed services for SMEs while maintaining premium advisory for large corporates?**\n\n**KPMG Differentiator:** \n*KPMG combines deep regulatory expertise with global technology alliances, delivering integrated compliance and digital transformation solutions unmatched in the market.*\n\n***\n\n### ✅ Next Steps\n\nWould you like me to:  \n**A)** Create a **visual one-page briefing** (PowerPoint-ready) for Partner presentation?  \n**B)** Draft a **client-facing proposal outline** with pricing tiers for these new services?  \n**C)** Build a **detailed roadmap** for launching Managed VAT Compliance Services?\n\nWhich option should I prepare first?\"",
         "template": "ROLE & CONTEXT\nYou are a Senior KPMG Regulatory & Strategic Analyst with expertise in compliance, industry regulations, and service innovation.\nYour task is to help a Partner understand how a new Vietnamese regulation creates risks AND multiple high-value opportunities for their department to expand services, innovate offerings, and capture growth\nThis briefing supports KPMG’s commitment to quality, compliance, and growth, enabling Partners to proactively lead strategic initiatives.\n\nTASK\nGenerate a comprehensive executive insight that:\n- Summarizes the Vietnamese regulation and its key provisions.\n- Highlights impacts on KPMG and the Partner’s department (risks and opportunities).\n- Provides an extensive list of opportunities for the department (no limit):\n+ New service offerings\n+ Technology enablement\n+ Managed services\n+ Cross-service collaboration\n+ Revenue growth areas\n- Suggests strategic actions and KPMG solutions to capture these opportunities.\n\nBefore creating the briefing, do one of the following:\n Ask the user (only once):\n1. Which department or service line should the opportunities focus on? (e.g., Tax, Audit, Risk Consulting)\n2. Regulation Name or Reference\n3. Any specific client(s) to highlight (optional)\nIf details are not provided:\n- AI will automatically identify a recent Vietnamese regulation and create the briefing, including department-specific opportunities inferred from context.\n\nSOURCE CONSTRAINTS\n- The regulation must be from Vietnam.\n- Only use official and authoritative sources, including:\nLaw (Luật), Decree (Nghị định), Circular (Thông tư) issued by the Government or Ministry of Finance.\nOfficial guidance letters (Công văn) from the General Department of Taxation or Ministry of Finance (selected, not unofficial interpretations).\nOfficial Q&A and guidance pages from government portals (e.g., gdt.gov.vn, mof.gov.vn).\nOfficial Gazette or legal document portals:\nvbpl.vn – National Database of Legal Documents\nvanban.chinhphu.vn – Government Document Portal (signed PDF)\ncongbao.chinhphu.vn – Official Gazette\nquochoi.vn – National Assembly documents (especially Resolutions)\nluatvietnam.vn – Quick reference (for comparison only, not official)\n- Do not use blogs, forums, or unofficial interpretations.\n- Always provide citations with links to official sources in the output.\n\nFORMAT\nUse clear, authoritative, and visually structured business language. Organize the output as:\n\n1. Regulation Snapshot\n- Name & Effective Date\n- 2–3 bullet points on key provisions\n\n2. Strategic Frameworks\n- Content Guidelines:\n Strengths:\n- Internal advantages KPMG has to address this regulation (e.g., expertise, technology, global network). - Existing compliance frameworks or methodologies that give KPMG an edge.\nWeaknesses:\n- Internal gaps or limitations (e.g., resource constraints, lack of automation, dependency on manual processes).\n- Areas where KPMG may struggle to adapt quickly.\nOpportunities:\n- New service offerings enabled by the regulation.\n- Technology-driven solutions (automation, analytics).\n- Cross-service collaboration and managed services.\n- Revenue growth areas and client education initiatives.\nThreats:\n- Compliance risks if adaptation is slow.\n- Competitors moving faster to capture market share.\n - Increased regulatory scrutiny or penalties.\n- Client dissatisfaction if services are not updated promptly.\nRequirements:\n Each quadrant should have 3–4 bullet points minimum. Use concise, business-oriented language. Focus on actionable insights, not generic statements.\n\n3. Department-Specific Opportunities (Core Section)\n- Provide as many actionable opportunities as possible\n- Include urgency, potential revenue impact, and innovation ideas\n\n4. Partner Talking Points\n- 3 strategic questions to engage internally\n- 1 sentence on KPMG’s differentiator\n\nCONSTRAINTS\n- No legal jargon\n- Focus on actionable growth opportunities for KPMG\n- No page limit – present insights in a clear, structured, and visually easy-to-read format"
     },
     {
         "id": 204, 
         "status": "public",
         "ownerId": "kpmg_admin",
         "tags": {
             "department": "Partner",
             "task": "Content Creation"
         },
         "stats": {
             "use_count": 63,
             "rating": 4.2,
             "rating_count": 38,
             "userRating": 0,
             "reviews": []
         },
         "isSaved": false,
         "title": "Executive Trend Briefing",
         "description": "Summarize industry trends and insights for Partners in a concise briefing.",
         "details": {
             "value": "Equip Partners with up-to-date market intelligence for strategic conversations and client meetings.",
             "benefit": " - Saves time on research\n - Improves quality of client discussions\n - Positions KPMG as a trusted advisor\n - Supports opportunity identification",
             "whenToUse": "When:\n - Before client meetings to provide market context\n - When preparing strategic discussions or proposals\n - For quarterly or monthly Partner updates\nHow: Just copy the prompt and skip Copilot's follow-up questions (if any)"
         },
         "exampleResult": "# Executive Trend Briefing: Advertising Industry – Vietnam (Next 12 Months)\n\n## 1. Executive Summary\n- **Digital Advertising Surge**: Digital channels projected to capture **55–61% of ad spend by 2025**, driven by mobile-first consumers and social media dominance. https://www.statista.com\n- **Regulatory Tightening**: Vietnam’s amended Advertising Law (effective Jan 2026) introduces stricter rules for online ads, influencer accountability, and transparency—requiring immediate compliance planning. https://moj.gov.vn\n- **Consumer Behavior Shift**: Young, tech-savvy population and rising middle class fueling demand for personalized, culturally resonant campaigns, especially during key festivals like Tet. https://www.mckinsey.com\n\n---\n\n## 2. Trend Analysis\n\n### **Trend 1: Digital Advertising Dominance**\n- **Why It Matters**: Digital ad spend growing at **14% CAGR**, with social media, video, and influencer marketing leading. Brands that fail to pivot risk losing relevance. https://www.statista.com\n- **Urgency**: **Immediate**\n\n### **Trend 2: Regulatory Overhaul**\n# Executive Trend Briefing: Advertising Industry. Non-compliance could lead to fines or reputational damage. https://moj.gov.vn\n- **Urgency**: **Medium-term**\n\n### **Trend 3: Mobile-First & Social Commerce**\n- **Why It Matters**: With **70%+ smartphone penetration**, short-form video and live commerce on TikTok and Zalo are reshaping engagement. https://www.mckinsey.com\n- **Urgency**: **Immediate**\n\n### **Trend 4: Cultural Personalization**\n- **Why It Matters**: Campaigns tied to local traditions (e.g., Tet) outperform generic ads. Emotional storytelling and humor resonate strongly. https://www.mckinsey.com\n- **Urgency**: **Medium-term**\n\n---\n\n## 3. Strategic Implications\n- **Competitive Positioning**: Digital-first and compliance-ready brands will gain trust and market share.\n- **Operational Impact**: Requires investment in analytics, influencer vetting, and agile content production.\n- **Risk Management**: Non-compliance or tone-deaf campaigns could lead to penalties and reputational harm.\n\n---\n\n## 4. KPMG’s Angle\n- **Regulatory Compliance Advisory**: Interpret and implement new Advertising Law requirements.\n- **Digital Transformation Support**: Enable data-driven marketing strategies, programmatic ad solutions, and social commerce integration.\n- **Cultural Insight & Creative Strategy**: Advise on localization and consumer behavior analytics for impactful campaigns.",
         "template": "ROLE & CONTEXT\nYou are a senior KPMG Market & Strategic Analyst with expertise in macroeconomic trends, industry dynamics, and regulatory developments.\nYour task is to help a Partner prepare for high-level client discussions by providing a clear, concise briefing on emerging trends that impact their business and KPMG’s service opportunities.\nThis supports KPMG’s commitment to strategic insight, client trust, and proactive advisory.\n\nTASK\nGenerate a one-page executive trend briefing that:\n- Summarizes 3–4 major trends relevant to the client’s industry or sector.\n- Explains why these trends matter now (risks, opportunities, urgency).\n\nBefore creating the briefing, ask the Partner for (only once):\n- Client Industry or Sector\n- Geographic Focus (Global / Regional / Country)\n- Time Horizon (e.g., next 6–12 months)\n\nFORMAT\nUse authoritative, simple business language. Structure the output as:\n\n1. Executive Summary\n- 3 bullet points on the most critical trends shaping the industry right now.\n\n2. Trend Analysis\nFor each trend:\n- Trend Name (e.g., “AI-driven Compliance Automation”)\n- Why It Matters: 1–2 sentences on impact (risks/opportunities)\n- Urgency: Immediate / Medium-term / Long-term\n\n3. Strategic Implications\n- How these trends affect client operations and competitive positioning.\n\n4. KPMG’s Angle\n- 2–3 bullet points on how KPMG typically helps clients navigate these trends (e.g., advisory, technology enablement, risk consulting).\n\nSOURCES & RELIABILITY\nAll insights must be drawn from authoritative and verifiable sources to ensure accuracy and client trust. Acceptable sources include:\nKPMG Thought Leadership (Global Outlook, sector reports, regulatory updates)\nOfficial Regulatory Bodies (e.g., SEC, EU Commission, local regulators)\nLeading Market Intelligence (e.g., IMF, World Bank, OECD, Gartner, McKinsey, industry associations)\nReputable Financial & Economic Data Providers (Bloomberg, Reuters, S&P Global)\nDo not use unverified blogs, opinion pieces, or sources lacking clear attribution.\nAlways provide source name, publication date, and hyperlink for transparency next to the data provided.\n\nCONSTRAINTS\n- No technical jargon or lengthy reports\n- Focus on business relevance and actionable insight\n- Assume Partner has limited time (max 1 page)\n\nDELIVERABLE\nOne-page executive briefing only. No appendices or extra commentary."
     },
     {
         "id": 205, // <-- PROMPT ĐÃ ĐƯỢC CẬP NHẬT
         "status": "public",
         "ownerId": "kpmg_admin",
         "tags": {
             "department": "Partner",
             "task": "Analysis"
         },
         "stats": {
             "use_count": 43,
             "rating": 4.3,
             "rating_count": 44,
             "userRating": 0,
             "reviews": []
         },
         "isSaved": false,
         "title": "Partner Thought Leadership Article Drafting",
         "description": "Draft thought leadership articles showcasing Partner expertise and KPMG insights.",
         "details": {
             "value": "Enable Partners to publish high-quality articles to build credibility and market presence.",
             "benefit": " - Enhances Partner visibility and reputation\n - Positions KPMG as an industry leader\n - Supports client engagement and trust\n - Saves time with structured drafting",
             "whenToUse": "When:\n - Before major industry events\n - When sharing perspectives on emerging trends\n - For LinkedIn or KPMG Insights publication\nHow: Just copy the prompt and skip Copilot's follow-up questions (if any)"
         },
         "exampleResult": "Beyond Compliance: How the Next Wave of Tax Reform Will Reshape Corporate Strategy\nSubheadline: From global minimum taxes to carbon border pricing, tax is becoming a board-level lever for value creation—not just a cost to optimize.\n\nOpening Hook\nTax reform has crossed a tipping point. In the next 12–24 months, new rules—most notably the OECD’s 15% global minimum tax and adjacent measures like carbon border pricing—will alter where profits land, how investment cases pencil out, and what “good growth” looks like. CEOs who treat these shifts as a strategic design problem, not a filing exercise, will set the pace. [oecd.org], [taxation-c....europa.eu], [taxation-c....europa.eu]\n\nTrend Analysis\n1) A global minimum tax changes the map.\nMore than 140 jurisdictions have endorsed the OECD/G20 Inclusive Framework’s “Pillar Two” rules introducing a 15% effective tax floor for large multinationals (≥€750m revenue). The core mechanics—a qualified domestic minimum top-up tax (QDMTT), income inclusion rule (IIR), and undertaxed profits rule (UTPR)—aim to curb profit shifting and narrow rate differentials across jurisdictions. [oecd.org], [taxfoundation.org]\nImplementation is real, not theoretical. The EU’s directive entered into force in December 2022 and requires Member States to apply Pillar Two from fiscal years starting in 2024 (IIR) and 2025 (UTPR), with many countries already live. [taxation-c....europa.eu], [taxfoundation.org]\nWhat’s the scale?\nOECD analysts estimate Pillar Two will add roughly US$155–192 billion in annual corporate tax revenues and cut low‑taxed profits by ~80%, with incentives to shift profit reduced by about half. Independent assessments place potential global revenue gains in the US$139–220 billion range—directionally consistent, though subject to design and uptake. [taxnews.ey.com], [oecd.org], [taxfoundation.org]\n2) The U.S. adds its own minimum tax lever.\nSeparately, the U.S. corporate alternative minimum tax (CAMT) imposes a 15% minimum based on adjusted financial statement income for groups with average annual income over US$1 billion, effective for years beginning after Dec. 31, 2022. Proposed regulations released in 2024 clarified scope, computations, and interactions with credits—making CAMT a parallel, complex regime for large filers. [eitc.irs.gov], [kpmg.com]\n3) Carbon border pricing is moving into the core tax conversation.\nThe EU’s Carbon Border Adjustment Mechanism (CBAM) shifts into its definitive phase in 2026, eventually requiring importers of carbon‑intensive goods (steel, cement, aluminum, fertilizers, hydrogen, electricity) to buy certificates mirroring EU ETS carbon prices. The current transitional reporting period (2023–2025) is already influencing supply chains, product design, and sourcing. [taxation-c....europa.eu], [epa.ie]\n4) Tax administration is going digital—fast.\nTax authorities are standardizing data and moving toward real‑time reporting. OECD surveys indicate widespread adoption of digital identity, APIs, and AI in administration—redefining the cost of non‑compliance and the importance of tax‑ready data architectures. [oecd.org], [kpmg.com]\n\nStrategic Implications for CEOs\nRisks to anticipate\n\nMargin compression & capital allocation drift: QDMTTs neutralize incentives to book income in low‑tax jurisdictions; projects reliant on tax arbitrage may underperform under a 15% floor. Re‑underwrite major capex and M&A theses with Pillar Two and CAMT overlays. [taxfoundation.org], [taxnews.ey.com]\nData, systems, and disclosure exposure: GloBE computations are jurisdictional and data‑hungry. Misaligned ledgers and fragmented ERPs elevate compliance risk and finance costs as filings (e.g., Top‑Up Tax Information Returns) centralize. [pwc.com], [oecd.org]\nPolicy volatility across markets: EU rules are in force, but timelines differ elsewhere. Divergence on safe harbors, administrative guidance, and peer reviews raises the risk of double taxation or disputes. [taxation-c....europa.eu], [bdo.global]\nCarbon cost creep at the border: CBAM shifts embedded emissions into landed cost. Export‑oriented segments and EU‑bound supply chains face a structural cost of carbon absent decarbonization or verified foreign carbon pricing. [taxation-c....europa.eu], [law.georgetown.edu]\n\nOpportunities to seize\n\nRe‑optimize footprint for real economics: With arbitrage dampened, capital should follow operating fundamentals—talent, infrastructure, proximity to demand—while QDMTTs keep more value in‑market. Expect a premium on productivity and scale efficiencies. [taxfoundation.org], [europarl.europa.eu]\nTax‑advantaged decarbonization: Aligning products and inputs to lower embedded carbon can reduce CBAM outlays and preserve EU market access. Embedded emissions transparency can also differentiate in tenders. [taxation-c....europa.eu], [epa.ie]\nInvestor‑grade tax transparency: Moving early on Pillar Two disclosures and CAMT impacts can reduce controversy, strengthen credit and ESG narratives, and pre‑empt regulatory queries. [ey.com], [dart.deloitte.com]\nData as a competitive asset: Building tax‑ready data pipelines (legal entity, CbCR, ETR by jurisdiction) improves forecast accuracy and accelerates scenario planning across pricing, sourcing, and portfolio moves. [oecd.org], [taxathand.com]\n\n\nWhat CEOs Should Do Now (Next 180 Days)\n\n\nStand up a cross‑functional “Pillar Two + CAMT” control tower.\nBring together Tax, Finance, Legal, Supply Chain, and Sustainability. Mandate a single source of truth for entity‑by‑entity effective tax rates and safe harbor eligibility (e.g., transitional CbCR). [dart.deloitte.com], [oecd.org]\n\n\nRe‑underwrite your top 10 value drivers.\nRefresh IRRs for major investments and acquisitions under a post‑arbitrage world. Include CBAM in landed‑cost models for EU‑bound flows and price scenarios using ETS‑linked certificate ranges. [taxation-c....europa.eu], [law.georgetown.edu]\n\n\nEngineer for filing certainty, not heroics.\nDesign processes to meet emerging central filing gateways (e.g., EU DAC9 for top‑up tax information returns) and reduce duplicative country filings. Invest in data lineage and controls now—before audits begin. [pwc.com], [loyensloeff.com]\n\n\nLink tax and climate strategy.\nWhere exposure is material, prioritize suppliers with verifiable emissions data, renegotiate carbon pass‑through terms, and align internal carbon pricing with CBAM trajectory. [taxation-c....europa.eu], [epa.ie]\n\n\nCommunicate with markets.\nUpdate guidance on effective tax rate sensitivity, disclose governance around Pillar Two and CAMT, and articulate how your footprint strategy adapts under the new rules. Investors reward clarity in periods of reform. [ey.com]\n\n\n\nKPMG’s Perspective\nIn our work with global enterprises, the companies that outperform treat tax reform as a design constraint for strategy—embedding GloBE and carbon rules into capital allocation, operating model choices, and data architecture—rather than chasing relief jurisdiction by jurisdiction. We help leadership teams translate evolving rules into practical playbooks, underpinned by investor‑grade data and scenario modeling. (Advisory support varies by jurisdiction and is provided by KPMG member firms.) [kpmg.com]\n\nClosing Call‑to‑Action\nTax reform is not a footnote to your earnings call—it is a structural shift in how and where value accrues. The winning CEO agenda: rebalance the portfolio for real economics, hard‑wire tax‑ready data, and make carbon cost visible in every decision. Begin with a board‑level session that pressure‑tests your top investments and supply chains against Pillar Two, CAMT, and CBAM scenarios—and turn compliance into competitive advantage. [taxnews.ey.com], [eitc.irs.gov], [taxation-c....europa.eu]\n\nSources (selected): OECD Pillar Two overview (updated guidance, 2024–2025); EU Minimum Tax Directive (Dec. 22, 2022); OECD revenue impact assessments (Jan. 2023 & Jan. 2024); IRS CAMT page & proposed regulations (Sept./Oct. 2024); EU CBAM (regulatory timeline to 2026); OECD tax administration digitalization (2025)",
                "template": "ROLE & CONTEXT\nYou are a senior KPMG Thought Leadership Content Strategist with expertise in industry trends, regulatory insights, and strategic advisory.\nYour task is to help a Partner draft a high-impact thought leadership article that positions KPMG as a trusted advisor and innovator in the market.\nThis supports KPMG’s commitment to credibility, client trust, and market leadership.\n\nTASK\nGenerate a draft article (800–1,000 words) that:\n- Explains a key industry trend or regulatory change and its implications.\n- Provides strategic insights for business leaders (risks, opportunities, actions).\n- Highlights KPMG’s perspective and solutions without sounding promotional.\n\nBefore drafting, ask the Partner for (only once):\n- Topic or Theme (e.g., ESG, AI in Audit, Tax Reform)\n- Target Audience (e.g., CFOs, CEOs, Risk Leaders)\n- Tone Preference (e.g., authoritative, conversational, visionary)\n- Any specific client examples or case studies to reference (optional)\n\nFORMAT\nUse clear, professional, and engaging language. Structure the article as:\n\n1. Headline & Subheadline\n- Catchy, thought-provoking, relevant to the trend.\n\n2. Opening Hook\n- 2–3 sentences that capture attention (why this matters now).\n\n3. Trend Analysis\n- Explain the trend or regulation in simple terms.\n- Include 2–3 data points or credible references.\n\n4. Strategic Implications\n- Risks and opportunities for business leaders.\n- Short bullet points for clarity.\n\n5. KPMG’s Perspective\n- How KPMG helps clients navigate this challenge (1–2 sentences, non-promotional).\n\n6. Closing Call-to-Action\n- Invite readers to think strategically or explore solutions.\n\nCONSTRAINTS\n- No jargon or overly technical language.\n- Avoid sounding like a sales pitch.\n- Focus on insight, credibility, and actionable ideas.\n\nSOURCES & RELIABILITY\nAll insights must be drawn from authoritative and verifiable sources to ensure accuracy and client trust. Acceptable sources include:\nKPMG Thought Leadership (Global Outlook, sector reports, regulatory updates)\nOfficial Regulatory Bodies (e.g., SEC, EU Commission, local regulators)\nLeading Market Intelligence (e.g., IMF, World Bank, OECD, Gartner, McKinsey, industry associations)\nReputable Financial & Economic Data Providers (Bloomberg, Reuters, S&P Global)\nDo not use unverified blogs, opinion pieces, or sources lacking clear attribution.\nInclude citation if you present the information (clearly state source link, name and publication date) for transparency.\n\nDELIVERABLE\nFull draft article (800–1,000 words) in a single response. No appendices or extra commentary."
            }
       ];