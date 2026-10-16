// All site content lives here. Edit this file to update the portfolio;
// the components only handle layout. Everything here was checked against
// the resume and LinkedIn profile.

export const profile = {
  name: 'Aakash Premnath Subramanyam',
  displayName: 'Aakash Premnath',
  role: 'Cybersecurity Engineer',
  roleLine: 'Cybersecurity engineer: SOC detection, AI security and cloud identity.',
  focus: ['SOC & detection engineering', 'AI-augmented security', 'Cloud identity'],
  location: 'Boston, MA',
  motto: ['Offense', 'informs', 'defense.'],
  lead: "I think like an attacker and build like a defender. I adapt quickly, and I'm at my best solving problems I haven't seen before.",
  // Used for the page description and JSON-LD, not shown on the page.
  summary: 'Cybersecurity engineer focused on SOC detection engineering, AI-augmented alert triage and cloud identity security.',
  // Strip EXIF metadata (GPS, device) before replacing: node scripts/strip-photo-metadata.mjs
  photo: { src: '/profile.jpg', alt: 'Aakash Premnath Subramanyam' },
  email: 'subramanyam.aa@northeastern.edu',
  links: {
    site: 'https://aakashpremnathportfolio.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/aakashpremnaths/',
    github: 'https://github.com/DragoBludvist',
    resume: '/resume.pdf',
    source: 'https://github.com/DragoBludvist/portfolio',
  },
};

// The access badge in the hero: what a recruiter checks first.
// AZ-900 = Azure Fundamentals, SC-900 = Security, Compliance, and Identity Fundamentals.
export const badge = {
  role: 'Security engineer',
  status: 'Open to full-time roles',
  fields: [
    { label: 'Recent', value: 'Navitas Life Sciences' },
    { label: 'Before', value: 'Wipro' },
    { label: 'Studying', value: 'M.S. Cybersecurity, Northeastern · Dec 2026', full: true },
    { label: 'Certified', value: 'AZ-900 · SC-900 · SAFe 6', full: true },
  ],
};

// "What I do": offense (red), defense (blue), and where they meet (purple).
export const pillars = [
  {
    id: 'offense',
    tag: 'Offense',
    title: 'Think like the attacker',
    text: 'I study how attackers evade, persist and hide, so I know what to look for before it shows up in the logs.',
    proof: 'Malware analysis · Penetration testing · Attacker TTPs · Ethical hacking',
  },
  {
    id: 'defense',
    tag: 'Defense',
    title: 'Build defenses that hold',
    text: 'I design detections and access controls that fire for the right reasons, mapped to MITRE ATT&CK and tuned until analysts trust them.',
    proof: 'Detection engineering · SIEM & SOAR · DLP · Identity & access',
  },
  {
    id: 'ai',
    tag: 'AI security',
    title: 'AI the SOC can trust',
    text: 'I apply machine learning where the SOC hurts most, separating real threats from noise, and keep models self-hosted and guarded against prompt injection.',
    proof: 'ML for threat detection · Model fine-tuning · LLM guardrails · Self-hosted AI',
  },
];

export const experience = [
  {
    company: 'Navitas Life Sciences',
    title: 'Cybersecurity Intern, Security Auditing & AI-Augmented SOC',
    location: 'Boston, MA',
    period: 'Feb – Aug 2026',
    points: [
      'Led a six-month audit of CrowdStrike NG-SIEM, FireEye, Purview DLP and Netskope, mapped to MITRE ATT&CK.',
      'Delivered the first Purview DLP policy overhaul for production rollout.',
      'Owned the AI triage work end to end, from labelled Wazuh data and model training to deployment behind Netskope ZTNA.',
    ],
  },
  {
    company: 'Wipro',
    title: 'Project Engineer, Azure & Microsoft Entra',
    location: 'Hyderabad, India',
    period: 'Mar 2022 – Jul 2024',
    points: [
      'Enforced least privilege and ran access reviews in Microsoft Entra ID for a large enterprise.',
      'Rolled out Conditional Access and O365 security features.',
      'Resolved recurring authentication incidents through root-cause analysis.',
    ],
  },
];

