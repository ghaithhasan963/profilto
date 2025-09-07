import { socialImgs } from "../constants";

const Footer = () => {
  const socials = [
    {
      name: "Facebook",
      img: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg",
      url: "https://www.facebook.com/ghaith.hasan.272500",
      hoverColor: "hover:bg-[#1877F2]",
    },
    {
      name: "Instagram",
      img: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
      url: "https://www.instagram.com/ghaith___963?igsh=djNOGH6N1jZ2Vv",
      hoverColor: "hover:bg-[#E4405F]",
    },
    {
      name: "GitHub",
      img: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg",
      url: "https://github.com/ghaithhasan",
      hoverColor: "hover:bg-gray-700",
    },
    {
      name: "Mostaql",
      img: "https://mostaql.hsoubcdn.com/public/img/mostaql-logo.svg",
      url: "https://mostaql.com/u/Ghaith5996",
      hoverColor: "hover:bg-[#2CA4AB]",
    },
  ];

  return (
    <footer className="bg-black/90 text-white py-8 mt-16 border-t border-white/10">
      <div className="footer-container flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Terms */}
        <div className="flex flex-col justify-center">
          <p className="cursor-pointer hover:text-cyan-400 transition-colors">
            Terms & Conditions
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`w-10 h-10 rounded-full flex items-center justify-center bg-white p-2 transition-all duration-300 transform hover:scale-125 active:scale-95 ${social.hoverColor}`}
            >
              <img
                src={social.img}
                alt={social.name}
                className="w-5 h-5"
              />
            </a>
          ))}
        </div>

        {/* حقوق النشر */}
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end text-gray-400">
            © {new Date().getFullYear()} Ghaith Hasan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
