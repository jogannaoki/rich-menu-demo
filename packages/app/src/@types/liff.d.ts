// refer: https://developers.line.biz/ja/reference/liff/

export interface LiffConfig {
  liffId: string
}

export interface LiffError {
  code: string
  message: string
}

type SuccessCallback = () => void
type ErrorCallback = (error: LiffError) => void
type InitCallback = (config: LiffConfig, successCallback: SuccessCallback, errorCallback: ErrorCallback) => void
type InitPromise = (config: LiffConfig) => Promise<void>
type Init = InitCallback & InitPromise

export interface LoginConfig {
  redirectUri?: string
}

export interface Profile {
  userId: string
  displayName: string
  pictureUrl: string
  statusMessage: string
}

export default interface Liff {
  init: Init
  login: (loginConfig?: LoginConfig) => void
  isLoggedIn: () => boolean
  getProfile: () => Promise<Profile>
  getAccessToken: () => string
  getIDToken: () => string
  closeWindow: () => void
  getOS: () => string
  isApiAvailable: (apiName: string) => boolean
  shareTargetPicker: (messages: Array<T>) => Promise<T>
  getLineVersion: () => string | null
}