// To add a project, copy one of these objects. `side` sets its colour:
// 'offense' (red), 'defense' (blue) or 'ai' (purple). Newest first.
export const projects = [
  {
    side: 'ai',
    kind: 'Internship · shipped',
    name: 'AI-Augmented SOC Alert Triage',
    summary:
      'A self-hosted pipeline for alert fatigue: a LoRA-tuned SecureBERT 2.0 classifier scores alerts inline, Foundation-Sec-8B gives an independent second opinion, and analysts get a plain-language explanation on demand.',
    tools: ['PyTorch', 'HuggingFace', 'LoRA/PEFT', 'FastAPI', 'React'],
    links: [],
  },
  {
    side: 'defense',
    kind: 'Security operations',
    name: 'Cloud SIEM with Hybrid ML Attack Detection',
    summary:
      'An Azure cyber range that replicates enterprise attack paths, with syslog, auth.log, auditd and Zeek in one normalized SIEM pipeline. Isolation Forest and Random Forest models flag lateral movement and privilege misuse.',
    tools: ['Azure', 'Zeek', 'Scikit-learn', 'MITRE ATT&CK'],
    links: [],
  },
  {
    side: 'offense',
    kind: 'Research',
    name: 'Malware Analysis & Development',
    summary:
      'Proof-of-concept malware built in isolated VMs to study evasion, persistence and stealth techniques, turned into defensive detection and incident-response recommendations.',
    tools: ['C', 'Python', 'Reverse engineering', 'IR'],
    links: [],
  },
];

// Sample alerts for the optional demo. Made up; technique IDs are real MITRE ATT&CK IDs.
export const demoAlerts = [
  { id: 'a1', rule: 'Encoded PowerShell command line', technique: 'T1059.001', tactic: 'Execution', verdict: 'escalate' },
  { id: 'a2', rule: 'Scheduled task created', technique: 'T1053.005', tactic: 'Persistence', verdict: 'benign' },
  { id: 'a3', rule: 'Large upload to personal cloud storage', technique: 'T1567.002', tactic: 'Exfiltration', verdict: 'review' },
];

export const skills = [
  { group: 'Security platforms', items: ['CrowdStrike NG-SIEM (LogScale)', 'Falcon Fusion SOAR', 'Microsoft Purview DLP', 'Netskope', 'Trellix', 'Wazuh', 'Splunk', 'Wireshark', 'Burp Suite', 'Metasploit', 'Nmap'] },
  { group: 'Cloud & identity', items: ['Microsoft Entra ID', 'Microsoft 365 Defender', 'Azure Security Center', 'AWS EC2 (GPU)', 'Docker'] },
  { group: 'AI / ML', items: ['PyTorch', 'HuggingFace Transformers', 'LoRA / PEFT', 'SecureBERT 2.0', 'Foundation-Sec-8B', 'FastAPI', 'Scikit-learn'] },
  { group: 'Languages & frameworks', items: ['Python', 'C / C++', 'Bash', 'LogScale (LQL)', 'Falcon Query Language', 'MITRE ATT&CK', 'NIST CSF', 'GxP', 'GDPR'] },
];

export const education = [
  { school: 'Northeastern University', detail: 'Khoury College of Computer Sciences', degree: 'M.S. Cybersecurity', period: 'Sep 2024 – Dec 2026' },
  { school: 'Anna University', detail: 'Sri Venkateswara College of Engineering', degree: 'B.E. Computer Science and Engineering', period: 'Sep 2018 – Jul 2022' },
];

export const certifications = [
  // `href` links the name to the certificate PDF in public/certs/.
  { name: 'Microsoft Certified: Azure Fundamentals', href: '/certs/az-900.pdf' },
  { name: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals', href: '/certs/sc-900.pdf' },
  { name: 'Certified SAFe 6 Agilist' },
  { name: 'SC-500: Microsoft Certified: Cloud and AI Security Engineer Associate', status: 'In progress' },
];
