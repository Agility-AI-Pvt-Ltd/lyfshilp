// src/controllers/careerGuidanceController.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory OTP storage (no database required)
// In-memory OTP storage removed in favor of DB persistence


// Load eligibility matrices (both central and state)
let centralMatrix = null;
let stateMatrix = null;
let allUniversities = null;

const loadEligibilityMatrices = () => {
    if (!allUniversities) {
        // Load central universities
        const centralPath = path.join(__dirname, '../data/eligibilityMatrix.central.json');
        const centralData = fs.readFileSync(centralPath, 'utf-8');
        centralMatrix = JSON.parse(centralData);

        // Load state universities
        const statePath = path.join(__dirname, '../data/eligibilityMatrix.state.json');
        const stateData = fs.readFileSync(statePath, 'utf-8');
        stateMatrix = JSON.parse(stateData);

        // Merge all universities for easy access
        allUniversities = [
            ...centralMatrix.universities,
            ...stateMatrix.universities
        ];

        console.log(`✅ Loaded ${centralMatrix.universities.length} central universities`);
        console.log(`✅ Loaded ${stateMatrix.universities.length} state universities`);
        console.log(`✅ Total: ${allUniversities.length} universities`);
    }
    return allUniversities;
};

// ============================================================================
// COURSE DOMAIN CLASSIFICATION & RELEVANCE FILTERING
// ============================================================================

/**
 * Course domain categories for classification
 */
const COURSE_DOMAINS = {
    LANGUAGES: [
        'arabic', 'persian', 'french', 'german', 'spanish', 'italian',
        'russian', 'japanese', 'chinese', 'korean', 'sanskrit',
        'hindi', 'urdu', 'bengali', 'tamil', 'telugu', 'malayalam',
        'kannada', 'marathi', 'gujarati', 'punjabi', 'assamese', 'odia',
        'linguistics', 'foreign language', 'modern language'
    ],

    MANAGEMENT: [
        'management', 'bms', 'bba', 'bbe', 'business administration',
        'business economics', 'business management', 'mba'
    ],

    COMMERCE: [
        'commerce', 'b.com', 'bcom', 'accountancy', 'finance',
        'financial', 'accounting', 'taxation', 'banking'
    ],

    COMPUTER_SCIENCE: [
        'computer science', 'computer application', 'information technology',
        'it', 'b.tech', 'btech', 'b.sc (hons) computer', 'bca', 'mca',
        'software', 'data science', 'artificial intelligence'
    ],

    ENGINEERING: [
        'engineering', 'b.tech', 'btech', 'b.e.', 'mechanical', 'electrical',
        'civil', 'electronics', 'chemical engineering'
    ],

    SCIENCE: [
        'physics', 'chemistry', 'biology', 'mathematics', 'statistics',
        'botany', 'zoology', 'microbiology', 'biochemistry', 'biotechnology',
        'environmental science', 'geology', 'b.sc'
    ],

    SOCIAL_SCIENCES: [
        'economics', 'political science', 'sociology', 'psychology',
        'anthropology', 'history', 'geography', 'social work'
    ],

    ARTS_HUMANITIES: [
        'philosophy', 'english literature', 'journalism', 'mass communication',
        'fine arts', 'performing arts', 'music', 'liberal arts'
    ],

    LAW: ['law', 'legal', 'llb', 'ba llb', 'bba llb'],

    MEDICINE: ['medicine', 'mbbs', 'medical', 'nursing', 'pharmacy', 'physiotherapy'],

    EDUCATION: ['education', 'teaching', 'b.ed', 'bed'],

    AGRICULTURE: ['agriculture', 'agricultural', 'horticulture', 'forestry'],

    ARCHITECTURE_DESIGN: ['architecture', 'design', 'interior design', 'fashion design']
};

/**
 * Map user interests to relevant course domains
 */
