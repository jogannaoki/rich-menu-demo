import Liff from './liff'

declare global {
  interface Window {
    liff: Liff
  }
}
