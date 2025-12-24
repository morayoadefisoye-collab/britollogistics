import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbNames = {
    'about': 'About Us',
    'what-we-sell': 'What We Sell',
    'wholesale': 'Wholesale & Retail',
    'testimonials': 'Testimonials',
    'contact': 'Contact',
    'shipping': 'Delivery',
    'returns': 'Returns & Exchange',
    'faq': 'FAQ',
    'track-order': 'Track Order',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'cart': 'Shopping Cart',
    'checkout': 'Checkout'
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumb-list">
          <li>
            <Link to="/">
              <Home size={16} />
              <span>Home</span>
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbNames[name] || name;

            return (
              <li key={name}>
                <ChevronRight size={16} className="breadcrumb-separator" />
                {isLast ? (
                  <span className="breadcrumb-current">{displayName}</span>
                ) : (
                  <Link to={routeTo}>{displayName}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumb;
