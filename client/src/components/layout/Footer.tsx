import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';

export default function Footer() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-2xl font-bold font-poppins flex items-center">
              <span className="text-gold">Aka</span>
              <span className="text-white">.dev</span>
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Aka. {t('footer.rights')}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {t('footer.createdWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
