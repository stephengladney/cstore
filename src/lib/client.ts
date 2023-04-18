export function formatPhoneNumber(phoneNumber: string) {
  const areaCode = phoneNumber.substring(2, 5)
  const prefix = phoneNumber.substring(5, 8)
  const suffix = phoneNumber.substring(8)
  return `(${areaCode}) ${prefix}-${suffix}`
}
