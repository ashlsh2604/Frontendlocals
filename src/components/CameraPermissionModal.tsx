import { useState } from 'react';
import { Camera, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface CameraPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
  onDeny: () => void;
}

export function CameraPermissionModal({ isOpen, onClose, onAllow, onDeny }: CameraPermissionModalProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  if (!isOpen) return null;

  const handleAllow = async () => {
    setIsRequesting(true);
    
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Stop the stream immediately - we just needed permission
      stream.getTracks().forEach(track => track.stop());
      
      setTimeout(() => {
        setIsRequesting(false);
        onAllow();
      }, 500);
    } catch (error) {
      // Handle different types of permission errors gracefully
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          // User explicitly denied permission - this is expected behavior
          console.info('Camera permission denied by user');
        } else if (error.name === 'NotFoundError') {
          // No camera available
          console.info('No camera device found');
        } else if (error.name === 'NotReadableError') {
          // Camera is in use by another application
          console.info('Camera is currently in use');
        } else {
          // Other errors
          console.info('Camera access error:', error.name);
        }
      }
      setIsRequesting(false);
      onDeny();
    }
  };

  const handleDeny = () => {
    onDeny();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header with Camera Icon */}
          <div className="text-center pt-10 pb-6 px-8">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                {/* Animated rings */}
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
                
                {/* Camera icon container */}
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-3xl shadow-lg shadow-blue-600/30">
                  <Camera className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Camera Access Required
            </h2>
            <p className="text-gray-600 leading-relaxed">
              LOCALS needs access to your camera to capture verification photos in real-time
            </p>
          </div>

          {/* Why We Need This Section */}
          <div className="px-8 pb-6">
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <div className="flex items-start gap-3 mb-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-1">Why we need this:</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Take verification photos directly from the app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Ensure photos are authentic and timestamped</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Speed up the verification process</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="px-8 pb-6">
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                We respect your privacy. Photos are only captured when you explicitly tap the camera button. We never access your camera without your knowledge.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 pb-8 flex flex-col gap-3">
            <button
              onClick={handleAllow}
              disabled={isRequesting}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/50 hover:scale-[1.02] disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isRequesting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Requesting Access...</span>
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  <span>Allow Camera Access</span>
                </>
              )}
            </button>

            <button
              onClick={handleDeny}
              disabled={isRequesting}
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              Not Now
            </button>
          </div>

          {/* Help Text */}
          <div className="px-8 pb-6 text-center">
            <p className="text-xs text-gray-500">
              You can change camera permissions anytime in your browser settings
            </p>
          </div>
        </div>
      </div>
    </>
  );
}