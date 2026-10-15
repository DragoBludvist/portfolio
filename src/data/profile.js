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
  status: ['Open to full-time roles', 'Graduating Dec 2026', 'Boston, MA'],
  motto: ['Offense', 'informs', 'defense.'],
  lead: 'I think like an attacker and build like a defender, and I use AI to cut through the noise in the SOC.',
  // Used for the page description and JSON-LD, not shown on the page.
  summary: 'Cybersecurity engineer focused on SOC detection engineering, AI-augmented alert triage and cloud identity security.',
  // Strip EXIF metadata (GPS, device) before replacing: node scripts/strip-photo-metadata.mjs
  photo: { src: '/profile.jpg', alt: 'Aakash Premnath Subramanyam' },
  email: 'subramanyam.aa@northeastern.edu',
  links: {
    linkedin: 'https://www.linkedin.com/in/aakashpremnaths/',
    github: 'https://github.com/DragoBludvist',
    resume: '/resume.pdf',
    source: 'https://github.com/DragoBludvist/portfolio',
  },
};

// The "at a glance" card in the hero: what a recruiter checks first.
export const glance = [
  { label: 'Role', value: 'Security engineer', note: 'SOC, detection, AI security' },
  { label: 'Recent', value: 'Navitas Life Sciences', note: 'Cybersecurity Intern, 2026' },
  { label: 'Before', value: 'Wipro', note: 'Project Engineer, 2022–2024' },
  { label: 'Education', value: 'M.S. Cybersecurity, Northeastern', note: 'Dec 2026' },
  { label: 'Certs', value: 'Azure Fundamentals · Security, Compliance & Identity · SAFe 6' },
  { label: 'Tools', value: 'CrowdStrike · Wazuh · Splunk · Purview DLP · Entra ID · Python' },
];

// "What I do": offense (red), defense (blue), and where they meet (purple).
export const pillars = [
  {
    id: 'offense',
    tag: 'Offense',
    title: 'Think like the attacker',
    text: 'I build proof-of-concept malware in isolated labs to study evasion, persistence and stealth, then turn what I learn into detection playbooks.',
    proof: 'Malware analysis · Metasploit · Burp Suite · C, Python',
  },
  {
    id: 'defense',
    tag: 'Defense',
    title: 'Build defenses that hold',
    text: 'From SIEM and DLP rules mapped to MITRE ATT&CK to least-privilege identity in Entra ID, I make alerts fire for the right reasons.',
    proof: 'CrowdStrike NG-SIEM · Purview DLP · Netskope · Entra ID',
  },
  {
    id: 'ai',
    tag: 'AI security',
    title: 'AI the SOC can trust',
    text: 'A self-hosted alert-triage system I designed and shipped: a classifier scores, an LLM judge double-checks, and analysts get a plain-language why.',
    proof: 'SecureBERT 2.0 · LoRA · Foundation-Sec-8B · FastAPI',
    cta: { label: 'Try a simulated run ↓', href: '#demo' },
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
      'Designed and shipped a self-hosted AI alert-triage system on open-weight models.',
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
  { name: 'Microsoft Certified: Azure Fundamentals' },
  { name: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals' },
  { name: 'Certified SAFe 6 Agilist' },
  // As listed on the resume; confirm the exact exam name before relying on it.
  { name: 'SC-500: Cloud and AI Security Engineer Associate (beta)', status: 'In progress' },
];
