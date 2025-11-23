'use client';

import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
}

export function SEOHead({ title, description, keywords, canonicalPath }: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | RiderGuy`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
    
    // Update meta keywords
    if (keywords && keywords.length > 0) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      const keywordsContent = keywords.join(', ');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywordsContent);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = keywordsContent;
        document.head.appendChild(meta);
      }
    }
    
    // Update canonical link
    if (canonicalPath) {
      const canonical = document.querySelector('link[rel="canonical"]');
      const canonicalUrl = `https://riderguy.app${canonicalPath}`;
      if (canonical) {
        canonical.setAttribute('href', canonicalUrl);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonicalUrl;
        document.head.appendChild(link);
      }
    }
    
    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      const ogTag = document.querySelector(`meta[property="${property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };
    
    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    if (canonicalPath) {
      updateOGTag('og:url', `https://riderguy.app${canonicalPath}`);
    }
    
    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      const twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };
    
    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);
  }, [title, description, keywords, canonicalPath]);
  
  return null; // This component doesn't render anything
}
