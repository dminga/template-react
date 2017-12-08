export const asynWork0 = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value+1)
      // reject("Timeout")
    }, 1000)
  })
}