const INTEREST_TO_DOMAINS = {
    'Languages': ['LANGUAGES'],
    'Management': ['MANAGEMENT', 'COMMERCE'],
    'Business Administration': ['MANAGEMENT', 'COMMERCE'],
    'Commerce': ['COMMERCE', 'MANAGEMENT'],
    'Finance': ['COMMERCE', 'MANAGEMENT'],
    'Computer Science': ['COMPUTER_SCIENCE', 'ENGINEERING'],
    'Engineering': ['ENGINEERING', 'COMPUTER_SCIENCE'],
    'Economics': ['SOCIAL_SCIENCES', 'COMMERCE', 'MANAGEMENT'],
    'Mathematics': ['SCIENCE', 'COMPUTER_SCIENCE'],
    'Physics': ['SCIENCE', 'ENGINEERING'],
    'Chemistry': ['SCIENCE'],
    'Biology': ['SCIENCE', 'MEDICINE'],
    'Psychology': ['SOCIAL_SCIENCES'],
    'Sociology': ['SOCIAL_SCIENCES'],
    'Political Science': ['SOCIAL_SCIENCES'],
    'History': ['SOCIAL_SCIENCES', 'ARTS_HUMANITIES'],
    'Geography': ['SOCIAL_SCIENCES', 'SCIENCE'],
    'Law': ['LAW'],
    'Medicine': ['MEDICINE'],
    'Journalism': ['ARTS_HUMANITIES'],
    'Mass Communication': ['ARTS_HUMANITIES'],
    'Fine Arts': ['ARTS_HUMANITIES'],
    'Teaching': ['EDUCATION'],
    'Agriculture': ['AGRICULTURE'],
    'Architecture': ['ARCHITECTURE_DESIGN'],
    'Design': ['ARCHITECTURE_DESIGN'],
    'Environmental Science': ['SCIENCE'],
    'Social Work': ['SOCIAL_SCIENCES'],
    'Anthropology': ['SOCIAL_SCIENCES'],
    'Home Science': ['SCIENCE'],
    'Physical Education': ['EDUCATION']
};

/**
 * Classify a course into domain(s) based on course name and category
 * @param {string} courseName - Name of the course
 * @param {string} courseCategory - Category of the course (optional)
 * @returns {string[]} Array of domain identifiers
 */
function classifyCourse(courseName, courseCategory = null) {
    const lowerName = courseName.toLowerCase();
    const domains = [];

    // Primary: Keyword-based classification
    for (const [domain, keywords] of Object.entries(COURSE_DOMAINS)) {
        if (keywords.some(keyword => lowerName.includes(keyword))) {
            domains.push(domain);
        }
    }

    // Fallback: Category-based classification (if no keyword match)
    if (domains.length === 0 && courseCategory) {
        const categoryMap = {
            'arts': 'ARTS_HUMANITIES',
            'science': 'SCIENCE',
            'commerce': 'COMMERCE',
            'management': 'MANAGEMENT'
        };
        const mappedDomain = categoryMap[courseCategory.toLowerCase()];
        if (mappedDomain) {
            domains.push(mappedDomain);
        }
    }

    // Final fallback: Default to ARTS_HUMANITIES if still no match
    return domains.length > 0 ? domains : ['ARTS_HUMANITIES'];
}

/**
 * Check if course is relevant to user's interests
 * CRITICAL: Implements strict language filtering rule
 * @param {string} courseName - Name of the course
 * @param {string} courseCategory - Category of the course
 * @param {string[]} interestedSubjects - User's interested subjects
 * @returns {boolean} True if course should be shown
 */
function isCourseRelevant(courseName, courseCategory, interestedSubjects) {
    // Classify the course
    const courseDomains = classifyCourse(courseName, courseCategory);

    // STRICT LANGUAGE RULE (MANDATORY)
    // Language courses NEVER appear unless "Languages" is explicitly selected
    if (courseDomains.includes('LANGUAGES') && !interestedSubjects.includes('Languages')) {
        return false; // HIDE unconditionally
    }

    // If no interests specified, show all non-language courses
    if (!interestedSubjects || interestedSubjects.length === 0) {
        return true;
    }

    // Get all relevant domains based on user interests
    const relevantDomains = new Set();
    for (const interest of interestedSubjects) {
        const domains = INTEREST_TO_DOMAINS[interest] || [];
        domains.forEach(d => relevantDomains.add(d));
    }

    // SAFER FALLBACK LOGIC
    // If no domain mapping exists, still hide language courses
    if (relevantDomains.size === 0) {
        // No mapped domains, but still enforce language rule
        return !courseDomains.includes('LANGUAGES');
    }

    // Course is relevant if it matches ANY of the user's interest domains
    return courseDomains.some(domain => relevantDomains.has(domain));
}

