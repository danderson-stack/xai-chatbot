
export function serverResponse(message: string): Promise<string> {
    let timeOutId: ReturnType<typeof setTimeout>;
    return new Promise((resolve, reject) => {
      timeOutId = setTimeout(() => {
        if (message.trim() === "42") {
          reject(new Error("Message content '42' is not allowed."));
        } else {
          resolve(`Your message ${message} was recieved`);
        }
      }, 1500);
      return () => clearTimeout(timeOutId);
    });
  }