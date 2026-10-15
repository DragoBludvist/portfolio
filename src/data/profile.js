// All site content lives here. Edit this file to update the portfolio;
// the components only handle layout.

export const profile = {
  name: 'Aakash Premnath Subramanyam',
  shortName: 'Aakash Premnath',
  initials: 'AP',
  role: 'Cybersecurity Engineer',
  focus: ['SOC & detection engineering', 'AI-augmented security', 'Cloud identity'],
  location: 'Boston, MA',
  // Strip EXIF metadata (GPS, device) before replacing this file.
  photo: {
    src: '/profile.jpg',
    alt: 'Aakash Premnath Subramanyam standing in front of a bronze university seal',
  },
  availability: 'Graduating Dec 2026 · open to full-time security roles',
  summary:
    'I build detection pipelines that analysts actually trust. My work sits where security operations meets machine learning: auditing SIEM and DLP rules against MITRE ATT&CK, cutting alert noise, and shipping self-hosted models that triage threats under strict data governance.',
  about: [
    "I'm an M.S. Cybersecurity student at Northeastern University's Khoury College, originally from Chennai, India. Before grad school I worked at Wipro on identity security, hardening Microsoft Entra ID and Microsoft 365 for a large enterprise.",
    'Most recently, at Navitas Life Sciences, I audited the SOC detection stack end to end and then designed and built an ML alert-triage system using only open-weight, on-premises models, from data normalization and fine-tuning to the FastAPI services and the React dashboard analysts use.',
    'I like security work that changes how a team operates day to day: rules that fire for the right reasons, automation that removes toil, and tools analysts actually want to open.',
  ],
  email: 'subramanyam.aa@northeastern.edu',
  links: {
    linkedin: 'https://www.linkedin.com/in/aakashpremnaths/',
    github: 'https://github.com/DragoBludvist',
    resume: '/resume.pdf',
    source: 'https://github.com/DragoBludvist/portfolio',
  },
};

export const focusAreas = [
  { title: 'Detection engineering', text: 'Auditing SIEM, DLP and SOAR rules against MITRE ATT&CK so every alert has a reason to exist.' },
  { title: 'AI for the SOC', text: 'Self-hosted models that triage and explain alerts under strict data-governance rules.' },
  { title: 'Identity & cloud', text: 'Least-privilege access, Conditional Access and access reviews in Microsoft Entra ID.' },
];

export const experience = [
  {
    company: 'Navitas Life Sciences',
    title: 'Cybersecurity Intern, Security Auditing & AI-Augmented SOC',
    location: 'Boston, MA',
    period: 'Feb 2026 – Aug 2026',
    points: [
      'Traced the root cause of the SOC’s false-positive problem, then scoped and led an audit of CrowdStrike Next-Gen SIEM, FireEye, Microsoft Purview DLP and Netskope, mapping every detection rule to MITRE ATT&CK.',
      'Rebuilt the Purview DLP policy set, tightening conditions, adding whitelists and correcting thresholds, and handed it to IT Ops for production rollout.',
      'Found Falcon Fusion SOAR already inside the existing CrowdStrike licence and made it the orchestration and automated-response layer for the SOC’s AI work.',
      'Designed and deployed an ML alert-triage tool: a fine-tuned SecureBERT 2.0 + LoRA classifier scores alerts inline, and a Foundation-Sec-8B LLM judge reviews them asynchronously with MITRE ATT&CK context.',
      'Took it from labelled Wazuh data through recall-focused training to a GPU deployment behind Netskope ZTNA, with a React SOC dashboard and a prompt-injection-hardened FastAPI explanation service.',
    ],
    tags: ['CrowdStrike', 'Wazuh', 'Purview DLP', 'Netskope', 'SecureBERT', 'LoRA', 'FastAPI', 'React'],
  },
  {
    company: 'Wipro',
    title: 'Project Engineer, Azure & Microsoft Entra',
    location: 'Hyderabad, India',
    period: 'Mar 2022 – Jul 2024',
    points: [
      'Shrank the enterprise attack surface by enforcing least privilege and running periodic access reviews in Microsoft Entra ID.',
      'Investigated and resolved recurring authentication incidents through root-cause analysis, and cleaned up licence assignments along the way.',
      'Led the rollout of O365 security features and Conditional Access policies that brought the user base in line with security baselines.',
    ],
    tags: ['Entra ID', 'Conditional Access', 'Microsoft 365', 'IAM'],
  },
];

