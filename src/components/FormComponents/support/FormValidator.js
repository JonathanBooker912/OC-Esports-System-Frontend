import useVuelidate from "@vuelidate/core";

export default class FormValidator {
  constructor() {
    this.v$ = useVuelidate();
  }

  isFormValid = async () => {
    return await this.v$.value.$validate();
  };
}
