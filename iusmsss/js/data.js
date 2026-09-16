// Dummy data for University Portal SPA
window.AppData = {
  departments: [
    { id: 1, name: 'Computer Science', head: 'Dr. Alan Turing', totalStudents: 450, totalFaculty: 25, courses: 15, established: 1990, description: 'Focuses on computation, algorithms, and software design.', color: '#4F46E5' },
    { id: 2, name: 'Electronics', head: 'Dr. Nikola Tesla', totalStudents: 380, totalFaculty: 22, courses: 12, established: 1992, description: 'Study of electrical circuits and communication systems.', color: '#0EA5E9' },
    { id: 3, name: 'Mechanical', head: 'Dr. Henry Ford', totalStudents: 420, totalFaculty: 24, courses: 14, established: 1985, description: 'Principles of engineering, physics, and materials science.', color: '#10B981' },
    { id: 4, name: 'Civil', head: 'Dr. Isambard Brunel', totalStudents: 310, totalFaculty: 18, courses: 10, established: 1985, description: 'Design, construction, and maintenance of the physical environment.', color: '#F59E0B' },
    { id: 5, name: 'Mathematics', head: 'Dr. Ada Lovelace', totalStudents: 200, totalFaculty: 15, courses: 8, established: 1980, description: 'Pure and applied mathematics, statistics, and modeling.', color: '#EF4444' },
    { id: 6, name: 'Physics', head: 'Dr. Albert Einstein', totalStudents: 180, totalFaculty: 14, courses: 7, established: 1980, description: 'Understanding the fundamental laws of nature and matter.', color: '#8B5CF6' },
    { id: 7, name: 'Chemistry', head: 'Dr. Marie Curie', totalStudents: 190, totalFaculty: 15, courses: 8, established: 1980, description: 'Composition, structure, properties, and change of matter.', color: '#EC4899' },
    { id: 8, name: 'Business Administration', head: 'Dr. Peter Drucker', totalStudents: 500, totalFaculty: 30, courses: 18, established: 1995, description: 'Management, finance, marketing, and entrepreneurship principles.', color: '#14B8A6' }
  ],
  students: [
    { id: 1, name: 'John Smith', email: 'john.smith@university.edu', phone: '+1-555-010-1234', department: 'Computer Science', semester: 3, gpa: 3.8, attendance: 92, feeStatus: 'paid', enrollmentDate: '2025-08-15', avatar: 'JS', address: '123 Main St, New York, NY 10001', dob: '2005-04-12', gender: 'Male', guardianName: 'Robert Smith', guardianPhone: '+1-555-020-1234', bloodGroup: 'O+', status: 'active' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@university.edu', phone: '+1-555-010-2345', department: 'Electronics', semester: 5, gpa: 3.9, attendance: 95, feeStatus: 'paid', enrollmentDate: '2024-08-10', avatar: 'JD', address: '456 Oak Ave, Los Angeles, CA 90001', dob: '2004-09-22', gender: 'Female', guardianName: 'William Doe', guardianPhone: '+1-555-020-2345', bloodGroup: 'A+', status: 'active' },
    { id: 3, name: 'Michael Johnson', email: 'michael.johnson@university.edu', phone: '+1-555-010-3456', department: 'Mechanical', semester: 7, gpa: 3.5, attendance: 88, feeStatus: 'pending', enrollmentDate: '2023-08-12', avatar: 'MJ', address: '789 Pine Ln, Chicago, IL 60601', dob: '2003-11-05', gender: 'Male', guardianName: 'David Johnson', guardianPhone: '+1-555-020-3456', bloodGroup: 'B+', status: 'active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.williams@university.edu', phone: '+1-555-010-4567', department: 'Civil', semester: 1, gpa: 4.0, attendance: 98, feeStatus: 'paid', enrollmentDate: '2026-08-18', avatar: 'SW', address: '321 Maple Dr, Houston, TX 77001', dob: '2006-02-14', gender: 'Female', guardianName: 'James Williams', guardianPhone: '+1-555-020-4567', bloodGroup: 'AB+', status: 'active' },
    { id: 5, name: 'William Brown', email: 'william.brown@university.edu', phone: '+1-555-010-5678', department: 'Mathematics', semester: 8, gpa: 3.2, attendance: 75, feeStatus: 'overdue', enrollmentDate: '2022-08-20', avatar: 'WB', address: '654 Cedar Ct, Phoenix, AZ 85001', dob: '2002-07-30', gender: 'Male', guardianName: 'Charles Brown', guardianPhone: '+1-555-020-5678', bloodGroup: 'O-', status: 'active' },
    { id: 6, name: 'Emma Jones', email: 'emma.jones@university.edu', phone: '+1-555-010-6789', department: 'Physics', semester: 4, gpa: 3.7, attendance: 90, feeStatus: 'paid', enrollmentDate: '2024-08-25', avatar: 'EJ', address: '987 Elm St, Philadelphia, PA 19019', dob: '2004-12-10', gender: 'Female', guardianName: 'Thomas Jones', guardianPhone: '+1-555-020-6789', bloodGroup: 'A-', status: 'active' },
    { id: 7, name: 'David Garcia', email: 'david.garcia@university.edu', phone: '+1-555-010-7890', department: 'Chemistry', semester: 6, gpa: 3.4, attendance: 85, feeStatus: 'pending', enrollmentDate: '2023-08-15', avatar: 'DG', address: '135 Washington Blvd, San Antonio, TX 78201', dob: '2003-05-18', gender: 'Male', guardianName: 'Daniel Garcia', guardianPhone: '+1-555-020-7890', bloodGroup: 'B-', status: 'active' },
    { id: 8, name: 'Olivia Miller', email: 'olivia.miller@university.edu', phone: '+1-555-010-8901', department: 'Business Administration', semester: 2, gpa: 3.6, attendance: 89, feeStatus: 'paid', enrollmentDate: '2025-08-22', avatar: 'OM', address: '246 Lakeview Rd, San Diego, CA 92101', dob: '2005-08-08', gender: 'Female', guardianName: 'Matthew Miller', guardianPhone: '+1-555-020-8901', bloodGroup: 'AB-', status: 'active' },
    { id: 9, name: 'James Davis', email: 'james.davis@university.edu', phone: '+1-555-010-9012', department: 'Computer Science', semester: 8, gpa: 2.9, attendance: 68, feeStatus: 'overdue', enrollmentDate: '2022-08-10', avatar: 'JD', address: '357 Sunset Dr, Dallas, TX 75201', dob: '2002-01-25', gender: 'Male', guardianName: 'Anthony Davis', guardianPhone: '+1-555-020-9012', bloodGroup: 'O+', status: 'active' },
    { id: 10, name: 'Ava Rodriguez', email: 'ava.rodriguez@university.edu', phone: '+1-555-011-1234', department: 'Electronics', semester: 5, gpa: 3.9, attendance: 96, feeStatus: 'paid', enrollmentDate: '2024-08-14', avatar: 'AR', address: '468 Spring St, San Jose, CA 95101', dob: '2004-10-15', gender: 'Female', guardianName: 'Mark Rodriguez', guardianPhone: '+1-555-021-1234', bloodGroup: 'A+', status: 'active' },
    { id: 11, name: 'Robert Martinez', email: 'robert.martinez@university.edu', phone: '+1-555-011-2345', department: 'Mechanical', semester: 3, gpa: 3.1, attendance: 80, feeStatus: 'pending', enrollmentDate: '2025-08-11', avatar: 'RM', address: '579 Autumn Ln, Austin, TX 73301', dob: '2005-03-30', gender: 'Male', guardianName: 'Paul Martinez', guardianPhone: '+1-555-021-2345', bloodGroup: 'B+', status: 'active' },
    { id: 12, name: 'Isabella Hernandez', email: 'isabella.hernandez@university.edu', phone: '+1-555-011-3456', department: 'Civil', semester: 7, gpa: 3.8, attendance: 91, feeStatus: 'paid', enrollmentDate: '2023-08-19', avatar: 'IH', address: '680 Winter Ct, Jacksonville, FL 32099', dob: '2003-06-20', gender: 'Female', guardianName: 'Steven Hernandez', guardianPhone: '+1-555-021-3456', bloodGroup: 'AB+', status: 'active' },
    { id: 13, name: 'Joseph Lopez', email: 'joseph.lopez@university.edu', phone: '+1-555-011-4567', department: 'Mathematics', semester: 1, gpa: 3.5, attendance: 100, feeStatus: 'paid', enrollmentDate: '2026-08-15', avatar: 'JL', address: '791 Summer Blvd, Fort Worth, TX 76101', dob: '2006-11-11', gender: 'Male', guardianName: 'Andrew Lopez', guardianPhone: '+1-555-021-4567', bloodGroup: 'O-', status: 'active' },
    { id: 14, name: 'Sophia Gonzalez', email: 'sophia.gonzalez@university.edu', phone: '+1-555-011-5678', department: 'Physics', semester: 6, gpa: 3.3, attendance: 84, feeStatus: 'pending', enrollmentDate: '2023-08-22', avatar: 'SG', address: '802 Forest Rd, Columbus, OH 43201', dob: '2003-08-05', gender: 'Female', guardianName: 'Kenneth Gonzalez', guardianPhone: '+1-555-021-5678', bloodGroup: 'A-', status: 'active' },
    { id: 15, name: 'Charles Wilson', email: 'charles.wilson@university.edu', phone: '+1-555-011-6789', department: 'Chemistry', semester: 4, gpa: 2.8, attendance: 72, feeStatus: 'overdue', enrollmentDate: '2024-08-20', avatar: 'CW', address: '913 Meadow Dr, Charlotte, NC 28201', dob: '2004-02-28', gender: 'Male', guardianName: 'Joshua Wilson', guardianPhone: '+1-555-021-6789', bloodGroup: 'B-', status: 'active' },
    { id: 16, name: 'Mia Anderson', email: 'mia.anderson@university.edu', phone: '+1-555-011-7890', department: 'Business Administration', semester: 2, gpa: 3.9, attendance: 94, feeStatus: 'paid', enrollmentDate: '2025-08-16', avatar: 'MA', address: '124 River St, San Francisco, CA 94101', dob: '2005-12-12', gender: 'Female', guardianName: 'Kevin Anderson', guardianPhone: '+1-555-021-7890', bloodGroup: 'AB-', status: 'active' },
    { id: 17, name: 'Thomas Thomas', email: 'thomas.thomas@university.edu', phone: '+1-555-011-8901', department: 'Computer Science', semester: 5, gpa: 3.2, attendance: 82, feeStatus: 'pending', enrollmentDate: '2024-08-13', avatar: 'TT', address: '235 Hill Ave, Indianapolis, IN 46201', dob: '2004-07-07', gender: 'Male', guardianName: 'Brian Thomas', guardianPhone: '+1-555-021-8901', bloodGroup: 'O+', status: 'active' },
    { id: 18, name: 'Charlotte Taylor', email: 'charlotte.taylor@university.edu', phone: '+1-555-011-9012', department: 'Electronics', semester: 7, gpa: 3.7, attendance: 89, feeStatus: 'paid', enrollmentDate: '2023-08-28', avatar: 'CT', address: '346 Valley Ln, Seattle, WA 98101', dob: '2003-04-18', gender: 'Female', guardianName: 'George Taylor', guardianPhone: '+1-555-021-9012', bloodGroup: 'A+', status: 'active' },
    { id: 19, name: 'Daniel Moore', email: 'daniel.moore@university.edu', phone: '+1-555-012-1234', department: 'Mechanical', semester: 1, gpa: 3.6, attendance: 97, feeStatus: 'paid', enrollmentDate: '2026-08-12', avatar: 'DM', address: '457 Canyon Dr, Denver, CO 80201', dob: '2006-09-09', gender: 'Male', guardianName: 'Edward Moore', guardianPhone: '+1-555-022-1234', bloodGroup: 'B+', status: 'active' },
    { id: 20, name: 'Amelia Jackson', email: 'amelia.jackson@university.edu', phone: '+1-555-012-2345', department: 'Civil', semester: 8, gpa: 4.0, attendance: 99, feeStatus: 'paid', enrollmentDate: '2022-08-15', avatar: 'AJ', address: '568 Desert Ct, Washington, DC 20001', dob: '2002-05-25', gender: 'Female', guardianName: 'Ronald Jackson', guardianPhone: '+1-555-022-2345', bloodGroup: 'AB+', status: 'active' },
    { id: 21, name: 'Matthew Martin', email: 'matthew.martin@university.edu', phone: '+1-555-012-3456', department: 'Mathematics', semester: 3, gpa: 2.7, attendance: 70, feeStatus: 'overdue', enrollmentDate: '2025-08-18', avatar: 'MM', address: '679 Ocean Blvd, Boston, MA 02101', dob: '2005-01-14', gender: 'Male', guardianName: 'Timothy Martin', guardianPhone: '+1-555-022-3456', bloodGroup: 'O-', status: 'active' },
    { id: 22, name: 'Harper Lee', email: 'harper.lee@university.edu', phone: '+1-555-012-4567', department: 'Physics', semester: 5, gpa: 3.4, attendance: 86, feeStatus: 'pending', enrollmentDate: '2024-08-21', avatar: 'HL', address: '790 Bay Rd, El Paso, TX 79901', dob: '2004-11-21', gender: 'Female', guardianName: 'Jason Lee', guardianPhone: '+1-555-022-4567', bloodGroup: 'A-', status: 'active' },
    { id: 23, name: 'Anthony Perez', email: 'anthony.perez@university.edu', phone: '+1-555-012-5678', department: 'Chemistry', semester: 7, gpa: 3.1, attendance: 81, feeStatus: 'paid', enrollmentDate: '2023-08-10', avatar: 'AP', address: '801 Harbor St, Nashville, TN 37201', dob: '2003-07-02', gender: 'Male', guardianName: 'Brian Perez', guardianPhone: '+1-555-022-5678', bloodGroup: 'B-', status: 'active' },
    { id: 24, name: 'Evelyn Thompson', email: 'evelyn.thompson@university.edu', phone: '+1-555-012-6789', department: 'Business Administration', semester: 1, gpa: 3.8, attendance: 93, feeStatus: 'paid', enrollmentDate: '2026-08-14', avatar: 'ET', address: '912 Port Ave, Detroit, MI 48201', dob: '2006-03-17', gender: 'Female', guardianName: 'Mark Thompson', guardianPhone: '+1-555-022-6789', bloodGroup: 'AB-', status: 'active' },
    { id: 25, name: 'Mark White', email: 'mark.white@university.edu', phone: '+1-555-012-7890', department: 'Computer Science', semester: 6, gpa: 3.5, attendance: 87, feeStatus: 'pending', enrollmentDate: '2023-08-25', avatar: 'MW', address: '125 Sky Ln, Oklahoma City, OK 73101', dob: '2003-10-08', gender: 'Male', guardianName: 'Paul White', guardianPhone: '+1-555-022-7890', bloodGroup: 'O+', status: 'active' },
    { id: 26, name: 'Abigail Harris', email: 'abigail.harris@university.edu', phone: '+1-555-012-8901', department: 'Electronics', semester: 4, gpa: 3.9, attendance: 92, feeStatus: 'paid', enrollmentDate: '2024-08-19', avatar: 'AH', address: '236 Star Dr, Portland, OR 97201', dob: '2004-06-25', gender: 'Female', guardianName: 'Steven Harris', guardianPhone: '+1-555-022-8901', bloodGroup: 'A+', status: 'active' },
    { id: 27, name: 'Paul Sanchez', email: 'paul.sanchez@university.edu', phone: '+1-555-012-9012', department: 'Mechanical', semester: 2, gpa: 2.6, attendance: 67, feeStatus: 'overdue', enrollmentDate: '2025-08-11', avatar: 'PS', address: '347 Moon Ct, Las Vegas, NV 89101', dob: '2005-02-14', gender: 'Male', guardianName: 'Andrew Sanchez', guardianPhone: '+1-555-022-9012', bloodGroup: 'B+', status: 'active' },
    { id: 28, name: 'Emily Clark', email: 'emily.clark@university.edu', phone: '+1-555-013-1234', department: 'Civil', semester: 5, gpa: 3.4, attendance: 85, feeStatus: 'pending', enrollmentDate: '2024-08-16', avatar: 'EC', address: '458 Sun Blvd, Memphis, TN 38101', dob: '2004-12-05', gender: 'Female', guardianName: 'Kenneth Clark', guardianPhone: '+1-555-023-1234', bloodGroup: 'AB+', status: 'active' },
    { id: 29, name: 'Steven Ramirez', email: 'steven.ramirez@university.edu', phone: '+1-555-013-2345', department: 'Mathematics', semester: 8, gpa: 3.7, attendance: 90, feeStatus: 'paid', enrollmentDate: '2022-08-22', avatar: 'SR', address: '569 Cloud Rd, Louisville, KY 40201', dob: '2002-09-18', gender: 'Male', guardianName: 'Joshua Ramirez', guardianPhone: '+1-555-023-2345', bloodGroup: 'O-', status: 'active' },
    { id: 30, name: 'Elizabeth Lewis', email: 'elizabeth.lewis@university.edu', phone: '+1-555-013-3456', department: 'Physics', semester: 1, gpa: 4.0, attendance: 98, feeStatus: 'paid', enrollmentDate: '2026-08-10', avatar: 'EL', address: '680 Rain St, Baltimore, MD 21201', dob: '2006-04-22', gender: 'Female', guardianName: 'Kevin Lewis', guardianPhone: '+1-555-023-3456', bloodGroup: 'A-', status: 'active' },
    { id: 31, name: 'Andrew Robinson', email: 'andrew.robinson@university.edu', phone: '+1-555-013-4567', department: 'Chemistry', semester: 8, gpa: 3.8, attendance: 95, feeStatus: 'paid', enrollmentDate: '2022-08-15', avatar: 'AR', address: '791 Wind Ave, Milwaukee, WI 53201', dob: '2002-11-30', gender: 'Male', guardianName: 'Brian Robinson', guardianPhone: '+1-555-023-4567', bloodGroup: 'B-', status: 'graduated' },
    { id: 32, name: 'Mila Walker', email: 'mila.walker@university.edu', phone: '+1-555-013-5678', department: 'Business Administration', semester: 8, gpa: 3.9, attendance: 97, feeStatus: 'paid', enrollmentDate: '2022-08-12', avatar: 'MW', address: '802 Snow Ln, Albuquerque, NM 87101', dob: '2002-05-15', gender: 'Female', guardianName: 'George Walker', guardianPhone: '+1-555-023-5678', bloodGroup: 'AB-', status: 'graduated' },
    { id: 33, name: 'Kenneth Young', email: 'kenneth.young@university.edu', phone: '+1-555-013-6789', department: 'Computer Science', semester: 8, gpa: 3.6, attendance: 91, feeStatus: 'paid', enrollmentDate: '2022-08-18', avatar: 'KY', address: '913 Frost Dr, Tucson, AZ 85701', dob: '2002-08-25', gender: 'Male', guardianName: 'Edward Young', guardianPhone: '+1-555-023-6789', bloodGroup: 'O+', status: 'graduated' },
    { id: 34, name: 'Ella Allen', email: 'ella.allen@university.edu', phone: '+1-555-013-7890', department: 'Electronics', semester: 8, gpa: 3.5, attendance: 88, feeStatus: 'paid', enrollmentDate: '2022-08-14', avatar: 'EA', address: '126 Ice Ct, Fresno, CA 93701', dob: '2002-02-10', gender: 'Female', guardianName: 'Ronald Allen', guardianPhone: '+1-555-023-7890', bloodGroup: 'A+', status: 'graduated' },
    { id: 35, name: 'Joshua King', email: 'joshua.king@university.edu', phone: '+1-555-013-8901', department: 'Mechanical', semester: 8, gpa: 3.7, attendance: 92, feeStatus: 'paid', enrollmentDate: '2022-08-20', avatar: 'JK', address: '237 Fire Blvd, Sacramento, CA 95801', dob: '2002-12-05', gender: 'Male', guardianName: 'Timothy King', guardianPhone: '+1-555-023-8901', bloodGroup: 'B+', status: 'graduated' },
    { id: 36, name: 'Avery Wright', email: 'avery.wright@university.edu', phone: '+1-555-013-9012', department: 'Civil', semester: 8, gpa: 3.4, attendance: 85, feeStatus: 'paid', enrollmentDate: '2022-08-25', avatar: 'AW', address: '348 Earth Rd, Kansas City, MO 64101', dob: '2002-06-18', gender: 'Female', guardianName: 'Jason Wright', guardianPhone: '+1-555-023-9012', bloodGroup: 'AB+', status: 'graduated' },
    { id: 37, name: 'Kevin Scott', email: 'kevin.scott@university.edu', phone: '+1-555-014-1234', department: 'Mathematics', semester: 8, gpa: 3.8, attendance: 94, feeStatus: 'paid', enrollmentDate: '2022-08-11', avatar: 'KS', address: '459 Iron St, Mesa, AZ 85201', dob: '2002-03-28', gender: 'Male', guardianName: 'Brian Scott', guardianPhone: '+1-555-024-1234', bloodGroup: 'O-', status: 'graduated' },
    { id: 38, name: 'Sofia Torres', email: 'sofia.torres@university.edu', phone: '+1-555-014-2345', department: 'Physics', semester: 8, gpa: 3.9, attendance: 96, feeStatus: 'paid', enrollmentDate: '2022-08-16', avatar: 'ST', address: '570 Gold Ave, Atlanta, GA 30301', dob: '2002-10-12', gender: 'Female', guardianName: 'Mark Torres', guardianPhone: '+1-555-024-2345', bloodGroup: 'A-', status: 'graduated' },
    { id: 39, name: 'Brian Nguyen', email: 'brian.nguyen@university.edu', phone: '+1-555-014-3456', department: 'Chemistry', semester: 8, gpa: 3.3, attendance: 82, feeStatus: 'paid', enrollmentDate: '2022-08-19', avatar: 'BN', address: '681 Silver Ln, Colorado Springs, CO 80901', dob: '2002-07-04', gender: 'Male', guardianName: 'Paul Nguyen', guardianPhone: '+1-555-024-3456', bloodGroup: 'B-', status: 'graduated' },
    { id: 40, name: 'Camila Hill', email: 'camila.hill@university.edu', phone: '+1-555-014-4567', department: 'Business Administration', semester: 8, gpa: 3.5, attendance: 89, feeStatus: 'paid', enrollmentDate: '2022-08-24', avatar: 'CH', address: '792 Copper Dr, Omaha, NE 68101', dob: '2002-01-15', gender: 'Female', guardianName: 'Steven Hill', guardianPhone: '+1-555-024-4567', bloodGroup: 'AB-', status: 'graduated' },
    { id: 41, name: 'George Flores', email: 'george.flores@university.edu', phone: '+1-555-014-5678', department: 'Computer Science', semester: 4, gpa: 2.5, attendance: 65, feeStatus: 'overdue', enrollmentDate: '2024-08-10', avatar: 'GF', address: '803 Bronze Ct, Raleigh, NC 27601', dob: '2004-09-02', gender: 'Male', guardianName: 'Andrew Flores', guardianPhone: '+1-555-024-5678', bloodGroup: 'O+', status: 'inactive' },
    { id: 42, name: 'Aria Green', email: 'aria.green@university.edu', phone: '+1-555-014-6789', department: 'Electronics', semester: 3, gpa: 2.8, attendance: 68, feeStatus: 'pending', enrollmentDate: '2025-08-15', avatar: 'AG', address: '914 Brass Blvd, Miami, FL 33101', dob: '2005-04-18', gender: 'Female', guardianName: 'Kenneth Green', guardianPhone: '+1-555-024-6789', bloodGroup: 'A+', status: 'inactive' },
    { id: 43, name: 'Edward Adams', email: 'edward.adams@university.edu', phone: '+1-555-014-7890', department: 'Mechanical', semester: 2, gpa: 2.4, attendance: 62, feeStatus: 'overdue', enrollmentDate: '2025-08-20', avatar: 'EA', address: '127 Steel Rd, Long Beach, CA 90801', dob: '2005-11-25', gender: 'Male', guardianName: 'Joshua Adams', guardianPhone: '+1-555-024-7890', bloodGroup: 'B+', status: 'inactive' },
    { id: 44, name: 'Scarlett Nelson', email: 'scarlett.nelson@university.edu', phone: '+1-555-014-8901', department: 'Civil', semester: 5, gpa: 2.9, attendance: 71, feeStatus: 'pending', enrollmentDate: '2024-08-12', avatar: 'SN', address: '238 Wood St, Virginia Beach, VA 23451', dob: '2004-06-08', gender: 'Female', guardianName: 'Kevin Nelson', guardianPhone: '+1-555-024-8901', bloodGroup: 'AB+', status: 'inactive' },
    { id: 45, name: 'Ronald Baker', email: 'ronald.baker@university.edu', phone: '+1-555-014-9012', department: 'Mathematics', semester: 6, gpa: 2.7, attendance: 69, feeStatus: 'overdue', enrollmentDate: '2023-08-14', avatar: 'RB', address: '349 Stone Ave, Oakland, CA 94601', dob: '2003-12-19', gender: 'Male', guardianName: 'Brian Baker', guardianPhone: '+1-555-024-9012', bloodGroup: 'O-', status: 'inactive' },
    { id: 46, name: 'Victoria Hall', email: 'victoria.hall@university.edu', phone: '+1-555-015-1234', department: 'Physics', semester: 4, gpa: 2.6, attendance: 66, feeStatus: 'pending', enrollmentDate: '2024-08-18', avatar: 'VH', address: '460 Brick Ln, Minneapolis, MN 55401', dob: '2004-03-30', gender: 'Female', guardianName: 'George Hall', guardianPhone: '+1-555-025-1234', bloodGroup: 'A-', status: 'inactive' },
    { id: 47, name: 'Timothy Rivera', email: 'timothy.rivera@university.edu', phone: '+1-555-015-2345', department: 'Chemistry', semester: 1, gpa: 2.5, attendance: 64, feeStatus: 'overdue', enrollmentDate: '2026-08-10', avatar: 'TR', address: '571 Glass Dr, Tulsa, OK 74101', dob: '2006-08-12', gender: 'Male', guardianName: 'Edward Rivera', guardianPhone: '+1-555-025-2345', bloodGroup: 'B-', status: 'inactive' },
    { id: 48, name: 'Madison Campbell', email: 'madison.campbell@university.edu', phone: '+1-555-015-3456', department: 'Business Administration', semester: 7, gpa: 2.8, attendance: 70, feeStatus: 'pending', enrollmentDate: '2023-08-22', avatar: 'MC', address: '682 Plastic Ct, Arlington, TX 76001', dob: '2003-01-22', gender: 'Female', guardianName: 'Ronald Campbell', guardianPhone: '+1-555-025-3456', bloodGroup: 'AB-', status: 'inactive' },
    { id: 49, name: 'Jason Mitchell', email: 'jason.mitchell@university.edu', phone: '+1-555-015-4567', department: 'Computer Science', semester: 2, gpa: 2.3, attendance: 61, feeStatus: 'overdue', enrollmentDate: '2025-08-16', avatar: 'JM', address: '793 Paper Blvd, New Orleans, LA 70112', dob: '2005-05-05', gender: 'Male', guardianName: 'Timothy Mitchell', guardianPhone: '+1-555-025-4567', bloodGroup: 'O+', status: 'inactive' },
    { id: 50, name: 'Luna Carter', email: 'luna.carter@university.edu', phone: '+1-555-015-5678', department: 'Electronics', semester: 5, gpa: 2.9, attendance: 72, feeStatus: 'pending', enrollmentDate: '2024-08-25', avatar: 'LC', address: '804 Fabric Rd, Wichita, KS 67201', dob: '2004-10-10', gender: 'Female', guardianName: 'Jason Carter', guardianPhone: '+1-555-025-5678', bloodGroup: 'A+', status: 'inactive' }
  ],
  faculty: [
    { id: 1, name: 'Dr. John Smith', email: 'john.smith.fac@university.edu', phone: '+1-555-110-1234', department: 'Computer Science', specialization: 'Artificial Intelligence', qualification: 'Ph.D.', experience: 15, courses: ['Advanced Algorithms', 'Machine Learning'], avatar: 'JS', status: 'active', joinDate: '2010-08-15', bio: 'Expert in AI and machine learning with over 50 published papers.' },
    { id: 2, name: 'Prof. Jane Doe', email: 'jane.doe.fac@university.edu', phone: '+1-555-110-2345', department: 'Electronics', specialization: 'Embedded Systems', qualification: 'M.Tech', experience: 12, courses: ['Microprocessors', 'Digital Logic Design'], avatar: 'JD', status: 'active', joinDate: '2012-09-01', bio: 'Passionate about embedded systems and IoT applications.' },
    { id: 3, name: 'Dr. Michael Johnson', email: 'michael.johnson.fac@university.edu', phone: '+1-555-110-3456', department: 'Mechanical', specialization: 'Thermodynamics', qualification: 'Ph.D.', experience: 20, courses: ['Thermodynamics I', 'Heat Transfer'], avatar: 'MJ', status: 'active', joinDate: '2005-07-20', bio: 'Leading researcher in renewable energy systems.' },
    { id: 4, name: 'Prof. Sarah Williams', email: 'sarah.williams.fac@university.edu', phone: '+1-555-110-4567', department: 'Civil', specialization: 'Structural Engineering', qualification: 'Ph.D.', experience: 18, courses: ['Structural Analysis', 'Concrete Design'], avatar: 'SW', status: 'active', joinDate: '2007-08-10', bio: 'Specializes in earthquake-resistant building design.' },
    { id: 5, name: 'Dr. William Brown', email: 'william.brown.fac@university.edu', phone: '+1-555-110-5678', department: 'Mathematics', specialization: 'Applied Mathematics', qualification: 'Ph.D.', experience: 25, courses: ['Calculus III', 'Differential Equations'], avatar: 'WB', status: 'active', joinDate: '2000-01-15', bio: 'Focuses on mathematical modeling of biological systems.' },
    { id: 6, name: 'Prof. Emma Jones', email: 'emma.jones.fac@university.edu', phone: '+1-555-110-6789', department: 'Physics', specialization: 'Quantum Mechanics', qualification: 'Ph.D.', experience: 10, courses: ['Quantum Physics', 'Solid State Physics'], avatar: 'EJ', status: 'active', joinDate: '2015-08-20', bio: 'Research interests include quantum computing and cryptography.' },
    { id: 7, name: 'Dr. David Garcia', email: 'david.garcia.fac@university.edu', phone: '+1-555-110-7890', department: 'Chemistry', specialization: 'Organic Chemistry', qualification: 'Ph.D.', experience: 30, courses: ['Organic Chemistry I', 'Polymer Science'], avatar: 'DG', status: 'retired', joinDate: '1995-09-05', bio: 'Renowned expert in polymer synthesis. Recently retired.' },
    { id: 8, name: 'Prof. Olivia Miller', email: 'olivia.miller.fac@university.edu', phone: '+1-555-110-8901', department: 'Business Administration', specialization: 'Marketing', qualification: 'MBA', experience: 8, courses: ['Marketing Management', 'Consumer Behavior'], avatar: 'OM', status: 'active', joinDate: '2018-01-10', bio: 'Brings industry experience to the classroom.' },
    { id: 9, name: 'Dr. James Davis', email: 'james.davis.fac@university.edu', phone: '+1-555-110-9012', department: 'Computer Science', specialization: 'Database Systems', qualification: 'Ph.D.', experience: 22, courses: ['Database Management', 'Data Mining'], avatar: 'JD', status: 'active', joinDate: '2003-08-15', bio: 'Focuses on scalable database architectures.' },
    { id: 10, name: 'Prof. Ava Rodriguez', email: 'ava.rodriguez.fac@university.edu', phone: '+1-555-111-1234', department: 'Electronics', specialization: 'Signal Processing', qualification: 'Ph.D.', experience: 14, courses: ['Signals and Systems', 'Digital Signal Processing'], avatar: 'AR', status: 'on-leave', joinDate: '2010-09-01', bio: 'Currently on sabbatical for industry collaboration.' },
    { id: 11, name: 'Dr. Robert Martinez', email: 'robert.martinez.fac@university.edu', phone: '+1-555-111-2345', department: 'Mechanical', specialization: 'Robotics', qualification: 'Ph.D.', experience: 16, courses: ['Robotics', 'Control Systems'], avatar: 'RM', status: 'active', joinDate: '2009-08-20', bio: 'Leads the university robotics lab.' },
    { id: 12, name: 'Prof. Isabella Hernandez', email: 'isabella.hernandez.fac@university.edu', phone: '+1-555-111-3456', department: 'Civil', specialization: 'Transportation Engineering', qualification: 'M.Tech', experience: 11, courses: ['Transportation Engineering', 'Highway Design'], avatar: 'IH', status: 'active', joinDate: '2014-01-15', bio: 'Expert in intelligent transportation systems.' },
    { id: 13, name: 'Dr. Joseph Lopez', email: 'joseph.lopez.fac@university.edu', phone: '+1-555-111-4567', department: 'Mathematics', specialization: 'Algebra', qualification: 'Ph.D.', experience: 28, courses: ['Linear Algebra', 'Abstract Algebra'], avatar: 'JL', status: 'active', joinDate: '1997-08-10', bio: 'Long-standing member of the mathematics department.' },
    { id: 14, name: 'Prof. Sophia Gonzalez', email: 'sophia.gonzalez.fac@university.edu', phone: '+1-555-111-5678', department: 'Physics', specialization: 'Astrophysics', qualification: 'Ph.D.', experience: 9, courses: ['Astrophysics', 'Classical Mechanics'], avatar: 'SG', status: 'active', joinDate: '2016-09-05', bio: 'Research focuses on galaxy formation and evolution.' },
    { id: 15, name: 'Dr. Charles Wilson', email: 'charles.wilson.fac@university.edu', phone: '+1-555-111-6789', department: 'Chemistry', specialization: 'Inorganic Chemistry', qualification: 'Ph.D.', experience: 19, courses: ['Inorganic Chemistry', 'Materials Science'], avatar: 'CW', status: 'active', joinDate: '2006-08-15', bio: 'Specializes in the synthesis of novel materials.' },
    { id: 16, name: 'Prof. Mia Anderson', email: 'mia.anderson.fac@university.edu', phone: '+1-555-111-7890', department: 'Business Administration', specialization: 'Finance', qualification: 'MBA', experience: 13, courses: ['Corporate Finance', 'Investment Analysis'], avatar: 'MA', status: 'active', joinDate: '2012-01-20', bio: 'Former investment banker turned educator.' },
    { id: 17, name: 'Dr. Thomas Thomas', email: 'thomas.thomas.fac@university.edu', phone: '+1-555-111-8901', department: 'Computer Science', specialization: 'Software Engineering', qualification: 'Ph.D.', experience: 24, courses: ['Software Engineering', 'System Design'], avatar: 'TT', status: 'active', joinDate: '2001-08-10', bio: 'Advocates for agile methodologies in software development.' },
    { id: 18, name: 'Prof. Charlotte Taylor', email: 'charlotte.taylor.fac@university.edu', phone: '+1-555-111-9012', department: 'Electronics', specialization: 'VLSI Design', qualification: 'M.Tech', experience: 7, courses: ['VLSI Design', 'CMOS Circuits'], avatar: 'CT', status: 'active', joinDate: '2018-09-01', bio: 'Focuses on low-power VLSI design.' },
    { id: 19, name: 'Dr. Daniel Moore', email: 'daniel.moore.fac@university.edu', phone: '+1-555-112-1234', department: 'Mechanical', specialization: 'Fluid Mechanics', qualification: 'Ph.D.', experience: 21, courses: ['Fluid Mechanics', 'Aerodynamics'], avatar: 'DM', status: 'active', joinDate: '2004-08-15', bio: 'Conducts research in computational fluid dynamics.' },
    { id: 20, name: 'Prof. Amelia Jackson', email: 'amelia.jackson.fac@university.edu', phone: '+1-555-112-2345', department: 'Civil', specialization: 'Geotechnical Engineering', qualification: 'Ph.D.', experience: 17, courses: ['Soil Mechanics', 'Foundation Engineering'], avatar: 'AJ', status: 'active', joinDate: '2008-01-10', bio: 'Expert in soil stabilization techniques.' }
  ],
  courses: [
    { id: 1, name: 'Advanced Algorithms', code: 'CS-401', department: 'Computer Science', semester: 7, credits: 4, facultyId: 1, facultyName: 'Dr. John Smith', schedule: 'Mon/Wed 10:00-11:30', enrolled: 45, maxCapacity: 60, description: 'Design and analysis of advanced algorithms.', status: 'active' },
    { id: 2, name: 'Machine Learning', code: 'CS-402', department: 'Computer Science', semester: 7, credits: 3, facultyId: 1, facultyName: 'Dr. John Smith', schedule: 'Tue/Thu 14:00-15:30', enrolled: 55, maxCapacity: 60, description: 'Introduction to machine learning techniques.', status: 'active' },
    { id: 3, name: 'Database Management', code: 'CS-301', department: 'Computer Science', semester: 5, credits: 3, facultyId: 9, facultyName: 'Dr. James Davis', schedule: 'Mon/Wed 13:00-14:30', enrolled: 60, maxCapacity: 80, description: 'Relational database systems and SQL.', status: 'active' },
    { id: 4, name: 'Software Engineering', code: 'CS-302', department: 'Computer Science', semester: 5, credits: 4, facultyId: 17, facultyName: 'Dr. Thomas Thomas', schedule: 'Tue/Thu 10:00-11:30', enrolled: 50, maxCapacity: 60, description: 'Principles of software development lifecycle.', status: 'upcoming' },
    { id: 5, name: 'Microprocessors', code: 'EC-301', department: 'Electronics', semester: 5, credits: 4, facultyId: 2, facultyName: 'Prof. Jane Doe', schedule: 'Mon/Wed 09:00-10:30', enrolled: 40, maxCapacity: 60, description: 'Architecture and programming of microprocessors.', status: 'active' },
    { id: 6, name: 'Signals and Systems', code: 'EC-201', department: 'Electronics', semester: 3, credits: 3, facultyId: 10, facultyName: 'Prof. Ava Rodriguez', schedule: 'Tue/Thu 11:00-12:30', enrolled: 50, maxCapacity: 70, description: 'Analysis of continuous and discrete-time signals.', status: 'active' },
    { id: 7, name: 'VLSI Design', code: 'EC-401', department: 'Electronics', semester: 7, credits: 4, facultyId: 18, facultyName: 'Prof. Charlotte Taylor', schedule: 'Fri 14:00-17:00', enrolled: 35, maxCapacity: 60, description: 'Design of very large scale integrated circuits.', status: 'completed' },
    { id: 8, name: 'Thermodynamics I', code: 'ME-201', department: 'Mechanical', semester: 3, credits: 3, facultyId: 3, facultyName: 'Dr. Michael Johnson', schedule: 'Mon/Wed 11:00-12:30', enrolled: 55, maxCapacity: 80, description: 'Basic principles of thermodynamics.', status: 'active' },
    { id: 9, name: 'Robotics', code: 'ME-401', department: 'Mechanical', semester: 7, credits: 4, facultyId: 11, facultyName: 'Dr. Robert Martinez', schedule: 'Tue/Thu 09:00-10:30', enrolled: 45, maxCapacity: 60, description: 'Kinematics, dynamics, and control of robots.', status: 'upcoming' },
    { id: 10, name: 'Fluid Mechanics', code: 'ME-301', department: 'Mechanical', semester: 5, credits: 3, facultyId: 19, facultyName: 'Dr. Daniel Moore', schedule: 'Mon/Wed 14:00-15:30', enrolled: 50, maxCapacity: 70, description: 'Properties of fluids and fluid flow.', status: 'active' },
    { id: 11, name: 'Structural Analysis', code: 'CE-301', department: 'Civil', semester: 5, credits: 4, facultyId: 4, facultyName: 'Prof. Sarah Williams', schedule: 'Tue/Thu 13:00-14:30', enrolled: 40, maxCapacity: 60, description: 'Analysis of statically determinate and indeterminate structures.', status: 'active' },
    { id: 12, name: 'Transportation Engineering', code: 'CE-401', department: 'Civil', semester: 7, credits: 3, facultyId: 12, facultyName: 'Prof. Isabella Hernandez', schedule: 'Mon/Wed 09:00-10:30', enrolled: 35, maxCapacity: 60, description: 'Planning and design of transportation systems.', status: 'active' },
    { id: 13, name: 'Soil Mechanics', code: 'CE-302', department: 'Civil', semester: 5, credits: 3, facultyId: 20, facultyName: 'Prof. Amelia Jackson', schedule: 'Fri 09:00-12:00', enrolled: 45, maxCapacity: 60, description: 'Properties and behavior of soil.', status: 'completed' },
    { id: 14, name: 'Calculus III', code: 'MA-201', department: 'Mathematics', semester: 3, credits: 4, facultyId: 5, facultyName: 'Dr. William Brown', schedule: 'Mon/Wed/Fri 10:00-11:00', enrolled: 60, maxCapacity: 80, description: 'Multivariable calculus and vector analysis.', status: 'active' },
    { id: 15, name: 'Linear Algebra', code: 'MA-101', department: 'Mathematics', semester: 1, credits: 3, facultyId: 13, facultyName: 'Dr. Joseph Lopez', schedule: 'Tue/Thu 09:00-10:30', enrolled: 75, maxCapacity: 80, description: 'Systems of linear equations and matrices.', status: 'active' },
    { id: 16, name: 'Differential Equations', code: 'MA-202', department: 'Mathematics', semester: 4, credits: 3, facultyId: 5, facultyName: 'Dr. William Brown', schedule: 'Mon/Wed 14:00-15:30', enrolled: 50, maxCapacity: 70, description: 'Ordinary differential equations and applications.', status: 'upcoming' },
    { id: 17, name: 'Quantum Physics', code: 'PH-301', department: 'Physics', semester: 5, credits: 4, facultyId: 6, facultyName: 'Prof. Emma Jones', schedule: 'Tue/Thu 11:00-12:30', enrolled: 30, maxCapacity: 60, description: 'Introduction to quantum mechanics.', status: 'active' },
    { id: 18, name: 'Astrophysics', code: 'PH-401', department: 'Physics', semester: 7, credits: 3, facultyId: 14, facultyName: 'Prof. Sophia Gonzalez', schedule: 'Mon/Wed 15:00-16:30', enrolled: 25, maxCapacity: 60, description: 'Physics of stars, galaxies, and the universe.', status: 'active' },
    { id: 19, name: 'Classical Mechanics', code: 'PH-201', department: 'Physics', semester: 3, credits: 4, facultyId: 14, facultyName: 'Prof. Sophia Gonzalez', schedule: 'Fri 13:00-16:00', enrolled: 40, maxCapacity: 60, description: 'Newtonian mechanics and applications.', status: 'completed' },
    { id: 20, name: 'Organic Chemistry I', code: 'CH-201', department: 'Chemistry', semester: 3, credits: 4, facultyId: 7, facultyName: 'Dr. David Garcia', schedule: 'Mon/Wed 09:00-10:30', enrolled: 55, maxCapacity: 80, description: 'Structure and reactivity of organic compounds.', status: 'active' },
    { id: 21, name: 'Inorganic Chemistry', code: 'CH-301', department: 'Chemistry', semester: 5, credits: 3, facultyId: 15, facultyName: 'Dr. Charles Wilson', schedule: 'Tue/Thu 14:00-15:30', enrolled: 45, maxCapacity: 70, description: 'Chemistry of main group and transition elements.', status: 'active' },
    { id: 22, name: 'Polymer Science', code: 'CH-401', department: 'Chemistry', semester: 7, credits: 3, facultyId: 7, facultyName: 'Dr. David Garcia', schedule: 'Fri 09:00-12:00', enrolled: 30, maxCapacity: 60, description: 'Synthesis and properties of polymers.', status: 'upcoming' },
    { id: 23, name: 'Marketing Management', code: 'BA-201', department: 'Business Administration', semester: 3, credits: 3, facultyId: 8, facultyName: 'Prof. Olivia Miller', schedule: 'Mon/Wed 11:00-12:30', enrolled: 65, maxCapacity: 80, description: 'Principles of marketing and strategy.', status: 'active' },
    { id: 24, name: 'Corporate Finance', code: 'BA-301', department: 'Business Administration', semester: 5, credits: 4, facultyId: 16, facultyName: 'Prof. Mia Anderson', schedule: 'Tue/Thu 09:00-10:30', enrolled: 55, maxCapacity: 80, description: 'Financial decision making in corporations.', status: 'active' },
    { id: 25, name: 'Investment Analysis', code: 'BA-401', department: 'Business Administration', semester: 7, credits: 3, facultyId: 16, facultyName: 'Prof. Mia Anderson', schedule: 'Fri 14:00-17:00', enrolled: 40, maxCapacity: 60, description: 'Analysis of securities and portfolio management.', status: 'completed' },
    { id: 26, name: 'Consumer Behavior', code: 'BA-302', department: 'Business Administration', semester: 6, credits: 3, facultyId: 8, facultyName: 'Prof. Olivia Miller', schedule: 'Mon/Wed 14:00-15:30', enrolled: 50, maxCapacity: 70, description: 'Psychological aspects of consumer decision making.', status: 'upcoming' },
    { id: 27, name: 'System Design', code: 'CS-403', department: 'Computer Science', semester: 8, credits: 3, facultyId: 17, facultyName: 'Dr. Thomas Thomas', schedule: 'Tue/Thu 13:00-14:30', enrolled: 45, maxCapacity: 60, description: 'Design of large-scale software systems.', status: 'active' },
    { id: 28, name: 'Data Mining', code: 'CS-404', department: 'Computer Science', semester: 8, credits: 4, facultyId: 9, facultyName: 'Dr. James Davis', schedule: 'Mon/Wed 09:00-10:30', enrolled: 50, maxCapacity: 60, description: 'Techniques for discovering patterns in large data sets.', status: 'active' },
    { id: 29, name: 'Digital Logic Design', code: 'EC-101', department: 'Electronics', semester: 1, credits: 4, facultyId: 2, facultyName: 'Prof. Jane Doe', schedule: 'Tue/Thu 14:00-15:30', enrolled: 70, maxCapacity: 80, description: 'Fundamentals of digital circuits.', status: 'active' },
    { id: 30, name: 'CMOS Circuits', code: 'EC-402', department: 'Electronics', semester: 8, credits: 3, facultyId: 18, facultyName: 'Prof. Charlotte Taylor', schedule: 'Mon/Wed 15:00-16:30', enrolled: 30, maxCapacity: 60, description: 'Design and analysis of CMOS integrated circuits.', status: 'completed' }
  ],
  attendance: Array.from({length: 100}, (_, i) => ({
    id: i + 1,
    studentId: (i % 50) + 1,
    studentName: 'Student ' + ((i % 50) + 1),
    date: '2026-08-' + String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'),
    status: Math.random() > 0.3 ? 'present' : (Math.random() > 0.5 ? 'absent' : 'late'),
    course: 'Course ' + ((i % 30) + 1),
    courseCode: 'CODE-' + ((i % 30) + 1)
  })).map(a => {
    // Correcting names based on student id
    const names = ['John Smith', 'Jane Doe', 'Michael Johnson', 'Sarah Williams', 'William Brown', 'Emma Jones', 'David Garcia', 'Olivia Miller', 'James Davis', 'Ava Rodriguez', 'Robert Martinez', 'Isabella Hernandez', 'Joseph Lopez', 'Sophia Gonzalez', 'Charles Wilson', 'Mia Anderson', 'Thomas Thomas', 'Charlotte Taylor', 'Daniel Moore', 'Amelia Jackson', 'Matthew Martin', 'Harper Lee', 'Anthony Perez', 'Evelyn Thompson', 'Mark White', 'Abigail Harris', 'Paul Sanchez', 'Emily Clark', 'Steven Ramirez', 'Elizabeth Lewis', 'Andrew Robinson', 'Mila Walker', 'Kenneth Young', 'Ella Allen', 'Joshua King', 'Avery Wright', 'Kevin Scott', 'Sofia Torres', 'Brian Nguyen', 'Camila Hill', 'George Flores', 'Aria Green', 'Edward Adams', 'Scarlett Nelson', 'Ronald Baker', 'Victoria Hall', 'Timothy Rivera', 'Madison Campbell', 'Jason Mitchell', 'Luna Carter'];
    a.studentName = names[a.studentId - 1];
    return a;
  }),
  monthlyAttendance: [
    { month: 'January', present: 850, absent: 100, late: 50, percentage: 85 },
    { month: 'February', present: 880, absent: 80, late: 40, percentage: 88 },
    { month: 'March', present: 900, absent: 70, late: 30, percentage: 90 },
    { month: 'April', present: 920, absent: 50, late: 30, percentage: 92 },
    { month: 'May', present: 890, absent: 80, late: 30, percentage: 89 },
    { month: 'June', present: 910, absent: 60, late: 30, percentage: 91 },
    { month: 'July', present: 930, absent: 40, late: 30, percentage: 93 },
    { month: 'August', present: 940, absent: 40, late: 20, percentage: 94 },
    { month: 'September', present: 950, absent: 30, late: 20, percentage: 95 },
    { month: 'October', present: 910, absent: 60, late: 30, percentage: 91 },
    { month: 'November', present: 880, absent: 80, late: 40, percentage: 88 },
    { month: 'December', present: 860, absent: 90, late: 50, percentage: 86 }
  ],
  exams: [
    { id: 1, name: 'Midterm Examination - Advanced Algorithms', courseCode: 'CS-401', course: 'Advanced Algorithms', department: 'Computer Science', date: '2026-10-15', time: '09:00 AM - 12:00 PM', venue: 'Hall A', semester: 7, type: 'midterm' },
    { id: 2, name: 'Final Examination - Machine Learning', courseCode: 'CS-402', course: 'Machine Learning', department: 'Computer Science', date: '2026-12-10', time: '02:00 PM - 05:00 PM', venue: 'Hall B', semester: 7, type: 'final' },
    { id: 3, name: 'Quiz 1 - Database Management', courseCode: 'CS-301', course: 'Database Management', department: 'Computer Science', date: '2026-09-20', time: '10:00 AM - 11:00 AM', venue: 'Room 201', semester: 5, type: 'quiz' },
    { id: 4, name: 'Midterm Examination - Microprocessors', courseCode: 'EC-301', course: 'Microprocessors', department: 'Electronics', date: '2026-10-18', time: '09:00 AM - 12:00 PM', venue: 'Hall C', semester: 5, type: 'midterm' },
    { id: 5, name: 'Practical Exam - Signals and Systems', courseCode: 'EC-201', course: 'Signals and Systems', department: 'Electronics', date: '2026-11-05', time: '02:00 PM - 05:00 PM', venue: 'Lab 3', semester: 3, type: 'practical' },
    { id: 6, name: 'Final Examination - Thermodynamics I', courseCode: 'ME-201', course: 'Thermodynamics I', department: 'Mechanical', date: '2026-12-12', time: '09:00 AM - 12:00 PM', venue: 'Hall A', semester: 3, type: 'final' },
    { id: 7, name: 'Midterm Examination - Structural Analysis', courseCode: 'CE-301', course: 'Structural Analysis', department: 'Civil', date: '2026-10-22', time: '02:00 PM - 05:00 PM', venue: 'Hall B', semester: 5, type: 'midterm' },
    { id: 8, name: 'Quiz 2 - Calculus III', courseCode: 'MA-201', course: 'Calculus III', department: 'Mathematics', date: '2026-11-15', time: '11:00 AM - 12:00 PM', venue: 'Room 305', semester: 3, type: 'quiz' },
    { id: 9, name: 'Final Examination - Quantum Physics', courseCode: 'PH-301', course: 'Quantum Physics', department: 'Physics', date: '2026-12-15', time: '09:00 AM - 12:00 PM', venue: 'Hall C', semester: 5, type: 'final' },
    { id: 10, name: 'Practical Exam - Organic Chemistry I', courseCode: 'CH-201', course: 'Organic Chemistry I', department: 'Chemistry', date: '2026-11-20', time: '02:00 PM - 05:00 PM', venue: 'Chem Lab 1', semester: 3, type: 'practical' },
    { id: 11, name: 'Midterm Examination - Marketing Management', courseCode: 'BA-201', course: 'Marketing Management', department: 'Business Administration', date: '2026-10-25', time: '09:00 AM - 12:00 PM', venue: 'Hall A', semester: 3, type: 'midterm' },
    { id: 12, name: 'Final Examination - Corporate Finance', courseCode: 'BA-301', course: 'Corporate Finance', department: 'Business Administration', date: '2026-12-18', time: '02:00 PM - 05:00 PM', venue: 'Hall B', semester: 5, type: 'final' },
    { id: 13, name: 'Quiz 1 - Linear Algebra', courseCode: 'MA-101', course: 'Linear Algebra', department: 'Mathematics', date: '2026-09-25', time: '10:00 AM - 11:00 AM', venue: 'Room 102', semester: 1, type: 'quiz' },
    { id: 14, name: 'Midterm Examination - Digital Logic Design', courseCode: 'EC-101', course: 'Digital Logic Design', department: 'Electronics', date: '2026-10-28', time: '09:00 AM - 12:00 PM', venue: 'Hall C', semester: 1, type: 'midterm' },
    { id: 15, name: 'Final Examination - System Design', courseCode: 'CS-403', course: 'System Design', department: 'Computer Science', date: '2026-12-20', time: '02:00 PM - 05:00 PM', venue: 'Hall A', semester: 8, type: 'final' }
  ],
  results: Array.from({length: 40}, (_, i) => {
    const studentId = (i % 50) + 1;
    const marks = Math.floor(Math.random() * 61) + 40; // 40-100
    let grade, gpa;
    if (marks >= 90) { grade = 'A+'; gpa = 4.0; }
    else if (marks >= 85) { grade = 'A'; gpa = 3.7; }
    else if (marks >= 80) { grade = 'B+'; gpa = 3.3; }
    else if (marks >= 75) { grade = 'B'; gpa = 3.0; }
    else if (marks >= 70) { grade = 'C+'; gpa = 2.7; }
    else if (marks >= 65) { grade = 'C'; gpa = 2.3; }
    else if (marks >= 60) { grade = 'D'; gpa = 2.0; }
    else { grade = 'F'; gpa = 0.0; }
    return {
      id: i + 1,
      studentId,
      studentName: 'Student Name', // Patched below
      courseCode: 'CS-401',
      course: 'Advanced Algorithms',
      marks,
      totalMarks: 100,
      grade,
      semester: 7,
      gpa,
      credits: 4
    }
  }).map(r => {
    const names = ['John Smith', 'Jane Doe', 'Michael Johnson', 'Sarah Williams', 'William Brown', 'Emma Jones', 'David Garcia', 'Olivia Miller', 'James Davis', 'Ava Rodriguez', 'Robert Martinez', 'Isabella Hernandez', 'Joseph Lopez', 'Sophia Gonzalez', 'Charles Wilson', 'Mia Anderson', 'Thomas Thomas', 'Charlotte Taylor', 'Daniel Moore', 'Amelia Jackson', 'Matthew Martin', 'Harper Lee', 'Anthony Perez', 'Evelyn Thompson', 'Mark White', 'Abigail Harris', 'Paul Sanchez', 'Emily Clark', 'Steven Ramirez', 'Elizabeth Lewis', 'Andrew Robinson', 'Mila Walker', 'Kenneth Young', 'Ella Allen', 'Joshua King', 'Avery Wright', 'Kevin Scott', 'Sofia Torres', 'Brian Nguyen', 'Camila Hill', 'George Flores', 'Aria Green', 'Edward Adams', 'Scarlett Nelson', 'Ronald Baker', 'Victoria Hall', 'Timothy Rivera', 'Madison Campbell', 'Jason Mitchell', 'Luna Carter'];
    r.studentName = names[r.studentId - 1];
    return r;
  }),
  fees: Array.from({length: 30}, (_, i) => {
    const studentId = (i % 50) + 1;
    const status = i < 15 ? 'paid' : (i < 25 ? 'pending' : 'overdue');
    return {
      id: i + 1,
      studentId,
      studentName: 'Student Name', // Patched below
      amount: Math.floor(Math.random() * 20000) + 5000,
      dueDate: '2026-09-01',
      paidDate: status === 'paid' ? '2026-08-05' : null,
      status,
      type: ['tuition', 'hostel', 'library', 'lab', 'exam'][i % 5],
      semester: (i % 8) + 1,
      transactionId: status === 'paid' ? 'TXN-' + Math.floor(Math.random() * 100000000) : null
    }
  }).map(f => {
    const names = ['John Smith', 'Jane Doe', 'Michael Johnson', 'Sarah Williams', 'William Brown', 'Emma Jones', 'David Garcia', 'Olivia Miller', 'James Davis', 'Ava Rodriguez', 'Robert Martinez', 'Isabella Hernandez', 'Joseph Lopez', 'Sophia Gonzalez', 'Charles Wilson', 'Mia Anderson', 'Thomas Thomas', 'Charlotte Taylor', 'Daniel Moore', 'Amelia Jackson', 'Matthew Martin', 'Harper Lee', 'Anthony Perez', 'Evelyn Thompson', 'Mark White', 'Abigail Harris', 'Paul Sanchez', 'Emily Clark', 'Steven Ramirez', 'Elizabeth Lewis', 'Andrew Robinson', 'Mila Walker', 'Kenneth Young', 'Ella Allen', 'Joshua King', 'Avery Wright', 'Kevin Scott', 'Sofia Torres', 'Brian Nguyen', 'Camila Hill', 'George Flores', 'Aria Green', 'Edward Adams', 'Scarlett Nelson', 'Ronald Baker', 'Victoria Hall', 'Timothy Rivera', 'Madison Campbell', 'Jason Mitchell', 'Luna Carter'];
    f.studentName = names[f.studentId - 1];
    return f;
  }),
  books: [
    { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', category: 'Computer Science', available: 5, total: 10, issued: 5, shelfNo: 'A1-01', publisher: 'MIT Press', year: 2009 },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', category: 'Computer Science', available: 2, total: 8, issued: 6, shelfNo: 'A1-02', publisher: 'Prentice Hall', year: 2008 },
    { id: 3, title: 'Design Patterns', author: 'Erich Gamma', isbn: '978-0201633610', category: 'Computer Science', available: 8, total: 10, issued: 2, shelfNo: 'A1-03', publisher: 'Addison-Wesley', year: 1994 },
    { id: 4, title: 'Database System Concepts', author: 'Abraham Silberschatz', isbn: '978-0073523323', category: 'Computer Science', available: 4, total: 12, issued: 8, shelfNo: 'A2-01', publisher: 'McGraw-Hill', year: 2010 },
    { id: 5, title: 'Engineering Mechanics', author: 'R.C. Hibbeler', isbn: '978-0133918922', category: 'Engineering', available: 6, total: 15, issued: 9, shelfNo: 'B1-01', publisher: 'Pearson', year: 2015 },
    { id: 6, title: 'Quantum Physics', author: 'Stephen Gasiorowicz', isbn: '978-0471057000', category: 'Physics', available: 3, total: 7, issued: 4, shelfNo: 'C1-01', publisher: 'Wiley', year: 2003 },
    { id: 7, title: 'Organic Chemistry', author: 'Paula Yurkanis Bruice', isbn: '978-0134042282', category: 'Science', available: 7, total: 10, issued: 3, shelfNo: 'C2-01', publisher: 'Pearson', year: 2015 },
    { id: 8, title: 'Marketing Management', author: 'Philip Kotler', isbn: '978-0133856460', category: 'Business', available: 5, total: 15, issued: 10, shelfNo: 'D1-01', publisher: 'Pearson', year: 2015 },
    { id: 9, title: 'Calculus Early Transcendentals', author: 'James Stewart', isbn: '978-1285741550', category: 'Mathematics', available: 10, total: 20, issued: 10, shelfNo: 'E1-01', publisher: 'Cengage', year: 2015 },
    { id: 10, title: 'Data Communications', author: 'Behrouz A. Forouzan', isbn: '978-0073376226', category: 'Computer Science', available: 2, total: 8, issued: 6, shelfNo: 'A2-02', publisher: 'McGraw-Hill', year: 2012 },
    { id: 11, title: 'Microelectronic Circuits', author: 'Adel S. Sedra', isbn: '978-0199339136', category: 'Electronics', available: 4, total: 12, issued: 8, shelfNo: 'B2-01', publisher: 'Oxford', year: 2014 },
    { id: 12, title: 'Structural Analysis', author: 'Russell C. Hibbeler', isbn: '978-0134610672', category: 'Engineering', available: 5, total: 10, issued: 5, shelfNo: 'B3-01', publisher: 'Pearson', year: 2017 },
    { id: 13, title: 'Modern Physics', author: 'Kenneth S. Krane', isbn: '978-1118061145', category: 'Physics', available: 3, total: 8, issued: 5, shelfNo: 'C1-02', publisher: 'Wiley', year: 2012 },
    { id: 14, title: 'Financial Accounting', author: 'Jerry J. Weygandt', isbn: '978-1118334324', category: 'Business', available: 8, total: 15, issued: 7, shelfNo: 'D1-02', publisher: 'Wiley', year: 2013 },
    { id: 15, title: 'Artificial Intelligence', author: 'Stuart Russell', isbn: '978-0134610993', category: 'Computer Science', available: 1, total: 5, issued: 4, shelfNo: 'A3-01', publisher: 'Pearson', year: 2020 }
  ],
  issuedBooks: [
    { id: 1, bookId: 1, bookTitle: 'Introduction to Algorithms', studentId: 1, studentName: 'John Smith', issueDate: '2026-08-01', dueDate: '2026-08-15', returnDate: null, status: 'issued', fine: 0 },
    { id: 2, bookId: 2, bookTitle: 'Clean Code', studentId: 2, studentName: 'Jane Doe', issueDate: '2026-07-20', dueDate: '2026-08-03', returnDate: '2026-08-02', status: 'returned', fine: 0 },
    { id: 3, bookId: 5, bookTitle: 'Engineering Mechanics', studentId: 3, studentName: 'Michael Johnson', issueDate: '2026-07-15', dueDate: '2026-07-29', returnDate: null, status: 'overdue', fine: 5 },
    { id: 4, bookId: 8, bookTitle: 'Marketing Management', studentId: 8, studentName: 'Olivia Miller', issueDate: '2026-08-05', dueDate: '2026-08-19', returnDate: null, status: 'issued', fine: 0 },
    { id: 5, bookId: 9, bookTitle: 'Calculus Early Transcendentals', studentId: 5, studentName: 'William Brown', issueDate: '2026-08-02', dueDate: '2026-08-16', returnDate: null, status: 'issued', fine: 0 },
    { id: 6, bookId: 15, bookTitle: 'Artificial Intelligence', studentId: 1, studentName: 'John Smith', issueDate: '2026-07-25', dueDate: '2026-08-08', returnDate: '2026-08-10', status: 'returned', fine: 2 },
    { id: 7, bookId: 11, bookTitle: 'Microelectronic Circuits', studentId: 10, studentName: 'Ava Rodriguez', issueDate: '2026-08-08', dueDate: '2026-08-22', returnDate: null, status: 'issued', fine: 0 },
    { id: 8, bookId: 7, bookTitle: 'Organic Chemistry', studentId: 7, studentName: 'David Garcia', issueDate: '2026-07-10', dueDate: '2026-07-24', returnDate: null, status: 'overdue', fine: 10 },
    { id: 9, bookId: 12, bookTitle: 'Structural Analysis', studentId: 4, studentName: 'Sarah Williams', issueDate: '2026-08-07', dueDate: '2026-08-21', returnDate: null, status: 'issued', fine: 0 },
    { id: 10, bookId: 6, bookTitle: 'Quantum Physics', studentId: 6, studentName: 'Emma Jones', issueDate: '2026-07-28', dueDate: '2026-08-11', returnDate: '2026-08-09', status: 'returned', fine: 0 }
  ],
  announcements: [
    { id: 1, title: 'Fall Semester Registration', content: 'Registration for the Fall 2026 semester is now open. Please ensure all previous dues are cleared.', date: '2026-08-01', author: 'Registrar', category: 'academic', priority: 'high' },
    { id: 2, title: 'Campus Wi-Fi Maintenance', content: 'The campus Wi-Fi network will undergo scheduled maintenance on Aug 15th from 2 AM to 6 AM.', date: '2026-08-05', author: 'IT Department', category: 'administrative', priority: 'medium' },
    { id: 3, title: 'Annual Tech Symposium', content: 'Join us for the Annual Tech Symposium featuring guest speakers from leading tech companies.', date: '2026-08-08', author: 'Events Committee', category: 'event', priority: 'low' },
    { id: 4, title: 'Library Hours Extended', content: 'The central library will now remain open until midnight on weekdays during the exam preparation period.', date: '2026-08-02', author: 'Chief Librarian', category: 'administrative', priority: 'medium' },
    { id: 5, title: 'Urgent: Weather Advisory', content: 'Due to severe weather warnings, all outdoor sports activities are suspended until further notice.', date: '2026-08-09', author: 'Safety Office', category: 'urgent', priority: 'high' },
    { id: 6, title: 'Call for Research Papers', content: 'The University Journal is accepting research papers for its upcoming issue. Deadline is Sept 30th.', date: '2026-08-03', author: 'Research Council', category: 'academic', priority: 'medium' },
    { id: 7, title: 'Blood Donation Drive', content: 'A blood donation camp will be held in the main auditorium this Friday. All eligible donors are encouraged to participate.', date: '2026-08-06', author: 'Health Center', category: 'event', priority: 'medium' },
    { id: 8, title: 'Hostel Fee Payment Deadline', content: 'The last date to pay hostel fees without a late penalty is August 20th.', date: '2026-08-07', author: 'Finance Office', category: 'administrative', priority: 'high' },
    { id: 9, title: 'New Elective Courses Announced', content: 'Three new elective courses have been added for the Computer Science department. Check the portal for details.', date: '2026-08-04', author: 'CS Department', category: 'academic', priority: 'low' },
    { id: 10, title: 'Alumni Meet 2026', content: 'Registration for the Alumni Meet 2026 is now open. Connect with past graduates.', date: '2026-08-08', author: 'Alumni Association', category: 'event', priority: 'low' }
  ],
  events: [
    { id: 1, title: 'Freshers Orientation', date: '2026-08-16', time: '10:00 AM', venue: 'Main Auditorium', description: 'Orientation program for all newly admitted students.', type: 'academic', department: 'All' },
    { id: 2, title: 'AI Workshop', date: '2026-08-25', time: '02:00 PM', venue: 'CS Lab 1', description: 'Hands-on workshop on generative AI models.', type: 'workshop', department: 'Computer Science' },
    { id: 3, title: 'Inter-Department Sports Meet', date: '2026-09-10', time: '09:00 AM', venue: 'University Ground', description: 'Annual sports competition between departments.', type: 'sports', department: 'All' },
    { id: 4, title: 'Cultural Fest - Aura 2026', date: '2026-10-05', time: '05:00 PM', venue: 'Open Air Theatre', description: 'Three days of music, dance, and cultural events.', type: 'cultural', department: 'All' },
    { id: 5, title: 'Seminar on Renewable Energy', date: '2026-08-28', time: '11:00 AM', venue: 'Seminar Hall A', description: 'Guest lecture by industry experts on sustainable energy solutions.', type: 'seminar', department: 'Mechanical' },
    { id: 6, title: 'Business Plan Competition', date: '2026-09-15', time: '10:00 AM', venue: 'MBA Block', description: 'Pitch your startup ideas to a panel of investors.', type: 'academic', department: 'Business Administration' },
    { id: 7, title: 'Robotics Exhibition', date: '2026-09-22', time: '10:00 AM', venue: 'Tech Center', description: 'Showcase of robots built by final year students.', type: 'academic', department: 'Electronics' },
    { id: 8, title: 'Civil Engineering Symposium', date: '2026-10-12', time: '09:00 AM', venue: 'Seminar Hall B', description: 'Presentations on modern construction techniques.', type: 'seminar', department: 'Civil' }
  ],
  activities: [
    { id: 1, text: 'John Smith submitted assignment for CS-401', time: '2 minutes ago', type: 'student', icon: '📝' },
    { id: 2, text: 'Fee payment of $1500 received from Jane Doe', time: '15 minutes ago', type: 'payment', icon: '💰' },
    { id: 3, text: 'Dr. John Smith uploaded new course material', time: '1 hour ago', type: 'faculty', icon: '👨‍🏫' },
    { id: 4, text: 'Midterm schedule published for Electronics', time: '3 hours ago', type: 'exam', icon: '📋' },
    { id: 5, text: 'New course "Advanced AI" created', time: '5 hours ago', type: 'course', icon: '📚' },
    { id: 6, text: 'Michael Johnson issued book "Engineering Mechanics"', time: '1 day ago', type: 'student', icon: '📚' },
    { id: 7, text: 'Prof. Sarah Williams updated grades for CE-301', time: '1 day ago', type: 'faculty', icon: '👨‍🏫' },
    { id: 8, text: 'Fee reminder sent to 15 students', time: '2 days ago', type: 'payment', icon: '💰' },
    { id: 9, text: 'Results declared for Spring Semester', time: '3 days ago', type: 'exam', icon: '📋' },
    { id: 10, text: 'New student orientation completed', time: '4 days ago', type: 'student', icon: '📝' }
  ],
  notifications: [
    { id: 1, text: 'Your password will expire in 3 days. Please change it.', time: '2 hours ago', read: false, type: 'warning' },
    { id: 2, text: 'System backup completed successfully.', time: '5 hours ago', read: true, type: 'success' },
    { id: 3, text: 'Failed login attempt from IP 192.168.1.100', time: '1 day ago', read: false, type: 'error' },
    { id: 4, text: 'New software update available for the portal.', time: '1 day ago', read: true, type: 'info' },
    { id: 5, text: 'Server maintenance scheduled for this weekend.', time: '2 days ago', read: false, type: 'info' },
    { id: 6, text: 'Database synchronization issue detected.', time: '3 days ago', read: true, type: 'error' },
    { id: 7, text: 'Monthly attendance report generated.', time: '4 days ago', read: true, type: 'success' },
    { id: 8, text: 'High CPU usage detected on web server.', time: '5 days ago', read: true, type: 'warning' }
  ],
  enrollmentTrends: [
    { year: '2021', students: 800 },
    { year: '2022', students: 850 },
    { year: '2023', students: 920 },
    { year: '2024', students: 1050 },
    { year: '2025', students: 1180 },
    { year: '2026', students: 1250 }
  ],
  departmentDistribution: [
    { department: 'CS', students: 450, color: '#4F46E5' },
    { department: 'ECE', students: 380, color: '#0EA5E9' },
    { department: 'MECH', students: 420, color: '#10B981' },
    { department: 'CIVIL', students: 310, color: '#F59E0B' },
    { department: 'MATH', students: 200, color: '#EF4444' },
    { department: 'PHY', students: 180, color: '#8B5CF6' },
    { department: 'CHEM', students: 190, color: '#EC4899' },
    { department: 'BBA', students: 500, color: '#14B8A6' }
  ],
  attendanceTrends: [
    { day: 'Mon', percentage: 92 },
    { day: 'Tue', percentage: 95 },
    { day: 'Wed', percentage: 93 },
    { day: 'Thu', percentage: 91 },
    { day: 'Fri', percentage: 85 },
    { day: 'Sat', percentage: 78 },
    { day: 'Sun', percentage: 75 }
  ]
};