export const projects = [
  {
    name: 'AI-Augmented SOC Alert Triage',
    kind: 'Internship · Production',
    description:
      'A three-stage, fully self-hosted pipeline that tackles alert fatigue: a LoRA-tuned SecureBERT 2.0 classifier scores alerts inline, Foundation-Sec-8B-Instruct gives an asynchronous second opinion, and Foundation-Sec-8B-Reasoning powers an on-demand "Explain with AI" rationale for analysts.',
    highlights: ['Open-weight, on-prem only', 'Recall-weighted training', 'Prompt-injection hardening'],
    tags: ['PyTorch', 'HuggingFace', 'LoRA/PEFT', 'FastAPI', 'React', 'AWS GPU'],
    links: [],
  },
  {
    name: 'Cloud SIEM with Hybrid ML Attack Detection',
    kind: 'Security Operations',
    description:
      'An Azure cyber range replicating enterprise attack paths, with syslog, auth.log, auditd and Zeek unified into one normalized SIEM pipeline. A hybrid Isolation Forest + Random Forest model flags lateral movement, suspicious authentication and privilege misuse.',
    highlights: ['Enterprise attack-path replica', 'MITRE ATT&CK-mapped dashboards', 'Real-time attack-path view'],
    tags: ['Azure', 'Zeek', 'Scikit-learn', 'SIEM'],
    links: [],
  },
  {
    name: 'Malware Analysis & Development Research',
    kind: 'Academic',
    description:
      'Proof-of-concept malware built in isolated VMs with C and Python to study evasion, persistence and stealth TTPs, analysing system calls, registry changes and behavioural indicators, then turned into defensive detection and IR recommendations.',
    highlights: ['Behavioural IOCs', 'Detection playbooks', 'Isolated lab'],
    tags: ['C', 'Python', 'Reverse engineering', 'IR'],
    links: [],
  },
];

// Filter chips for the skills matrix. Each skill below lists the domains it belongs to.
export const skillDomains = [
  { id: 'detect', label: 'Detection & response' },
  { id: 'cloud', label: 'Cloud & identity' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'offense', label: 'Offensive testing' },
  { id: 'gov', label: 'Governance' },
];

export const skills = [
  {
    group: 'Security platforms',
    items: [
      { name: 'CrowdStrike NG-SIEM (LogScale)', domains: ['detect'] },
      { name: 'Falcon Fusion SOAR', domains: ['detect'] },
      { name: 'Microsoft Purview DLP', domains: ['detect', 'gov'] },
      { name: 'Netskope', domains: ['cloud', 'detect'] },
      { name: 'Trellix', domains: ['detect'] },
      { name: 'Wazuh (OpenSearch)', domains: ['detect'] },
      { name: 'Splunk', domains: ['detect'] },
      { name: 'Wireshark', domains: ['detect', 'offense'] },
      { name: 'Burp Suite', domains: ['offense'] },
      { name: 'Metasploit', domains: ['offense'] },
      { name: 'Nmap', domains: ['offense'] },
    ],
  },
  {
    group: 'Cloud & infrastructure',
    items: [
      { name: 'AWS EC2 (GPU)', domains: ['cloud', 'ai'] },
      { name: 'Azure Security Center', domains: ['cloud'] },
      { name: 'Microsoft Entra ID', domains: ['cloud'] },
      { name: 'Microsoft 365 Defender', domains: ['cloud', 'detect'] },
      { name: 'Docker', domains: ['cloud'] },
      { name: 'On-prem GPU inference', domains: ['ai'] },
      { name: 'CUDA', domains: ['ai'] },
    ],
  },
  {
    group: 'AI / ML',
    items: [
      { name: 'PyTorch', domains: ['ai'] },
      { name: 'HuggingFace Transformers', domains: ['ai'] },
      { name: 'LoRA / PEFT', domains: ['ai'] },
      { name: 'SecureBERT 2.0', domains: ['ai', 'detect'] },
      { name: 'Foundation-Sec-8B', domains: ['ai', 'detect'] },
      { name: 'FastAPI', domains: ['ai'] },
      { name: 'Scikit-learn', domains: ['ai'] },
    ],
  },
  {
    group: 'Languages & frameworks',
    items: [
      { name: 'Python', domains: ['ai', 'offense'] },
      { name: 'C / C++', domains: ['offense'] },
      { name: 'Bash', domains: ['cloud', 'offense'] },
      { name: 'Git', domains: [] },
      { name: 'LogScale (LQL)', domains: ['detect'] },
      { name: 'Falcon Query Language', domains: ['detect'] },
      { name: 'MITRE ATT&CK', domains: ['detect', 'gov'] },
      { name: 'NIST CSF', domains: ['gov'] },
      { name: 'GxP', domains: ['gov'] },
      { name: 'GDPR', domains: ['gov'] },
    ],
  },
];

