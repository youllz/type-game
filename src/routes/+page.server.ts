import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({cookies, fetch}) => {

  interface Language {
  name: string;
  words: string[];
}

interface Data {
  english: Language;
  espagnol: Language;
}

  
  const language = cookies.get('language')

  // let words:Data

  if(!language) {
    try {
      const response = await fetch('/api/words/english')
       let   words = await response.json()
      return {
        wordData: {
          message: {
            text: response.statusText,
            stattus: response.status
          },
          name: "english",
          words,
        }
      }
    } catch (err) {
      throw error(404, {message: 'fail to load world'})
    }
  }

  try {
    const response = await fetch(`/api/words/${language}`)
    let words = await response.json()
    return {
      wordData: {
        message: {
          text: response.statusText,
          stattus: response.status
        },
        cookiesLanguage: language,
        words,
      }
    }
  } catch (err) {
    throw error(404, {message: 'fail to load word'})
  }
  
};





export const actions: Actions = {
  setTheme: async ({ url, cookies }) => {
    const theme = url.searchParams.get('theme')
    const redirectTo = url.searchParams.get('redirecTo')

    if (theme) {
      cookies.set('coloTheme', theme, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365
      })

     
    }

    throw redirect(303, redirectTo ?? '/')

  }, 
  setLanguage: async ({url, cookies}) => {
    const language = url.searchParams.get('language')
    console.log(language)

    if(language) {
      cookies.set('language', language, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365
      })
    }
  }
};

