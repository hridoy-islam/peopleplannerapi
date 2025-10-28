export interface TPendingHiring {
  _id?: string;

  // Basic Info
  name?: string;
  email: string;
  password?: string;
  isDeleted?: boolean;
  authorized?: boolean;
  address?: string;
  image?: string;
  phone?: string;
  googleUid?: string;
  otp?: string;
  refreshToken?: string;
  otpExpiry?: Date;
  isUsed?: boolean;
  isValided?: boolean;
  isCompleted?: boolean;
  status:string;

  // Personal Details
  title?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  initial?: string;
  dateOfBirth?: Date;
  nationality?: string;
  countryOfResidence?: string;
  countryOfBirth?: string;
  shareCode?: string;
  nationalInsuranceNumber?: string;

  // Postal Address
  postalAddressLine1?: string;
  postalAddressLine2?: string;
  postalCity?: string;
  postalPostCode?: string;
  postalCountry?: string;

  // Emergency Contact
  emergencyContactNumber?: string;
  emergencyEmail?: string;
  emergencyFullName?: string;
  emergencyRelationship?: string;
  emergencyAddress?: string;

  // Career/Application
  availableFromDate?: Date;
  source?: string;
  referralEmployee?: string;

  availability?: {
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
  };

  isStudent?: boolean;
  isUnderStatePensionAge?: boolean;
  isOver18?: boolean;
  isSubjectToImmigrationControl?: boolean;
  canWorkInUK?: boolean;

  competentInOtherLanguage?: boolean;
  otherLanguages?: string[];

  drivingLicense?: boolean;
  licenseNumber?: string;

  carOwner?: boolean;
  travelAreas?: string;

  solelyForEverycare?: boolean;
  otherEmployers?: string;

  professionalBody?: boolean;
  professionalBodyDetails?: string;

  // Employment
  isEmployed?: string;
  currentEmployment?: {
    employer?: string;
    jobTitle?: string;
    startDate?: string;
    employmentType?: string;
    responsibilities?: string;
    supervisor?: string;
    contactPermission?: string;
  };

  hasPreviousEmployment?: string;
  previousEmployments?: {
    employer?: string;
    jobTitle?: string;
    startDate?: string;
    endDate?: string;
    reasonForLeaving?: string;
    responsibilities?: string;
    hasEmploymentGaps?: string;
    employmentGapsExplanation?: string;
    contactPermission?: string;
  }[];

  hasEmploymentGaps?: string;
  employmentGapsExplanation?: string;

  // Education
  educationData?: {
    institution?: string;
    qualification?: string;
    awardDate?: Date;
    grade?: string;
    certificate?: string;
  }[];

  // Training
  trainingData?: {
    trainingName?: string;
    awardingBody?: string;
    completionDate?: Date;
    certificate?: string;
  }[];

  // Ethnicity
  ethnicityGroup?: string;
  ethnicityValue?: string;
  ethnicityOther?: string;

  // Disability
  hasDisability?: boolean;
  disabilityDetails?: string;
  needsReasonableAdjustment?: boolean;
  reasonableAdjustmentDetails?: string;

  // Life Experience
  lifeSkillsAndInterests?: string;
  relevantExperience?: string;

  // References
  professionalReferee1?: Referee;
  professionalReferee2?: Referee;
  personalReferee?: Referee;

  // Documents
  cvResume?: string;
  proofOfAddress1?: string;
  proofOfAddress2?: string;
  idDocuments?: string[];
  utilityBills?: string[];
  bankStatement?: string[];
  proofOfNI?: string[];
  immigrationDocument?: string[];
  proofOfAddress?: string[];
  passport?: string[];
  workExperience?: string[];
  personalStatement?: string[];

  // Post Employment / Medical
  sex?: string;
  advisedMedicalWorkRestriction?: boolean;
  advisedMedicalWorkRestrictionComment?: string;
  undueFatigue?: boolean;
  undueFatigueDetails?: string;
  bronchitis?: boolean;
  bronchitisDetails?: string;
  breathlessness?: boolean;
  breathlessnessDetails?: string;
  allergies?: boolean;
  allergiesDetails?: string;
  pneumonia?: boolean;
  pneumoniaDetails?: string;
  hayFever?: boolean;
  hayFeverDetails?: string;
  shortnessOfBreath?: boolean;
  shortnessOfBreathDetails?: string;
  jundice?: boolean;
  jundiceDetails?: string;
  stomachProblems?: boolean;
  stomachProblemsDetails?: string;
  stomachUlcer?: boolean;
  stomachUlcerDetails?: string;
  hernias?: boolean;
  herniasDetails?: string;
  bowelProblem?: boolean;
  bowelProblemDetails?: string;
  diabetesMellitus?: boolean;
  diabetesMellitusDetails?: string;
  nervousDisorder?: boolean;
  nervousDisorderDetails?: string;
  dizziness?: boolean;
  dizzinessDetails?: string;
  earProblems?: boolean;
  earProblemsDetails?: string;
  hearingDefect?: boolean;
  hearingDefectDetails?: string;
  epilepsy?: boolean;
  epilepsyDetails?: string;
  eyeProblems?: boolean;
  eyeProblemsDetails?: string;
  ppeAllergy?: boolean;
  ppeAllergyDetails?: string;
  rheumaticFever?: boolean;
  rheumaticFeverDetails?: string;
  highBloodPressure?: boolean;
  highBloodPressureDetails?: string;
  lowBloodPressure?: boolean;
  lowBloodPressureDetails?: string;
  palpitations?: boolean;
  palpitationsDetails?: string;
  heartAttack?: boolean;
  heartAttackDetails?: string;
  angina?: boolean;
  anginaDetails?: string;
  asthma?: boolean;
  asthmaDetails?: string;
  chronicLungProblems?: boolean;
  chronicLungProblemsDetails?: string;
  stroke?: boolean;
  strokeDetails?: string;
  heartMurmur?: boolean;
  heartMurmurDetails?: string;
  backProblems?: boolean;
  backProblemsDetails?: string;
  jointProblems?: boolean;
  jointProblemsDetails?: string;
  swollenLegs?: boolean;
  swollenLegsDetails?: string;
  varicoseVeins?: boolean;
  varicoseVeinsDetails?: string;
  rheumatism?: boolean;
  rheumatismDetails?: string;
  migraine?: boolean;
  migraineDetails?: string;
  drugReaction?: boolean;
  drugReactionDetails?: string;
  visionCorrection?: boolean;
  visionCorrectionDetails?: string;
  skinConditions?: boolean;
  skinConditionsDetails?: string;
  alcoholHealthProblems?: boolean;
  alcoholHealthProblemsDetails?: string;
  seriousIllnessDetails?: string;
  recentIllHealth?: boolean;
  recentIllHealthComment?: string;
  attendingClinic?: boolean;
  attendingClinicComment?: string;
  hadChickenPox?: boolean;
  hadChickenPoxComment?: string;
  otherCommunicableDisease?: boolean;
  otherCommunicableDiseaseComment?: string;

  // Inoculations / Vaccinations
  inocDiphtheria?: boolean;
  inocDiphtheriaComment?: string;
  inocHepatitisB?: boolean;
  inocHepatitisBComment?: string;
  inocTuberculosis?: boolean;
  inocTuberculosisComment?: string;
  inocRubella?: boolean;
  inocRubellaComment?: string;
  inocVaricella?: boolean;
  inocVaricellaComment?: string;
  inocPolio?: boolean;
  inocPolioComment?: string;
  inocTetanus?: boolean;
  inocTetanusComment?: string;
  testedHIV?: boolean;
  testedHIVComment?: string;
  inocOther?: string;
  inocOtherComment?: string;
  daysSickLastYear?: string;

  // Bank Details
  houseNumberOrName?: string;
  postCode?: string;
  jobRole?: string;
  otherJobRole?: string;
  accountNumber?: string;
  sortCode?: string;
  bankName?: string;
  branchName?: string;
  buildingSocietyRollNo?: string;

  // Consent & Declarations
  declarationContactReferee?: boolean;
  declarationCorrectUpload?: boolean;
  authorizeReferees?: boolean;
  disciplinaryInvestigation?: boolean;
  disciplinaryInvestigationDetails?: string;
  abuseInvestigation?: boolean;
  abuseInvestigationDetails?: string;
  appliedBefore?: boolean;
  roaDeclaration?: boolean;
  roaDeclarationDetails?: string;
  termsAccepted?: boolean;
  dataProcessingAccepted?: boolean;
  consentMedicalDeclaration?: boolean;
  consentVaccination?: boolean;
  consentTerminationClause?: boolean;

  ref1Submit?: boolean;
  ref2Submit?: boolean;
  ref3Submit?: boolean;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Referee {
  name?: string;
  position?: string;
  relationship?: string;
  organisation?: string;
  address?: string;
  tel?: string;
  fax?: string;
  email?: string;
}
