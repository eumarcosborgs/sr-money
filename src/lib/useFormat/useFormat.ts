import { pipe } from 'fp-ts/function'
import { tryCatch, toError, fold as foldEither } from 'fp-ts/Either'
import { fromNullable, isSome } from 'fp-ts/Option'

import Big from 'big.js'

export function useFormat() {
  function formatValue(value: string) {
    let valueToFormat = value.replace(/\D/g, '').replace(/([0-9]{2})$/g, ',$1')

    if (valueToFormat.length > 6) {
      valueToFormat = valueToFormat.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
    }

    return valueToFormat
  }

  function decimalFromInt(
    value?: number | string | null,
    options?: Intl.NumberFormatOptions,
  ) {
    const amount = toNumber(value)

    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: amount >= 1e6 ? 0 : 2,
      style: 'currency',
      currency: 'BRL',
      ...options,
    }).format(toFloat(amount))
  }

  function toMaskDate(valueToFormat: string) {
    let value = valueToFormat.replace(/\D/g, '')

    if (value.length >= 8) {
      value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
    } else if (value.length >= 6) {
      value = value.replace(/(\d{2})(\d{2})(\d{2})/, '$1/$2/$3')
    }

    return value
  }

  function toDateByString(date: string) {
    const dateParts = date.split('/')

    const isoDateString =
      dateParts[2] + '-' + dateParts[1] + '-' + (toNumber(dateParts[0]) + 1)

    const timestamp = Date.parse(isoDateString)

    if (isNaN(timestamp)) {
      return undefined
    }

    return new Date(timestamp)
  }

  function toNumber(value?: string | number | null): number {
    const amount = fromNullable(value)

    if (isSome(amount)) {
      return pipe(
        tryCatch(() => new Big(amount.value).toNumber(), toError),
        foldEither(
          () => 0,
          (value) => value,
        ),
      )
    }

    return 0
  }

  function toDecimal(value?: string | number | null): string {
    const amount = toNumber(value)

    return decimalFromInt(amount, {
      style: 'decimal',
      currency: 'BRL',
      minimumFractionDigits: 2,
    })
  }

  function toFloat(value?: string | number | null) {
    return toNumber(value) / 100
  }

  function toDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return {
    toDecimal,
    toDateByString,
    toMaskDate,
    toDate,
    toFloat,
    toNumber,
    formatValue,
    decimalFromInt,
  }
}