/**
 * Calculate relevance score for sorting
 * Higher score = more relevant to user interests
 * @param {string} courseName - Name of the course
 * @param {string} courseCategory - Category of the course
 * @param {string[]} interestedSubjects - User's interested subjects
 * @returns {number} Relevance score (higher is better)
 */
function calculateRelevanceScore(courseName, courseCategory, interestedSubjects) {
    if (!interestedSubjects || interestedSubjects.length === 0) {
        return 0;
    }

    const courseDomains = classifyCourse(courseName, courseCategory);
    const relevantDomains = new Set();

    for (const interest of interestedSubjects) {
        const domains = INTEREST_TO_DOMAINS[interest] || [];
        domains.forEach(d => relevantDomains.add(d));
    }

    // Count how many of the course's domains match user interests
    const matchCount = courseDomains.filter(d => relevantDomains.has(d)).length;
    return matchCount;
}


// OTP functions moved to otpController.js


/**
 * POST /api/career-guidance/eligible-courses
 * Calculate eligible courses based on student profile
 * Phase 5: Added search filtering and enhanced pagination metadata
 */
export const getEligibleCourses = async (req, res) => {
    try {
        const {
            state,
            preferredCategory,
            class12Subjects,
            interestedSubjects,
            openToOutsideState,
            searchQuery = '',
            page = 1,
            pageSize = 10,
            tab = 'home'
        } = req.body;

        // Use authenticated phone from session middleware
        const phone = req.userPhone;

        // Validate input
        if (!state || !preferredCategory || !class12Subjects || !interestedSubjects) {
            return res.status(400).json({
                success: false,
                message: 'State, preferredCategory, class12Subjects, and interestedSubjects are required',
            });
        }

        // Load eligibility matrices
        const universities = loadEligibilityMatrices();

        // STEP 1: Calculate eligibility for ALL courses
        const allEligibleCourses = [];

        for (const university of universities) {
            for (const course of university.courses) {
                const eligibility = checkEligibility(course, class12Subjects, interestedSubjects, university);

                // STRICT FILTERING: Only include if eligible
                if (eligibility.eligible) {
                    allEligibleCourses.push({
                        university: {
                            id: university.id,
                            name: university.name,
                            state: university.state,
                            type: university.type,
                        },
                        course: {
                            id: course.id,
                            name: course.name,
                            type: course.type,
                            category: course.category,
                        },
                        reason: eligibility.reason,
                        matchedCombination: eligibility.matchedCombination,
                        specialConditions: course.specialConditions || [],
                    });
                }
            }
        }

        // STEP 2: Apply STRICT CATEGORY filter (MANDATORY - NO FALLBACK)
        const categoryFilteredCourses = allEligibleCourses.filter(result => {
            const courseCategory = result.course.category.toLowerCase();
            const selectedCategory = preferredCategory.toLowerCase();
            return courseCategory === selectedCategory;
        });

        // STEP 3: Apply RELEVANCE filter (subject-based filtering)
        const relevantCourses = categoryFilteredCourses.filter(result =>
            isCourseRelevant(result.course.name, result.course.category, interestedSubjects)
        );

        // STEP 3: Sort by relevance (NEW - interest-first prioritization)
        relevantCourses.sort((a, b) => {
            const scoreA = calculateRelevanceScore(a.course.name, a.course.category, interestedSubjects);
            const scoreB = calculateRelevanceScore(b.course.name, b.course.category, interestedSubjects);
            return scoreB - scoreA; // Higher score first
        });

        // STEP 4: Apply search filter (AFTER relevance, BEFORE pagination)
        let filteredCourses = relevantCourses;
        if (searchQuery && searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase().trim();
            filteredCourses = relevantCourses.filter(result => {
                const courseName = result.course.name.toLowerCase();
                const universityName = result.university.name.toLowerCase();
                return courseName.includes(query) || universityName.includes(query);
            });
        }

        // STEP 5: Filter lists independently
        const fullHomeStateResults = filteredCourses.filter(
            result => result.university.state === state
        );

        const fullOtherStateResults = openToOutsideState
            ? filteredCourses.filter(result => result.university.state !== state)
            : [];

        // Calculate counts for UI tabs
        const homeStateCourses = fullHomeStateResults.length;
        const otherStateCourses = fullOtherStateResults.length;

        // STEP 6: Select Active List based on 'tab' parameter
        const activeList = tab === 'other' ? fullOtherStateResults : fullHomeStateResults;

        // Calculate pagination metadata for the ACTIVE list
        const totalEligibleCourses = activeList.length;
        const totalPages = Math.ceil(totalEligibleCourses / pageSize) || 1;

        // Calculate pagination indices
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        // Paginate ONLY the active list
        const paginatedActiveList = activeList.slice(startIndex, endIndex);

        // Assign to correct response buckets
        const paginatedHomeState = tab === 'home' ? paginatedActiveList : [];
        const paginatedOtherState = tab === 'other' ? paginatedActiveList : [];

        // Determine next/prev for the ACTIVE list
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        res.json({
            success: true,
            data: {
                homeStateResults: paginatedHomeState,
                otherStateResults: paginatedOtherState,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    totalEligibleCourses: totalEligibleCourses,
                    homeStateCourses: homeStateCourses,
                    otherStateCourses: otherStateCourses,
                    hasNextPage: hasNextPage,
                    hasPreviousPage: hasPreviousPage,
                },
            },
        });
    } catch (error) {
        console.error('Error calculating eligibility:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to calculate eligibility',
        });
    }
};

