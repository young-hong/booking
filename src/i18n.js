import React, { Component } from 'react'
import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { useTranslation, initReactI18next } from 'react-i18next'
import en from './locales/en-US/translation.json'
import zh from './locales/zh-CN/translation.json'


i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them)
    resources: {
      en:{
        translation: en
      },
      zh:{
        translation: zh
      }
    },
    lng: 'zh',
    fallbackLng: 'zh',

    interpolation: {
      escapeValue: false
    }
  });


export default i18n