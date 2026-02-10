export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-white mb-4">LOCALS.COM</h3>
            <p className="text-sm">
              Verify hotels, schools, and neighborhoods with trusted locals.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">How it Works</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Trust & Safety</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">For Locals</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Become a Verifier</a></li>
              <li><a href="#" className="hover:text-white">Earnings</a></li>
              <li><a href="#" className="hover:text-white">Guidelines</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2026 Locals.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
