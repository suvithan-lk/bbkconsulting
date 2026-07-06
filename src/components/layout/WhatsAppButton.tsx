import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '97141234567';
const WHATSAPP_MESSAGE = 'Hello BBK Consultancy, I would like to know more about your services.';

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
      <motion.span
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/20"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-white"
          aria-hidden="true"
        >
          <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.386.628 4.62 1.822 6.554L4 29l7.633-1.79A11.94 11.94 0 0 0 16 27.001C22.628 27.001 28 21.63 28 15.001 28 8.373 22.628 3 16.001 3zm0 21.9a9.87 9.87 0 0 1-5.031-1.372l-.36-.213-4.53 1.063 1.084-4.415-.235-.373A9.86 9.86 0 0 1 5.1 15.001C5.1 8.98 9.98 4.1 16.001 4.1S26.9 8.98 26.9 15.001c0 6.02-4.88 9.899-10.899 9.899zm5.516-7.42c-.302-.152-1.788-.883-2.065-.984-.278-.101-.48-.152-.682.152-.202.303-.783.984-.96 1.187-.177.202-.353.227-.655.076-.303-.152-1.277-.471-2.432-1.502-.899-.802-1.507-1.792-1.684-2.095-.177-.303-.019-.467.133-.618.137-.136.303-.354.454-.531.152-.177.202-.303.303-.505.101-.202.05-.379-.025-.531-.076-.152-.682-1.646-.934-2.253-.246-.591-.497-.511-.682-.52l-.581-.01c-.202 0-.531.076-.808.379-.278.303-1.06 1.036-1.06 2.53 0 1.494 1.085 2.937 1.236 3.14.152.202 2.134 3.258 5.169 4.568.722.312 1.286.498 1.725.637.725.23 1.384.198 1.905.12.581-.087 1.788-.731 2.04-1.436.253-.706.253-1.31.177-1.436-.075-.127-.278-.202-.58-.354z" />
        </svg>
      </motion.span>
    </a>
  );
}
