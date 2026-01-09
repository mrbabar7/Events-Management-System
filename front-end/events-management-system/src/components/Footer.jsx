const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8 text-center">
      <p>&copy; {new Date().getFullYear()} MR.BABAR. All rights reserved.</p>
      <div className="flex justify-center mt-3 space-x-4">
        <a href="#" className="hover:text-indigo-400">
          Facebook
        </a>
        <a href="#" className="hover:text-indigo-400">
          LinkedIn
        </a>
        <a href="#" className="hover:text-indigo-400">
          GitHub
        </a>
      </div>
    </div>
  );
};
export default Footer;
