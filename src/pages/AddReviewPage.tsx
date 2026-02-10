import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PhotoUploadWithLocation } from '../components/PhotoUploadWithLocation';
import { Star, MapPin, Upload, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';

export function AddReviewPage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    placeName: '',
    placeType: '',
    city: '',
    address: '',
    review: '',
  });
  const [photos, setPhotos] = useState<(File | null)[]>([null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const placeTypes = [
    { value: 'hotel', label: 'Hotel', icon: '🏨' },
    { value: 'school', label: 'School', icon: '🏫' },
    { value: 'neighborhood', label: 'Neighborhood', icon: '🏘️' },
    { value: 'pg', label: 'PG/Hostel', icon: '🏢' },
    { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { value: 'other', label: 'Other', icon: '📍' },
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 
    'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Gurgaon'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handlePhotoChange = (index: number, file: File | null) => {
    const newPhotos = [...photos];
    newPhotos[index] = file;
    setPhotos(newPhotos);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Add Your Review
            </h1>
            <p className="text-lg text-gray-600">
              Share your experience and help others make informed decisions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-8">
            {/* Place Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                Place Information
              </h2>

              {/* Place Name */}
              <div>
                <label className="block font-medium text-gray-900 mb-2">
                  Place Name *
                </label>
                <input
                  type="text"
                  value={formData.placeName}
                  onChange={(e) => setFormData({ ...formData, placeName: e.target.value })}
                  placeholder="e.g., Sunrise Grand Hotel"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Place Type & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-900 mb-2">
                    Place Type *
                  </label>
                  <select
                    value={formData.placeType}
                    onChange={(e) => setFormData({ ...formData, placeType: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select type</option>
                    {placeTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block font-medium text-gray-900 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g., 123 Main Street, Andheri West"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                Your Rating
              </h2>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-4 text-lg font-semibold text-gray-700">
                    {rating}.0 / 5.0
                  </span>
                )}
              </div>
              {rating === 0 && (
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Please select a rating
                </p>
              )}
            </div>

            {/* Review Text */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Review
              </h2>
              <textarea
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                placeholder="Share your detailed experience... What did you like? What could be improved?"
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
              <p className="mt-2 text-sm text-gray-500">
                Minimum 50 characters ({formData.review.length}/50)
              </p>
            </div>

            {/* Photos */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-6 h-6 text-purple-600" />
                Add Photos
              </h2>
              <p className="text-gray-600 mb-6">
                Upload up to 3 photos to support your review
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((index) => (
                  <PhotoUploadWithLocation
                    key={index}
                    label={`Photo ${index + 1}`}
                    helperText={index === 0 ? "Primary photo" : "Additional photo"}
                    size="md"
                    required={index === 0}
                    onImageChange={(file) => handlePhotoChange(index, file)}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || rating === 0 || formData.review.length < 50}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/50 hover:scale-105 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Review Guidelines
            </h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Be honest and specific about your experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Include relevant details about location, service, and facilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Upload clear, recent photos to support your review</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Avoid offensive language or personal attacks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}