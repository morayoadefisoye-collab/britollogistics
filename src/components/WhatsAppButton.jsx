import { MessageCircle } from 'lucide-react';

function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2348102505875?text=Hello%20Everything%20By%20Britol!%20I%20would%20like%20to%20inquire%20about%20your%20products.', '_blank');
  };

  return (
    <button 
      className="whatsapp-float"
      onClick={handleWhatsAppClick}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
}

export default WhatsAppButton;
