import React from 'react';
import { Helmet } from 'react-helmet';
import { useAppContext } from '../context/AppContext';

const SEO = ({ title, description, keywords, image }) => {
  const { language, translations } = useAppContext();
  const langTranslations = translations[language];

  return (
    <Helmet>
      <title>{title || langTranslations.seo.title}</title>
      <meta name="description" content={description || langTranslations.seo.description} />
      <meta name="keywords" content={keywords || langTranslations.seo.keywords} />
      <meta property="og:title" content={title || langTranslations.seo.og.title} />
      <meta property="og:description" content={description || langTranslations.seo.og.description} />
      <meta property="og:image" content={image || "url-to-default-image.jpg"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
    </Helmet>
  );
};

export default SEO;