// Sample alerts for the interactive triage demo. Hosts and events are made up;
// technique IDs are real MITRE ATT&CK identifiers. `lean` only sets the width of
// the classifier bar and is never shown as a number.
export const triageSamples = [
  {
    id: 'a1',
    rule: 'Encoded PowerShell command line',
    host: 'wks-fin-14',
    technique: 'T1059.001',
    tactic: 'Execution',
    lean: 0.93,
    judge: 'agrees',
    verdict: 'escalate',
    explanation:
      'Base64-encoded PowerShell launched by Outlook is a classic phishing payload pattern. The parent process and the encoding together outweigh this host’s normal admin-script activity.',
  },
  {
    id: 'a2',
    rule: 'Scheduled task created',
    host: 'srv-build-03',
    technique: 'T1053.005',
    tactic: 'Persistence',
    lean: 0.18,
    judge: 'agrees',
    verdict: 'benign',
    explanation:
      'Created by the CI service account inside the usual deploy window, matching this build server’s history of nightly jobs.',
  },
  {
    id: 'a3',
    rule: 'Many failed logons, then a success',
    host: 'vpn-gw-02',
    technique: 'T1110.003',
    tactic: 'Credential Access',
    lean: 0.88,
    judge: 'agrees',
    verdict: 'escalate',
    explanation:
      'Password-spray shape: one source trying many accounts with a few passwords, followed by a successful logon. Worth an analyst’s eyes immediately.',
  },
  {
    id: 'a4',
    rule: 'Large upload to personal cloud storage',
    host: 'wks-rd-07',
    technique: 'T1567.002',
    tactic: 'Exfiltration',
    lean: 0.71,
    judge: 'disagrees',
    verdict: 'review',
    explanation:
      'The classifier leans threat on volume and destination; the judge notes the file types match an approved research-sharing workflow. When the two disagree, the alert goes to a human.',
  },
  {
    id: 'a5',
    rule: 'New service installed',
    host: 'wks-hr-02',
    technique: 'T1543.003',
    tactic: 'Persistence',
    lean: 0.12,
    judge: 'agrees',
    verdict: 'benign',
    explanation: 'A signed vendor updater installing its own service, seen across the fleet on the same day.',
  },
  {
    id: 'a6',
    rule: 'LSASS memory read by unusual process',
    host: 'srv-dc-01',
    technique: 'T1003.001',
    tactic: 'Credential Access',
    lean: 0.97,
    judge: 'agrees',
    verdict: 'escalate',
    explanation:
      'A non-system process reading LSASS memory on a domain controller is high risk no matter what the baseline says.',
  },
];

export const education = [
  {
    school: 'Northeastern University',
    detail: 'Khoury College of Computer Sciences',
    degree: 'M.S. Cybersecurity',
    period: 'Sep 2024 – Dec 2026',
    location: 'Boston, MA',
  },
  {
    school: 'Anna University',
    detail: 'Sri Venkateswara College of Engineering',
    degree: 'B.E. Computer Science and Engineering',
    period: 'Sep 2018 – Jul 2022',
    location: 'Tamil Nadu, India',
  },
];

export const certifications = [
  { name: 'Microsoft Certified: Azure Fundamentals' },
  { name: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals' },
  { name: 'Certified SAFe 6 Agilist' },
  { name: 'SC-500: Cloud and AI Security Engineer Associate (beta)', status: 'In progress' },
];

export const coursework = [
  'Network Security',
  'Digital Forensics',
  'Secure Software Development',
  'Penetration Testing',
  'Ethical Hacking',
  'Security Risk Management',
];
