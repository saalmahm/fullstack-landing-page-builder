import React, { useState } from 'react';
import { Copy, Check, ArrowLeft } from 'lucide-react';

export default function CodeView({ components, theme, onBack }) {
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    const imports = `import React from 'react';

const LandingPage = () => {`;

    const componentCode = components.map(component => {
      switch (component.type) {
        case 'header':
          return generateHeaderCode(component.content, theme);
        case 'hero':
          return generateHeroCode(component.content, theme);
        case 'features':
          return generateFeaturesCode(component.content, theme);
        case 'testimonials':
          return generateTestimonialsCode(component.content, theme);
        case 'cta':
          return generateCTACode(component.content, theme);
        case 'footer':
          return generateFooterCode(component.content, theme);
        default:
          return '';
      }
    }).join('\n\n');

    const closing = `
  );
};

export default LandingPage;`;

    return imports + '\n  return (\n    <div>\n' + componentCode + '\n    </div>' + closing;
  };

  const generateHeaderCode = (data, theme) => {
    return `      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="text-2xl font-bold" style={{ color: '${theme.primaryColor}' }}>
                ${data.logo}
              </span>
            </div>
            <nav className="hidden md:flex space-x-10">
              ${data.navigation.map(item => `<a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">${item}</a>`).join('\n              ')}
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <button className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white" style={{ backgroundColor: '${theme.primaryColor}' }}>
                ${data.ctaText}
              </button>
            </div>
          </div>
        </div>
      </header>`;
  };

  const generateHeroCode = (data, theme) => {
    return `      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">${data.title}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  ${data.subtitle}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10" style={{ backgroundColor: '${theme.primaryColor}' }}>
                      ${data.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="${data.image}" alt="Hero" />
        </div>
      </section>`;
  };

  const generateFeaturesCode = (data, theme) => {
    return `      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold tracking-wide uppercase" style={{ color: '${theme.primaryColor}' }}>
              ${data.title}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              ${data.subtitle}
            </p>
          </div>
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              ${data.features.map(feature => `<div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white" style={{ backgroundColor: '${theme.primaryColor}' }}>
                  {/* Icon ${feature.icon} */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">${feature.title}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">${feature.description}</p>
              </div>`).join('\n              ')}
            </div>
          </div>
        </div>
      </section>`;
  };

  const generateTestimonialsCode = (data, theme) => {
    return `      {/* Testimonials Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">${data.title}</h2>
            <p className="mt-4 text-lg text-gray-600">${data.subtitle}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            ${data.testimonials.map(testimonial => `<div className="bg-white rounded-lg shadow px-6 py-8">
              <div className="flex items-center">
                <img className="h-12 w-12 rounded-full" src="${testimonial.avatar}" alt="${testimonial.name}" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">${testimonial.name}</div>
                  <div className="text-sm text-gray-500">${testimonial.role}</div>
                </div>
              </div>
              <blockquote className="mt-4">
                <p className="text-base text-gray-600">"${testimonial.content}"</p>
              </blockquote>
            </div>`).join('\n            ')}
          </div>
        </div>
      </section>`;
  };

  const generateCTACode = (data, theme) => {
    return `      {/* CTA Section */}
      <section className="py-12" style={{ backgroundColor: '${theme.primaryColor}' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">${data.title}</h2>
            <p className="mt-4 text-lg text-indigo-100">${data.subtitle}</p>
            <div className="mt-8 flex justify-center space-x-4">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-50">
                ${data.primaryText}
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-gray-900">
                ${data.secondaryText}
              </button>
            </div>
          </div>
        </div>
      </section>`;
  };

  const generateFooterCode = (data, theme) => {
    return `      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <span className="text-2xl font-bold text-white">${data.logo}</span>
              <p className="text-gray-300 text-base">${data.description}</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              ${Object.entries(data.links).map(([category, links]) => `<div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">${category}</h3>
                <ul className="mt-4 space-y-4">
                  ${links.map(link => `<li><a href="#" className="text-base text-gray-300 hover:text-white">${link}</a></li>`).join('\n                  ')}
                </ul>
              </div>`).join('\n              ')}
            </div>
          </div>
        </div>
      </footer>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-full">
      {/* Header avec boutons */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Retour</span>
        </button>

        <h2 className="text-lg font-semibold text-white">Code Généré</h2>

        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            copied 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          <span className="text-sm">{copied ? 'Copié!' : 'Copier'}</span>
        </button>
      </div>

      {/* Contenu du code */}
      <div className="flex-1 overflow-auto">
        <pre className="p-6 text-sm text-gray-300">
          <code>{generateCode()}</code>
        </pre>
      </div>
    </div>
  );
}