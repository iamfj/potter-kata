export function DiscountSection() {
  return (
    <>
      <p className={`Text`}>
        Change your password here. After saving, you'll be logged out.
      </p>
      <fieldset className={`Fieldset`}>
        <label className={`Label`} htmlFor={`currentPassword`}>
          Current password
        </label>
        <input className={`Input`} id={`currentPassword`} type={`password`} />
      </fieldset>
      <fieldset className={`Fieldset`}>
        <label className={`Label`} htmlFor={`newPassword`}>
          New password
        </label>
        <input className={`Input`} id={`newPassword`} type={`password`} />
      </fieldset>
      <fieldset className={`Fieldset`}>
        <label className={`Label`} htmlFor={`confirmPassword`}>
          Confirm password
        </label>
        <input className={`Input`} id={`confirmPassword`} type={`password`} />
      </fieldset>
      <div
        style={{ display: `flex`, marginTop: 20, justifyContent: `flex-end` }}
      >
        <button className={`Button green`}>Change password</button>
      </div>
    </>
  );
}
