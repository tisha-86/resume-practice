interface Job {
    title: string;
    description: string;
    location: string;
    requiredSkills: string[];
}

interface Resume {
    id: string;
    companyName?: string;
    jobTitle?: string;
    imagePath: string;
    resumePath: string;
    feedback: Feedback;
}

interface Feedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];
    };
    toneAndStyle: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    content: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    structure: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    skills: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    jobMatch: {
        matchScore: number;
        matchedKeywords: string[];
        missingKeywords: string[];
        summary: string;
    };
}

interface ImprovedResume {
    name: string;
    contact: {
        location: string;
        phone: string;
        email: string;
        linkedin?: string;
        github?: string;
    };
    summary: string;
    education: {
        institution: string;
        degree: string;
        duration: string;
    }[];
    experience: {
        title: string;
        organization: string;
        duration: string;
        bullets: string[];
    }[];
    projects: {
        title: string;
        bullets: string[];
    }[];
    skills: string[];
}

interface UserProfile {
    name: string;
    phone: string;
    email: string;
    location: string;
    linkedin: string;
    github: string;
}