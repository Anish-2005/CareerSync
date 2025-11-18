import dbConnect from '../src/lib/mongodb';
import Job from '../src/models/Job';

const sampleJobs = [
  {
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: { min: 120000, max: 180000, currency: 'USD' },
    description: 'We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions.',
    requirements: ['5+ years of experience', 'React, Node.js, TypeScript', 'AWS experience', 'Agile methodologies'],
    postedDate: new Date('2024-01-15'),
    applicationDeadline: new Date('2024-02-15'),
    tags: ['React', 'Node.js', 'AWS', 'TypeScript'],
    remote: true,
    experience: 'Senior',
    isActive: true,
  },
  {
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    type: 'full-time',
    salary: { min: 80000, max: 120000, currency: 'USD' },
    description: 'Join our fast-growing startup as a Frontend Developer. You will work on exciting projects using cutting-edge technologies.',
    requirements: ['3+ years of experience', 'React, Vue.js', 'CSS/SCSS', 'JavaScript'],
    postedDate: new Date('2024-01-10'),
    tags: ['React', 'Vue.js', 'CSS', 'JavaScript'],
    remote: false,
    experience: 'Mid-level',
    isActive: true,
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Austin, TX',
    type: 'contract',
    salary: { min: 100, max: 150, currency: 'USD/hour' },
    description: 'Looking for an experienced DevOps Engineer to help scale our cloud infrastructure and improve our CI/CD pipelines.',
    requirements: ['4+ years DevOps experience', 'Kubernetes, Docker', 'AWS/Azure', 'Terraform'],
    postedDate: new Date('2024-01-12'),
    applicationDeadline: new Date('2024-02-01'),
    tags: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
    remote: true,
    experience: 'Senior',
    isActive: true,
  },
  {
    title: 'UX/UI Designer',
    company: 'DesignStudio',
    location: 'Los Angeles, CA',
    type: 'part-time',
    salary: { min: 50, max: 80, currency: 'USD/hour' },
    description: 'Creative UX/UI Designer needed for various client projects. Must have strong portfolio and experience with design tools.',
    requirements: ['3+ years design experience', 'Figma, Sketch, Adobe XD', 'User research', 'Prototyping'],
    postedDate: new Date('2024-01-08'),
    tags: ['Figma', 'UX/UI', 'Design', 'Prototyping'],
    remote: true,
    experience: 'Mid-level',
    isActive: true,
  },
  {
    title: 'Data Scientist Intern',
    company: 'DataCorp',
    location: 'Seattle, WA',
    type: 'internship',
    description: 'Summer internship opportunity for data science students. Work on real-world data projects and learn from experienced mentors.',
    requirements: ['Currently enrolled in CS/Statistics/Math', 'Python, R', 'Machine Learning basics', 'SQL'],
    postedDate: new Date('2024-01-05'),
    tags: ['Python', 'Machine Learning', 'Data Science', 'SQL'],
    remote: false,
    experience: 'Entry-level',
    isActive: true,
  },
  {
    title: 'Full Stack Developer',
    company: 'InnovateLabs',
    location: 'Boston, MA',
    type: 'full-time',
    salary: { min: 90000, max: 130000, currency: 'USD' },
    description: 'We are seeking a talented Full Stack Developer to join our innovative team. You will work on both frontend and backend technologies.',
    requirements: ['4+ years full stack experience', 'React, Node.js, Python', 'PostgreSQL, MongoDB', 'REST APIs'],
    postedDate: new Date('2024-01-20'),
    tags: ['React', 'Node.js', 'Python', 'PostgreSQL'],
    remote: true,
    experience: 'Mid-level',
    isActive: true,
  },
  {
    title: 'Product Manager',
    company: 'GrowthCo',
    location: 'Chicago, IL',
    type: 'full-time',
    salary: { min: 110000, max: 150000, currency: 'USD' },
    description: 'Join our product team as a Product Manager. You will drive product strategy and work closely with engineering and design teams.',
    requirements: ['3+ years product management', 'Agile/Scrum experience', 'Data analysis skills', 'Technical background'],
    postedDate: new Date('2024-01-18'),
    tags: ['Product Management', 'Agile', 'Strategy', 'Analytics'],
    remote: false,
    experience: 'Mid-level',
    isActive: true,
  },
  {
    title: 'Mobile App Developer',
    company: 'AppWorks',
    location: 'Miami, FL',
    type: 'full-time',
    salary: { min: 85000, max: 115000, currency: 'USD' },
    description: 'Looking for a skilled Mobile App Developer to create amazing iOS and Android applications for our clients.',
    requirements: ['3+ years mobile development', 'React Native or Flutter', 'iOS/Android native', 'App Store deployment'],
    postedDate: new Date('2024-01-16'),
    tags: ['React Native', 'iOS', 'Android', 'Mobile'],
    remote: true,
    experience: 'Mid-level',
    isActive: true,
  }
];

async function seedJobs() {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Insert sample jobs
    const jobs = await Job.insertMany(sampleJobs);
    console.log(`Seeded ${jobs.length} jobs successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding jobs:', error);
    process.exit(1);
  }
}

seedJobs();