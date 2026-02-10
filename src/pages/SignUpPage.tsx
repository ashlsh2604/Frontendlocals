import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PhotoUpload } from '../components/PhotoUpload';
import { Mail, Smartphone, Lock, User, Phone, Shield, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

export function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[6-9]\d{9}$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid 10-digit phone number';
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Include uppercase, lowercase, and number';
        return '';
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      
      default:
        return '';
    }
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
    
    // Revalidate confirm password when password changes
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors({ ...errors, [name]: '', confirmPassword: confirmError });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/local/tasks');
      }, 1500);
    }
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/local/tasks');
    }, 1000);
  };

  const handlePhoneSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/local/tasks');
    }, 1000);
  };

  const getFieldStatus = (name: string) => {
    if (!touched[name]) return 'default';
    if (errors[name]) return 'error';
    if (formData[name as keyof typeof formData]) return 'success';
    return 'default';
  };

  const inputClassName = (name: string) => {
    const status = getFieldStatus(name);
    const baseClasses = "w-full px-4 py-3 border rounded-lg transition-all pr-10";
    
    if (status === 'error') {
      return `${baseClasses} border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent bg-red-50`;
    }
    if (status === 'success') {
      return `${baseClasses} border-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50`;
    }
    return `${baseClasses} border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Trust Messaging & Benefits */}
            <div className="lg:sticky lg:top-24">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Join Locals.com Today
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Start earning by verifying locations in your city. Quick setup, flexible hours, and reliable income.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Why Join Locals.com?
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Verified & Secure</h4>
                      <p className="text-sm text-gray-600">
                        Your data is encrypted and protected. We never share your personal information.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Quick Approval</h4>
                      <p className="text-sm text-gray-600">
                        Get approved within 24-48 hours after ID verification. Start earning immediately.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Flexible Schedule</h4>
                      <p className="text-sm text-gray-600">
                        Work when you want, where you want. Complete tasks on your own time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Guaranteed Payments</h4>
                      <p className="text-sm text-gray-600">
                        Earn ₹150-300 per task. Weekly payouts directly to your bank account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">2,400+</div>
                  <div className="text-xs text-gray-600">Active Verifiers</div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">₹2.5L+</div>
                  <div className="text-xs text-gray-600">Paid Monthly</div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">4.8★</div>
                  <div className="text-xs text-gray-600">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600">Fill in your details to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Profile Photo Upload */}
                <div className="flex justify-center pb-4 border-b border-gray-200">
                  <PhotoUpload
                    label="Profile Photo"
                    helperText="Upload a photo to verify your identity"
                    size="md"
                    onImageChange={(file) => setProfilePhoto(file)}
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block font-medium text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="Enter your full name"
                      className={inputClassName('fullName')}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {getFieldStatus('fullName') === 'success' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {getFieldStatus('fullName') === 'error' && (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      {getFieldStatus('fullName') === 'default' && (
                        <User className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {touched.fullName && errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-medium text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="your.email@example.com"
                      className={inputClassName('email')}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {getFieldStatus('email') === 'success' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {getFieldStatus('email') === 'error' && (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      {getFieldStatus('email') === 'default' && (
                        <Mail className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block font-medium text-gray-900 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="Enter 10-digit mobile number"
                      className={inputClassName('phone')}
                      maxLength={10}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {getFieldStatus('phone') === 'success' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {getFieldStatus('phone') === 'error' && (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      {getFieldStatus('phone') === 'default' && (
                        <Phone className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block font-medium text-gray-900 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      placeholder="Create a strong password"
                      className={inputClassName('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                  <div className="mt-2 space-y-1">
                    <p className={`text-xs flex items-center gap-1 ${
                      formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        formData.password.length >= 8 ? 'bg-green-600' : 'bg-gray-400'
                      }`} />
                      At least 8 characters
                    </p>
                    <p className={`text-xs flex items-center gap-1 ${
                      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password) ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password) ? 'bg-green-600' : 'bg-gray-400'
                      }`} />
                      Include uppercase, lowercase, and number
                    </p>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block font-medium text-gray-900 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      placeholder="Re-enter your password"
                      className={inputClassName('confirmPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                  {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
                    <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Passwords match
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900">
                      I agree to the{' '}
                      <button type="button" className="text-blue-600 hover:text-blue-700 underline font-medium">
                        Terms & Conditions
                      </button>{' '}
                      and{' '}
                      <button type="button" className="text-blue-600 hover:text-blue-700 underline font-medium">
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                  {touched.terms && errors.terms && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.terms}
                    </p>
                  )}
                </div>

                {/* Primary Sign Up Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.02] disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Or sign up with</span>
                </div>
              </div>

              {/* Secondary Options */}
              <div className="space-y-3">
                {/* Google Sign Up */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 disabled:bg-gray-100 border border-gray-300 hover:border-gray-400 text-gray-700 py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-3 hover:shadow-md disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </button>

                {/* Phone OTP Sign Up */}
                <button
                  type="button"
                  onClick={handlePhoneSignUp}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 disabled:bg-gray-100 border border-gray-300 hover:border-gray-400 text-gray-700 py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-3 hover:shadow-md disabled:cursor-not-allowed"
                >
                  <Smartphone className="w-5 h-5 text-green-600" />
                  Sign up with Phone OTP
                </button>
              </div>

              {/* Sign In Link */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/local/login')}
                    className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 mb-1">Your data is safe with us</p>
                  <p className="text-xs text-gray-600">
                    We use bank-level encryption to protect your personal information. Your data will never be shared without your consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}