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
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-300 p-14">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2">Seller Sign Up Form</h1>

        {/* Step Indicator */}
        <div className="relative w-full p-10 -ml-8">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Column: Name, Email, Phone Number */}
                <div className="mb-4">
                  <label className="block text-gray-600">Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={formData.personalInfo.name}
                    onChange={(e) =>
                      setFormData({ ...formData, personalInfo: { ...formData.personalInfo, name: e.target.value } })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, personalInfo: { ...formData.personalInfo, email: e.target.value } })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, personalInfo: { ...formData.personalInfo, phone: e.target.value } })
                    }
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                {/* Second Column: Password, Address, Gender */}
                <div className="mb-4">
                  <label className="block text-gray-600">Password</label>
                  <input
                    type="password"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={formData.personalInfo.password}
                    onChange={(e) =>
                      setFormData({ ...formData, personalInfo: { ...formData.personalInfo, password: e.target.value } })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, personalInfo: { ...formData.personalInfo, address: e.target.value } })
                    }
                    placeholder="Enter your address"
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600">Gender</label>
                  <select
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={formData.personalInfo.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, personalInfo: { ...formData.personalInfo, gender: e.target.value } })
                    }
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Company Information */}
        <div ref={(el) => (stepRefs.current[1] = el)}>
          {currentStep === 1 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium mb-4 text-gray-700">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name, Email, Phone */}
                <div className="mb-4">
                  <label className="block text-gray-600">Company Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={formData.companyInfo.companyName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyInfo: { ...formData.companyInfo, companyName: e.target.value },
                      })
                    }
                    placeholder="Enter company name"
                  />
                  {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600">Company Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={formData.companyInfo.companyEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyInfo: { ...formData.companyInfo, companyEmail: e.target.value },
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyInfo: { ...formData.companyInfo, companyPhone: e.target.value },
                      })
                    }
                    placeholder="Enter company phone"
                  />
                  {errors.companyPhone && <p className="text-red-500 text-sm">{errors.companyPhone}</p>}
                </div>

                {/* Company Address */}
                <div className="mb-4">
                  <label className="block text-gray-600">Company Address</label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={formData.companyInfo.companyAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyInfo: { ...formData.companyInfo, companyAddress: e.target.value },
                      })
                    }
                    placeholder="Enter company address"
                  />
                  {errors.companyAddress && <p className="text-red-500 text-sm">{errors.companyAddress}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Bank Information */}
        <div ref={(el) => (stepRefs.current[2] = el)}>
          {currentStep === 2 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium mb-4 text-gray-700">Bank Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bank Name, Account Number */}
                <div className="mb-4">
                  <label className="block text-gray-600">Bank Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={formData.bankInfo.bankName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankInfo: { ...formData.bankInfo, bankName: e.target.value },
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankInfo: { ...formData.bankInfo, accountNumber: e.target.value },
                      })
                    }
                    placeholder="Enter account number"
                  />
                  {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
                </div>

                {/* Bank Branch, Account Holder Name */}
                <div className="mb-4">
                  <label className="block text-gray-600">Branch Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={formData.bankInfo.branchName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankInfo: { ...formData.bankInfo, branchName: e.target.value },
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankInfo: { ...formData.bankInfo, accountHolderName: e.target.value },
                      })
                    }
                    placeholder="Enter account holder's name"
                  />
                  {errors.accountHolderName && <p className="text-red-500 text-sm">{errors.accountHolderName}</p>}
                </div>

                {/* Bank Address, Bank Type */}
                <div className="mb-4">
                  <label className="block text-gray-600">Bank Address</label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={formData.bankInfo.bankAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankInfo: { ...formData.bankInfo, bankAddress: e.target.value },
                      })
                    }
                    placeholder="Enter bank address"
                  />
                  {errors.bankAddress && <p className="text-red-500 text-sm">{errors.bankAddress}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600">Bank Type</label>
                  <select
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={formData.bankInfo.bankType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankInfo: { ...formData.bankInfo, bankType: e.target.value },
                      })
                    }
                  >
                    <option value="">Select Bank Type</option>
                    <option value="saving">Saving</option>
                    <option value="current">Current</option>
                  </select>
                  {errors.bankType && <p className="text-red-500 text-sm">{errors.bankType}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 4: Summary */}
        <div ref={(el) => (stepRefs.current[3] = el)}>
          {currentStep === 3 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium mb-4 text-gray-700">Summary</h2>
              <div className="space-y-4">
                <p><strong>Name:</strong> {formData.personalInfo.name}</p>
                <p><strong>Email:</strong> {formData.personalInfo.email}</p>
                <p><strong>Phone:</strong> {formData.personalInfo.phone}</p>
                <p><strong>Address:</strong> {formData.personalInfo.address}</p>
                <p><strong>Gender:</strong> {formData.personalInfo.gender}</p>
                <p><strong>Company Name:</strong> {formData.companyInfo.companyName}</p>
                <p><strong>Company Email:</strong> {formData.companyInfo.companyEmail}</p>
                <p><strong>Company Phone:</strong> {formData.companyInfo.companyPhone}</p>
                <p><strong>Company Address:</strong> {formData.companyInfo.companyAddress}</p>
                <p><strong>Bank Name:</strong> {formData.bankInfo.bankName}</p>
                <p><strong>Account Number:</strong> {formData.bankInfo.accountNumber}</p>
                <p><strong>Branch Name:</strong> {formData.bankInfo.branchName}</p>
                <p><strong>Account Holder Name:</strong> {formData.bankInfo.accountHolderName}</p>
                <p><strong>Bank Address:</strong> {formData.bankInfo.bankAddress}</p>
                <p><strong>Bank Type:</strong> {formData.bankInfo.bankType}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
            disabled={currentStep === 0}
          >
            Previous
          </button>

          <div className="flex space-x-4">
            {currentStep < 3 ? (
              <button
                onClick={() => scrollToNextStep(currentStep + 1)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded-lg">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineForm;
