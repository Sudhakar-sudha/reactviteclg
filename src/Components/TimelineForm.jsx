import React, { useState, useRef } from 'react';

const TimelineForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      password: '',
      address: '',
      gender: '',
    },
    companyInfo: {
      companyName: '',
      companyEmail: '',
      companyPhone: '',
      companyAddress: '',
    },
    bankInfo: {
      bankName: '',
      accountNumber: '',
      branchName: '',
      accountHolderName: '',
      bankAddress: '',
      bankType: '',
    },
  });

  const [errors, setErrors] = useState({});
  const stepRefs = useRef([]);

  const totalSteps = 4; // Total steps including Summary step

  // Validate each step's input fields
  const validateStep = (step) => {
    let currentErrors = {};

    switch (step) {
      case 0: // Personal Info Validation
        if (!formData.personalInfo.name) currentErrors.name = 'Name is required';
        if (!formData.personalInfo.email || !validateEmail(formData.personalInfo.email)) {
          currentErrors.email = 'Please enter a valid email';
        }
        if (!formData.personalInfo.phone || formData.personalInfo.phone.length !== 10) {
          currentErrors.phone = 'Phone number must be exactly 10 digits';
        }
        if (!formData.personalInfo.password || formData.personalInfo.password.length <= 8) {
          currentErrors.password = 'Password must be greater than 8 characters';
        }
        if (!formData.personalInfo.address) currentErrors.address = 'Address is required';
        if (!formData.personalInfo.gender) currentErrors.gender = 'Gender is required';
        break;

      case 1: // Company Info Validation
        if (!formData.companyInfo.companyName) currentErrors.companyName = 'Company Name is required';
        if (!formData.companyInfo.companyEmail || !validateEmail(formData.companyInfo.companyEmail)) {
          currentErrors.companyEmail = 'Please enter a valid company email';
        }
        if (!formData.companyInfo.companyPhone) currentErrors.companyPhone = 'Company Phone is required';
        if (!formData.companyInfo.companyAddress) currentErrors.companyAddress = 'Company Address is required';
        break;

      case 2: // Bank Info Validation
        if (!formData.bankInfo.bankName) currentErrors.bankName = 'Bank Name is required';
        if (!formData.bankInfo.accountNumber || formData.bankInfo.accountNumber.length !== 12) {
          currentErrors.accountNumber = 'Account Number must be exactly 12 digits';
        }
        if (!formData.bankInfo.branchName) currentErrors.branchName = 'Branch Name is required';
        if (!formData.bankInfo.accountHolderName) currentErrors.accountHolderName = 'Account Holder Name is required';
        if (!formData.bankInfo.bankAddress) currentErrors.bankAddress = 'Bank Address is required';
        if (!formData.bankInfo.bankType) currentErrors.bankType = 'Bank Type (Saving/Current) is required';
        break;

      default:
        break;
    }
    
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  // Email Validation (simple check)
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Scroll to the next step if valid
  const scrollToNextStep = (nextStep) => {
    if (validateStep(currentStep)) {
      setCurrentStep(nextStep);
      if (stepRefs.current[nextStep]) {
        stepRefs.current[nextStep].scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      alert('Form submitted successfully!');
    }
  };

  // Calculate progress as a percentage
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Seller Sign up Form</h1>

        {/* Step Indicator */}
        <div className="relative w-full mb-6 p-10 -ml-8">
          <div className="relative w-full bg-gray-300 h-2 rounded-full">
            {/* Progress Bar */}
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>

            {/* Step Circles */}
            <div className="absolute top-0 left-0 flex justify-between w-full h-full items-center">
              {[0, 1, 2, 3].map((step, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl
                    ${currentStep >= step ? 'bg-blue-500' : 'bg-gray-300'}`}
                  style={{ position: 'absolute', left: `${(index / (totalSteps - 1)) * 100}%` }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        <div ref={(el) => (stepRefs.current[0] = el)}>
          {currentStep === 0 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium mb-4 text-gray-700">Personal Information</h2>
              <div className="mb-4">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.personalInfo.name}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, name: e.target.value } })}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.personalInfo.email}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, email: e.target.value } })}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.personalInfo.phone}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, phone: e.target.value } })}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Password</label>
                <input
                  type="password"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.personalInfo.password}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, password: e.target.value } })}
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Address</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.personalInfo.address}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, address: e.target.value } })}
                  placeholder="Enter your address"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Gender</label>
                <div className="flex space-x-6">
                  <label>
                    <input
                      type="radio"
                      value="Male"
                      checked={formData.personalInfo.gender === 'Male'}
                      onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, gender: e.target.value } })}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Female"
                      checked={formData.personalInfo.gender === 'Female'}
                      onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, gender: e.target.value } })}
                    />
                    Female
                  </label>
                </div>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>
              <div className="flex justify-between space-x-4">
                <button
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                  onClick={() => scrollToNextStep(1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Company Information */}
        <div ref={(el) => (stepRefs.current[1] = el)}>
          {currentStep === 1 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium mb-4 text-gray-700">Company Information</h2>
              <div className="mb-4">
                <label className="block text-gray-600">Company Name</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.companyInfo.companyName}
                  onChange={(e) => setFormData({ ...formData, companyInfo: { ...formData.companyInfo, companyName: e.target.value } })}
                  placeholder="Enter your company name"
                />
                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Company Email</label>
                <input
                  type="email"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.companyInfo.companyEmail}
                  onChange={(e) => setFormData({ ...formData, companyInfo: { ...formData.companyInfo, companyEmail: e.target.value } })}
                  placeholder="Enter company email"
                />
                {errors.companyEmail && <p className="text-red-500 text-sm">{errors.companyEmail}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Company Phone</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.companyInfo.companyPhone}
                  onChange={(e) => setFormData({ ...formData, companyInfo: { ...formData.companyInfo, companyPhone: e.target.value } })}
                  placeholder="Enter company phone"
                />
                {errors.companyPhone && <p className="text-red-500 text-sm">{errors.companyPhone}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Company Address</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.companyInfo.companyAddress}
                  onChange={(e) => setFormData({ ...formData, companyInfo: { ...formData.companyInfo, companyAddress: e.target.value } })}
                  placeholder="Enter company address"
                />
                {errors.companyAddress && <p className="text-red-500 text-sm">{errors.companyAddress}</p>}
              </div>
              <div className="flex justify-between space-x-4">

              {currentStep > 0 && (
                  <button
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </button>
                )}
                <button
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                  onClick={() => scrollToNextStep(2)}
                >
                  Next
                </button>
              
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Bank Information */}
        <div ref={(el) => (stepRefs.current[2] = el)}>
          {currentStep === 2 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium mb-4 text-gray-700">Bank Details</h2>
              <div className="mb-4">
                <label className="block text-gray-600">Bank Name</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.bankInfo.bankName}
                  onChange={(e) => setFormData({ ...formData, bankInfo: { ...formData.bankInfo, bankName: e.target.value } })}
                  placeholder="Enter bank name"
                />
                {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Account Number</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.bankInfo.accountNumber}
                  onChange={(e) => setFormData({ ...formData, bankInfo: { ...formData.bankInfo, accountNumber: e.target.value } })}
                  placeholder="Enter account number"
                />
                {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Branch Name</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.bankInfo.branchName}
                  onChange={(e) => setFormData({ ...formData, bankInfo: { ...formData.bankInfo, branchName: e.target.value } })}
                  placeholder="Enter branch name"
                />
                {errors.branchName && <p className="text-red-500 text-sm">{errors.branchName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Account Holder Name</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.bankInfo.accountHolderName}
                  onChange={(e) => setFormData({ ...formData, bankInfo: { ...formData.bankInfo, accountHolderName: e.target.value } })}
                  placeholder="Enter account holder name"
                />
                {errors.accountHolderName && <p className="text-red-500 text-sm">{errors.accountHolderName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Bank Address</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.bankInfo.bankAddress}
                  onChange={(e) => setFormData({ ...formData, bankInfo: { ...formData.bankInfo, bankAddress: e.target.value } })}
                  placeholder="Enter bank address"
                />
                {errors.bankAddress && <p className="text-red-500 text-sm">{errors.bankAddress}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Bank Type</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.bankInfo.bankType}
                  onChange={(e) => setFormData({ ...formData, bankInfo: { ...formData.bankInfo, bankType: e.target.value } })}
                  placeholder="Enter bank type"
                />
                {errors.bankType && <p className="text-red-500 text-sm">{errors.bankType}</p>}
              </div>
              <div className="flex justify-between space-x-4">

              {currentStep > 0 && (
                  <button
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </button>
                )}
                <button
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                  onClick={() => scrollToNextStep(3)}
                >
                  Next
                </button>
             
              </div>
            </div>
          )}
        </div>

        {/* Step 4: Summary */}
        <div ref={(el) => (stepRefs.current[3] = el)}>
          {currentStep === 3 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium mb-4 text-gray-700">Summary</h2>
              <div className="mb-4">
                <h3 className="font-medium text-lg text-gray-700">Personal Information</h3>
                <p>Name: {formData.personalInfo.name}</p>
                <p>Email: {formData.personalInfo.email}</p>
                <p>Phone: {formData.personalInfo.phone}</p>
                <p>Address: {formData.personalInfo.address}</p>
                <p>Gender: {formData.personalInfo.gender}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-medium text-lg text-gray-700">Company Information</h3>
                <p>Company Name: {formData.companyInfo.companyName}</p>
                <p>Company Email: {formData.companyInfo.companyEmail}</p>
                <p>Company Phone: {formData.companyInfo.companyPhone}</p>
                <p>Company Address: {formData.companyInfo.companyAddress}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-medium text-lg text-gray-700">Bank Details</h3>
                <p>Bank Name: {formData.bankInfo.bankName}</p>
                <p>Account Number: {formData.bankInfo.accountNumber}</p>
                <p>Branch Name: {formData.bankInfo.branchName}</p>
                <p>Account Holder Name: {formData.bankInfo.accountHolderName}</p>
                <p>Bank Address: {formData.bankInfo.bankAddress}</p>
                <p>Bank Type: {formData.bankInfo.bankType}</p>
              </div>
              <div className="flex justify-between space-x-4">
                {currentStep > 0 && (
                  <button
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </button>
                )}
                <button
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineForm;
