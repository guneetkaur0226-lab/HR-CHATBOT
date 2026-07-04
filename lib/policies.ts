export interface PolicyChunk {
  id: string;
  docTitle: string;
  docCode: string;
  section: string;
  text: string;
}

// Sample / placeholder HR policy content, written for demo purposes.
// In a real deployment, these would be sourced from the company's actual
// HR handbook (PDF/Word docs parsed and chunked).

export const POLICIES: PolicyChunk[] = [
  {
    id: "leave-01",
    docTitle: "Leave Policy",
    docCode: "HR-LV-01",
    section: "Annual Leave",
    text: "Full-time employees accrue 18 days of paid annual leave per calendar year, credited at 1.5 days per completed month of service. Unused leave up to 5 days may be carried over into the next calendar year; any balance beyond that is forfeited unless local law requires otherwise. Leave requests should be submitted through the HR portal at least 3 working days in advance for approval by a direct manager.",
  },
  {
    id: "leave-02",
    docTitle: "Leave Policy",
    docCode: "HR-LV-01",
    section: "Sick Leave",
    text: "Employees are entitled to 12 days of paid sick leave per year. For absences longer than 2 consecutive days, a medical certificate must be submitted to HR within 3 working days of returning to work. Sick leave does not carry over to the following year and is not paid out on separation.",
  },
  {
    id: "leave-03",
    docTitle: "Leave Policy",
    docCode: "HR-LV-01",
    section: "Parental Leave",
    text: "Primary caregivers are eligible for 16 weeks of paid parental leave, and secondary caregivers for 4 weeks, following the birth or adoption of a child. Parental leave must be taken within 12 months of the birth or adoption date and can be split into a maximum of 2 blocks with manager approval. Employees should notify HR at least 8 weeks before the expected start date.",
  },
  {
    id: "leave-04",
    docTitle: "Leave Policy",
    docCode: "HR-LV-01",
    section: "Bereavement Leave",
    text: "Employees may take up to 5 paid days of bereavement leave following the death of an immediate family member, and 2 paid days for extended family. Additional unpaid leave may be arranged with manager approval on a case-by-case basis.",
  },
  {
    id: "wfh-01",
    docTitle: "Remote & Hybrid Work Policy",
    docCode: "HR-WFH-02",
    section: "Eligibility",
    text: "Employees who have completed their 90-day probationary period are eligible to work remotely up to 3 days per week, subject to manager approval and role requirements. Roles requiring on-site equipment or in-person collaboration (e.g. lab, facilities, front-desk roles) are excluded from this policy.",
  },
  {
    id: "wfh-02",
    docTitle: "Remote & Hybrid Work Policy",
    docCode: "HR-WFH-02",
    section: "Core Hours",
    text: "All employees, whether remote or on-site, are expected to be reachable during core hours of 11:00 to 16:00 in their local time zone. Outside of core hours, employees may adjust their schedule flexibly as long as weekly hour commitments are met and team coverage is maintained.",
  },
  {
    id: "wfh-03",
    docTitle: "Remote & Hybrid Work Policy",
    docCode: "HR-WFH-02",
    section: "Equipment & Expenses",
    text: "The company provides a one-time home office stipend of 300 USD (or local equivalent) for remote employees to cover desk, chair, or monitor purchases. Ongoing internet costs are reimbursed up to 30 USD per month upon submission of a receipt through the expense portal.",
  },
  {
    id: "expense-01",
    docTitle: "Expense & Reimbursement Policy",
    docCode: "HR-FIN-03",
    section: "Travel Expenses",
    text: "Business travel expenses including flights, accommodation, and ground transportation are reimbursable when pre-approved by a manager and booked through the corporate travel portal where available. Economy class is standard for flights under 6 hours; business class requires VP-level approval.",
  },
  {
    id: "expense-02",
    docTitle: "Expense & Reimbursement Policy",
    docCode: "HR-FIN-03",
    section: "Meals & Per Diem",
    text: "A daily meal per diem of 60 USD is provided during approved business travel, without the need for itemized receipts. Client entertainment expenses require itemized receipts and prior approval from a director-level manager if the amount exceeds 150 USD.",
  },
  {
    id: "expense-03",
    docTitle: "Expense & Reimbursement Policy",
    docCode: "HR-FIN-03",
    section: "Submission Deadlines",
    text: "All expense claims must be submitted within 30 days of the expense being incurred. Claims submitted after 60 days will not be reimbursed except in extenuating circumstances approved by Finance.",
  },
  {
    id: "conduct-01",
    docTitle: "Code of Conduct",
    docCode: "HR-CD-04",
    section: "Workplace Behavior",
    text: "All employees are expected to treat colleagues, clients, and partners with respect and professionalism. Harassment, discrimination, or retaliation of any kind will not be tolerated and may result in disciplinary action up to and including termination.",
  },
  {
    id: "conduct-02",
    docTitle: "Code of Conduct",
    docCode: "HR-CD-04",
    section: "Reporting Concerns",
    text: "Employees who witness or experience a violation of the code of conduct are encouraged to report it to their manager, HR business partner, or through the confidential ethics hotline. Reports are investigated promptly and retaliation against a person who reports in good faith is strictly prohibited.",
  },
  {
    id: "onboard-01",
    docTitle: "Onboarding Guide",
    docCode: "HR-ON-05",
    section: "First Week",
    text: "New hires receive a laptop and account credentials on their first day, along with a scheduled orientation session covering company policies, benefits enrollment, and team introductions. A designated onboarding buddy is assigned to help new employees navigate their first 30 days.",
  },
  {
    id: "onboard-02",
    docTitle: "Onboarding Guide",
    docCode: "HR-ON-05",
    section: "Probation Period",
    text: "All new employees undergo a 90-day probationary period during which performance and fit are evaluated through regular check-ins with their manager. A formal review is conducted at the end of the probation period to confirm continued employment.",
  },
  {
    id: "benefits-01",
    docTitle: "Benefits Overview",
    docCode: "HR-BN-06",
    section: "Health Insurance",
    text: "Full-time employees are eligible for company-sponsored health insurance starting on their first day of employment, covering medical, dental, and vision. Dependents may be added during the annual open enrollment period or within 30 days of a qualifying life event.",
  },
  {
    id: "benefits-02",
    docTitle: "Benefits Overview",
    docCode: "HR-BN-06",
    section: "Retirement Plan",
    text: "The company offers a retirement savings plan with a matching contribution of up to 4% of base salary, vested immediately upon enrollment. Employees can enroll or adjust contribution levels at any time through the benefits portal.",
  },
  {
    id: "exit-01",
    docTitle: "Offboarding & Exit Policy",
    docCode: "HR-EX-07",
    section: "Notice Period",
    text: "Employees are required to provide a minimum of 30 days written notice of resignation. During the notice period, a knowledge transfer plan should be completed in coordination with the employee's manager.",
  },
  {
    id: "exit-02",
    docTitle: "Offboarding & Exit Policy",
    docCode: "HR-EX-07",
    section: "Final Pay & Exit Interview",
    text: "Final pay, including any accrued unused annual leave, is processed within the final pay cycle following the last working day. All departing employees are invited to a confidential exit interview with HR to share feedback about their experience.",
  },
];
