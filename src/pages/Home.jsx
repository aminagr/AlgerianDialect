import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAppContext } from '../context/AppContext';

import '../styles/Home.css';
import SEO from '../components/SEO';

import useSearch from '../hooks/useSearch';
const translations = {
  fr: {
    search: {
      placeholder: "Recherchez un mot...",
      noResultsFound: "Aucun résultat trouvé",
    },
    seo: {
      title: "Apprendre le dialecte algérien gratuitement en ligne",
      description: "Apprenez les bases du dialecte algérien arabe facilement, gratuitement, sans inscritpion préalable. Traduisez les mots et les expressions algériennes, recherchez dans le dictionnaire, et testez vos connaissances avec des quiz de dialecte algérien amusants. Application disponible en 6 langues, en arabe, français, anglais, espagnol, italien et russe.",
      keywords: "darija algerienne, apprendre darija, dialecte algérien, apprendre le dialecte algérien, leçon d'arabe, cours gratuits, cours en ligne, langue algérienne, apprendre l'algérien, dialecte arabe, dictionnaire algérien français, traduction algérien, vocabulaire algérien, quiz algérien, dictionnaire français algerien ",
    },
  },
  en: {
    search: {
      placeholder: "Search for a word...",
      noResultsFound: "No results found",
    },
    seo: {
      title: "Learn Algerian dialect online for free",
      description: "Learn the basics of Algerian Arabic dialect easily, for free, without prior registration. Translate Algerian words and expressions, search in the dictionary, and test your knowledge with fun Algerian dialect quizzes. The app is available in 6 languages: Arabic, French, English, Spanish, Italian, and Russian.", 
      keywords: "learn darija, algerian language, algerian language courses, free algerian courses, free, online courses, algerian courses, learn algerian dialect, learn algerian language, algerian quiz, algerian dictionary, algerian english dictionary, learn arabic dialect, algerian vocabulary, translate algerian dialect, algerian, algeria, algerian darija, algerian darja, darija",
    },
  },
  es: {
    search: {
      placeholder: "Busca una palabra argelina o española...",
      noResultsFound: "No se encontraron resultados",
    },
    seo: {
      title: "Aprender el dialecto argelino gratis en línea",
      description: "Aprende las bases del dialecto árabe argelino fácilmente, gratis, sin necesidad de registro previo. Traduce palabras y expresiones argelinas, utiliza el diccionario y pon a prueba tus conocimientos con divertidos cuestionarios sobre el dialecto argelino. La aplicación está disponible en 6 idiomas: árabe, francés, inglés, español, italiano y ruso.",
      keywords: "aprender darija, idioma argelino, cursos de idioma argelino, cursos argelinos gratuitos, gratis, cursos en línea, cursos argelinos, aprender dialecto argelino, aprender idioma argelino, cuestionario argelino, diccionario argelino, diccionario español arabe argelino, aprender dialecto árabe, vocabulario argelino, traducir dialecto argelino, argelino, Argelia, darija argelina, darja argelina, darija",
    },
  },
  it: {
    search: {
      placeholder: "Cerca una parola algerina o italiana...",
      noResultsFound: "Nessun risultato trovato",
    },
    seo: {
      title: "Imparare il dialetto algerino gratuitamente online",
      description: "Impara le basi del dialetto arabo algerino facilmente, gratis, senza registrazione preventiva. Traduci parole ed espressioni algerine, utilizza il dizionario e metti alla prova le tue conoscenze con divertenti quiz sul dialetto algerino. L'app è disponibile in 6 lingue: arabo, francese, inglese, spagnolo, italiano e russo.",
      keywords: "imparare darija, lingua algerina, corsi di lingua algerina, corsi algerini gratuiti, gratis, corsi online, corsi algerini, imparare il dialetto algerino, imparare la lingua algerina, quiz algerino, dizionario algerino, dizionario italiano arabo algerino, imparare il dialetto arabo, vocabolario algerino, tradurre il dialetto algerino, algerino, Algeria, darija algerina, darja algerina, darija",
    },
  },
  ru: {
    search: {
      placeholder: "Поиск алжирский или русский...",
      noResultsFound: "Результатов не найдено",
    },
    seo: {
      title: "Алжирский диалект онлайн бесплатно",
      description: "Изучите основы алжирского арабского диалекта легко, бесплатно, без предварительной регистрации. Переводите алжирские слова и выражения, используйте словарь и проверяйте свои знания с помощью увлекательных викторин по алжирскому диалекту. Приложение доступно на 6 языках: арабском, французском, английском, испанском, итальянском и русском.",
      keywords: "изучение дариджи, алжирский язык, курсы алжирского языка, бесплатные алжирские курсы, бесплатно, онлайн-курсы, алжирские курсы, изучение алжирского диалекта, изучение алжирского языка, алжирская викторина, алжирский словарь, алжирский арабско русский словарь, изучение арабского диалекта, алжирский словарный запас, перевод алжирского диалекта, алжирец, Алжир, алжирская дариджа, алжирская дарджа, дариджа",
    },
  },
  ar: {
    search: {
      placeholder: "ابحث عن كلمة...",
      noResultsFound: "لم يتم العثور على نتائج",
    },
    seo: {
      title: "تعلم اللهجة الجزائرية عبر الانترنت مجانا",
      description: "تعلم أساسيات اللهجة العربية الجزائرية بسهولة، مجانا، بدون تسجيل مسبق. ترجم الكلمات والتعابير الجزائرية، استخدم القاموس واختبر معلوماتك مع أسئلة ممتعة حول اللهجة الجزائرية. الموقع متاح ب 6 لغات: العربية، الفرنسية، الانجليزية، الاسبانية، الايطالية، والروسية.",
      keywords: "تعلم الدارجة، اللغة الجزائرية، دروس اللهجة الجزائرية، دروس جزائرية مجانية، مجاني، دورات عبر الانترنت، دروس جزائرية، تعلم اللهجة الجزائرية، تعلم اللغة الجزائرية، أسئلة جزائرية، قاموس جزائري، قاموس عربي جزائري، تعلم اللهجة العربية، مفردات جزائرية، ترجمة اللهجة الجزائرية، فهم اللهجة الجزائرية،  جزائري، الجزائر، دارجة جزائرية، دارجة، دارجة"
  },  
  },
};

