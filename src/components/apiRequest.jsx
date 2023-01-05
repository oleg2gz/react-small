export const apiRequest = async (url, options = null, errMsg = null) => {
  try {
    const response = await fetch(url, options)

    if (!response.ok) throw Error('Please reload the app.')
  } catch (error) {
    errMsg = error.message
  } finally {
    return errMsg
  }
}
