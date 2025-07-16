import { isString } from 'lodash-es'

class MxmUIError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'MxmUIError'
  }
}

export function throwError(scope: string, msg: string) {
  throw new Error(`[${scope}] ${msg}`)
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== 'production') {
    const err = isString(scope) ? new MxmUIError(`[${scope}] ${msg}`) : scope
    console.warn(err)
  }
}
