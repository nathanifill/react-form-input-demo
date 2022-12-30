import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmailAddress = (value) => value.includes("@");

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: emailAddressValue,
    isValid: emailAddressIsValid,
    hasError: emailAddressHasError,
    valueChangeHandler: emailAddressChangeHandler,
    inputBlurHandler: emailAddressBlurHandler,
    reset: resetEmailAddress,
  } = useInput(isEmailAddress);

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailAddressIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(firstNameValue, lastNameValue, emailAddressValue);

    resetFirstName();
    resetLastName();
    resetEmailAddress();
  };

  const getFormControlClasses = (errorBool) => {
    return errorBool ? "form-control invalid" : "form-control";
  };

  const firstNameClasses = getFormControlClasses(firstNameHasError);
  const lastNameClasses = getFormControlClasses(lastNameHasError);
  const emailAddressClasses = getFormControlClasses(emailAddressHasError);

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">First name must be non-empty.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Last name must be non-empty.</p>
          )}
        </div>
      </div>
      <div className={emailAddressClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={emailAddressValue}
          onChange={emailAddressChangeHandler}
          onBlur={emailAddressBlurHandler}
        />
        {emailAddressHasError && (
          <p className="error-text">
            Email address must be non-empty and contain an "@" symbol.
          </p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
