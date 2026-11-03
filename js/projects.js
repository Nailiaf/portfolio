/* ==========================================================
   Project data for the "Read more" pop up.
   - Keys (p1, p2, ...) must match data-project on the cards in index.html
   - image: path to a screenshot (optional, falls back to the placeholder)
   - url: leave '' to hide the "Visit site" button
   ========================================================== */

/* Dummy: replace the data below with your real projects. Keys (p1, p2, ...) must match data-project on the cards.
   Leave url as '' if there is no site to visit; the "Visit site" button is then hidden automatically. */
/* ==========================================================
   Project data for the "Read more" pop up.
   - Keys (p1, p2, ...) must match data-project on the cards in index.html
   - image: path to a screenshot (optional, falls back to the placeholder)
   ========================================================== */

const PROJECTS = {
  p1: {
    image: 'assets/images/projects/mama.png',
    title: 'MAMA - Mother Assesment and Medical Analysis',
    meta: '2026 · Web App',
    about: [
      'An expert system designed to assess and predict the risk of complications in pregnant and postpartum women based on their reported symptoms. The system covers six types of pregnancy and postpartum complications and applies a rule-based approach using the Mamdani Fuzzy Logic method to determine risk levels. It also features an educational article section that provides helpful information about pregnancy, maternal health, and postpartum care to support better awareness and understanding of maternal health.'
    ],
    features: [
      'Complication Risk Assessment',
      'Pregnancy and Postpartum Health Articles',
      'Risk Assessment for 6 Types of Complications',
      'Role-Based User Access'
    ],
    role: 'Independently handled the entire development process, including database design, backend functionality, system implementation, and user interface development.'
  },
  p2: {
    image: 'assets/images/projects/sispak.jpeg',
    title: 'Bone Disease Detection Expert System',
    meta: '2024 · Web App',
    about: [ 'A web-based expert system designed to identify bone diseases based on user-reported symptoms using the Backward Chaining method. Developed with CodeIgniter 3, the system provides easy access for general users without requiring login. Login access is available for medical experts, who can manage and add disease and symptom data, as well as administrators, who are responsible for managing the website.'
    ],
    features: [
      'Bone Disease Detection',
      'Backward Chaining Method',
      'Role-Based Access for Data Management',
      'Public Access Without Login Requirements'
    ],
    role: 'Responsible for backend development, including CRUD functionality for disease management and dashboard features, database design for disease data and dashboard requirements, and user interface development for the disease management and dashboard pages.'
  },
  p3: {
    image: 'assets/images/projects/erp.jpeg',
    title: 'Employee Management Enterprise Resource Planning',
    meta: '2024 · Web App',
    about: [
  'A web-based Enterprise Resource Planning (ERP) system developed to streamline employee management at Queen Bakery, Purbalingga. Built with Laravel and MySQL, the system digitizes key HR processes, including recruitment, attendance, leave management, and employee performance evaluation, helping improve operational efficiency and data management.'
  ],
  features: [
    'Employee Recruitment Management',
    'Employee Attendance and Check-In Management',
    'Leave Request and Approval Management',
    'Employee Performance Evaluation',
    'Centralized Employee Data Management'
  ],
  role: 'Responsible for creating UI/UX mockups and handling the full-stack development of the Attendance and Presence module. Independently developed the entire module, including its user interface, backend functionality, database integration, CRUD operations, and supporting features.'
  },
  p4: {
    image: 'assets/images/projects/telkom.jpeg',
    title: 'Telkom Automated Pricing System',
    meta: '2025 · Web App',
    about: [
  'A web-based product calculation system designed to help the marketing team generate product cost estimates automatically. Users can select registered products, calculate total costs, and apply either 11% or 12% tax rates to simplify pricing calculations when preparing offers for clients.'
  ],
  features: [
    'Automated Product Cost Calculation',
    'Registered Product Selection',
    'Flexible 11% and 12% Tax Calculation',
    'Accurate Pricing Estimation for Client Proposals',
    'Simplified Product Quotation Process'
  ],
  role: 'Collaborated with one team member to develop the entire system, including planning, database design, backend development, frontend implementation, and overall system functionality.'
},
  p5: {
    image: 'assets/images/projects/csirt.jpeg',
    title: 'Development of User Interaction Features for CSIRT Website',
    meta: '2024 · Web App',
    about: [
    'A web-based Cyber Security Incident Response Team (CSIRT) platform developed for the Jakarta Provincial Government to support cybersecurity incident response and public information services. The platform provides cybersecurity-related publications and aims to improve public engagement through user authentication and an interactive comment feature, allowing visitors to share feedback and interact with published articles.'
    ],
    features: [
      'User Login and Registration',
      'Article Publishing and Management',
      'User Comment and Interaction System',
      'Role-Based Admin and Reporter Dashboards',
      'Article and Comment Management'
    ],
    role: 'Responsible for developing user interaction features, including login, registration, and comment functionality, as well as implementing and refining the user and admin interfaces.'
}
};