const Home = () => {
  const { language, translations: appTranslations } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useSearch(searchTerm);

  return (
    <div className="home">
      <SEO 
        title={translations[language].seo.title}
        description={translations[language].seo.description}
        keywords={translations[language].seo.keywords}
        image="url-to-default-image.jpg"
      />
      <div className="search-bar">
        <div className="input-container">
          <input 
            type="text" 
            placeholder={translations[language].search.placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="search-icon" 
            onClick={() => setSearchTerm(searchTerm)} 
          >
            🔍
          </button>
        </div>
      </div>

      {searchTerm && (
        searchResults.length > 0 ? (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <div 
                key={index} 
                className="search-result" 
                onClick={() => navigate(`/courses/${result.courseId}/${result.lesson.id}`)}
              >
                <strong>{result.lesson.word.dz}</strong>: {result.lesson.word[language]}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">{translations[language].search.noResultsFound}</div>
        )
      )}

      {searchResults.length === 0 && !searchTerm && (
        <div className="hero-content">
          <h1 className="hero-title">{appTranslations[language].heroTitle}</h1>
          <p className="hero-subtitle">{appTranslations[language].heroSubtitle}</p>
          <div className="button-container">
            <Link to="/courses" className="card-button courses-button">
              {appTranslations[language].coursesButton}
            </Link>
            <Link to="/quiz" className="card-button quizzes-button">
              {appTranslations[language].quizzesButton}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;