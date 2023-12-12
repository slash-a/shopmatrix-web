function path(root: string, sublink: string) {
  return `${root}${sublink}`
}

const ROOTS = ''
const ROOTS_ADMIN = '/admin'

export const PATH_PUBLIC = {
  root: ROOTS,
  user: {
    landing: path(ROOTS, '/'),
    login: path(ROOTS, '/login'),
    forgetPassword: path(ROOTS, '/forget-password'),
    signUp: path(ROOTS, '/sign-up'),
  },
  general: {
    session: path(ROOTS, '/session'),
    sessionDetail: path(ROOTS, '/session-detail'),
  },
}

//export const FORCE_NOT_TO_REDIRECT_TO_LOGIN_PAGES = [
//  PATH_PUBLIC.user.landing,
//  PATH_PUBLIC.user.login,
//  PATH_PUBLIC.user.forgetPassword,
//  PATH_PUBLIC.user.signUp,
//  PATH_PUBLIC.general.aboutUs,
//  PATH_PUBLIC.general.presentation,
//  PATH_PUBLIC.support.termsOfService,
//  PATH_PUBLIC.support.tradingRules,
//  PATH_PUBLIC.support.privacyPolicy,
//  PATH_PUBLIC.oauth.authorize,
//]
