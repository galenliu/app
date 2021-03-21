import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import enTrans from "./en-us.json"
import zhTrans from "./zh-cn.json"


// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: enTrans,
    },
    zh: {
        translation: zhTrans,
    }
};

// i18n.use(LanguageDetector) //嗅探当前浏览器语言
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
            resources: {
                en: {
                    translation: enTrans,
                },
                zh: {
                    translation: zhTrans,
                },
            },
            keySeparator: true, // we do not use keys in form messages.welcome

            interpolation: {
                escapeValue: false // react already safes from xss
            }
        }
    ).catch((e) => {
    console.log(e)
});

export default i18n;
