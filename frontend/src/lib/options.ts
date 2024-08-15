export type optionsType = {
  key: string;
  label: string;
};

export const genderOptions: optionsType[] = [
  {
    key: "male",
    label: "Male",
  },
  {
    key: "female",
    label: "Female",
  },
  {
    key: "other",
    label: "Other",
  },
] as const;

export const degreeOptions: optionsType[] = [
  {
    key: "diploma",
    label: "Diploma",
  },
  {
    key: "graduate",
    label: "Graduate",
  },
  {
    key: "postgraduate",
    label: "Post Graduate",
  },
  {
    key: "master",
    label: "Master",
  },
  {
    key: "doctorate",
    label: "Doctorate",
  },
];

export const courses: Record<string, { key: string; label: string }[]> = {
  diploma: [
    { key: "civil_engineering", label: "Civil Engineering" },
    { key: "mechanical_engineering", label: "Mechanical Engineering" },
    { key: "electrical_engineering", label: "Electrical Engineering" },
    { key: "computer_engineering", label: "Computer Engineering" },
    {
      key: "electronics_communication",
      label: "Electronics and Communication Engineering",
    },
    { key: "automobile_engineering", label: "Automobile Engineering" },
    { key: "information_technology", label: "Information Technology" },
    { key: "chemical_engineering", label: "Chemical Engineering" },
    { key: "hotel_management", label: "Hotel Management" },
    { key: "pharmacy", label: "Pharmacy" },
  ],
  graduate: [
    { key: "ba", label: "Bachelor of Arts (BA)" },
    { key: "bsc", label: "Bachelor of Science (BSc)" },
    { key: "bcom", label: "Bachelor of Commerce (BCom)" },
    { key: "btech", label: "Bachelor of Technology (BTech)" },
    { key: "bba", label: "Bachelor of Business Administration (BBA)" },
    { key: "bca", label: "Bachelor of Computer Applications (BCA)" },
    { key: "bed", label: "Bachelor of Education (BEd)" },
    { key: "bfa", label: "Bachelor of Fine Arts (BFA)" },
    { key: "bpharm", label: "Bachelor of Pharmacy (BPharm)" },
    { key: "llb", label: "Bachelor of Laws (LLB)" },
  ],
  postgraduate: [
    { key: "ma", label: "Master of Arts (MA)" },
    { key: "msc", label: "Master of Science (MSc)" },
    { key: "mcom", label: "Master of Commerce (MCom)" },
    { key: "mba", label: "Master of Business Administration (MBA)" },
    { key: "mca", label: "Master of Computer Applications (MCA)" },
    { key: "med", label: "Master of Education (MEd)" },
    { key: "msw", label: "Master of Social Work (MSW)" },
    { key: "mtech", label: "Master of Technology (MTech)" },
    { key: "llm", label: "Master of Laws (LLM)" },
  ],
  master: [
    { key: "mphil", label: "Master of Philosophy (MPhil)" },
    { key: "msc", label: "Master of Science (MSc)" },
    { key: "ma", label: "Master of Arts (MA)" },
    { key: "mtech", label: "Master of Technology (MTech)" },
    { key: "mba", label: "Master of Business Administration (MBA)" },
    { key: "mca", label: "Master of Computer Applications (MCA)" },
    { key: "mfa", label: "Master of Fine Arts (MFA)" },
    { key: "mpharm", label: "Master of Pharmacy (MPharm)" },
    { key: "mph", label: "Master of Public Health (MPH)" },
    { key: "med", label: "Master of Education (MEd)" },
  ],
  doctorate: [
    { key: "phd", label: "Doctor of Philosophy (PhD)" },
    { key: "md", label: "Doctor of Medicine (MD)" },
    { key: "dsc", label: "Doctor of Science (DSc)" },
    { key: "dlitt", label: "Doctor of Literature (DLitt)" },
    { key: "lld", label: "Doctor of Laws (LLD)" },
    { key: "deng", label: "Doctor of Engineering (DEng)" },
    { key: "edd", label: "Doctor of Education (EdD)" },
  ],
};

export const courseTypeOptions: optionsType[] = [
  {
    key: "fulltime",
    label: "Full Time",
  },
  {
    key: "parttime",
    label: "Part Time",
  },
  {
    key: "correspondence",
    label: "Correspondence",
  },
];