/**
 * Core eligibility checking logic
 */
function checkEligibility(course, class12Subjects, interestedSubjects, university) {
    // Normalize subject names (case-insensitive matching)
    const normalizeSubject = (s) => s.toLowerCase().trim();
    const class12Set = new Set(class12Subjects.map(normalizeSubject));
    const interestedSet = new Set(interestedSubjects.map(normalizeSubject));

    // University-specific logic for legacy data structure
    if (university.id === 'du') {
        return checkDUEligibility(course, class12Subjects);
    } else if (university.id === 'bhu') {
        return checkBHUEligibility(course, class12Subjects);
    } else if (university.id === 'aktu') {
        return checkAKTUEligibility(course, class12Subjects);
    }

    // Generic eligibility checker for all other universities (new data structure)
    return checkGenericEligibility(course, class12Subjects, class12Set);
}

/**
 * Generic eligibility checker for universities using new data structure
 */
function checkGenericEligibility(course, class12Subjects, class12Set) {
    const normalizeSubject = (s) => s.toLowerCase().trim();
    // Check specific subject requirements (legacy support)
    if (course.requiredSubjects && course.requiredSubjects.length > 0) {
        // Filter out "General Test" from required subjects check as it's not in Class 12 subjects
        const requiredAcademicSubjects = course.requiredSubjects.filter(
            s => normalizeSubject(s) !== 'general test'
        );

        if (requiredAcademicSubjects.length > 0) {
            const missingSubjects = requiredAcademicSubjects.filter(
                subject => !class12Set.has(normalizeSubject(subject))
            );

            if (missingSubjects.length > 0) {
                return {
                    eligible: false,
                    reason: `Missing required subject(s): ${missingSubjects.join(', ')}`,
                };
            }
        }

        // If we made it here, required subjects are met. 
        // We consider General Test as "implied" or "to be taken" for eligibility display purposes
        // unless explicitly handled elsewhere.
    }

    // Check allowed combinations (if specified)
    if (course.allowedCombinations && course.allowedCombinations.length > 0) {
        // Try to match any combination
        for (const combination of course.allowedCombinations) {
            // Handle JNU/Certificate style: listA + General Test (no listB)
            // OR standard CUET: listA + listB

            const languagesRequired = combination.languagesRequired || 0;
            const domainSubjectsRequired = combination.domainSubjectsRequired || 0;

            // Check languages (List A)
            let languageCount = 0;
            if (combination.listA && combination.listA.length > 0) {
                const listASet = new Set(combination.listA.map(normalizeSubject));
                for (const subject of class12Subjects) {
                    if (listASet.has(normalizeSubject(subject))) {
                        languageCount++;
                    }
                }
            }

            // Check domains (List B) - Optional if domainSubjectsRequired is 0
            let domainCount = 0;
            if (combination.listB && combination.listB.length > 0) {
                const listBSet = new Set(combination.listB.map(normalizeSubject));
                // We've already counted languages, but some subjects might be in both lists? 
                // Usually lists are distinct like Languages vs Domain. 
                // But just in case, we iterate class12Subjects again.
                for (const subject of class12Subjects) {
                    if (listBSet.has(normalizeSubject(subject))) {
                        domainCount++;
                    }
                }
            }

            // Check if requirements are met
            if (languageCount >= languagesRequired && domainCount >= domainSubjectsRequired) {
                let reason = 'Meets requirements';
                if (combination.requiresGeneralTest || course.requiresGeneralTest) {
                    reason += ' (Requires General Test)';
                }

                return {
                    eligible: true,
                    reason: reason,
                };
            }
        }

        return {
            eligible: false,
            reason: 'Does not meet any valid subject combination',
        };
    }

    // If no specific requirements, student is eligible
    return {
        eligible: true,
        reason: 'Meets all requirements',
    };
}

