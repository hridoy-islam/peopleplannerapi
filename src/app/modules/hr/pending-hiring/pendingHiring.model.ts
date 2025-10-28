import mongoose, { model, Schema } from "mongoose";
import { string } from "zod";
import { TPendingHiring } from "./pendingHiring.interface";

const PendingHiringSchema = new Schema<TPendingHiring>(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
   
   
    isDeleted: {
      type: Boolean,
      default: false,
    },
    authorized: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    googleUid: {
      type: String,
    },
    otp: {
      type: String,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    otpExpiry: {
      type: Date,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    isValided: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
   
 status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    // Personal Details
    title: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    otherName: { type: String },
    initial: { type: String },
    dateOfBirth: { type: Date },
    nationality: { type: String },
    countryOfResidence: { type: String },
    countryOfBirth: { type: String },
    shareCode: { type: String },
    nationalInsuranceNumber: { type: String },

    // Postal Address
    postalAddressLine1: { type: String },
    postalAddressLine2: { type: String },
    postalCity: { type: String },
    postalPostCode: { type: String },
    postalCountry: { type: String },

    // Emergency Contact
    emergencyContactNumber: { type: String },
    emergencyEmail: { type: String },
    emergencyFullName: { type: String },
    emergencyRelationship: { type: String },
    emergencyAddress: { type: String },

    // Career/Application
    availableFromDate: { type: Date },
    source: { type: String },
    referralEmployee: { type: String },

    availability: {
      monday: { type: Boolean },
      tuesday: { type: Boolean },
      wednesday: { type: Boolean },
      thursday: { type: Boolean },
      friday: { type: Boolean },
      saturday: { type: Boolean },
      sunday: { type: Boolean },
    },

    isStudent: { type: Boolean },
    isUnderStatePensionAge: { type: Boolean },
    isOver18: { type: Boolean },
    isSubjectToImmigrationControl: { type: Boolean },
    canWorkInUK: { type: Boolean },

    competentInOtherLanguage: { type: Boolean },
    otherLanguages: [{ type: String }],

    drivingLicense: { type: Boolean },
    licenseNumber: { type: String },

    carOwner: { type: Boolean },
    travelAreas: { type: String },

    solelyForEverycare: { type: Boolean },
    otherEmployers: { type: String },

    professionalBody: { type: Boolean },
    professionalBodyDetails: { type: String },

    // Employment
    isEmployed: { type: String },
    currentEmployment: {
      employer: { type: String },
      jobTitle: { type: String },
      startDate: { type: String },
      employmentType: { type: String },
      responsibilities: { type: String },
      supervisor: { type: String },
      contactPermission: { type: String },
    },
    hasPreviousEmployment: { type: String },
    previousEmployments: [
      {
        employer: { type: String },
        jobTitle: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        reasonForLeaving: { type: String },
        responsibilities: { type: String },
        hasEmploymentGaps: { type: String },
        employmentGapsExplanation: { type: String },
        contactPermission: { type: String },
      },
    ],
    hasEmploymentGaps: { type: String },
    employmentGapsExplanation: { type: String },

    // Education
    educationData: {
      type: [
        {
          institution: { type: String },
          qualification: { type: String },
          awardDate: { type: Date },
          grade: { type: String },
          certificate: { type: String },
        },
      ],
      default: [],
    },

    // Training
    trainingData: {
      type: [
        {
          trainingName: { type: String },
          awardingBody: { type: String },
          completionDate: { type: Date },
          certificate: { type: String },
        },
      ],
      default: [],
    },

    // Ethnicity
    ethnicityGroup: { type: String },
    ethnicityValue: { type: String },
    ethnicityOther: { type: String },
    //Disablity
    hasDisability: { type: Boolean },
    disabilityDetails: { type: String },
    needsReasonableAdjustment: { type: Boolean },
    reasonableAdjustmentDetails: { type: String },
    // LExperience
    lifeSkillsAndInterests: { type: String },
    relevantExperience: { type: String },

    // References (Updated to match Referee interface)
    professionalReferee1: {
      name: { type: String },
      position: { type: String },
      relationship: { type: String },
      organisation: { type: String },
      address: { type: String },
      tel: { type: String },
      fax: { type: String },
      email: { type: String },
    },
    professionalReferee2: {
      name: { type: String },
      position: { type: String },
      relationship: { type: String },
      organisation: { type: String },
      address: { type: String },
      tel: { type: String },
      fax: { type: String },
      email: { type: String },
    },
    personalReferee: {
      name: { type: String },
      position: { type: String },
      relationship: { type: String },
      organisation: { type: String },
      address: { type: String },
      tel: { type: String },
      fax: { type: String },
      email: { type: String },
    },

    // Documents
    cvResume: { type: String },
    proofOfAddress1: { type: String },
    proofOfAddress2: { type: String },
    idDocuments: { type: [String], default: [] },
    utilityBills: { type: [String], default: [] },
    bankStatement: { type: [String], default: [] },
    proofOfNI: { type: [String], default: [] },
    immigrationDocument: { type: [String], default: [] },
    proofOfAddress: { type: [String], default: [] },
    passport: { type: [String], default: [] },
    workExperience: { type: [String], default: [] },
    personalStatement: { type: [String], default: [] },

    //  post employment
    sex: { type: String },
    advisedMedicalWorkRestriction: { type: Boolean },
    advisedMedicalWorkRestrictionComment: { type: String },
    undueFatigue: { type: Boolean },
    undueFatigueDetails: { type: String },
    bronchitis: { type: Boolean },
    bronchitisDetails: { type: String },
    breathlessness: { type: Boolean },
    breathlessnessDetails: { type: String },
    allergies: { type: Boolean },
    allergiesDetails: { type: String },
    pneumonia: { type: Boolean },
    pneumoniaDetails: { type: String },
    hayFever: { type: Boolean },
    hayFeverDetails: { type: String },
    shortnessOfBreath: { type: Boolean },
    shortnessOfBreathDetails: { type: String },
    jundice: { type: Boolean },
    jundiceDetails: { type: String },
    stomachProblems: { type: Boolean },
    stomachProblemsDetails: { type: String },
    stomachUlcer: { type: Boolean },
    stomachUlcerDetails: { type: String },
    hernias: { type: Boolean },
    herniasDetails: { type: String },
    bowelProblem: { type: Boolean },
    bowelProblemDetails: { type: String },
    diabetesMellitus: { type: Boolean },
    diabetesMellitusDetails: { type: String },
    nervousDisorder: { type: Boolean },
    nervousDisorderDetails: { type: String },
    dizziness: { type: Boolean },
    dizzinessDetails: { type: String },
    earProblems: { type: Boolean },
    earProblemsDetails: { type: String },
    hearingDefect: { type: Boolean },
    hearingDefectDetails: { type: String },
    epilepsy: { type: Boolean },
    epilepsyDetails: { type: String },
    eyeProblems: { type: Boolean },
    eyeProblemsDetails: { type: String },
    ppeAllergy: { type: Boolean },
    ppeAllergyDetails: { type: String },
    rheumaticFever: { type: Boolean },
    rheumaticFeverDetails: { type: String },
    highBloodPressure: { type: Boolean },
    highBloodPressureDetails: { type: String },
    lowBloodPressure: { type: Boolean },
    lowBloodPressureDetails: { type: String },
    palpitations: { type: Boolean },
    palpitationsDetails: { type: String },
    heartAttack: { type: Boolean },
    heartAttackDetails: { type: String },
    angina: { type: Boolean },
    anginaDetails: { type: String },
    asthma: { type: Boolean },
    asthmaDetails: { type: String },
    chronicLungProblems: { type: Boolean },
    chronicLungProblemsDetails: { type: String },
    stroke: { type: Boolean },
    strokeDetails: { type: String },
    heartMurmur: { type: Boolean },
    heartMurmurDetails: { type: String },
    backProblems: { type: Boolean },
    backProblemsDetails: { type: String },
    jointProblems: { type: Boolean },
    jointProblemsDetails: { type: String },
    swollenLegs: { type: Boolean },
    swollenLegsDetails: { type: String },
    varicoseVeins: { type: Boolean },
    varicoseVeinsDetails: { type: String },
    rheumatism: { type: Boolean },
    rheumatismDetails: { type: String },
    migraine: { type: Boolean },
    migraineDetails: { type: String },
    drugReaction: { type: Boolean },
    drugReactionDetails: { type: String },
    visionCorrection: { type: Boolean },
    visionCorrectionDetails: { type: String },
    skinConditions: { type: Boolean },
    skinConditionsDetails: { type: String },
    alcoholHealthProblems: { type: Boolean },
    alcoholHealthProblemsDetails: { type: String },
    seriousIllnessDetails: { type: String },
    recentIllHealth: { type: Boolean },
    recentIllHealthComment: { type: String },
    attendingClinic: { type: Boolean },
    attendingClinicComment: { type: String },
    hadChickenPox: { type: Boolean },
    hadChickenPoxComment: { type: String },
    otherCommunicableDisease: { type: Boolean },
    otherCommunicableDiseaseComment: { type: String },

    // Inoculations / Vaccinations
    inocDiphtheria: { type: Boolean },
    inocDiphtheriaComment: { type: String },
    inocHepatitisB: { type: Boolean },
    inocHepatitisBComment: { type: String },
    inocTuberculosis: { type: Boolean },
    inocTuberculosisComment: { type: String },
    inocRubella: { type: Boolean },
    inocRubellaComment: { type: String },
    inocVaricella: { type: Boolean },
    inocVaricellaComment: { type: String },
    inocPolio: { type: Boolean },
    inocPolioComment: { type: String },
    inocTetanus: { type: Boolean },
    inocTetanusComment: { type: String },
    testedHIV: { type: Boolean },
    testedHIVComment: { type: String },
    inocOther: { type: String },
    inocOtherComment: { type: String },
    daysSickLastYear: { type: String },

    houseNumberOrName: { type: String },
    postCode: { type: String },
    jobRole: { type: String },
    otherJobRole: { type: String },
    accountNumber: { type: String },
    sortCode: { type: String },
    bankName: { type: String },
    branchName: { type: String },
    buildingSocietyRollNo: { type: String },

    // Consent & Declarations
    declarationContactReferee: { type: Boolean },

    declarationCorrectUpload: { type: Boolean },
    authorizeReferees: { type: Boolean }, // 👈 New field
    disciplinaryInvestigation: { type: Boolean },
    disciplinaryInvestigationDetails: { type: String },
    abuseInvestigation: { type: Boolean },
    abuseInvestigationDetails: { type: String },
    appliedBefore: { type: Boolean },

    roaDeclaration: { type: Boolean },
    roaDeclarationDetails: { type: String },
    termsAccepted: { type: Boolean },
    dataProcessingAccepted: { type: Boolean },

    consentMedicalDeclaration: { type: Boolean },
    // consentDataProtection: { type: Boolean },
    consentVaccination: { type: Boolean },
    consentTerminationClause: { type: Boolean },
    ref1Submit: { type: Boolean, default: false },
    ref2Submit: { type: Boolean, default: false },
    ref3Submit: { type: Boolean, default: false },

    // Timestamps
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const PendingHiring = model<TPendingHiring>("PendingHiring", PendingHiringSchema);
