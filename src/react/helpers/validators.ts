

export class Validator {

  static emailFormat (email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    console.log(regex.test(email))
    return regex.test(email);
  }

  static positiveNumberFilter(value: string) {
    console.log(value.replace(/[^0-9]/g, ""))
    return value.replace(/[^0-9]/g, "");
  }
}