/**
 * DU-specific eligibility (CUET List A/B logic)
 */
function checkDUEligibility(course, class12Subjects) {
    const normalizeSubject = (s) => s.toLowerCase().trim();
    const class12Set = new Set(class12Subjects.map(normalizeSubject));

    // Check compulsory subjects first
    if (course.compulsorySubjects && course.compulsorySubjects.length > 0) {
        const missingCompulsory = course.compulsorySubjects.filter(
            subject => !class12Set.has(normalizeSubject(subject))
        );

        if (missingCompulsory.length > 0) {
            return {
                eligible: false,
                reason: `Missing compulsory subject: ${missingCompulsory.join(', ')}`,
            };
        }
    }

    // Check allowed combinations (List A + List B)
    if (!course.allowedCombinations || course.allowedCombinations.length === 0) {
        return { eligible: true, reason: 'All requirements met' };
    }

    for (const combination of course.allowedCombinations) {
        // Relaxed check: Allow combinations where listB might be implied or optional if domain count is 0
        // BUT for DU, listA and listB are standard. We just ensure we don't crash.

        const languagesRequired = combination.languagesRequired || 0;
        const domainSubjectsRequired = combination.domainSubjectsRequired || 0;

        let languageCount = 0;
        let domainCount = 0;
        const matchedLanguages = [];
        const matchedDomains = [];

        // Check List A
        if (combination.listA) {
            const listASet = new Set(combination.listA.map(normalizeSubject));
            for (const subject of class12Subjects) {
                if (listASet.has(normalizeSubject(subject))) {
                    languageCount++;
                    matchedLanguages.push(subject);
                }
            }
        }

        // Check List B
        if (combination.listB) {
            const listBSet = new Set(combination.listB.map(normalizeSubject));
            for (const subject of class12Subjects) {
                if (listBSet.has(normalizeSubject(subject))) {
                    domainCount++;
                    matchedDomains.push(subject);
                }
            }
        }

        // Check if this combination is satisfied
        if (
            languageCount >= languagesRequired &&
            domainCount >= domainSubjectsRequired
        ) {
            return {
                eligible: true,
                reason: 'Valid CUET combination found',
                matchedCombination: {
                    type: combination.type,
                    description: combination.description,
                    languages: matchedLanguages.slice(0, combination.languagesRequired),
                    domains: matchedDomains.slice(0, combination.domainSubjectsRequired),
                },
            };
        }
    }

    return {
        eligible: false,
        reason: 'Does not meet any valid CUET combination (List A + List B requirements)',
    };
}

/**
 * BHU-specific eligibility
 */
