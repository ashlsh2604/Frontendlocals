import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload, Check, X, MapPin, Navigation, AlertCircle, CheckCircle, Video } from 'lucide-react';

interface PhotoUploadWithLocationProps {
  label: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  onImageChange?: (file: File | null, coordinates: GeolocationCoordinates | null) => void;
  expectedLocation?: {
    latitude: number;
    longitude: number;
    name: string;
  };
  maxDistance?: number; // Maximum distance in meters to consider valid
}

interface LocationValidation {
  isValid: boolean;
  distance: number; // in meters
  userLocation: GeolocationCoordinates | null;
}

export function PhotoUploadWithLocation({
  label,
  helperText,
  size = 'md',
  required = false,
  onImageChange,
  expectedLocation,
  maxDistance = 100, // Default 100 meters
}: PhotoUploadWithLocationProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [locationValidation, setLocationValidation] = useState<LocationValidation | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Size configurations
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  // Get user's current location
  const getCurrentLocation = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          let errorMessage = 'Unable to get location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  // Validate location
  const validateLocation = async (userCoords: GeolocationCoordinates): Promise<LocationValidation> => {
    if (!expectedLocation) {
      return {
        isValid: true,
        distance: 0,
        userLocation: userCoords,
      };
    }

    const distance = calculateDistance(
      userCoords.latitude,
      userCoords.longitude,
      expectedLocation.latitude,
      expectedLocation.longitude
    );

    return {
      isValid: distance <= maxDistance,
      distance: Math.round(distance),
      userLocation: userCoords,
    };
  };

  // Open camera
  const openCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false,
      });
      
      setStream(mediaStream);
      setIsCameraOpen(true);
      
      // Wait for video element to be ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (error) {
      let errorMessage = 'Unable to access camera';
      let errorDetails = '';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          errorMessage = 'Camera permission denied';
          errorDetails = 'Please click the camera icon in your browser\'s address bar and allow camera access, then try again.';
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          errorMessage = 'No camera found';
          errorDetails = 'Please connect a camera or use the "Upload File" option instead.';
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          errorMessage = 'Camera is busy';
          errorDetails = 'Camera is already in use. Please close other applications using the camera and try again.';
        } else if (error.name === 'NotSupportedError') {
          errorMessage = 'HTTPS Required';
          errorDetails = 'Camera access requires a secure connection (HTTPS). Please use the "Upload File" option instead.';
        } else {
          errorDetails = error.message || 'Unknown error occurred';
        }
      }
      
      setCameraError(errorMessage + (errorDetails ? ': ' + errorDetails : ''));
      console.error('Camera error:', error);
    }
  };

  // Close camera
  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
    setCameraError(null);
  };

  // Capture photo from camera
  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsUploading(true);
    setLocationError(null);
    setLocationValidation(null);

    try {
      // Get current location
      setIsGettingLocation(true);
      const userLocation = await getCurrentLocation();
      setIsGettingLocation(false);

      // Validate location
      const validation = await validateLocation(userLocation);
      setLocationValidation(validation);

      // Capture image from video
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        // Convert canvas to blob and then to file
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            
            setPreview(imageUrl);
            setIsUploading(false);
            setUploadSuccess(true);
            closeCamera();
            
            onImageChange?.(file, userLocation);
          }
        }, 'image/jpeg', 0.95);
      }
    } catch (error) {
      setIsGettingLocation(false);
      setIsUploading(false);
      setLocationError(error instanceof Error ? error.message : 'Location error');
      console.error('Location error:', error);
    }
  };

  // Handle file selection with location check
  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setLocationError(null);
    setLocationValidation(null);

    try {
      // Get current location
      setIsGettingLocation(true);
      const userLocation = await getCurrentLocation();
      setIsGettingLocation(false);

      // Validate location
      const validation = await validateLocation(userLocation);
      setLocationValidation(validation);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsUploading(false);
        
        // Simulate upload
        setTimeout(() => {
          setUploadSuccess(true);
          onImageChange?.(file, userLocation);
        }, 500);
      };
      reader.readAsDataURL(file);

    } catch (error) {
      setIsGettingLocation(false);
      setIsUploading(false);
      setLocationError(error instanceof Error ? error.message : 'Location error');
      console.info('Location error:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    setUploadSuccess(false);
    setLocationValidation(null);
    setLocationError(null);
    setIsDemoMode(false);
    closeCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageChange?.(null, null);
  };

  // Demo mode - simulate photo with mock GPS (for testing when camera is blocked)
  const handleDemoMode = async () => {
    setIsUploading(true);
    setLocationError(null);
    setLocationValidation(null);
    setCameraError(null);
    setIsDemoMode(true);

    try {
      // Simulate getting location
      setIsGettingLocation(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock coordinates - either near the location or far away
      const isNearLocation = Math.random() > 0.5;
      let mockCoords: GeolocationCoordinates;
      
      if (expectedLocation && isNearLocation) {
        // Generate coordinates within 50m of expected location
        const latOffset = (Math.random() - 0.5) * 0.0005; // ~50m
        const lonOffset = (Math.random() - 0.5) * 0.0005;
        mockCoords = {
          latitude: expectedLocation.latitude + latOffset,
          longitude: expectedLocation.longitude + lonOffset,
          accuracy: 10,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        };
      } else if (expectedLocation) {
        // Generate coordinates far from expected location (1-5km away)
        const distance = 1000 + Math.random() * 4000; // 1-5km in meters
        const latOffset = (distance / 111320) * (Math.random() > 0.5 ? 1 : -1);
        const lonOffset = (distance / (111320 * Math.cos(expectedLocation.latitude * Math.PI / 180))) * (Math.random() > 0.5 ? 1 : -1);
        mockCoords = {
          latitude: expectedLocation.latitude + latOffset,
          longitude: expectedLocation.longitude + lonOffset,
          accuracy: 10,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        };
      } else {
        // No expected location, just use a random coordinate
        mockCoords = {
          latitude: 19.0760 + (Math.random() - 0.5) * 0.1,
          longitude: 72.8777 + (Math.random() - 0.5) * 0.1,
          accuracy: 10,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        };
      }

      setIsGettingLocation(false);

      // Validate the mock location
      const validation = await validateLocation(mockCoords);
      setLocationValidation(validation);

      // Create a mock image (placeholder)
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, 800, 600);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#8b5cf6');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 600);

        // Add text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('DEMO MODE', 400, 280);
        ctx.font = '20px sans-serif';
        ctx.fillText('Simulated Photo', 400, 320);
        ctx.font = '16px sans-serif';
        ctx.fillText(`📍 ${mockCoords.latitude.toFixed(6)}, ${mockCoords.longitude.toFixed(6)}`, 400, 360);

        // Convert to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `demo-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            
            setPreview(imageUrl);
            setIsUploading(false);
            setUploadSuccess(true);
            
            onImageChange?.(file, mockCoords);
          }
        }, 'image/jpeg', 0.95);
      }
    } catch (error) {
      setIsGettingLocation(false);
      setIsUploading(false);
      setLocationError(error instanceof Error ? error.message : 'Demo mode error');
    }
  };

  return (
    <div className="w-full">
      {/* Label */}
      <div className="mb-2 flex items-center justify-between">
        <label className="block font-medium text-gray-900">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
        {expectedLocation && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{expectedLocation.name}</span>
          </div>
        )}
      </div>

      {/* Camera View Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full">
            <button
              onClick={closeCamera}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video bg-gray-900">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {isGettingLocation && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full">
                    <Navigation className="w-4 h-4 animate-pulse" />
                    <span className="text-sm font-medium">Getting location...</span>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white">
                <button
                  onClick={capturePhoto}
                  disabled={isUploading || isGettingLocation}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
                >
                  <Camera className="w-6 h-6" />
                  {isUploading || isGettingLocation ? 'Capturing...' : 'Take Photo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Upload Container */}
      <div className="relative">
        <div
          className={`
            relative ${sizeClasses[size]} rounded-full
            border-4 transition-all duration-300
            ${isDragging ? 'border-blue-500 bg-blue-50 scale-105' : ''}
            ${preview && !uploadSuccess ? 'border-gray-300' : ''}
            ${uploadSuccess && locationValidation?.isValid ? 'border-green-500 bg-green-50' : ''}
            ${uploadSuccess && locationValidation && !locationValidation.isValid ? 'border-red-500 bg-red-50' : ''}
            ${!preview && !uploadSuccess ? 'border-dashed border-gray-300' : ''}
            overflow-hidden shadow-lg group
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Preview Image */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Camera Icon Overlay */}
          <div
            className={`
              absolute inset-0 flex items-center justify-center
              transition-all duration-300
              ${preview ? 'bg-black/0 group-hover:bg-black/60' : 'bg-gradient-to-br from-gray-100 to-gray-200'}
            `}
          >
            {isUploading || isGettingLocation ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                {isGettingLocation && (
                  <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                    <Navigation className="w-3 h-3 text-blue-600 animate-pulse" />
                    <span className="text-xs font-medium text-blue-600">Getting location...</span>
                  </div>
                )}
              </div>
            ) : uploadSuccess ? (
              <>
                {locationValidation?.isValid ? (
                  <div className={`${preview ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} transition-opacity flex flex-col items-center gap-1`}>
                    <CheckCircle className={`${iconSizes[size]} text-green-600`} />
                    <span className="text-xs font-bold text-green-600">Verified</span>
                  </div>
                ) : (
                  <div className={`${preview ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} transition-opacity flex flex-col items-center gap-1`}>
                    <AlertCircle className={`${iconSizes[size]} text-red-600`} />
                    <span className="text-xs font-bold text-red-600">Wrong Location</span>
                  </div>
                )}
              </>
            ) : (
              <div className="opacity-100">
                <Camera className={`${iconSizes[size]} text-gray-500`} />
              </div>
            )}
          </div>

          {/* Remove Button */}
          {preview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        {!preview && !isUploading && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={openCamera}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <Video className="w-4 h-4" />
              <span className="text-sm">Open Camera</span>
            </button>
            <button
              onClick={handleUploadClick}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm">Upload File</span>
            </button>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          required={required}
        />
      </div>

      {/* Helper Text & Validation Info */}
      <div className="mt-2 space-y-1">
        {helperText && !locationValidation && !locationError && !cameraError && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}

        {/* Camera Error */}
        {cameraError && (
          <div className="flex flex-col gap-3 bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-red-900">Camera Access Failed</p>
                <p className="text-sm text-red-700 mt-1">{cameraError}</p>
              </div>
            </div>
            
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
              <p className="text-xs font-semibold text-yellow-900 mb-2">🔍 Need help? Run diagnostics:</p>
              <a
                href="/diagnostics"
                target="_blank"
                className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-4 py-2 rounded-md inline-flex items-center gap-2 transition-all"
              >
                Open Camera Diagnostics Tool
                <span className="text-lg">→</span>
              </a>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCameraError(null);
                  openCamera();
                }}
                className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all"
              >
                Try Again
              </button>
              <button
                onClick={handleDemoMode}
                className="flex-1 text-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all"
              >
                ✨ Demo Mode
              </button>
            </div>
            <p className="text-[10px] text-gray-600 text-center">
              Demo Mode simulates photo upload with mock GPS data - no camera needed!
            </p>
          </div>
        )}

        {/* Location Error */}
        {locationError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-red-900">Location Error</p>
              <p className="text-xs text-red-700">{locationError}</p>
            </div>
          </div>
        )}

        {/* Location Validation Success */}
        {locationValidation && locationValidation.isValid && (
          <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-green-900">Location Verified</p>
              <p className="text-xs text-green-700">
                {locationValidation.distance}m from {expectedLocation?.name || 'target location'}
              </p>
              <div className="mt-1 text-[10px] text-green-600">
                📍 {locationValidation.userLocation?.latitude.toFixed(6)}, {locationValidation.userLocation?.longitude.toFixed(6)}
              </div>
            </div>
          </div>
        )}

        {/* Location Validation Failure */}
        {locationValidation && !locationValidation.isValid && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-red-900">Location Mismatch</p>
              <p className="text-xs text-red-700">
                You are {locationValidation.distance}m away from {expectedLocation?.name}
              </p>
              <p className="text-xs text-red-600 mt-1">
                Required: Within {maxDistance}m • Actual: {locationValidation.distance}m
              </p>
            </div>
          </div>
        )}

        {/* Expected Location Info */}
        {expectedLocation && !locationValidation && !locationError && !isUploading && !cameraError && (
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-2">
            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-blue-900">Location Check Required</p>
              <p className="text-xs text-blue-700">
                Photo must be taken within {maxDistance}m of location
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}