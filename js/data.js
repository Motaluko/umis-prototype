/* Sample records based on the supplied UMIS screenshots. */
window.UMISData = (() => {
  const meals = [
    { id: 'off-campus', name: 'Off Campus', detail: 'Select to be an off campus student, subject to approval by the Students Affairs Dean.' },
    { id: 'breakfast-lunch', name: 'Breakfast and Lunch', detail: 'For a resident student who takes breakfast and lunch.' },
    { id: 'breakfast-supper', name: 'Breakfast and Supper', detail: 'For a resident student who takes breakfast and supper.' },
    { id: 'lunch-supper', name: 'Lunch and Supper', detail: 'For a resident student who takes lunch and supper.' },
    { id: 'all-meals', name: 'Breakfast, Lunch and Supper', detail: 'For a resident student taking breakfast, lunch and supper.' }
  ];
  const residences = [
    { id: 'QE', name: 'Queen Esther Hall', capacity: 600, space: 599, min: 100, max: 100 },
    { id: 'CRST', name: 'Crystal Hall', capacity: 508, space: 12, min: 200, max: 500 },
    { id: 'NY2', name: 'Nyberg Hall 2', capacity: 130, space: 24, min: 300, max: 500 },
    { id: 'OG3', name: 'Ogden Hall 3', capacity: 250, space: 31, min: 200, max: 500 },
    { id: 'GAM2', name: 'Gamaliel Regular Hall 2', capacity: 170, space: 47, min: 200, max: 500 },
    { id: 'I1', name: 'Justice Deborah Female Hall 1', capacity: 350, space: 6, min: 100, max: 500 },
    { id: 'NF', name: 'Havilah Gold Hall', capacity: 720, space: 271, min: 200, max: 500 },
    { id: 'DIA1', name: 'Diamond Hall', capacity: 640, space: 42, min: 200, max: 500 },
    { id: 'PF', name: 'Felicia Adebisi Dada Hall', capacity: 770, space: 38, min: 100, max: 100 },
    { id: 'NY', name: 'Nyberg Hall 1', capacity: 120, space: 18, min: 100, max: 100 },
    { id: 'WH', name: 'White Hall', capacity: 540, space: 115, min: 200, max: 500 },
    { id: 'PLAT', name: 'Platinum Hall', capacity: 500, space: 25, min: 200, max: 500 },
    { id: 'OG', name: 'Ogden Hall 1', capacity: 250, space: 33, min: 200, max: 500 },
    { id: 'SAPP1', name: 'Sapphire Classic Hall', capacity: 740, space: 51, min: 200, max: 500 },
    { id: 'BETH', name: 'Bethel Hall', capacity: 420, space: 15, min: 100, max: 500 },
    { id: 'WRA', name: 'Winslow Hall', capacity: 280, space: 20, min: 200, max: 500 },
    { id: 'OG2', name: 'Ogden Hall 2', capacity: 260, space: 19, min: 200, max: 500 }
  ];
  const worship = [
    ['Bethel Chapel', 'Bethel Hall Auditorium', 'Adebowale Adesanya', -1], ['Beula Chapel', 'Platinum Hall Auditorium', 'Emmanuel Eregare', 2],
    ['Canaan Land Chapel', 'Nelson Mandela Auditorium', 'Afanga Sylvester', 0], ['Christ Our Foundation Church', 'Law Activity Hall Iperu Campus', 'Emereonye Ndubuisi M.', 9],
    ['Covenant Chapel', 'White Hall Auditorium', 'Gambo Daudu', 25], ['Dominion Chapel', 'Ogden Hall Auditorium', 'Biague Labiugubissial', 0],
    ['Glory Land Chapel', 'Winslow Hall', 'Gift Okan-Gbenedio', 0], ['Grace Chapel', 'WRA', 'Chukwuemeka Abaribe', -1],
    ['Heir of the Kingdom Chapel', 'BUTH 600 Seater', 'John Sotunsa', -1], ['Heritage Church', 'Old Cafeteria', 'Adeoti J.A.F', 6],
    ['Light House Chapel', 'Queen Esther Auditorium', 'Jonathan Ikhane', 0], ['Living Springs', 'Samuel Akande Auditorium', 'Michael Akpa', 0],
    ['Maranatha Chapel', 'Sapphire Activity Hall', 'Abel Akinpelu', 20], ['Mount Zion', 'Gideon Troopers', 'Kalu Daniel', -1],
    ['Open Heavens Chapel', 'Daniel Hall Auditorium', 'Babatunde Oladipo', 8], ['Streams of Joy', 'Bells Hall', 'Oluwaseun Akinyemi', 4]
  ].map((r, i) => ({ id: `WC${String(i + 1).padStart(2, '0')}`, name: r[0], location: r[1], pastor: r[2], space: r[3] }));
  const courses = [
    ['COS 409', 'Research Methodology and Technical Report Writing', 'SANUSI FUNMILAYO', 'Soft Eng Group D', 3],
    ['SEN 401', 'Software Configuration Management and Maintenance', 'BASHWIRA-IDOWU EMMANUELLA', 'Soft Eng Group D', 2],
    ['INS 401', 'Project Management', 'BASHWIRA-IDOWU EMMANUELLA', 'Soft Eng Group D', 2],
    ['CSC 401', 'Algorithms and Complexity Analysis', 'Mgbeahuruike Emmanuel Oluchukwu', 'Soft Eng Group D', 2],
    ['BU-COS 419', 'Agile Development and Scrum', 'Emmanuel Ojo', 'Soft Eng Group D', 2],
    ['BU-SEN 411', 'Open-Source Systems Development', 'EWOEYA IBUKUN Onaolapo', 'Soft Eng Group D', 2],
    ['BU-SEN 407', 'Software Measurement and Metrics', 'Adegbola Adesoji', 'Soft Eng Group D', 2],
    ['BU-SEN 417', 'Human Computer Interaction and Emerging Technologies', 'BASHWIRA-IDOWU EMMANUELLA', 'Soft Eng Group D', 3],
    ['BU-GST 041', 'Citizenship Orientation', 'Adeleye Olufemi', 'SOFT-ENG', 0],
    ['BU-GST 403', 'Entrepreneurship and Innovation', 'Akinyemi Folake', 'SOFT-ENG', 2],
    ['BU-SEN 415', 'Software Testing and Quality Assurance', 'Oladipo Adebayo', 'Soft Eng Group D', 3],
    ['BU-COS 421', 'Cloud Computing Fundamentals', 'Ibrahim Abdulrahman', 'Soft Eng Group D', 2]
  ].map((r, i) => ({ id: r[0], title: r[1], instructor: r[2], option: r[3], credit: r[4], year: 4, noGpa: i === 8 }));
  return { student: { name: 'OLUBUNMI-ALUKO, MOTUNRAYO REHOBOTH', matric: '23/0116', campus: 'Main Campus (Undergraduate)', programme: 'Software Engineering', level: 400, semester: '2026/2027.1', school: 'School of Computing' }, meals, residences, worship, courses };
})();