function checkBHUEligibility(course, class12Subjects) {
    const normalizeSubject = (s) => s.toLowerCase().trim();
    const class12Set = new Set(class12Subjects.map(normalizeSubject));

    // Check Class 12 requirements
    if (course.class12Requirements && course.class12Requirements.length > 0) {
        const missingClass12 = course.class12Requirements.filter(
            subject => !class12Set.has(normalizeSubject(subject))
        );

        if (missingClass12.length > 0) {
            return {
                eligible: false,
                reason: `Missing Class 12 subject(s): ${missingClass12.join(', ')}`,
            };
        }
    }

    // Special case: Economics requires Math at Class 10 level
    // Since we don't have Class 10 data, we'll assume if they have it in Class 12, they had it in Class 10
    if (course.id === 'bhu_ba_hons_economics') {
        if (!class12Set.has('mathematics')) {
            return {
                eligible: false,
                reason: 'Mathematics is required at Class 10 level for B.A. (Hons) Economics. Please ensure you studied Math in Class 10.',
            };
        }
    }

    // Check compulsory subjects
    if (course.compulsorySubjects && course.compulsorySubjects.length > 0) {
        const missingCompulsory = course.compulsorySubjects.filter(
            subject => !class12Set.has(normalizeSubject(subject))
        );

        if (missingCompulsory.length > 0) {
            return {
                eligible: false,
                reason: `Missing compulsory subject(s): ${missingCompulsory.join(', ')}`,
            };
        }
    }

    // CHECK ALLOWED COMBINATIONS (Essential for Science/Arts requiring specific sets)
    if (course.allowedCombinations && course.allowedCombinations.length > 0) {
        // Reuse similar logic to generic/DU check
        for (const combination of course.allowedCombinations) {
            const languagesRequired = combination.languagesRequired || 0;
            const domainSubjectsRequired = combination.domainSubjectsRequired || 0;

            let languageCount = 0;
            let domainCount = 0;

            // Check List A
            if (combination.listA) {
                const listASet = new Set(combination.listA.map(normalizeSubject));
                for (const subject of class12Subjects) {
                    if (listASet.has(normalizeSubject(subject))) {
                        languageCount++;
                    }
                }
            }

            // Check List B
            if (combination.listB) {
                const listBSet = new Set(combination.listB.map(normalizeSubject));
                for (const subject of class12Subjects) {
                    if (listBSet.has(normalizeSubject(subject))) {
                        domainCount++;
                    }
                }
            }

            if (languageCount >= languagesRequired && domainCount >= domainSubjectsRequired) {
                return {
                    eligible: true,
                    reason: 'Met allowed combination requirements',
                };
            }
        }

        return {
            eligible: false,
            reason: 'Does not meet any valid allowed combination',
        };
    }

    return {
        eligible: true,
        reason: 'All BHU requirements met',
    };
}

/**
 * AKTU-specific eligibility
 */
function checkAKTUEligibility(course, class12Subjects) {
    const normalizeSubject = (s) => s.toLowerCase().trim();
    const class12Set = new Set(class12Subjects.map(normalizeSubject));

    // For B.Tech: Physics and Mathematics are COMPULSORY
    if (course.id === 'aktu_btech') {
        const hasPhysics = class12Set.has('physics');
        const hasMath = class12Set.has('mathematics');

        if (!hasPhysics && !hasMath) {
            return {
                eligible: false,
                reason: 'B.Tech requires both Physics and Mathematics in Class 12',
            };
        }

        if (!hasPhysics) {
            return {
                eligible: false,
                reason: 'Physics is compulsory for B.Tech',
            };
        }

        if (!hasMath) {
            return {
                eligible: false,
                reason: 'Mathematics is compulsory for B.Tech',
            };
        }

        return {
            eligible: true,
            reason: 'All AKTU B.Tech requirements met (Physics + Mathematics)',
        };
    }

    // For other courses, check compulsory subjects
    if (course.compulsorySubjects && course.compulsorySubjects.length > 0) {
        const missingCompulsory = course.compulsorySubjects.filter(
            subject => !class12Set.has(normalizeSubject(subject))
        );

        if (missingCompulsory.length > 0) {
            return {
                eligible: false,
                reason: `Missing compulsory subject(s): ${missingCompulsory.join(', ')}`,
            };
        }
    }

    return {
        eligible: true,
        reason: 'All requirements met',
    };
}

/**
 * Optional: Submit career guidance form (database write - OPTIONAL)
 * This can be used for analytics/tracking but is not required for eligibility calculation
 */
export const submitCareerGuidance = async (req, res) => {
    try {
        const { name, phone, state, class12Subjects, interestedSubjects, openToOutsideState } = req.body;

        // Verify OTP
        const storedData = otpStore.get(phone);
        if (!storedData || !storedData.verified) {
            return res.status(403).json({
                success: false,
                message: 'Phone number not verified',
            });
        }

        // For Phase 1, we're not persisting to database
        // Just return success
        res.json({
            success: true,
            message: 'Submission received successfully',
            data: {
                name,
                phone,
                state,
                submittedAt: new Date().toISOString(),
            },
        });

        // Clean up OTP after successful submission
        otpStore.delete(phone);
    } catch (error) {
        console.error('Error submitting career guidance:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit form',
        });
    }
};
