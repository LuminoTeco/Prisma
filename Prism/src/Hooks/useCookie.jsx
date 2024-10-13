import { useState } from 'react'
import cookie from "js-cookie"

const useCookie = (cookieName) => {

    const [cookieValue, setCookieValue] = useState(() => {
        return cookie.get(cookieName) || null
    })

    const  setCookie = (value, option = {}) => {
        cookie.set(cookieName, value, option)
        setCookieValue(value)
    }

    const removeCookie = () => {
        cookie.remove(cookieName)   
        setCookieValue(null)
    }

  return {cookieValue, setCookie, removeCookie}
}

export default useCookie