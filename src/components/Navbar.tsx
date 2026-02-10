import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { MapPin, Search, LayoutDashboard, PenSquare, Menu, X, Home, Camera } from 'lucide-react';
import { CameraPermissionModal } from './CameraPermissionModal';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleCameraAllow = () => {
    setCameraPermissionGranted(true);
    setIsCameraModalOpen(false);
  };

  const handleCameraDeny = () => {
    setCameraPermissionGranted(false);
    setIsCameraModalOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home, primary: false },
    { path: '/request', label: 'Search', icon: Search, primary: false },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, primary: false },
    { path: '/add-review', label: 'Add Review', icon: PenSquare, primary: false },
  ];

  return (
    <>
      <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Primary Hierarchy */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-all group-hover:scale-110">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-gray-900 tracking-tight">LOCALS</span>
                <span className="text-[10px] text-blue-600 font-semibold -mt-1">VERIFIED PLACES</span>
              </div>
            </Link>
            
            {/* Desktop Navigation - Secondary Hierarchy */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all
                      ${active 
                        ? 'bg-blue-50 text-blue-700 shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Camera Button */}
              <button
                onClick={() => setIsCameraModalOpen(true)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all relative
                  ${cameraPermissionGranted 
                    ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  }
                `}
                title={cameraPermissionGranted ? 'Camera access granted' : 'Enable camera access'}
              >
                <Camera className={`w-4 h-4 ${cameraPermissionGranted ? 'text-green-600' : 'text-purple-600'}`} />
                <span className="text-sm">Camera</span>
                {cameraPermissionGranted && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-300">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                        ${active 
                          ? 'bg-blue-50 text-blue-700 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Mobile Camera Button */}
                <button
                  onClick={() => {
                    setIsCameraModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all relative
                    ${cameraPermissionGranted 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-purple-50 text-purple-700'
                    }
                  `}
                >
                  <Camera className={`w-5 h-5 ${cameraPermissionGranted ? 'text-green-600' : 'text-purple-600'}`} />
                  <span>{cameraPermissionGranted ? 'Camera Enabled' : 'Enable Camera'}</span>
                  {cameraPermissionGranted && (
                    <div className="absolute top-3 left-8 w-2 h-2 bg-green-500 rounded-full" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Camera Permission Modal */}
      <CameraPermissionModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onAllow={handleCameraAllow}
        onDeny={handleCameraDeny}
      />
    </>
  );
}